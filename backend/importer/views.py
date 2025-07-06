# backend/importer/views.py

from .utils import normalize_data
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
import csv
import json
from skills.models import Skill
from profiles.models import Profile
from django.contrib.auth.models import User
from django.core.exceptions import FieldError


class BulkImportAPIView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        file = request.FILES.get("file")
        if not file:
            return Response(
                {"error": "No file provided."}, status=status.HTTP_400_BAD_REQUEST
            )

        # Determine file type
        try:
            if file.name.endswith(".json"):
                data = json.load(file)
            elif file.name.endswith(".csv"):
                decoded = file.read().decode("utf-8").splitlines()
                data = list(csv.DictReader(decoded))
            else:
                return Response(
                    {"error": "Unsupported file type. Use .json or .csv"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Exception as e:
            return Response(
                {"error": f"Error parsing file: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        import_type = request.query_params.get("type")
        if not import_type:
            return Response(
                {"error": "Missing import type (?type=skill or ?type=profile)"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        updated_count = 0
        created_count = 0

        try:
            if import_type == "skill":
                for item in data:
                    cleaned_item = normalize_data(item, "skill")
                    obj, created = Skill.objects.update_or_create(
                        name=cleaned_item.get("name"), defaults=cleaned_item
                    )
                    if created:
                        created_count += 1
                    else:
                        updated_count += 1

            elif import_type == "profile":
                for item in data:
                    username = item.get("user")
                    bio = item.get("bio", "")

                    if not username:
                        continue  # Skip if no user field

                    try:
                        user = User.objects.get(username=username)
                    except User.DoesNotExist:
                        return Response(
                            {"error": f"User '{username}' not found."},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                        )

                    profile, created = Profile.objects.update_or_create(
                        user=user,
                        defaults={
                            "bio": bio,
                            "source": "bulk_import",
                        },
                    )
                    if created:
                        created_count += 1
                    else:
                        updated_count += 1
            else:
                return Response(
                    {"error": "Invalid import type. Use ?type=skill or ?type=profile"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        except FieldError as fe:
            return Response(
                {"error": f"Model field mismatch: {str(fe)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {"error": f"Server error during import: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(
            {
                "message": "Import complete.",
                "created": created_count,
                "updated": updated_count,
            },
            status=status.HTTP_200_OK,
        )

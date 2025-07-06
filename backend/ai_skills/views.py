# backend/ai_skills/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Count
from .classifier import predict_skill_category, train_classifier
from .serializers import SkillCategorySuggestionSerializer


class SkillCategorySuggestionView(APIView):
    """
    API endpoint to suggest a category for a given skill name/description.
    Expects a POST request with a 'skill_text' in the body.
    """

    def get(self, request, *args, **kwargs):
        # This GET method is primarily for the browsable API to show the form.
        # It doesn't perform any actual suggestion logic.
        return Response(
            {"detail": "Use POST request with 'skill_text' to get suggestions."},
            status=status.HTTP_200_OK,
        )

    def post(self, request, *args, **kwargs):
        skill_text = request.data.get("skill_text")

        if not skill_text:
            return Response(
                {"error": "Please provide 'skill_text' in the request body."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        suggested_category, confidence = predict_skill_category(skill_text)

        serializer = SkillCategorySuggestionSerializer(
            {"suggested_category": suggested_category, "confidence": confidence}
        )
        return Response(serializer.data, status=status.HTTP_200_OK)


class RetrainClassifierView(APIView):
    """
    API endpoint to retrain the skill category classifier on demand.
    """

    def post(self, request, *args, **kwargs):
        try:
            train_classifier()
            return Response({"detail": "Classifier retrained successfully."}, status=status.HTTP_200_OK)
        except Exception as e:
            import traceback
            traceback_str = traceback.format_exc()
            return Response(
                {"error": "Failed to retrain classifier", "details": str(e), "traceback": traceback_str},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class SkillAnalyticsView(APIView):
    """
    API endpoint to provide skill distribution analytics.
    """

    def get(self, request, *args, **kwargs):
        # Aggregate skill counts per category
        from ai_skills.models import SkillData

        data = (
            SkillData.objects.values("category__name")
            .annotate(skill_count=Count("id"))
            .order_by("-skill_count")
        )

        result = [{"category": item["category__name"], "count": item["skill_count"]} for item in data]

        return Response(result, status=status.HTTP_200_OK)


class ProfileAnalyticsView(APIView):
    """
    API endpoint to provide profile analytics.
    """

    def get(self, request, *args, **kwargs):
        from backend.profiles.models import Profile

        # Example: count profiles per skill name
        data = (
            Profile.objects.values("skills__name")
            .annotate(profile_count=Count("id"))
            .order_by("-profile_count")
        )

        result = [{"skill": item["skills__name"], "count": item["profile_count"]} for item in data if item["skills__name"]]

        return Response(result, status=status.HTTP_200_OK)

from rest_framework import viewsets
from .models import Skill
from .serializers import SkillSerializer


class SkillViewSet(viewsets.ModelViewSet):
    queryset = (
        Skill.objects.all()
    )  # This specifies which data (all Skill objects) this viewset will operate on.
    serializer_class = (
        SkillSerializer  # This links the viewset to your SkillSerializer.
    )

    # ModelViewSet automatically provides actions for:
    # - List (GET /api/skills/)
    # - Retrieve (GET /api/skills/{id}/)
    # - Create (POST /api/skills/)
    # - Update (PUT /api/skills/{id}/)
    # - Partial Update (PATCH /api/skills/{id}/)
    # - Destroy (DELETE /api/skills/{id}/)

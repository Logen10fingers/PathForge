# backend/profiles/views.py

from rest_framework import viewsets
from .models import Profile
from .serializers import ProfileSerializer
from django_filters.rest_framework import DjangoFilterBackend # Added import
from rest_framework.filters import SearchFilter # Added import


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['source']
    search_fields = ['user__username', 'bio', 'skills__name']
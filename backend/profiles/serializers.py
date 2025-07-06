# backend/profiles/serializers.py
from rest_framework import serializers
from .models import Profile
from skills.serializers import SkillSerializer
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = ["id", "user", "bio", "skills", "last_updated", "source"]

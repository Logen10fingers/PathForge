# backend/skills/serializers.py
from rest_framework import serializers
from .models import Skill


class SkillSerializer(serializers.ModelSerializer):
    alias_list = serializers.SerializerMethodField()

    class Meta:
        model = Skill
        fields = [
            "id",
            "name",
            "description",
            "category",
            "last_updated",
            "source",
            "aliases",
            "alias_list",
        ]

    def get_alias_list(self, obj):
        return obj.get_alias_list()

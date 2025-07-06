# backend/ai_skills/serializers.py

from rest_framework import serializers
from .models import Category  # Import the Category model


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "description"]


class SkillCategorySuggestionSerializer(serializers.Serializer):
    suggested_category = serializers.CharField(max_length=100)
    confidence = serializers.FloatField()
    # You could also include the predicted category ID if you fetch it
    # category_id = serializers.IntegerField(required=False)

# backend/ai_skills/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path(
        "suggest-category/",
        views.SkillCategorySuggestionView.as_view(),
        name="suggest-category",
    ),
    path(
        "retrain-classifier/",
        views.RetrainClassifierView.as_view(),
        name="retrain-classifier",
    ),
    path(
        "analytics/skills/",
        views.SkillAnalyticsView.as_view(),
        name="skill-analytics",
    ),
    path(
        "analytics/profiles/",
        views.ProfileAnalyticsView.as_view(),
        name="profile-analytics",
    ),
]

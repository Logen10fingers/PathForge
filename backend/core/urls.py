# backend/core/urls.py
from django.contrib import admin
from django.urls import path, include  # Ensure 'include' is imported

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/skills/", include("skills.urls")),  # Skills app
    path("api/profiles/", include("profiles.urls")),  # Profiles app
    path("api/ai-skills/", include("ai_skills.urls")),  # AI Skills app
    path("api/", include("importer.urls")),  # ✅ Importer app route
]

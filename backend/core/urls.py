# backend/core/urls.py
from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView # Import RedirectView for redirection

urlpatterns = [
    path("admin/", admin.site.urls),
    # Redirect the root URL ('/') to the Django admin page.
    # 'permanent=False' means it's a temporary redirect (302), which is good for development.
    path('', RedirectView.as_view(url='/admin/', permanent=False)),
    path("api/skills/", include("skills.urls")),  # Skills app
    path("api/profiles/", include("profiles.urls")),  # Profiles app
    path("api/ai-skills/", include("ai_skills.urls")),  # AI Skills app
    path("api/", include("importer.urls")),  # Importer app route
    # Note: If you have a main API root for Django REST Framework,
    # you might want to redirect to that instead, e.g., path('', RedirectView.as_view(url='/api/', permanent=False)),
    # assuming your 'importer.urls' or another app provides a DRF API root at '/api/'.
]
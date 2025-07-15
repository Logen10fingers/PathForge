# backend/profiles/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet

router = DefaultRouter()
router.register(
    r"profiles", ProfileViewSet
)  # 'profiles' will be the base URL for this viewset

urlpatterns = [
    path("", include(router.urls)),
]

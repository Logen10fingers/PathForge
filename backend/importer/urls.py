# backend/importer/urls.py
from django.urls import path
from .views import BulkImportAPIView

urlpatterns = [
    path("import/", BulkImportAPIView.as_view(), name="bulk-import"),
]

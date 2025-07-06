# backend/ai_skills/apps.py

from django.apps import AppConfig


class AiSkillsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "ai_skills"

    def ready(self):
        # Import the classifier module here
        from . import classifier

        # Comment out model loading/training during app initialization to avoid DB errors
        # classifier.get_classifier_model()
        print("AI Skills app is ready. Classifier loading/training deferred.")

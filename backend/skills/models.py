# backend/skills/models.py
from django.db import models


class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=100, blank=True, null=True)

    last_updated = models.DateTimeField(auto_now=True)
    source = models.CharField(max_length=255, blank=True, null=True)
    aliases = models.TextField(
        blank=True, help_text="Comma-separated list of alternative names for the skill"
    )

    def __str__(self):
        return self.name

    def get_alias_list(self):
        return [alias.strip() for alias in self.aliases.split(",") if alias.strip()]

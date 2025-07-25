# Generated by Django 5.2.3 on 2025-07-05 16:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("skills", "0002_skill_category"),
    ]

    operations = [
        migrations.AddField(
            model_name="skill",
            name="aliases",
            field=models.TextField(
                blank=True,
                help_text="Comma-separated list of alternative names for the skill",
            ),
        ),
        migrations.AddField(
            model_name="skill",
            name="last_updated",
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name="skill",
            name="source",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]

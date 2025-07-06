import csv
from django.core.management.base import BaseCommand
from ai_skills.models import Category, SkillData

class Command(BaseCommand):
    help = 'Import skill-category data from a CSV file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='Path to the CSV file to import')

    def handle(self, *args, **kwargs):
        csv_file = kwargs['csv_file']
        with open(csv_file, newline='', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            count = 0
            for row in reader:
                skill_name = row.get('skill')
                category_name = row.get('category')
                if not skill_name or not category_name:
                    continue

                category, created = Category.objects.get_or_create(name=category_name)
                # Assuming SkillData is a model to store skill and category for training
                skill_data, created = SkillData.objects.get_or_create(name=skill_name, category=category)
                count += 1

        self.stdout.write(self.style.SUCCESS(f'Successfully imported {count} skill-category records'))

# backend/importer/utils.py

from django.contrib.auth.models import User

# Synonym mapping to standardize variations
SYNONYM_MAP = {
    "js": "JavaScript",
    "javascript": "JavaScript",
    "py": "Python",
    "python": "Python",
    "django": "Django",
    # Add more if needed
}


# Cleans and standardizes a skill name
def clean_skill_name(name: str) -> str:
    if not name:
        return ""

    # Normalize to lowercase for mapping comparison
    cleaned = name.strip().lower()

    # Check if it's a known synonym
    if cleaned in SYNONYM_MAP:
        return SYNONYM_MAP[cleaned]

    # Fallback to Title case
    return cleaned.title()


# Applies normalization to one data dict (skill/profile)
def normalize_data(data: dict, import_type: str) -> dict:
    cleaned = {k.strip().lower(): v.strip() for k, v in data.items()}

    if import_type == "skill":
        if "name" in cleaned:
            cleaned["name"] = clean_skill_name(cleaned["name"])
        # Optionally normalize aliases as CSV → list
        if "aliases" in cleaned:
            alias_list = [a.strip() for a in cleaned["aliases"].split(",") if a.strip()]
            cleaned["aliases"] = alias_list

        cleaned["source"] = "bulk_import"  # Tag source

    elif import_type == "profile":
        username = cleaned.get("user")
        if username:
            try:
                user_obj = User.objects.get(username=username)
                cleaned["user"] = user_obj
            except User.DoesNotExist:
                raise ValueError(f"User '{username}' not found.")
        cleaned["source"] = "bulk_import"

    return cleaned

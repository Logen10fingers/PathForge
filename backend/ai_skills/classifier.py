# backend/ai_skills/classifier.py

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
import joblib  # To save/load the model


from ai_skills.models import SkillData

# This function will be called to get a trained model and vectorizer
# In a real app, this data would come from your Skill model and be more extensive
def train_classifier():
    # Load training data from SkillData model in the database
    skills_data = [(skill.name, skill.category.name) for skill in SkillData.objects.all()]

    if not skills_data:
        # Fallback to sample data if no data in database
        skills_data = [
            ("Python programming", "Programming Language"),
            ("JavaScript for web", "Programming Language"),
            ("Java development", "Programming Language"),
            ("SQL database management", "Database"),
            ("PostgreSQL operations", "Database"),
            ("MySQL querying", "Database"),
            ("Django web framework", "Framework"),
            ("ReactJS library", "Framework"),
            ("Vue.js development", "Framework"),
            ("AWS cloud services", "Cloud Platform"),
            ("Azure infrastructure", "Cloud Platform"),
            ("Google Cloud Platform", "Cloud Platform"),
            ("Docker containerization", "DevOps"),
            ("Kubernetes orchestration", "DevOps"),
            ("CI/CD pipelines", "DevOps"),
            (
                "Machine Learning algorithms",
                "Programming Language",
            ),  # Can be multi-category, but for simplicity
            ("Data structures", "Programming Language"),
            ("NoSQL databases", "Database"),
            ("Spring Boot", "Framework"),
            (
                "Frontend styling with CSS",
                "Programming Language",
            ),  # For now, can refine later
        ]

    texts = [data[0] for data in skills_data]
    labels = [data[1] for data in skills_data]

    # Create a pipeline: Vectorizer -> Classifier
    # TfidfVectorizer converts text into numerical features
    # MultinomialNB (Naive Bayes) is a good classifier for text
    model_pipeline = make_pipeline(TfidfVectorizer(), MultinomialNB())

    # Train the model
    model_pipeline.fit(texts, labels)

    import os

    # Ensure directory exists
    model_dir = "ai_skills"
    if not os.path.exists(model_dir):
        os.makedirs(model_dir)

    # Save the trained model for later use (so we don't retrain every time)
    joblib.dump(model_pipeline, os.path.join(model_dir, "skill_category_model.pkl"))

    print("Skill category classifier trained and saved!")
    return model_pipeline


# Function to load the model (or train if not found)
def get_classifier_model():
    try:
        model = joblib.load("ai_skills/skill_category_model.pkl")
        print("Skill category classifier loaded from file.")
        return model
    except FileNotFoundError:
        print("Model not found, training new classifier...")
        return train_classifier()


# Function to predict category for a new skill text
def predict_skill_category(skill_text):
    model = get_classifier_model()
    # Predict_proba gives probabilities for each class
    probabilities = model.predict_proba([skill_text])[0]
    classes = model.classes_

    # Get the top prediction
    top_index = probabilities.argmax()
    suggested_category = classes[top_index]
    confidence = probabilities[top_index]

    # You can set a confidence threshold if needed
    # if confidence < 0.5: # Example threshold
    #     return "Uncategorized"

    return suggested_category, confidence

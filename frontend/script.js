// frontend/script.js (add this inside the DOMContentLoaded listener)

    const skillInput = document.getElementById('skill-input');
    const suggestButton = document.getElementById('suggest-button');
    const suggestionOutput = document.getElementById('suggestion-output');

    suggestButton.addEventListener('click', async () => {
        const skillText = skillInput.value.trim();
        if (!skillText) {
            suggestionOutput.innerHTML = '<p style="color: red;">Please enter a skill.</p>';
            return;
        }

        suggestionOutput.innerHTML = '<p>Suggesting...</p>';

        try {
            const response = await fetch('http://127.0.0.1:8000/api/ai-skills/suggest-category/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ skill_text: skillText }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status} - ${errorData.error || response.statusText}`);
            }

            const data = await response.json();
            suggestionOutput.innerHTML = `
                <p>Suggested Category: <strong>${data.suggested_category}</strong> (Confidence: ${data.confidence.toFixed(2)})</p>
            `;
        } catch (error) {
            console.error('Error fetching skill suggestion:', error);
            suggestionOutput.innerHTML = `<p style="color: red;">Error: ${error.message}. Please try again.</p>`;
        }
    });
// Make sure this closing brace matches the DOMContentLoaded listener's opening brace
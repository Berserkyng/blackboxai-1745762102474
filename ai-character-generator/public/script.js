const form = document.getElementById('character-form');
const resultSection = document.getElementById('result-section');
const characterText = document.getElementById('character-text');
const characterImage = document.getElementById('character-image');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const prompt = document.getElementById('character-prompt').value.trim();
  if (!prompt) {
    alert('Please enter a character description.');
    return;
  }

  characterText.textContent = 'Generating character...';
  characterImage.src = '';
  resultSection.classList.remove('hidden');

  try {
    // Call AI text generation API (simulate with placeholder)
    const characterResponse = await fetch('/api/generate-character', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const characterData = await characterResponse.json();

    if (characterData.error) {
      characterText.textContent = 'Error generating character: ' + characterData.error;
      return;
    }

    characterText.textContent = characterData.character;

    // Call AI image generation API (simulate with placeholder)
    const imageResponse = await fetch('/api/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const imageData = await imageResponse.json();

    if (imageData.error) {
      characterImage.alt = 'Error generating image';
      return;
    }

    characterImage.src = imageData.imageUrl;
    characterImage.alt = 'Generated character image';

  } catch (error) {
    characterText.textContent = 'An error occurred: ' + error.message;
  }
});

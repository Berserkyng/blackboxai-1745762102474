const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Simulated AI character generation endpoint
app.post('/api/generate-character', (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }
  // Simulate character generation (replace with real AI API integration)
  const character = `Generated character based on prompt: "${prompt}"\nName: Aria the Brave\nClass: Warrior\nBackground: A fearless adventurer from the northern lands.`;
  res.json({ character });
});

// Simulated AI image generation endpoint
app.post('/api/generate-image', (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }
  // Simulate image generation by returning a placeholder image URL
  const imageUrl = 'https://via.placeholder.com/400x400.png?text=Character+Image';
  res.json({ imageUrl });
});

app.listen(port, () => {
  console.log(`AI Character Generator server running at http://localhost:${port}`);
});

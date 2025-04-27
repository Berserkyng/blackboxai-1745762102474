const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

let openaiApiKey = process.env.OPENAI_API_KEY;

// If OPENAI_API_KEY is not set, try to read from openai_token.txt
if (!openaiApiKey) {
  try {
    const tokenPath = path.join(__dirname, 'openai_token.txt');
    const tokenContent = fs.readFileSync(tokenPath, 'utf-8').trim();
    if (tokenContent && !tokenContent.startsWith('#')) {
      openaiApiKey = tokenContent;
      console.log('Loaded OpenAI API key from openai_token.txt');
    }
  } catch (err) {
    console.warn('Could not read openai_token.txt:', err.message);
  }
}

const openai = new OpenAI({
  apiKey: openaiApiKey,
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// AI character generation endpoint using OpenAI GPT-3.5-turbo (fallback from GPT-4)
app.post('/api/generate-character', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an AI that generates detailed character descriptions based on user prompts.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 500,
      temperature: 0.8,
    });
    const character = completion.choices[0].message.content.trim();
    res.json({ character });
  } catch (error) {
    console.error('Error generating character:', error);
    res.status(500).json({ error: 'Failed to generate character' });
  }
});

// AI image generation endpoint using OpenAI DALL·E
app.post('/api/generate-image', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }
  try {
    const response = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: '512x512',
    });
    const imageUrl = response.data[0].url;
    res.json({ imageUrl });
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

app.listen(port, () => {
  console.log(`AI Character Generator server running at http://localhost:${port}`);
});

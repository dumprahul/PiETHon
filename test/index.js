const axios = require('axios');
require('dotenv').config(); // Load environment variables if needed

async function askPrompt(prompt) {
  const apiUrl = process.env.API_BASE_URL; // OpenAI API URL
  const chatModel = process.env.CHAT_MODEL; // OpenAI model (e.g., 'qwen-2.5-coder-3b')
  const apiKey = process.env.API_KEY; // API key (if required)

  try {
    const response = await axios.post(
      `${apiUrl}/chat/completions`,  // Correct endpoint for OpenAI chat completions
      {
        model: chatModel,  // The model name you're using (e.g., qwen-2.5-coder-3b)
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },  // Define system role
          { role: 'user', content: prompt }  // User input as the prompt
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`, // Use your API key for authorization
        },
      }
    );

    // Log the response content
    const message = response.data.choices[0].message;
    console.log('Model Response:', message.content);  // Access the content of the message

  } catch (error) {
    console.error('Error asking prompt:', error);
  }
}

// Example usage
const prompt = 'Where is Chennai?'; // Change your prompt as needed
askPrompt(prompt);

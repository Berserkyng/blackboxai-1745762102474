# AI Character Generator

This project is a simple AI Character Generator with image generation UI. It includes a frontend built with Tailwind CSS and a backend Node.js server simulating AI character and image generation APIs.

## Prerequisites

Make sure you have Node.js and npm installed on your Linux system.

To install Node.js and npm on Ubuntu/Debian:

```bash
sudo apt update
sudo apt install nodejs npm -y
```

Verify installation:

```bash
node -v
npm -v
```

## Installation and Running the Project

1. Download or clone the project to your local machine.

2. Open a terminal and navigate to the project directory:

```bash
cd ai-character-generator
```

3. Install the required dependencies:

```bash
npm install
```

4. Start the backend server:

```bash
npm start
```

The server will start on port 3000.

## Using the Application

1. Open your web browser.

2. Navigate to:

```
http://localhost:3000/index.html
```

3. Enter a character description in the text area.

4. Click the "Generate Character" button.

5. The generated character text and image will appear below the form.

## Customization

- The backend currently returns simulated AI responses. To integrate real AI services, update the API endpoints in `server.js`.

- The frontend uses Tailwind CSS, Google Fonts, and Font Awesome via CDN for styling.

## Troubleshooting

- If you encounter permission issues running Node.js, try:

```bash
sudo npm start
```

- Ensure port 3000 is free or change the port in `server.js`.

## License

This project is provided as-is for demonstration purposes.

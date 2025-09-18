# AI Chatbot Application

A modern React-based chatbot interface that connects to a Flask backend for real-time conversations.

## Features

- Modern dark-themed chat interface
- Real-time messaging with Flask backend
- Typing indicators and smooth animations
- Responsive design for all devices
- TypeScript for type safety
- Tailwind CSS for styling

## Setup Instructions

### Frontend (React)
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

### Backend (Flask)
1. Install Python dependencies:
   ```bash
   pip install flask flask-cors
   ```

2. Start the Flask server:
   ```bash
   python server.py
   ```

The Flask server will run on `http://localhost:5000` and the React app will run on `http://localhost:5173`.

## API Endpoint

- **POST** `/chat`
  - Body: `{"message": "user message"}`
  - Response: `{"reply": "bot response"}`

## Customization

To add your own chatbot logic, modify the `chat()` function in `server.py`:

```python
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json() or {}
    user_message = data.get('message', '')
    # ---- Replace the line below with your chatbot logic ----
    bot_reply = f'You said: {user_message}'
    return jsonify({'reply': bot_reply})
```

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Flask, Flask-CORS
- **Icons**: Lucide React
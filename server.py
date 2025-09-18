from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

# Chat history (per session, simple global memory)
chat_history = []

def ask_ollama(prompt, model="llama3"):
    try:
        # Add system-style instruction for concise answers
        system_prompt = "You are a helpful assistant. Answer concisely in 2–3 sentences."

        # Include chat history for context
        conversation = [{"role": "system", "content": system_prompt}]
        for msg in chat_history:
            conversation.append(msg)
        conversation.append({"role": "user", "content": prompt})

        response = requests.post(
            "http://localhost:11434/api/chat",
            json={"model": model, "messages": conversation, "options": {"num_predict": 150}},
            stream=True
        )
        response.raise_for_status()

        reply_parts = []
        for line in response.iter_lines():
            if line:
                try:
                    data = json.loads(line.decode('utf-8').strip())
                    reply_parts.append(data.get("message", {}).get("content", ""))
                except Exception:
                    continue  # skip malformed lines

        reply = ''.join(reply_parts).strip()

        # Save to chat history for continuity
        chat_history.append({"role": "user", "content": prompt})
        chat_history.append({"role": "assistant", "content": reply})

        return reply or "⚠️ No response from Ollama."
    except Exception as e:
        return f"⚠️ Error talking to Ollama: {str(e)}"

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json() or {}
    user_message = data.get('message', '').strip()

    if not user_message:
        return jsonify({'reply': "Please ask me something 🙂"})

    # Get response from Ollama
    bot_reply = ask_ollama(user_message)
    return jsonify({'reply': bot_reply})

@app.route('/reset', methods=['POST'])
def reset_chat():
    """Clear chat history"""
    global chat_history
    chat_history = []
    return jsonify({"status": "Chat history cleared ✅"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

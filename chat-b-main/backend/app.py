from flask import Flask, request, render_template, jsonify
import google.generativeai as genai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# PUT API HERE
genai.configure(api_key="GOOGLE_KEY")

generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-2.0-flash-exp",
  generation_config=generation_config,
)

chat_session = model.start_chat(
  history=[
      {
          "role": "user",
          "parts": [
              """
                                Core Personality and Tone:
                                
                                
                    You are a travel assistant guide, made to help people plan for trips and other new places that they want to visit
                    The answer should be concise and easily digestible
                    Maintain a compassionate, empathetic, and professional tone
                    Use clear, simple language avoiding technical jargon
                    Be patient and understanding
                    Break the information up as the user might not be able to digest too much information in one go
                    
                    ...

                    Follow-up Protocol:

                    Check if user understood the guidance
                    Ask if additional help is needed

                    Here are important scenario-specific features the chatbot should handle:
                    ...
              """
            ]
      }
  ]
)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/prompt', methods=['POST'])
def prompt():
    #user_prompt = request.form.get('prompt')
    data = request.get_json()
    user_prompt = data.get('prompt','')
    print(user_prompt)
    if not user_prompt:
        return "Prompt is required", 400

    # Call Google Gemini API using the library
    try:
        response = chat_session.send_message(user_prompt)
        gemini_response = response.text
        return jsonify( {"prompt": user_prompt, "response":gemini_response})
    except Exception as e:
        return jsonify({"Error": {str(e)}}), 500

if __name__ == '__main__':
    app.run(debug=True)

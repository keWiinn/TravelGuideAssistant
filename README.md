# Travel Guide Assistant

## Overview
Travel Guide Assistant is a comprehensive travel planning platform that combines artificial intelligence with user-friendly interfaces to create seamless travel experiences. The platform serves as your personal travel companion, offering detailed insights and recommendations for every aspect of your journey. Whether you're planning a weekend getaway or an extended international trip, our assistant provides tailored guidance to ensure your travel plans are well-organized and thorough.

Key aspects of the platform include personalized recommendations based on your travel preferences, real-time updates for weather and local conditions, and comprehensive budget management tools. The assistant learns from user interactions to provide increasingly accurate and relevant suggestions, making each subsequent trip planning experience more efficient and enjoyable.

## Features Overview
The application combines essential travel planning tools with modern technical capabilities:

### Core Features
- **Interactive UI & AI Assistance:** Modern interface powered by Google's generative AI for smart, personalized recommendations
- **Cross-Platform Compatibility:** Responsive design that works seamlessly across all devices
- **Secure Integration:** Reliable cross-origin resource sharing between frontend and backend

### Travel Planning Tools
- **Best Time to Visit:** Seasonal analysis and event calendars
- **Budget Planning:** Cost estimates and currency conversion
- **Weather Information:** Forecasts and seasonal insights
- **Packing Tips:** Customized lists based on destination
- **Local Cuisine:** Restaurant and dish recommendations

## Installation and Setup Instructions

### Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install the required Python packages:
   ```bash
   pip install flask flask_cors google.generativeai
   ```
3. Run the backend server:
   ```bash
   flask --app app run
   ```

### Frontend Setup
1. Navigate to the `react_new` folder:
   ```bash
   cd react_new
   ```
2. Install the required npm packages:
   ```bash
   npm install
   npm install react-markdown
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

## How to Use
1. Obtain a Google AI API key from the Google Cloud Console and add it to `chat-b-main/backend/app.py` on line 9.
2. Run the backend server as described in the **Backend Setup** section.
3. Start the React frontend application as outlined in the **Frontend Setup** section.
4. Open your browser and navigate to the provided local URL (usually `http://localhost:3000`).
5. Interact with the Travel Guide Assistant to explore travel tips, plan your trip, and enjoy personalized recommendations.

## Project Demo

## 1. Home Menu

This is the starting point where users can access the Travel Guide Assistant and other features.

![Screenshot 2025-01-16 124713](https://github.com/user-attachments/assets/59638c23-f95a-491a-a255-cd363dfc7971)

---

## 2. Example Interaction: Nainital

Here is an example of the Travel Guide Assistant responding to a query about Nainital, providing detailed information about the destination.

![Screenshot 2025-01-16 124830](https://github.com/user-attachments/assets/85cc09ba-70df-4698-906b-39cb2cac967f)


Thank You!

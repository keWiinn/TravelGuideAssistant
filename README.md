# Travel Guide Assistant

## Overview
Travel Guide Assistant is a user-friendly platform designed to help travelers plan their adventures seamlessly. It offers the following features:
- **Best time to visit:** Discover the ideal time to visit your destination.
- **Budget planning:** Plan your trip finances with ease.
- **Weather info:** Get accurate weather forecasts.
- **Packing tips:** Receive recommendations on what to pack.
- **Local cuisine:** Explore popular dishes and culinary experiences.

The site provides an interactive interface, as depicted in the image above, to make travel planning simple and enjoyable.

---

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

---

## How to Use
1. Run the backend server as described in the **Backend Setup** section.
2. Start the React frontend application as outlined in the **Frontend Setup** section.
3. Open your browser and navigate to the provided local URL (usually `http://localhost:3000`).
4. Interact with the Travel Guide Assistant to explore travel tips, plan your trip, and enjoy personalized recommendations.

---

## Features Overview
The application includes the following capabilities:
- **Interactive UI:** Smooth navigation for planning every aspect of your trip.
- **AI Assistance:** Leverages Google’s generative AI for enhanced recommendations and insights.
- **Cross-Origin Resource Sharing:** Ensures seamless communication between the backend and frontend using Flask-CORS.

Feel free to contribute to this project or customize it for your travel needs!

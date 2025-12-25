# AgroHelp 🌱

**Team - Sangathan**  

AgroHelp is a hyper-local, multilingual AI-powered advisory platform designed to empower small and marginal farmers across India by bridging the critical information gap in modern agriculture.  

The core of the application is an **intelligent chat assistant** that provides real-time, actionable advice, moving beyond generic recommendations to offer support that is contextually aware of a farmer's specific environment.  

---

## 🚜 Problem Statement  

A majority of small and marginal farmers in India rely on traditional knowledge, local shopkeepers, or guesswork for crop selection, pest control, and fertilizer use. They lack access to personalized, real-time advisory services that account for soil type, weather conditions, and crop history.  

This often leads to poor yield, excessive input costs, and environmental degradation due to overuse of chemicals. Language barriers, low digital literacy, and absence of localized tools further limit their access to modern agri-tech resources.  

---

## 🌍 Why This Matters  

Helping small farmers make informed decisions can:  

- Increase productivity  
- Reduce costs  
- Improve livelihoods  
- Contribute to sustainable farming practices  
- Enhance food security & environmental conservation  

---

## 🎯 Key Features Implemented  

- **Multilingual Chat Assistant**: English, Hindi, Telugu, and Kannada with voice and text support.  
- **Accessibility-First Design**: Voice & image-based interactions for low digital literacy users.  
- **Image Disease Recognition**: Upload plant leaf images to detect crop diseases & get remedies using AI vision analysis.  
- **Smart Weather-Aware Advisory**: Context-aware recommendations integrated with OpenWeatherMap API for hyper-local forecasts.  
- **Voice Response System**: Every AI response is read aloud using Text-to-Speech in the user's selected language.  
- **Chat History**: Automatically saves conversations locally so farmers can refer back to previous advice.
- **Dynamic Language Switching**: Seamlessly switch languages from the navigation bar.
- **Dedicated Features Page**: Detailed breakdown of all platform capabilities.
- **Responsive UI**: Optimized for both desktop and mobile experience with a clean, nature-inspired design.  

---

## 🛠 Tech Stack  

**Frontend**: React.js, Tailwind CSS, Framer Motion, Web Speech API, Web Audio API  
**Backend**: FastAPI (Python)  
**AI Models**: Google Gemini 1.5 Flash (LLM), Custom Vision Models  
**APIs**: OpenWeatherMap, Google Generative AI  

---

## 📸 Demo  

### Landing Page  
![Landing Page](./frontend/src/assets/LandingPage.png)  

### Multilingual Response  
![Multilingual Response](./frontend/src/assets/Multilingual.png)  

### Image Disease Detection with Voice supported Response  
![Disease Detection](./frontend/src/assets/Disease.png)  

### Weather-based Recommendation  
![Weather Recommendation](./frontend/src/assets/weather.png)  


---

## 📊 Stakeholders / Beneficiaries  

- Small & marginal farmers  
- Agricultural extension officers  
- Government agriculture departments  
- NGOs & cooperatives  
- Agri-tech startups  

---

## 📌 Supporting Data  

- **86%** of Indian farmers are small or marginal (NABARD Report, 2022).  
- ICT-based advisories can increase crop yield by **20–30%**.  

---

## 🚧 Challenges  

- Handling dialect & accent diversity in speech inputs.  
- Building lightweight models suitable for low-connectivity rural areas.  
- Ensuring trustworthiness of recommendations.  
- Managing multilingual translations in real time.  

---

## 🚀 Upcoming Features  

- Soil health recommendations & fertilizer guidance.  
- Market price tracking & advisory.  
- Community forum for peer-to-peer learning.
- Offline mode for low-connectivity areas.

---

## 📢 Expected Outcomes  

- A robust multilingual AI assistant for farming advisory.  
- Personalized, real-time, location-specific recommendations.  
- Reduction in overuse of chemicals & improved soil health.  
- Better decision-making support for farmers.  

---

## 👨‍👩‍👧 Team - Sangathan  

We are a group of innovators passionate about empowering farmers through technology. By leveraging AI, we aim to bridge the information gap and create a more sustainable agricultural future.  

---


---

## 💻 Running AgroHelp Locally  

### Backend  

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # Linux/macOS
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up Environment Variables:
   Create a `.env` file in the `backend` directory and add your API keys:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   OPENWEATHER_API_KEY=your_openweather_api_key
   ```

5. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend  

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

---

## 🤝 Contributing  

1. Fork the Repository  
2. Clone your fork locally  
3. Create a new branch for your feature/fix  
4. Commit your changes and push to your fork  
5. Create a Pull Request describing your changes  

We welcome contributions in the areas of bug fixes, feature development, documentation, and testing.  


## 📜 License  

This project is Developed as part of a collaborative effort. Licensing terms to be finalized.  

---

Made with ❤️ by **Team Sangathan**  

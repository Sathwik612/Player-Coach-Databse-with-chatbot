# **Sports Coaching Planner with AI Chatbot**

A **full-stack MERN** application (MongoDB, Express.js, React.js, Node.js) that streamlines sports coaching by managing player data, generating personalized training plans, and providing real-time performance feedback via an AI chatbot.

## **Table of Contents**
- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## **Features**
1. **Coach Login & Authentication**  
   - Coaches can securely log in (hashed passwords, JWT-based or custom authentication).
2. **Player Management**  
   - CRUD operations for players: create, read, update, delete.  
   - Tracks positions, height, weight, diet, and training plans.
3. **AI Chatbot Integration**  
   - Real-time AI feedback for training suggestions.  
   - Uses external AI service via secure API calls.
4. **Responsive UI**  
   - Built with **React**, **CSS**/Material UI.  
   - Mobile-friendly design.
5. **Dynamic Training Plans**  
   - AI-driven suggestions for improved performance.  
   - Coaches can update player tactics and track progress.

---

## **Architecture**
```
frontend/               # React.js frontend
  ├── src/
  │    ├── components/
  │    ├── App.js
  │    ├── index.js
  │    └── ...
  └── package.json
backend/                # Node.js + Express backend
  ├── models/
  ├── routes/
  ├── server.js
  ├── package.json
  └── ...
```
- **MongoDB** for data storage (coaches, players).
- **Express.js** RESTful API for authentication, player management, AI integration.
- **React.js** for a responsive UI.
- **Node.js** server orchestrating all backend logic.

---

## **Installation**
1. **Clone the repository**:
   ```bash
   git clone https://github.com/<your-username>/sports-coach-planner.git
   cd sports-coach-planner
   ```

2. **Install dependencies** for both **frontend** and **backend**:
   ```bash
   # In the backend folder
   cd backend
   npm install

   # In the frontend folder
   cd ../frontend
   npm install
   ```

3. **Configure environment variables** (see [Environment Variables](#environment-variables)).

---

## **Usage**
1. **Start the backend**:
   ```bash
   cd backend
   npm start
   ```
2. **Start the frontend**:
   ```bash
   cd ../frontend
   npm start
   ```
3. Open your browser at **`http://localhost:3000`**:
   - **Login** as a coach (if using static data, credentials might be `coachA@example.com / password123`).
   - **Manage players** and test **AI Chatbot** via the Player Profile page.

---

## **Environment Variables**
Create a `.env` file in the **backend** folder:
```bash
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
JWT_SECRET=some_jwt_secret
IVISLABS_API_KEY=your_ivislabs_api_key
```
- **MONGO_URI**: Connection string for MongoDB.  
- **JWT_SECRET**: Secret key for JWT authentication (if used).  
- **IVISLABS_API_KEY**: API key for AI service (e.g., chat.ivislabs.in).

---

## **API Endpoints**

| **Endpoint**             | **Method** | **Description**                              |
|--------------------------|------------|----------------------------------------------|
| `/api/auth/register`     | POST       | Register a new coach                        |
| `/api/auth/login`        | POST       | Login coach (returns token)                 |
| `/api/players`           | GET        | Fetch all players                           |
| `/api/players/:id`       | GET        | Fetch a single player by ID                 |
| `/api/players/:id`       | PUT        | Update a player’s data                      |
| `/api/chatbot`           | POST       | Send user query to AI and get suggestions   |
| `/api/update-tactics`    | POST       | Update a player’s tactics                   |

---

## **Project Structure**
```
sports-coach-planner/
  ├── frontend/
  │    ├── src/
  │    │    ├── components/
  │    │    │    ├── Login.js
  │    │    │    ├── Dashboard.js
  │    │    │    ├── PlayerProfile.js
  │    │    │    └── ...
  │    │    ├── App.js
  │    │    └── index.js
  │    └── package.json
  ├── backend/
  │    ├── models/
  │    ├── routes/
  │    │    ├── authRoutes.js
  │    │    ├── playerRoutes.js
  │    │    ├── coachRoutes.js
  │    │    └── chatbotRoutes.js
  │    ├── server.js
  │    └── package.json
  └── README.md
```

---

## **Contributing**
1. **Fork** the repository.
2. **Create a feature branch**: `git checkout -b feature/new-feature`
3. **Commit changes**: `git commit -m "Add new feature"`
4. **Push to branch**: `git push origin feature/new-feature`
5. **Create a Pull Request** on GitHub.

---

## **License**
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to modify and distribute.

---

### **Contact & Support**
- **Author**: *Sathwik NH*  
- **Email**: *sathwiknh@gmail.com*  
- **LinkedIn**: [*Sathwik NH*](https://www.linkedin.com/in/sathwiknh1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)

> 
Enjoy building and improving your **Sports Coaching Planner with AI Chatbot**!


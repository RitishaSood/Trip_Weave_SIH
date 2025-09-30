# ✈️ TripWeave  
*Smart Travel Planning, Expense Tracking & Data Collection*  

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)  
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)  
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)  
![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)  

---

## 📖 About  
TripWeave is a **smart travel expense tracker and trip management system**.  
It allows users to:  
- Log trips  
- Add destinations  
- Track expenses  
- Capture GPS locations  
- Analyze travel insights  

🔮 An integrated **AI/ML module** predicts the **best transport mode** between two locations using the **GeoLife dataset**.  

---

## 🚀 Features  
- 🔐 **Authentication**: Firebase Auth (Google Sign-in)  
- 📍 **Trip Logging**: Start, manage & end trips with live GPS capture  
- 🗺️ **Destination Management**: Add destinations with transport, food & entry costs  
- 💰 **Expense Tracking**: Automatic aggregation of trip costs  
- 🔄 **Realtime Sync**: Firestore for instant data updates  
- 🤖 **AI/ML Transport Prediction**: Travel mode suggestions using GeoLife dataset  

---

## 🖥️ Dashboard Walkthrough  

### 🏠 **Landing Page**
- Choose between:  
  - **Traveler** → Plan itineraries, book rides, explore food, and navigate safely.  
  - **Official** → Access transportation data, analyze travel patterns, and make policy decisions.  

---

### 🔑 **Authentication (Traveler Login/Signup)**  
- Email, name & password-based authentication.  
- Powered by **Firebase Auth**.  
- Secure user account creation & login.  

---

### 📊 **Traveler Dashboard**  

**1. Welcome Banner**  
- Personalized greeting (e.g., *Welcome back, Ritisha!*)  

**2. Trip Overview**  
- **Total Trips** → Count of planned trips  
- **Upcoming** → Future trips  
- **Companions** → Number of travel companions  
- **With Consent** → Data-sharing & safety consent  

**3. Quick Actions**  
- 📝 **Plan New Trip** → Create detailed itineraries  
- 📂 **View Itineraries** → Manage existing trips  
- 🚖 **Book Rides** → Access transportation options  
- 🍽️ **Discover Food** → Explore cuisines nearby  

**4. Recent Trips**  
- Shows recent adventures with companions & dates  
- Example: *Weekend Getaway to Paris* (London → Paris)  

**5. Sidebar Navigation**  
- **Dashboard** – Overview of trips  
- **Trip Planner** – Create/manage trips  
- **Itinerary** – Daily travel schedules  
- **Rides** – Book/log transport  
- **Food** – Dining options  
- **Safety** – Consent-based safety tracking  
- **Profile** – Manage user details  
- **Trip Logger** – GPS-based trip logging  
- **Sign Out** – Secure logout  

---

## 🛠️ Tech Stack  
- **Frontend** → Next.js (React + TypeScript, TailwindCSS, shadcn/ui)  
- **Backend** → Firebase (Cloud Functions, Auth, Firestore triggers)  
- **Database** → Firebase Firestore (NoSQL, real-time)  
- **AI/ML** → Python (scikit-learn / TensorFlow) + GeoLife dataset  

---

## 📂 Project Structure
```bash
tripweave/
│── src/
│   ├── components/       # Reusable UI components
│   ├── app/              # Next.js pages and routing
│   ├── lib/              # tripService.ts, firebase client
│   ├── integrations/     # firebase2/auth.ts, firebase2/client.ts
│── public/               # Static assets
│── README.md             # Documentation
│── package.json          # Dependencies
```

---

## ⚙️ Setup Instructions  

<details>
<summary>🔧 Expand Setup Guide</summary>  

### 1️⃣ Clone Repository  
```bash
git clone https://github.com/yourusername/tripweave.git
cd tripweave
```

### 2️⃣ Install Dependencies  
```bash
npm install
```

### 3️⃣ Configure Firebase  
- Create project in **Firebase Console**  
- Enable **Authentication (Google)** + **Firestore Database**  
- Copy Firebase config → update `client.ts`  

```ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

### 4️⃣ Run Dev Server  
```bash
npm run dev
```
Visit: [http://localhost:3000](http://localhost:3000)  

</details>  

---

## 🤖 ML Component (Transport Prediction)  
- **Dataset** → GeoLife GPS Trajectories  
- **Preprocessing** → Python (pandas, numpy)  
- **Models** → scikit-learn / TensorFlow  
- **Integration** → Deployed ML service connected with TripWeave  

---

## 📌 Roadmap  
- 📊 Expense summary dashboard with charts  
- 📡 Offline trip logging  
- 🗺️ Maps integration for routes  
- 🧠 More ML-powered travel recommendations  

---

## 📜 License  
MIT License © 2025 TripWeave  

🚀 Setup Instructions
1. Clone the Repository
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
2. Install Dependencies
   npm install
3. Run the Development Server
   npm run dev
4. Deploying
   This app is deployable on platforms like Vercel, Netlify, etc.

⚙️ Assumptions Made During Development
   The app is built using React + Vite for faster development and build times.
   Tailwind CSS is used for styling.
   React Context + useReducer is used for managing timer and theme state.
   The user will input:
    Timer Name
    Duration (in seconds)
    Category (for grouping timers)
    Timers are stored in localStorage, so data persists across browser refreshes.
    Timer progress is tracked using setInterval and updates every second.
    Halfway alerts and completion modals are triggered through simple UI feedback (e.g., alert/modal).
    The app assumes no server/backend involvement — it is completely frontend-based.


   


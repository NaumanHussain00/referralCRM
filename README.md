# Referral CRM for Job Seekers

A web application to track LinkedIn outreach for job referrals. This app helps you organize and manage your job referral requests by tracking target companies, finding relevant LinkedIn profiles, and generating personalized outreach messages.

## Features

- **Add Target Companies**: Track companies you're interested in with role and location
- **Fetch LinkedIn Profiles**: Use Google X-ray search (via SerpAPI) to find relevant employees
- **Profile Classification**: Automatically classifies profiles as Recruiter, HR, Engineer, Hiring Manager, or Other
- **Status Tracking**: Track outreach progress (Not Sent → Sent → Accepted → Messaged → Referred)
- **Message Generation**: Generate personalized referral request messages based on profile type
- **Analytics Dashboard**: Visual progress tracking with status counts and progress bars

## Tech Stack

- **Frontend**: React (Vite) + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)
- **External API**: SerpAPI (Google search results)

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- SerpAPI account (for Google X-ray search)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd referralAutomation
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your values
# - MONGO_URI: Your MongoDB connection string
# - SERPAPI_KEY: Your SerpAPI key (get from https://serpapi.com)
# - PORT: Server port (default: 5000)

# Seed sample data (optional)
npm run seed

# Start development server
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Companies

| Method | Endpoint                            | Description                         |
| ------ | ----------------------------------- | ----------------------------------- |
| GET    | `/api/companies`                    | Get all companies with stats        |
| GET    | `/api/companies/:id`                | Get single company                  |
| POST   | `/api/companies`                    | Create new company                  |
| DELETE | `/api/companies/:id`                | Delete company and profiles         |
| POST   | `/api/companies/:id/fetch-profiles` | Fetch LinkedIn profiles via SerpAPI |

### Profiles

| Method | Endpoint                           | Description                    |
| ------ | ---------------------------------- | ------------------------------ |
| GET    | `/api/profiles/company/:companyId` | Get all profiles for a company |
| GET    | `/api/profiles/:id`                | Get single profile             |
| PATCH  | `/api/profiles/:id/status`         | Update profile status          |
| PATCH  | `/api/profiles/:id/notes`          | Update profile notes           |
| DELETE | `/api/profiles/:id`                | Delete profile                 |

### Messages

| Method | Endpoint                 | Description               |
| ------ | ------------------------ | ------------------------- |
| POST   | `/api/messages/generate` | Generate referral message |

## Project Structure

```
referralAutomation/
├── backend/
│   ├── controllers/
│   │   ├── companyController.js
│   │   ├── profileController.js
│   │   └── messageController.js
│   ├── models/
│   │   ├── Company.js
│   │   └── Profile.js
│   ├── routes/
│   │   ├── companyRoutes.js
│   │   ├── profileRoutes.js
│   │   └── messageRoutes.js
│   ├── services/
│   │   ├── serpApiService.js
│   │   ├── profileClassifier.js
│   │   └── messageGenerator.js
│   ├── scripts/
│   │   └── seed.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js
│   │   ├── components/
│   │   │   ├── AddCompanyModal.jsx
│   │   │   ├── AnalyticsCards.jsx
│   │   │   ├── MessageModal.jsx
│   │   │   ├── ProfileTable.jsx
│   │   │   └── StatusDropdown.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   └── CompanyDetail.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## Status Colors

| Status   | Color      |
| -------- | ---------- |
| Not Sent | Gray       |
| Sent     | Blue       |
| Accepted | Green      |
| Messaged | Purple     |
| Referred | Gold/Amber |

## Important Notes

⚠️ **This app does NOT automate LinkedIn actions**

- No LinkedIn scraping behind login
- Only uses Google X-ray search via SerpAPI
- All LinkedIn actions (connection requests, messages) are done manually by the user
- This app only tracks and generates messages

## Future Enhancements

The codebase is designed to support future features:

- Alumni detection
- CSV export
- Chrome extension for quick profile save
- Daily outreach limits
- Multi-user authentication

## License

MIT

# Referral CRM for Job Seekers

A web application to track LinkedIn outreach for job referrals. This app helps you organize and manage your job referral requests by tracking target companies, finding relevant LinkedIn profiles, and generating personalized outreach messages.

## Features

- **User Authentication**: Secure registration, login, and password management
- **Forgot Password**: Email-based password reset with secure token verification
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

### 5. Email Configuration (for Password Reset)

The application includes forgot password functionality that sends reset emails. To enable this feature:

#### For Development (Using Gmail):

1. Create a Gmail account or use an existing one
2. Enable 2-Factor Authentication in your Google Account
3. Generate an App Password:
   - Go to Google Account Settings → Security
   - Under "Signing in to Google", select "App Passwords"
   - Generate a new app password for "Mail"
4. Add to your `.env` file:
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_16_character_app_password
   EMAIL_FROM_NAME=Referral Automation
   FRONTEND_URL=http://localhost:5173
   ```

#### For Production:

Use a dedicated email service like SendGrid, AWS SES, or Mailgun:

```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=apikey
EMAIL_PASSWORD=your_sendgrid_api_key
EMAIL_FROM_NAME=Referral Automation
FRONTEND_URL=https://your-production-url.com
NODE_ENV=production
```

**Note**: Without email configuration, the forgot password feature will not work, but all other features remain functional.

## API Endpoints

### Authentication

| Method | Endpoint                          | Description                  |
| ------ | --------------------------------- | ---------------------------- |
| POST   | `/api/auth/register`              | Register new user            |
| POST   | `/api/auth/login`                 | Login user                   |
| GET    | `/api/auth/me`                    | Get current user (protected) |
| PUT    | `/api/auth/profile`               | Update profile (protected)   |
| PUT    | `/api/auth/password`              | Change password (protected)  |
| POST   | `/api/auth/forgot-password`       | Request password reset       |
| POST   | `/api/auth/reset-password/:token` | Reset password with token    |
| PUT    | `/api/auth/api-key`               | Update SerpAPI key           |
| DELETE | `/api/auth/api-key`               | Delete SerpAPI key           |

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

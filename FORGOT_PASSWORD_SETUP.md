# Forgot Password Setup Guide

This guide will help you complete the setup for the forgot password functionality that has been added to your Referral CRM application.

## ✅ What Has Been Implemented

### Backend Changes

1. **Email Service** (`backend/services/emailService.js`)
   - Created email service using Nodemailer
   - Supports both Gmail (development) and production email services
   - HTML email templates for password reset

2. **User Model Updates** (`backend/models/User.js`)
   - Added `resetPasswordToken` field
   - Added `resetPasswordExpires` field

3. **Authentication Controller** (`backend/controllers/authController.js`)
   - `forgotPassword()` - Generates reset token and sends email
   - `resetPassword()` - Validates token and updates password

4. **Routes** (`backend/routes/authRoutes.js`)
   - `POST /api/auth/forgot-password` - Public route
   - `POST /api/auth/reset-password/:token` - Public route

5. **Dependencies**
   - Installed `nodemailer` package

### Frontend Changes

1. **New Pages**
   - `ForgotPassword.jsx` - Email input page
   - `ResetPassword.jsx` - New password form with token validation

2. **Updated Components**
   - `Login.jsx` - Added "Forgot password?" link
   - `App.jsx` - Added routes for forgot/reset password pages
   - `api.js` - Added API methods for forgot/reset password

3. **Documentation**
   - Updated `README.md` with setup instructions
   - Updated `.env.example` with email configuration

## 🚀 Next Steps to Complete Setup

### 1. Backend Environment Configuration

Copy the `.env.example` file and update it with your email credentials:

```bash
cd backend
cp .env.example .env
```

Edit the `.env` file and add:

```env
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM_NAME=Referral Automation
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### 2. Gmail App Password Setup (for Development)

If using Gmail:

1. Go to your Google Account settings
2. Navigate to Security → 2-Step Verification
3. Scroll down to "App passwords"
4. Generate a new app password for "Mail"
5. Use this 16-character password in your `.env` file

### 3. Test the Implementation

1. Start the backend server:

   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend:

   ```bash
   cd frontend
   npm run dev
   ```

3. Test the flow:
   - Navigate to http://localhost:5173/login
   - Click "Forgot password?"
   - Enter your email
   - Check your email for the reset link
   - Click the link to reset your password

## 📧 Email Configuration Options

### Development (Gmail)

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_16_char_app_password
```

### Production (SendGrid)

```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=apikey
EMAIL_PASSWORD=your_sendgrid_api_key
NODE_ENV=production
```

### Production (AWS SES)

```env
EMAIL_HOST=email-smtp.us-east-1.amazonaws.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_aws_access_key
EMAIL_PASSWORD=your_aws_secret_key
NODE_ENV=production
```

## 🔐 Security Features

- Reset tokens are hashed using SHA-256
- Tokens expire after 1 hour
- Tokens are single-use (deleted after password reset)
- Generic success messages to prevent email enumeration
- Auto-login after successful password reset

## 📝 API Endpoints

### Forgot Password

```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response:**

```json
{
  "success": true,
  "message": "If an account exists with that email, a password reset link has been sent"
}
```

### Reset Password

```http
POST /api/auth/reset-password/:token
Content-Type: application/json

{
  "password": "newpassword123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Password reset successful",
  "data": {
    "user": { ... },
    "token": "jwt_token"
  }
}
```

## 🎨 Frontend Routes

- `/forgot-password` - Email input page
- `/reset-password/:token` - New password form
- Integrated with existing login flow

## ⚠️ Troubleshooting

### Email Not Sending

1. **Check Gmail settings**: Ensure 2FA is enabled and app password is correct
2. **Check logs**: Look for error messages in the backend console
3. **Verify environment variables**: Ensure all EMAIL\_\* variables are set
4. **Check spam folder**: Reset emails might be filtered

### Token Invalid/Expired

- Tokens expire after 1 hour
- Request a new reset link if expired
- Ensure the token in the URL matches exactly

### Email Service Errors

- **"Invalid login"**: Check email/password credentials
- **"Connection timeout"**: Check network/firewall settings
- **"SMTP error"**: Verify EMAIL_HOST and EMAIL_PORT

## 🔄 Flow Diagram

```
User clicks "Forgot password?"
    ↓
Enters email address
    ↓
Backend generates secure token
    ↓
Token is hashed and saved to database
    ↓
Email sent with reset link
    ↓
User clicks link in email
    ↓
Frontend displays password reset form
    ↓
User enters new password
    ↓
Backend validates token
    ↓
Password updated and token deleted
    ↓
User auto-logged in and redirected to dashboard
```

## 📚 Additional Notes

- The implementation follows security best practices
- Email templates are responsive and professional
- All sensitive operations are logged for auditing
- Frontend includes proper error handling and loading states
- Password strength validation (minimum 6 characters)

## 🎯 Production Checklist

Before deploying to production:

- [ ] Switch to a production email service (SendGrid, AWS SES, etc.)
- [ ] Update `FRONTEND_URL` to your production domain
- [ ] Set `NODE_ENV=production`
- [ ] Test email delivery in production environment
- [ ] Monitor email sending logs
- [ ] Set up email sending limits/quotas
- [ ] Consider implementing rate limiting for forgot password requests

---

**Questions or Issues?** Check the error logs in the backend console or refer to the Nodemailer documentation.

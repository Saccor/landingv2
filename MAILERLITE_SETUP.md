# MailerLite Setup Guide

## Quick Setup

1. **Get your MailerLite API Key:**
   - Go to [MailerLite Dashboard](https://dashboard.mailerlite.com/)
   - Navigate to Integrations → Developer API
   - Copy your API key (v3 format)

2. **Find your Group ID:**
   - In MailerLite dashboard, go to Subscribers → Groups
   - Click on your "Simplelanding" group
   - The Group ID is in the URL: `/groups/{GROUP_ID}/subscribers`

3. **Update your environment variables:**
   ```env
   MAILERLITE_API_KEY=your_api_key_here
   MAILERLITE_GROUP_ID=153205008280585364
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   ```

## Testing

Test the subscription API:
```bash
npm run test:subscription
```

## Features

- ✅ **Clean API v3 Implementation**: Uses the latest MailerLite API
- ✅ **Automatic Group Assignment**: Subscribers are automatically added to your specified group
- ✅ **Error Handling**: Graceful error handling with user-friendly messages
- ✅ **TypeScript Support**: Fully typed for better development experience

## API Implementation

The service uses MailerLite API v3:
- **Endpoint**: `https://connect.mailerlite.com/api`
- **Authentication**: `Authorization: Bearer {API_KEY}`
- **Features**: Direct group assignment, better error handling

## Troubleshooting

### Common Issues

**"Service temporarily unavailable"**
- Check that `MAILERLITE_API_KEY` is set in your `.env.local`
- Verify your API key is valid

**"Invalid request"**
- Email format is invalid
- Check the email validation regex

**"Service configuration error"**
- API key doesn't have proper permissions
- API key might be expired

## Current Group

Your "Simplelanding" group:
- **Group ID**: `153205008280585364`
- **Subscribers**: Auto-assigned when users sign up
- **Created**: 2025-05-01

## Integration Status

✅ **MailerLite**: Clean v3 API implementation  
✅ **Google Analytics**: Properly configured  
✅ **Google Tag Manager**: Event tracking enabled  
✅ **Form Validation**: Email format validation  
✅ **Error Handling**: User-friendly error messages 
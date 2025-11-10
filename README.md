# 🚀 Arfve Landing Page

*A professional Next.js 15 landing page with real-time subscriber tracking and interactive video experience*

![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss) ![MailerLite](https://img.shields.io/badge/MailerLite-API%20v3-green)

## 📋 Overview

Professional landing page for **Arfve** featuring real-time subscriber tracking, modular video experience, and advanced analytics integration. Built with modern web technologies and optimized for performance across all devices.

---

## ✨ Key Features

### 🎯 **Core Functionality**
- **Real-Time Subscriber Counter** - Live MailerLite integration with webhook updates
- **Modular Video Section** - Custom video player with fullscreen support and professional controls
- **Email Subscription System** - Professional signup flow with validation and auto-confirmation
- **Pixel-Art Countdown Timer** - Hydration-safe countdown with custom styling

### 🔧 **Professional Integrations**
- **MailerLite API v3** - Email marketing, subscriber management, and webhook events
- **Google Tag Manager** - Advanced conversion tracking and analytics
- **GDPR Compliance** - Complete cookie consent system and privacy policy

### 🎨 **User Experience**
- **Mobile-First Design** - Fully responsive across all devices and screen sizes
- **Professional Animations** - Framer Motion with reveal sections and micro-interactions
- **Accessibility Compliant** - WCAG guidelines with proper ARIA labels and keyboard navigation
- **Performance Optimized** - Next.js 15 with Turbopack for lightning-fast development

---

## 🛠 Tech Stack

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Framework** | Next.js | 15.3.2 | React framework with App Router |
| **Language** | TypeScript | 5.x | Type-safe development |
| **Styling** | Tailwind CSS | 3.4.1 | Utility-first CSS framework |
| **Email** | MailerLite | API v3 | Email marketing automation |
| **Analytics** | Google Tag Manager | - | Advanced tracking and conversions |
| **Animations** | Framer Motion | 12.18.1 | Smooth animations and transitions |
| **Icons** | Lucide React | 0.511.0 | Beautiful icon library |

---

## 📁 Project Architecture

```
src/
├── app/                                    # Next.js 15 App Router
│   ├── api/                               # API Routes
│   │   ├── debug/mailerlite/             # Development debugging tools  
│   │   ├── live-count/                   # Real-time subscriber count
│   │   ├── refresh-count/                # Manual count refresh
│   │   ├── subscribe/                    # Email subscription endpoint
│   │   ├── subscriber-count/             # MailerLite subscriber count
│   │   └── webhooks/mailerlite/          # MailerLite webhook handler

│   ├── privacy-policy/page.tsx           # GDPR privacy policy
│   ├── cookie-settings/page.tsx          # Cookie preferences management
│   ├── layout.tsx                       # Root layout with GTM integration
│   ├── page.tsx                         # Main landing page
│   └── globals.css                      # Global styles and theme 
│
├── components/
│   ├── sections/                        # Landing Page Sections
│   │   ├── HeroSection.tsx              # Hero with live subscriber counter
│   │   ├── VisionSection.tsx            # Main video section component
│   │   ├── VisionSection/               # Modular video player architecture
│   │   │   ├── types.ts                 # TypeScript interfaces
│   │   │   ├── constants.ts             # Video configuration
│   │   │   ├── hooks/
│   │   │   │   └── useVideoPlayer.ts    # Custom video player logic
│   │   │   └── components/
│   │   │       ├── VideoPlayer.tsx      # Video element component
│   │   │       ├── VideoControls.tsx    # Interactive controls overlay
│   │   │       └── index.ts             # Component exports
│   │   ├── FeatureSection.tsx           # Product features showcase
│   │   ├── AppSection.tsx               # App preview section
│   │   ├── TestimonialSection.tsx       # Customer testimonials
│   │   ├── SocialMediaSection.tsx       # Social media integration
│   │   └── BottomSubscribe.tsx          # Final CTA subscription
│   │
│   ├── ui/                              # Shared UI Components
│   │   ├── Button.tsx                   # Professional button component
│   │   ├── GoogleTagManager.tsx         # GTM integration component
│   │   ├── ResponsiveWrapper.tsx        # Responsive layout wrapper
│   │   ├── RevealSection.tsx            # Animation reveal component
│   │   └── SignupForm.tsx               # Email subscription form
│   │
│   ├── common/                          # Specialized Components  
│   │   └── CountdownTimerPixel.tsx      # Pixel-art countdown timer
│   │
│   ├── icons/                           # Custom Icon Components
│   │   ├── FacebookIcon.tsx             # Social media icons
│   │   ├── InstagramIcon.tsx            
│   │   ├── LinkedInIcon.tsx             
│   │   ├── TikTokIcon.tsx               
│   │   ├── YouTubeIcon.tsx              
│   │   └── featuresIcons/               # Feature section icons
│   │       ├── Battery.tsx              
│   │       ├── Circle.tsx               
│   │       ├── gamepad.tsx              
│   │       ├── Leaf.tsx                 
│   │       ├── soundwave.tsx            
│   │       └── waves.tsx                
│   │
│   ├── Header.tsx                       # Site navigation header
│   ├── Footer.tsx                       # Site footer
│   └── CookieConsent.tsx                # GDPR cookie consent banner
│
├── hooks/                               # Custom React Hooks
│   └── useSubscriberCount.ts            # Live subscriber count hook
│
├── lib/                                 # Core Utilities & Config
│   ├── analytics.ts                     # Google Analytics & Tag Manager tracking
│   ├── animations.ts                    # Framer Motion configurations
│   ├── consent.ts                       # GDPR consent management
│   ├── liveCountManager.ts              # Real-time count management
│   └── utils.ts                         # Utility functions
│
└── services/                            # External Service Integrations
    └── mailerlite.ts                    # MailerLite API integration
```

**📊 Total Lines of Code**: ~5,300+ lines | **Architecture**: Modular & Scalable

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MailerLite account with API key
- Google Analytics/GTM setup (optional)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd landingv2

# Install dependencies  
npm install

# Copy environment template (see .env.example for all variables)
cp .env.example .env.local

# Start development server (runs on port 3001)
npm run dev
```

Visit `http://localhost:3001` to see your landing page.

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your actual credentials. See `.env.example` for all available variables and their descriptions.

**Required Variables:**
```env
# MailerLite Integration (Required)
MAILERLITE_API_KEY=ml1_your_api_key_here
MAILERLITE_GROUP_ID=153205008280585364
```

**Optional Variables:**
```env
# Analytics (Optional - for tracking)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

> **Note:** See `.env.example` for complete documentation of all environment variables.

---

## 🏗️ **Architecture & Design**

### **🎬 Modular Video Experience**
Advanced video player with professional architecture:

- **Component-Based Design**: Modular architecture with focused responsibilities
- **Custom Hooks**: Dedicated `useVideoPlayer.ts` hook for complex video logic
- **TypeScript Integration**: Comprehensive interfaces and type safety
- **Performance Optimized**: React optimization patterns (useCallback, useMemo)
- **Cross-Browser Support**: Fullscreen API compatibility across all browsers
- **Mobile Responsive**: Touch-optimized controls and responsive design

### **🔗 Real-Time Integration**
Professional webhook and API architecture:

- **Secure Webhooks**: Request validation and timeout protection
- **Type-Safe APIs**: Complete TypeScript interfaces for all endpoints
- **Structured Logging**: Professional debugging and monitoring capabilities
- **Error Handling**: Graceful error recovery and user feedback

### **🎯 Development Standards**

- **🔒 Type Safety**: Comprehensive TypeScript coverage with strict mode
- **⚡ Performance**: Optimized React patterns and efficient re-rendering
- **🏗️ Modular Design**: Single responsibility principle throughout
- **📚 Documentation**: JSDoc comments for all public functions
- **🛡️ Error Boundaries**: Professional error handling and user feedback
- **✨ Code Quality**: Consistent formatting and maintainable architecture

---

## 🔧 Key Features & Components

### 📊 **Real-Time Subscriber Counter**
Live subscriber count with webhook updates:
```typescript
// Updates automatically via MailerLite webhooks
const { count, loading, error } = useSubscriberCount();
// Displays: "24 of 1000 spots already gone"
```

### 🎬 **Modular Video Player**
Custom video player with professional architecture:
```typescript
// Custom hook handles all video logic
const videoState = useVideoPlayer(videoConfig);

// Modular components for easy maintenance
<VideoPlayer {...videoState.playerProps} />
<VideoControls {...videoState.controlsProps} />
```

**Features**:
- Thumbnail preview at specific timestamp (1:03)
- Custom progress bar with click-to-seek
- Cross-browser fullscreen support
- Professional loading and error states
- Mobile-optimized touch controls

### 📧 **Professional Email Integration**
MailerLite API v3 with webhook support:
- **Auto-Confirmation**: Immediate double opt-in emails
- **Real-Time Updates**: Webhook-driven subscriber count updates
- **Error Handling**: Professional validation and user feedback
- **Analytics**: Subscription conversion tracking

---

## 🚢 Deployment

### Build & Production
```bash
# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

### Deployment Platforms

#### Vercel (Recommended)
1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.example`
4. Deploy automatically on every push to main branch

#### Netlify
1. Connect your repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables in Netlify dashboard (Site Settings → Environment Variables)

#### Other Platforms
- **Railway**: Supports Next.js out of the box
- **Render**: Add build command and environment variables
- **AWS Amplify**: Configure build settings for Next.js
- **Docker**: Use `node:18-alpine` base image

### Pre-Deployment Checklist

1. **Environment Variables**: Set all required variables in your deployment platform
   - `MAILERLITE_API_KEY` (Required)
   - `MAILERLITE_GROUP_ID` (Required)
   - `NEXT_PUBLIC_GA_ID` (Optional)
   - `NEXT_PUBLIC_GTM_ID` (Optional)

2. **MailerLite Configuration**:
   - Create API key in MailerLite dashboard
   - Configure webhook endpoint: `https://yourdomain.com/api/webhooks/mailerlite`
   - Set webhook events: `subscriber.created`, `subscriber.updated`

3. **Analytics Setup** (Optional):
   - Create Google Analytics property
   - Create Google Tag Manager container
   - Add GTM and GA IDs to environment variables

4. **Domain Configuration**:
   - Point your domain to deployment platform
   - Configure SSL/HTTPS (usually automatic)
   - Update CORS settings if needed

5. **Testing**:
   - Test subscription form in production
   - Verify webhook delivery
   - Check analytics tracking
   - Test on mobile devices

---

## 🔧 Troubleshooting

### Common Issues

#### **"Service temporarily unavailable" Error**
- **Cause**: MailerLite API key not configured or invalid
- **Solution**: 
  1. Check that `MAILERLITE_API_KEY` is set in `.env.local`
  2. Verify API key format starts with `ml1_`
  3. Ensure API key has proper permissions in MailerLite dashboard
  4. Check MailerLite account status

#### **Subscription Form Not Working**
- **Cause**: Missing or incorrect environment variables
- **Solution**:
  1. Verify `MAILERLITE_API_KEY` and `MAILERLITE_GROUP_ID` are set
  2. Check browser console for errors
  3. Verify API endpoint is accessible: `/api/subscribe`
  4. Test with `npm run test:subscription` (if script exists)

#### **Webhook Not Receiving Updates**
- **Cause**: Webhook URL not configured or incorrect
- **Solution**:
  1. Check webhook URL in MailerLite: `https://yourdomain.com/api/webhooks/mailerlite`
  2. Verify webhook is enabled and subscribed to correct events
  3. Check server logs for incoming webhook requests
  4. Test webhook manually using MailerLite's test feature

#### **Analytics Not Tracking**
- **Cause**: Missing analytics environment variables
- **Solution**:
  1. Verify `NEXT_PUBLIC_GA_ID` and/or `NEXT_PUBLIC_GTM_ID` are set
  2. Check browser console for GTM/GA errors
  3. Verify consent settings allow analytics tracking
  4. Use browser extensions (GTM Debugger, GA Debugger) to test

#### **Build Errors**
- **Cause**: TypeScript errors or missing dependencies
- **Solution**:
  1. Run `npm install` to ensure all dependencies are installed
  2. Check TypeScript errors: `npm run lint`
  3. Clear `.next` folder and rebuild: `rm -rf .next && npm run build`
  4. Verify Node.js version (requires 18+)

#### **Port Already in Use**
- **Cause**: Another process using port 3000/3001
- **Solution**:
  1. Kill process on port: `npx kill-port 3000` (or 3001)
  2. Use different port: `PORT=3002 npm run dev`
  3. Check what's using the port: `lsof -i :3000` (Mac/Linux) or `netstat -ano | findstr :3000` (Windows)

#### **Environment Variables Not Loading**
- **Cause**: File not named correctly or in wrong location
- **Solution**:
  1. Ensure file is named `.env.local` (not `.env.local.txt`)
  2. File must be in project root (same level as `package.json`)
  3. Restart development server after changing variables
  4. Check for typos in variable names

#### **Module Not Found Errors**
- **Cause**: Missing dependencies or incorrect imports
- **Solution**:
  1. Run `npm install` to install all dependencies
  2. Check import paths use `@/` alias correctly
  3. Verify file paths are correct (case-sensitive on Linux/Mac)
  4. Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Getting Help

1. **Check Logs**: Review browser console and server logs for error messages
2. **Verify Configuration**: Double-check all environment variables are set correctly
3. **Test Locally**: Ensure everything works in development before deploying
4. **Documentation**: Review `MAILERLITE_SETUP.md` for MailerLite-specific issues

### Debug Mode

Enable verbose logging by checking:
- Browser console for client-side errors
- Terminal/server logs for API errors
- Network tab in browser DevTools for API requests/responses

---

## 🤝 Contributing

This codebase follows professional standards established during the cleanup process:

1. **TypeScript First**: All new code must include proper type definitions
2. **Component Architecture**: Follow the VisionSection modular pattern for complex components  
3. **Single Responsibility**: Functions should do one thing well (max ~50 lines)
4. **Performance**: Use React optimization patterns (useCallback, useMemo)
5. **Documentation**: Include JSDoc comments for public functions
6. **Testing**: Test new features locally before committing

### Development Workflow
```bash
# Start development server
npm run dev

# Runs on http://localhost:3001 (port 3000 auto-redirects)
# Hot reload enabled with Turbopack
```

---

## 📄 License

This project is private and proprietary to Arfve.

---

## 🏆 **Technical Highlights**

- **📈 Performance Optimized**: Modern React patterns with efficient rendering
- **🔧 Modular Architecture**: Scalable component structure for enterprise development
- **✅ Type Safe**: Comprehensive TypeScript coverage throughout codebase
- **🌐 Production Ready**: Professional error handling, logging, and monitoring
- **📱 Mobile First**: Fully responsive design across all devices
- **🔒 Secure**: GDPR compliant with professional security practices

**Enterprise-ready landing page solution** 🚀

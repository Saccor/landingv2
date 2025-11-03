# 🚀 Arfve Landing Page

*A professional Next.js 15 landing page with real-time subscriber tracking, interactive video experience, and comprehensive survey system*

![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss) ![MailerLite](https://img.shields.io/badge/MailerLite-API%20v3-green) ![Supabase](https://img.shields.io/badge/Supabase-2.50.0-3ECF8E?logo=supabase)

## 📋 Overview

Professional landing page for **Arfve** featuring real-time subscriber tracking, modular video experience, comprehensive survey system, and advanced analytics integration. Built with modern web technologies and optimized for performance across all devices.

---

## ✨ Key Features

### 🎯 **Core Functionality**
- **Real-Time Subscriber Counter** - Live MailerLite integration with webhook updates
- **Modular Video Section** - Custom video player with fullscreen support and professional controls
- **Email Subscription System** - Professional signup flow with validation and auto-confirmation
- **Complete Survey System** - Multi-type questionnaire with Supabase storage and analytics
- **Pixel-Art Countdown Timer** - Hydration-safe countdown with custom styling

### 🔧 **Professional Integrations**
- **MailerLite API v3** - Email marketing, subscriber management, and webhook events
- **Supabase** - PostgreSQL database for survey responses and real-time analytics  
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
| **Database** | Supabase | 2.50.0 | PostgreSQL with real-time features |
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
│   │   ├── export-survey/                # Survey data export endpoint
│   │   ├── live-count/                   # Real-time subscriber count
│   │   ├── questions/                    # Survey questions API
│   │   ├── refresh-count/                # Manual count refresh
│   │   ├── submit-survey/                # Survey submission handler
│   │   ├── subscribe/                    # Email subscription endpoint
│   │   ├── subscriber-count/             # MailerLite subscriber count
│   │   └── webhooks/mailerlite/          # MailerLite webhook handler

│   ├── survey/page.tsx                   # Complete survey experience
│   ├── privacy-policy/page.tsx           # GDPR privacy policy
│   ├── cookie-settings/page.tsx          # Cookie preferences management
│   ├── layout.tsx                       # Root layout with GTM integration
│   ├── page.tsx                         # Main landing page
│   └── globals.css                      # Global styles and theme 
│
├── components/
│   ├── sections/                        # Landing Page Sections
│   │   ├── NewHeroSection.tsx           # Video hero with overlay pills
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
│   ├── Survey/                          # Survey System (15 files)
│   │   ├── SurveyIntroSection.tsx       # Survey introduction and entry
│   │   ├── components/                  # Survey UI components
│   │   │   ├── Breadcrumb.tsx           # Progress navigation
│   │   │   ├── ErrorDisplay.tsx         # Error state handling
│   │   │   ├── IntroScreen.tsx          # Welcome screen
│   │   │   ├── LoadingOverlay.tsx       # Loading states
│   │   │   ├── ProgressBar.tsx          # Visual progress indicator
│   │   │   ├── QuestionRenderer.tsx     # Question type router
│   │   │   ├── QuestionsScreen.tsx      # Main questions container
│   │   │   ├── SuccessScreen.tsx        # Completion confirmation
│   │   │   └── index.ts                 # Component exports
│   │   ├── Questions/                   # Question Type Components
│   │   │   ├── LikertScaleScreen.tsx    # 1-5 rating scale questions
│   │   │   ├── MultipleChoiceScreen.tsx # Multiple selection questions
│   │   │   ├── OpenEndedScreen.tsx      # Text input questions
│   │   │   └── SingleChoiceScreen.tsx   # Single selection questions
│   │   ├── hooks/
│   │   │   └── useSurveyState.ts        # Survey state management
│   │   ├── services/
│   │   │   └── surveyApi.ts             # Survey API integration
│   │   ├── constants.ts                 # Survey configuration
│   │   └── types.ts                     # Survey TypeScript types
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
│   ├── analytics.ts                     # GA4 event tracking
│   ├── animations.ts                    # Framer Motion configurations
│   ├── consent.ts                       # GDPR consent management
│   ├── gtm.ts                           # Google Tag Manager setup
│   ├── liveCountManager.ts              # Real-time count management
│   ├── supabaseClient.ts                # Database client configuration
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
- Supabase project
- Google Analytics/GTM setup (optional)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd landingv2

# Install dependencies  
npm install

# Copy environment template
cp .env.example .env.local

# Start development server (runs on port 3001)
npm run dev
```

Visit `http://localhost:3001` to see your landing page.

### Environment Variables

```env
# MailerLite Integration (Required)
MAILERLITE_API_KEY=ml1_your_api_key_here
MAILERLITE_GROUP_ID=153205008280585364

# Supabase Database (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE=your_service_role_key

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

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

### 📝 **Complete Survey System**
Multi-question survey with Supabase integration:
- **Question Types**: Single choice, multiple choice, Likert scale, open-ended
- **Progress Tracking**: Visual breadcrumb and progress bar
- **Data Storage**: Supabase with real-time updates
- **Analytics**: Question completion rates and response analysis

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

### Environment Setup
1. **MailerLite**: Create API key and configure webhook endpoints
2. **Supabase**: Set up database tables for survey responses
3. **Analytics**: Configure Google Analytics and GTM containers
4. **DNS**: Point domain to deployment platform

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

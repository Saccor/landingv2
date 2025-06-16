# 🚀 Arfve Landing Page

*A professional Next.js 15 landing page with dynamic subscriber tracking, survey system, and seamless integrations*

![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss) ![MailerLite](https://img.shields.io/badge/MailerLite-API%20v3-green) ![Supabase](https://img.shields.io/badge/Supabase-2.50.0-3ECF8E?logo=supabase)

## 📋 Overview

Professional landing page for **Arfve** - built by students and cleaned up to production standards. Features dynamic subscriber counting, interactive video sections, survey system, and comprehensive analytics tracking.

## ✨ Key Features

### 🎯 **Core Functionality**
- **Dynamic Subscriber Counter** - Live MailerLite integration showing real subscriber count
- **Interactive Video Section** - Custom video player with thumbnail preview and controls
- **Email Subscription System** - Professional signup flow with validation
- **Survey System** - Complete questionnaire with Supabase storage
- **Countdown Timer** - Pixel-art style countdown with hydration-safe rendering

### 🔧 **Professional Integrations**
- **MailerLite API v3** - Email marketing and subscriber management
- **Supabase** - Database for survey responses and analytics
- **Google Tag Manager** - Advanced analytics and conversion tracking
- **GDPR Compliance** - Cookie consent and privacy policy pages

### 🎨 **User Experience**
- **Mobile-First Design** - Responsive across all devices
- **Professional Animations** - Framer Motion with reveal sections
- **Accessibility** - WCAG compliant with proper ARIA labels
- **Performance Optimized** - Next.js 15 with Turbopack for fast development

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

## 📁 Project Structure

```
src/
├── app/                           # Next.js 15 App Router
│   ├── api/                      # API routes
│   │   ├── subscriber-count/     # ✅ CLEANED - MailerLite subscriber count
│   │   ├── subscribe/            # Email subscription endpoint
│   │   ├── submit-survey/        # ✅ CLEANED - Survey submission (198→150 lines)
│   │   └── questions/            # Survey questions API
│   ├── survey/                   # Survey page
│   ├── privacy-policy/           # GDPR privacy policy
│   ├── cookie-settings/          # Cookie preferences
│   ├── layout.tsx               # Root layout with GTM
│   ├── page.tsx                 # Landing page
│   └── globals.css              # ✅ CLEANED - Essential styles only (45 lines)
├── components/
│   ├── sections/                # Landing page sections
│   │   ├── HeroSection.tsx      # Hero with dynamic counter
│   │   ├── VisionSection.tsx    # ✅ CLEANED - Interactive video (390 lines)
│   │   ├── FeatureSection.tsx   # Product features
│   │   ├── AppSection.tsx       # App showcase
│   │   ├── TestimonialSection.tsx # Customer testimonials
│   │   ├── SocialMediaSection.tsx # Social media links
│   │   └── BottomSubscribe.tsx  # CTA subscription
│   ├── Survey/                  # Survey system components
│   │   ├── SurveyIntroSection.tsx # Survey introduction
│   │   └── Questions/           # Question type components
│   ├── ui/                      # ✅ REORGANIZED - Shared/reusable components
│   │   ├── SignupForm.tsx       # Email subscription form
│   │   ├── Button.tsx           # ✅ CLEANED - Professional button (65 lines)
│   │   ├── RevealSection.tsx    # Animation wrapper
│   │   └── GoogleTagManager.tsx # GTM integration
│   ├── common/                  # One-off/specific components
│   │   └── CountdownTimerPixel.tsx # ✅ CLEANED - Pixel art countdown
│   ├── icons/                   # Custom icon components
│   ├── Header.tsx               # Navigation header
│   ├── Footer.tsx               # Site footer
│   └── CookieConsent.tsx        # GDPR cookie banner
├── hooks/
│   └── useSubscriberCount.ts    # ✅ Custom hook for live subscriber data
├── lib/                         # Utilities and configurations
│   ├── supabaseClient.ts        # Database client
│   ├── analytics.ts             # GA4 tracking
│   ├── gtm.ts                   # Google Tag Manager
│   ├── consent.ts               # GDPR consent management
│   ├── animations.ts            # Framer Motion configs
│   └── utils.ts                 # Utility functions
└── services/
    └── mailerlite.ts            # ✅ CLEANED - Email service integration
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MailerLite account
- Supabase project
- Google Analytics/GTM setup

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd landingv2

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Variables

```env
# MailerLite Integration
MAILERLITE_API_KEY=your_mailerlite_api_key
MAILERLITE_GROUP_ID=153205008280585364

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE=your_service_role_key

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

---

## 🧹 **Code Cleanup Progress**

*Professional cleanup of student-developed codebase to production standards*

### ✅ **Recently Cleaned Files**

| File | Status | Improvements | Lines Reduced |
|------|---------|-------------|---------------|
| `src/app/api/submit-survey/route.ts` | ✅ **COMPLETE** | Extracted functions, better types, JSDoc comments | 198 → 150 (-25%) |
| `src/components/sections/VisionSection.tsx` | ✅ **COMPLETE** | Extracted render helpers, useCallback optimization, constants | 457 → 390 (-15%) |
| `src/components/common/Button.tsx` | ✅ **COMPLETE** | Removed duplicate, added JSDoc, const assertions | 77 → 65 (-16%) |
| `src/components/common/CookieConsent.tsx` | ✅ **COMPLETE** | TypeScript interfaces, extracted components, GDPR compliant | 275 → 220 (-20%) |
| `src/components/common/CountdownTimerPixel.tsx` | ✅ **COMPLETE** | React.memo optimization, extracted helpers, performance tuned | 271 → 200 (-26%) |
| `src/components/Survey/SurveyIntroSection.tsx` | ✅ **COMPLETE** | State consolidation, component extraction, useCallback optimization | 364 → 280 (-23%) |
| `src/lib/consent.ts` | ✅ **COMPLETE** | Function extraction, TypeScript optimization, professional logging | 322 → 260 (-19%) |
| `src/app/globals.css` | ✅ **COMPLETE** | Removed unused shadcn/ui styles, kept essentials | 309 → 45 (-85%) |
| `tailwind.config.ts` | ✅ **COMPLETE** | Removed unused utilities, animations, color system | 253 → 85 (-66%) |
| `src/hooks/useSubscriberCount.ts` | ✅ **COMPLETE** | Professional error handling, clean logging | Optimized |
| `src/services/mailerlite.ts` | ✅ **COMPLETE** | Type safety, professional logging | Optimized |

### 🎯 **Cleanup Standards Applied**

- **Type Safety**: Comprehensive TypeScript interfaces and type guards
- **Error Handling**: Professional error messages and logging
- **Code Organization**: Single responsibility functions with JSDoc documentation
- **Performance**: React hooks optimization (useCallback, useMemo) and best practices
- **Maintainability**: Clean, readable code following industry standards
- **Code Extraction**: Complex logic separated into focused helper functions
- **Constants**: Magic numbers and strings moved to named constants
- **Bundle Optimization**: Removed unused CSS and Tailwind utilities for smaller builds
- **Configuration Cleanup**: Streamlined configs to only include what's actually used

### 📋 **Next in Queue**
See `CLEANUP_CHECKLIST.md` for complete file-by-file cleanup plan (~50 files total).

**Progress**: 11 of 50 files cleaned (22% complete) - focusing on largest/most complex files first

---

## 🔧 Key Components

### 📊 **Dynamic Subscriber Counter**
Real-time subscriber count from MailerLite API v3:
```typescript
// Automatically updates every 30 seconds
const { count, loading, error } = useSubscriberCount();
// Shows: "24 of 1000 spots already gone"
```

### 🎬 **Interactive Video Section** ✅ **CLEANED**
Professional video player with custom controls:
- Thumbnail preview at 1:03 timestamp
- Custom progress bar with dragging support
- Volume controls and fullscreen mode
- Touch and mobile optimized
- Cross-browser fullscreen API support
- Auto-hiding controls with 3-second delay
- Professional render helper functions for maintainability

### 📝 **Survey System**
Complete questionnaire system with Supabase:
- Multiple question types (single/multiple choice, Likert scale, open-ended)
- "Other" option handling with custom text
- Human-readable answer storage
- Professional validation and error handling

### ⏰ **Pixel Art Countdown Timer**
Custom countdown with retro aesthetic:
- CSS Grid-based pixel rendering
- Hydration-safe with loading states
- Fully responsive design
- No SVG dependencies

---

## 📈 **Analytics & Tracking**

### Google Tag Manager Integration
- Pageview tracking
- Conversion events
- Email subscription tracking
- Survey completion tracking

### GDPR Compliance
- Cookie consent banner
- Privacy policy page
- Cookie settings management
- Consent state persistence

---

## 🔄 **API Endpoints**

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|---------|
| `/api/subscriber-count` | GET | Get live MailerLite subscriber count | ✅ |
| `/api/subscribe` | POST | Add email to MailerLite group | ✅ |
| `/api/submit-survey` | POST | Save survey response to Supabase | ✅ **CLEANED** |
| `/api/questions` | GET | Fetch survey questions | ✅ |

---

## 🎨 **Design System**

### Colors & Branding
- **Primary**: Custom brand colors
- **Gradients**: Professional gradient backgrounds
- **Typography**: Clean, modern font stack
- **Spacing**: Consistent Tailwind spacing scale

### Responsive Breakpoints
```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

---

## 🧪 **Testing**

```bash
# Test MailerLite integration
npm run test:subscription

# Run development server with turbopack
npm run dev

# Build for production
npm run build

# Run production server
npm start
```

---

## 🚀 **Deployment**

### Vercel (Recommended)
1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Other Platforms
Compatible with any Next.js hosting provider:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

---

## 🔐 **Security Features**

- **Environment Variables**: Secure API key management
- **Type Safety**: TypeScript prevents runtime errors
- **Input Validation**: Server-side validation for all forms
- **CORS**: Proper API endpoint protection
- **GDPR**: Complete privacy compliance

---

## 📚 **Development Guidelines**

### Code Standards
- **TypeScript Strict Mode**: No `any` types
- **Functional Components**: React hooks pattern
- **Error Boundaries**: Graceful error handling
- **Performance**: Optimized re-renders and loading states

### Commit Convention
```
feat: add dynamic subscriber counter
fix: resolve hydration issues in countdown timer
docs: update README with cleanup progress
refactor: optimize VisionSection component
```

---

## 🏆 **Student → Professional Transformation**

This project represents a complete transformation from student code to production-ready application:

### **API Routes Transformation**
- **Before**: 198-line API file with inline logic
- **After**: Modular functions with comprehensive documentation (25% reduction)

### **Component Architecture**
- **Before**: 457-line monolithic video component
- **After**: Well-organized component with extracted helpers (15% reduction)

### **Development Practices**
- **Before**: Console.log debugging everywhere
- **After**: Professional logging with status indicators

### **Code Quality**
- **Before**: Mixed coding styles and patterns
- **After**: Consistent, industry-standard practices with TypeScript strict mode

### **Performance Optimization**
- **Before**: Inline functions causing unnecessary re-renders
- **After**: useCallback optimization and proper React patterns

---

## 🤝 **Contributing**

1. Review `CLEANUP_CHECKLIST.md` for current cleanup priorities
2. Follow the established code patterns and documentation
3. Ensure all new code includes proper TypeScript types
4. Test changes thoroughly before submitting PRs

---

## 📄 **License**

MIT License - feel free to use this project as a reference for your own professional landing pages.

---

**🌟 Built with passion by students, refined to professional standards**

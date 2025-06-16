# 🧹 ARFVE Landing Page - Code Cleanup Checklist

*Professional cleanup checklist for student-developed codebase*

## 📋 Overview
This checklist helps systematically clean up the codebase file by file, removing duplicate code, unused imports, console logs, and optimizing for production.

---

## 🎯 **HIGH PRIORITY - Core Application Files**

### **📱 Main Pages & Layout**
- [ ] `src/app/layout.tsx` (64 lines) - Root layout component
- [ ] `src/app/page.tsx` (22 lines) - Home page
- [ V] `src/app/globals.css` (309 lines) - Global styles cleanup

### **🔗 API Routes** 
- [ V] `src/app/api/subscriber-count/route.ts` (29 lines) - MailerLite integration
- [ ] `src/app/api/subscribe/route.ts` (61 lines) - Email subscription
- [ V] `src/app/api/submit-survey/route.ts` (198 lines) - Survey submission ⚠️ *LARGEST API FILE*
- [ ] `src/app/api/questions/route.ts` (31 lines) - Survey questions

### **🏠 Landing Page Sections**
- [ ] `src/components/sections/HeroSection.tsx` (67 lines) - Main hero
- [V ] `src/components/sections/VisionSection.tsx` (457 lines) - Video section ⚠️ *LARGEST COMPONENT*
- [ ] `src/components/sections/FeatureSection.tsx` (100 lines) - Features
- [ ] `src/components/sections/AppSection.tsx` (73 lines) - App showcase
- [ ] `src/components/sections/TestimonialSection.tsx` (116 lines) - Testimonials
- [ ] `src/components/sections/SocialMediaSection.tsx` (87 lines) - Social links
- [ ] `src/components/sections/BottomSubscribe.tsx` (63 lines) - Bottom CTA

---

## 🔧 **MEDIUM PRIORITY - Core Components**

### **🧩 Shared Components**
- [ ] `src/components/Header.tsx` (184 lines) - Navigation header
- [ ] `src/components/Footer.tsx` (132 lines) - Footer component
- [ V] `src/components/CookieConsent.tsx` (275 lines) - GDPR compliance ⚠️ *LARGE FILE*

### **📝 Form Components**
- [ ] `src/components/common/SignupForm.tsx` (113 lines) - Email signup
- [ V] `src/components/common/Button.tsx` (77 lines) - Shared button

### **⏰ Interactive Components**
- [ ] `src/components/common/CountdownTimerPixel.tsx` (271 lines) - Countdown timer ⚠️ *COMPLEX*
- [ ] `src/components/common/RevealSection.tsx` (16 lines) - Animation wrapper

---

## 📊 **MEDIUM PRIORITY - Survey System**

### **📋 Survey Pages**
- [ ] `src/app/survey/page.tsx` (8 lines) - Survey landing
- [V ] `src/components/Survey/SurveyIntroSection.tsx` (364 lines) - Survey intro ⚠️ *LARGE FILE*

### **❓ Question Components**
- [ ] `src/components/Survey/Questions/SingleChoiceScreen.tsx` (122 lines)
- [ ] `src/components/Survey/Questions/MultipleChoiceScreen.tsx` (147 lines)
- [ ] `src/components/Survey/Questions/LikertScaleScreen.tsx` (107 lines)
- [ ] `src/components/Survey/Questions/OpenEndedScreen.tsx` (159 lines)

---

## ⚙️ **LOW PRIORITY - Utilities & Services**

### **🔧 Services & Utilities**
- [ ] `src/services/mailerlite.ts` (178 lines) - Email service
- [ ] `src/hooks/useSubscriberCount.ts` (55 lines) - Custom hook
- [ ] `src/lib/supabaseClient.ts` (9 lines) - Database client
- [ ] `src/lib/utils.ts` (7 lines) - Utility functions
- [ ] `src/lib/animations.ts` (9 lines) - Animation configs

### **📈 Analytics & Tracking**
- [ ] `src/components/common/GoogleTagManager.tsx` (60 lines) - GTM integration
- [ ] `src/lib/analytics.ts` (71 lines) - Analytics utilities
- [ ] `src/lib/gtm.ts` (28 lines) - GTM helper
- [ ] `src/lib/consent.ts` (322 lines) - GDPR consent logic ⚠️ *LARGE FILE*

### **📄 Legal Pages**
- [ ] `src/app/privacy-policy/page.tsx` (212 lines) - Privacy policy
- [ ] `src/app/cookie-settings/page.tsx` (292 lines) - Cookie settings ⚠️ *LARGE FILE*

---

## 🎨 **LOW PRIORITY - Icons & Assets**

### **🎯 Social Media Icons**
- [ ] `src/components/icons/YouTubeIcon.tsx` (9 lines)
- [ ] `src/components/icons/FacebookIcon.tsx` (9 lines)
- [ ] `src/components/icons/TikTokIcon.tsx` (9 lines)
- [ ] `src/components/icons/InstagramIcon.tsx` (9 lines)
- [ ] `src/components/icons/LinkedInIcon.tsx` (9 lines)

### **✨ Feature Icons**
- [ ] `src/components/icons/featuresIcons/soundwave.tsx` (7 lines)
- [ ] `src/components/icons/featuresIcons/waves.tsx` (7 lines)
- [ ] `src/components/icons/featuresIcons/Circle.tsx` (9 lines)
- [ ] `src/components/icons/featuresIcons/gamepad.tsx` (10 lines)
- [ ] `src/components/icons/featuresIcons/Leaf.tsx` (21 lines)
- [ ] `src/components/icons/featuresIcons/Battery.tsx` (7 lines)

---

## 📦 **CONFIGURATION FILES**

### **🔧 Build & Config** *(Clean last)*
- [ ] `package.json` (42 lines) - Dependencies
- [ V] `tailwind.config.ts` (253 lines) - Tailwind config ⚠️ *LARGE CONFIG*
- [ ] `next.config.ts` (15 lines) - Next.js config
- [ ] `tsconfig.json` (28 lines) - TypeScript config
- [ ] `eslint.config.mjs` (17 lines) - ESLint config
- [ ] `.eslintrc.json` (11 lines) - ESLint legacy config
- [ ] `postcss.config.mjs` (9 lines) - PostCSS config
- [ ] `components.json` (21 lines) - Shadcn config

### **📁 Static Assets** *(Review last)*
- [ ] `public/hero-optimized.mp4` (28MB) - Video file
- [ ] `public/*.png` files - Image assets
- [ ] `public/*.svg` files - Icon assets

---

## 🎯 **CLEANUP TASKS FOR EACH FILE**

When cleaning each file, check for:

### ✅ **Code Quality**
- [ ] Remove unused imports
- [ ] Remove commented-out code
- [ ] Remove console.log statements (except error logging)
- [ ] Remove TODO comments
- [ ] Remove duplicate functions/components

### ✅ **TypeScript**
- [ ] Fix any TypeScript errors
- [ ] Add proper type definitions
- [ ] Remove `any` types where possible

### ✅ **Performance**
- [ ] Optimize large components (>200 lines)
- [ ] Check for unnecessary re-renders
- [ ] Optimize image imports

### ✅ **Code Style**
- [ ] Consistent naming conventions
- [ ] Proper component organization
- [ ] Clean up CSS classes

---

## 🚨 **POTENTIAL ISSUES IDENTIFIED**

### **⚠️ Files Requiring Special Attention:**
1. **`VisionSection.tsx` (457 lines)** - Largest component, complex video logic
2. **`tailwind.config.ts` (253 lines)** - Large config file
3. **`CookieConsent.tsx` (275 lines)** - Complex GDPR logic
4. **`SurveyIntroSection.tsx` (364 lines)** - Large survey component
5. **`consent.ts` (322 lines)** - Complex consent management
6. **`submit-survey/route.ts` (198 lines)** - Complex API logic

### **🔍 Possible Duplicates:**
- `src/components/common/Button.tsx` vs `src/components/ui/button.tsx`

---

## 📝 **CLEANUP ORDER RECOMMENDATION**

1. **Start with HIGH PRIORITY** files (core functionality)
2. **Clean API routes** (ensure backend works)
3. **Clean main sections** (user-facing components)
4. **Clean shared components** (reusable parts)
5. **Clean survey system** (if used)
6. **Clean utilities & configs** (supporting files)
7. **Review assets & icons** (optimization)

---

**Total Files to Clean: ~50 code files**
**Estimated Time: 2-3 hours for thorough cleanup**

---

*✨ Good luck with your cleanup! This systematic approach will make your codebase professional and maintainable.* 
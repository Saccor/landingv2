# LandingV2

A modern, scalable Next.js landing page project with TypeScript, featuring Google Analytics and MailerLite integration.

## Tech Stack

- Next.js 15+ (App Router)
- TypeScript
- Tailwind CSS
- Google Tag Manager
- MailerLite API

## Project Structure

```
src/
├── app/                    # Next.js 13+ app directory
├── components/            # Reusable UI components
│   ├── common/           # Shared components
│   ├── layout/           # Layout components
│   └── ui/               # Basic UI components
├── lib/                  # Third-party library configurations
├── hooks/                # Custom React hooks
├── utils/                # Utility functions
├── services/             # API and external service integrations
├── types/                # TypeScript type definitions
├── styles/               # Global styles and Tailwind config
├── config/               # Configuration files
├── constants/            # Constant values and enums
├── contexts/             # React context providers
├── features/             # Feature-specific components and logic
├── layouts/              # Page layouts
└── public/               # Static assets
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env.local` and fill in your environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# MailerLite
MAILERLITE_API_KEY=your_api_key_here
MAILERLITE_GROUP_ID=your_group_id_here
```

## Features

- Google Tag Manager integration for analytics
- MailerLite newsletter subscription service
- TypeScript for type safety
- Tailwind CSS for styling
- Modern Next.js 13+ features with App Router
- **Pixel-perfect, responsive countdown timer using CSS Grid**

## Countdown Timer Implementation

### Approach

- The countdown timer is rendered as a single CSS Grid for the entire timer row, ensuring perfect alignment and pixel-perfect design.
- Each digit is defined by a 5x8 pattern (array of 1s and 0s), and the colon is a 1x8 pattern with centered dots.
- There is a 1-row and 1-column border of empty squares around the timer for a digital display effect.
- An empty column of squares is added between every digit and colon for clear visual separation.
- The timer is fully responsive and scales to fit its container.

### Customization

- **Digit Patterns:** You can adjust the digit patterns in `src/components/ui/countdown-timer.tsx` by editing the `DIGIT_PATTERNS` object.
- **Colon Pattern:** The colon is vertically centered by default; you can change its pattern in the `COLON_PATTERN` array.
- **Grid Styling:** The border, gap, and background color of each square can be customized via Tailwind classes in the timer component.
- **Responsiveness:** The timer container uses Tailwind's responsive classes for width and height. Adjust these as needed for your design.

### Example Usage

```
<CountdownTimer days="12" hours="23" minutes="45" seconds="56" />
```

### No SVGs Required

- The timer no longer uses SVG digit components. All rendering is handled by CSS Grid and JavaScript arrays for maximum maintainability and scalability.

## Development Guidelines

1. Follow the TypeScript strict mode
2. Use functional components with hooks
3. Implement proper error handling
4. Write clean, documented code
5. Follow the existing project structure
6. Use Tailwind CSS for styling

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

MIT

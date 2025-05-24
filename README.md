# LandingV2

A modern, scalable Next.js landing page project with TypeScript, featuring Google Analytics and MailerLite integration.

## Tech Stack

- Next.js 13+ (App Router)
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

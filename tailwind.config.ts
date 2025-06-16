import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1366px',
      'xl': '1280px',
      '2xl': '1536px',
      
      'mobile': {'max': '767px'},
      'desktop': {'min': '1366px'},
    },
  	extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          'sm': '1.5rem',
          'md': '2rem',
          'lg': '3rem',
          'xl': '4rem',
          '2xl': '5rem',
        },
        screens: {
          'sm': '640px',
          'md': '768px',
          'lg': '1024px',
          'xl': '1280px',
          '2xl': '1400px',
        },
      },
      // Font families used in the project
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },

      // Animation keyframes for project-specific animations
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        
        scaleInFade: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          }
        },
        
        pulse: {
          '0%, 100%': {
            opacity: '1'
          },
          '50%': {
            opacity: '0.5'
          }
        }
      },

      // Animations used in components
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        scaleInFade: 'scaleInFade 0.4s ease-out forwards',
        pulse: 'pulse 2s infinite',
        
        // Delayed animations for staggered effects
        'fadeInUp-delay-100': 'fadeInUp 0.6s ease-out 0.1s forwards',
        'fadeInUp-delay-200': 'fadeInUp 0.6s ease-out 0.2s forwards',
        'fadeInUp-delay-300': 'fadeInUp 0.6s ease-out 0.3s forwards',
      }
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
} satisfies Config;

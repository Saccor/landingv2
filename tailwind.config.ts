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
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      
      'mobile': {'max': '767px'},
      'tablet': {'min': '768px', 'max': '819px'},
      'ipad-pro': {'min': '820px', 'max': '1024px'},
      'desktop': {'min': '1025px'},
      
      'h-sm': {'raw': '(max-height: 600px)'},
      'h-md': {'raw': '(min-height: 601px) and (max-height: 800px)'},
      'h-lg': {'raw': '(min-height: 801px)'},
      
      'ipad-pro-portrait': {'raw': '(min-width: 820px) and (max-width: 1024px) and (orientation: portrait)'},
      'ipad-pro-landscape': {'raw': '(min-width: 1024px) and (max-width: 1366px) and (orientation: landscape)'},
    },
  	extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          'xs': '1rem',
          'sm': '1.5rem',
          'md': '2rem',
          'lg': '3rem',
          'xl': '4rem',
          '2xl': '5rem',
        },
        screens: {
          'xs': '480px',
          'sm': '640px',
          'md': '768px',
          'lg': '1024px',
          'xl': '1280px',
          '2xl': '1400px',
        },
      },
      
      spacing: {
        'fluid-xs': 'clamp(0.25rem, 0.5vw, 0.5rem)',
        'fluid-sm': 'clamp(0.5rem, 1vw, 1rem)',
        'fluid-md': 'clamp(1rem, 2vw, 2rem)',
        'fluid-lg': 'clamp(1.5rem, 3vw, 3rem)',
        'fluid-xl': 'clamp(2rem, 4vw, 4rem)',
        'fluid-2xl': 'clamp(3rem, 6vw, 6rem)',
      },
      
      fontSize: {
        'fluid-xs': ['clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)', { lineHeight: '1.5' }],
        'fluid-sm': ['clamp(0.875rem, 0.8rem + 0.375vw, 1rem)', { lineHeight: '1.6' }],
        'fluid-base': ['clamp(1rem, 0.9rem + 0.5vw, 1.125rem)', { lineHeight: '1.6' }],
        'fluid-lg': ['clamp(1.125rem, 1rem + 0.625vw, 1.25rem)', { lineHeight: '1.6' }],
        'fluid-xl': ['clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)', { lineHeight: '1.5' }],
        'fluid-2xl': ['clamp(1.5rem, 1.3rem + 1vw, 2rem)', { lineHeight: '1.4' }],
        'fluid-3xl': ['clamp(1.875rem, 1.5rem + 1.5vw, 2.5rem)', { lineHeight: '1.3' }],
        'fluid-4xl': ['clamp(2.25rem, 1.8rem + 2vw, 3rem)', { lineHeight: '1.2' }],
        'fluid-5xl': ['clamp(3rem, 2.4rem + 2.5vw, 4rem)', { lineHeight: '1.1' }],
        'fluid-6xl': ['clamp(3.75rem, 3rem + 3vw, 5rem)', { lineHeight: '1.1' }],
      },
      

      
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
        // Responsive border radius
        'fluid': 'clamp(0.5rem, 1vw, 1rem)',
        'fluid-lg': 'clamp(0.75rem, 1.5vw, 1.5rem)',
        'fluid-xl': 'clamp(1rem, 2vw, 2rem)',
  		},
  		keyframes: {
  			highlight: {
  				'0%': {
  					backgroundColor: 'transparent'
  				},
  				'100%': {
  					backgroundColor: 'var(--highlight)'
  				}
  			},
  			flash: {
  				'0%': {
  					backgroundColor: 'hsl(var(--card))'
  				},
  				'50%': {
  					backgroundColor: 'var(--highlight)'
  				},
  				'100%': {
  					backgroundColor: 'hsl(var(--card))'
  				}
  			},
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
        
        slideInFromLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-100%)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        
        slideInFromRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(100%)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
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
  		animation: {
  			highlight: 'highlight 0.6s ease forwards',
  			flash: 'flash 0.6s ease forwards',
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        scaleInFade: 'scaleInFade 0.4s ease-out forwards',
        slideInFromLeft: 'slideInFromLeft 0.5s ease-out forwards',
        slideInFromRight: 'slideInFromRight 0.5s ease-out forwards',
        pulse: 'pulse 2s infinite',
        
        'fadeInUp-delay-100': 'fadeInUp 0.6s ease-out 0.1s forwards',
        'fadeInUp-delay-200': 'fadeInUp 0.6s ease-out 0.2s forwards',
        'fadeInUp-delay-300': 'fadeInUp 0.6s ease-out 0.3s forwards',
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    
    function({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        '.container-query': {
          'container-type': 'inline-size',
        },
        '.container-query-normal': {
          'container-type': 'normal',
        },
        '.container-query-size': {
          'container-type': 'size',
        },
      }
      addUtilities(newUtilities)
    },
    
    function({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        '.aspect-fluid': {
          'aspect-ratio': 'clamp(4/3, 16/9, 21/9)',
        },
        '.aspect-hero': {
          'aspect-ratio': 'clamp(1, 16/9, 2.5)',
        },
      }
      addUtilities(newUtilities)
    },
  ],
} satisfies Config;

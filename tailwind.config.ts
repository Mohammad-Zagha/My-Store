import type { Config } from "tailwindcss";
const {
   default: flattenColorPalette,
 } = require("tailwindcss/lib/util/flattenColorPalette");
 
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
       backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
       },
       fontFamily: {
         SFPro: ['SFPro', 'sans-serif'],
         Cairo: ['Cairo', 'sans-serif'],
         Ubuntu: ['Ubuntu', 'sans-serif'],
       },
    
       container: {
          center: true,
          padding: {
             DEFAULT: '1rem',
             sm: '2rem',
             lg: '4rem',
             xl: '5rem',
             '2xl': '6rem',
          },
       },
       screens: {
          xs: '480px',
       },
       fontSize: {
          xs: '13px',
          xxs: '11px',
       },
       colors: {
  
          background: {
             light: 'hsl(0, 0%, 100%)',
             dark: '	hsl(60, 3%, 94%)',
          },
            primary: {
               light: 'hsl(0, 0%, 59%)',
               dark: '	hsl(0, 0%, 7%)',
            },
         
       
          success: 'hsl(152, 56%, 52%)',
          error: 'hsl(355, 66%, 64%)',
          teal: 'hsl(182, 61%, 55%)',
          'lemon-green': 'hsl(74, 84%, 70%)',
          orange: 'hsl(36, 93%, 73%)',
          'light-red': 'hsl(4, 45%, 70%)',
          brown: 'hsl(33, 89%, 30%)',
          
       },
       fontWeight: {
          '200': '200',
          '300': '300',
          '400': '400',
          '500': '500',
          '600': '600',
          '700': '700',
          '800': '800',
       },
       spacing: {
          '0.25r': '0.25rem', // 4px
          '0.5r': '0.5rem', // 8px
          '0.75r': '0.75rem', // 12px
          '1r': '1rem', // 16px
          '1.25r': '1.25rem', // 20px
          '1.5r': '1.5rem', // 24px
          '2r': '2rem', // 32px
          '2.25r': '2.25rem', // 36px
          '2.5r': '2.5rem', // 40px
          '3r': '3rem', // 48px
          '3.5r': '3.5rem', // 56px
          '4r': '4rem', // 64px
          '4.5r': '4.5rem', // 72px
          '5r': '5rem', // 80px
          '6r': '6rem', // 96px
          '7r': '7rem', // 112px
          '8r': '8rem', // 128px
          '9r': '9rem', // 144px
          '10r': '10rem', // 160px
       },
       boxShadow: {
         card: ' rgba(149, 157, 165, 0.2) 0px 0px 5px !important',
       },
       keyframes: {
          'accordion-down': {
             from: { height: '0' },
             to: { height: 'var(--radix-accordion-content-height)' },
          },
          aurora: {
            from: {
              backgroundPosition: "50% 50%, 50% 50%",
            },
            to: {
              backgroundPosition: "350% 50%, 350% 50%",
            },
          },
          'accordion-up': {
             from: { height: 'var(--radix-accordion-content-height)' },
             to: { height: '0' },
          },
          'infinite-scroll': {
               '0%': { transform: 'translateX(0)' },
               '100%': { transform: 'translateX(calc(-50% - 20px))'}
            
          }
       },
       animation: {
          'accordion-down': 'accordion-down 0.2s ease-out',
          'accordion-up': 'accordion-up 0.2s ease-out',
          'infinite-scroll': 'infinite-scroll 20s linear infinite',
          aurora: "aurora 60s linear infinite",

       },
       gridTemplateColumns: {
          'card-auto-fill': 'repeat(auto-fill, minmax(250px, 1fr))',
       },
    },
 },
 plugins: [require('tailwindcss-animate'), require('@tailwindcss/container-queries') , addVariablesForColors],

};
export default config;


function addVariablesForColors({ addBase, theme }: any) {
   let allColors = flattenColorPalette(theme("colors"));
   let newVars = Object.fromEntries(
     Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
   );
  
   addBase({
     ":root": newVars,
   });
 }

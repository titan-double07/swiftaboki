import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          100: '#2E004F',
          200: '#4B0082'
        },
        red: {
          100: '#EF476F'
        },
        blue: {
          100: '#C0D8FC',
          200:"#2B468B"
        },
        grey: {
          100: '#808080',
          200: '#D9D9D9',
          300: '#22003A',
          400: '#EFEFEF',
          500: '#1E1E1E',
          600: '#D9D9D9'
        },
        dark:{
          100:"#1E1E1E",
          200:"#263238"
        },
        green:{
          100:"#008753",
          200:"#005937"
        }
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '20px',
        xl: '24px',
        '2xl': '1.75rem',
        '3xl': '2rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.5rem',
        '7xl': '64px',
        '8xl': '68px'
      },
      borderRadius:{
        primary: '0.6rem',
        secondary: '1.25rem'
      },
      height: {
        12: '3rem',
        24: '6rem',
        36: '9rem',
        48: '12rem',
        60: '15rem',
        72: '18rem',
        84: '21rem',
        96: '24rem',
        108: '27rem',
        120: '30rem',
        132: '33rem',
        144: '36rem',
        158: '39rem',
        170: '42rem',
        182: '45rem',
        194: '48rem',
        206: '51rem'
      },
      width: {
        12: '3rem',
        24: '6rem',
        36: '9rem',
        48: '12rem',
        60: '15rem',
        72: '18rem',
        84: '21rem',
        96: '24rem',
        108: '27rem',
        120: '30rem',
        132: '33rem',
        144: '36rem',
        158: '39rem',
        170: '42rem',
        182: '45rem',
        194: '48rem',
        206: '51rem',
        209: '60rem'
      },
      animation: {
        slideUp: 'slideUp .5s ease-in-out ',
        fade: 'fade 1.5s ease '
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(10%)', opacity: '0.5' },
          '100%': { transform: 'translateY(0%)', opacity: '1' }
        },
        fade: {
          '0%': { opacity: '0.4' },
          '100%': { opacity: '1' }
        }
      }
    }
  },

  plugins: []
};
export default config;

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#fdfcfa',
        black: '#1b1c1e',
        primary: {
          '50': '#f0f8ff',
          '100': '#dfefff',
          '200': '#b9dffe',
          '300': '#7bc8fe',
          '400': '#34abfc',
          '500': '#0a91ed',
          '600': '#0072cb',
          '700': '#005aa4',
          '800': '#054e87',
          '900': '#0a4070',
          '950': '#07294a',
        },
        secondary: {
          '50': '#effef7',
          '100': '#d9ffed',
          '200': '#b6fcda',
          '300': '#7df8be',
          '400': '#3deb9a',
          '500': '#14d37b',
          '600': '#09a45d',
          '700': '#0c8951',
          '800': '#0f6c42',
          '900': '#0e5939',
          '950': '#01321d',
        },
        tertiary: {
          '50': '#effaf5',
          '100': '#d9f2e5',
          '200': '#b6e4cf',
          '300': '#86cfb2',
          '400': '#53b491',
          '500': '#34a07c',
          '600': '#22795e',
          '700': '#1b614d',
          '800': '#184d3e',
          '900': '#144034',
          '950': '#0a241e',
        },
        success: {
          '50': '#f5fee7',
          '100': '#e9fccb',
          '200': '#d5f99d',
          '300': '#baf264',
          '400': '#a0e635',
          '500': '#84cc16',
          '600': '#68a30d',
          '700': '#517c0f',
          '800': '#426212',
          '900': '#3a5314',
          '950': '#1e2e05',
        },
        warning: {
          '50': '#fef9e8',
          '100': '#fef0c3',
          '200': '#fee28a',
          '300': '#fdd147',
          '400': '#fac215',
          '500': '#eab308',
          '600': '#ca9a04',
          '700': '#a17c07',
          '800': '#85680e',
          '900': '#715a12',
          '950': '#423306',
        },
        error: {
          '50': '#fef1f9',
          '100': '#fde6f4',
          '200': '#fdcdeb',
          '300': '#fda4d9',
          '400': '#fb6bbe',
          '500': '#f53fa3',
          '600': '#d41976',
          '700': '#c70f66',
          '800': '#a41054',
          '900': '#891248',
          '950': '#540327',
        },
        surface: {
          '50': '#e4e6ee',
          '100': '#dbdee9',
          '200': '#d2d6e3',
          '300': '#b6bdd2',
          '400': '#808cb1',
          '500': '#495a8f',
          '600': '#425181',
          '700': '#37446b',
          '800': '#2c3656',
          '900': '#242c46',
        }
      },
    },
    fontFamily: {
      heading: ['Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      body: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif']
    }
  },
  plugins: [],
};

export default config;

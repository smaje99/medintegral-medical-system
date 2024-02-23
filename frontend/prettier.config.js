module.exports = {
  printWidth: 90,
  singleQuote: true,
  jsxSingleQuote: true,
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.js',
  tailwindFunctions: ['clsx', 'twMerge', 'cn']
};

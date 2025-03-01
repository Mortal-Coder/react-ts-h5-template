export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 37.5, // 设计稿宽度375px
      unitPrecision: 5,
      propList: [
        '*',
        '!font',
        '!font-size',
        '!line-height',
        '!letter-spacing',
        '!word-spacing',
      ],
      exclude: /node_modules/,
    },
  },
};

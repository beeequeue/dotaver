module.exports = {
  root: true,
  extends: [
    "plugin:@beequeue/base",
    "plugin:@beequeue/typescript",
    "plugin:@beequeue/prettier",
  ],
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
  },
}

module.exports = {
  verbose: true,
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./test/setup_tests"],
  transformIgnorePatterns: ["node_modules/(?!react-date-object)"],
};

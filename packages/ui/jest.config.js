export default {
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",
};
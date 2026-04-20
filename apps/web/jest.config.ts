import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["**/__tests__/**/*.test.tsx"],
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest"
  }
};

export default config;

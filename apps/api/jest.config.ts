import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/__tests__/**/*.test.ts"],
  setupFiles: ["dotenv/config"],
  moduleNameMapper: {
    "^@drivingschool/db$": "<rootDir>/src/__tests__/mocks/prisma.ts",
    "^@drivingschool/shared$": "<rootDir>/../../packages/shared/src/index.ts"
  }
};

export default config;

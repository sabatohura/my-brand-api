/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testEnvironmentOptions: {
    NODE_ENV: "test",
    PORT: 6050,
  },
};

// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "node",
//   setupFiles: ["dotenv/config"],
//   // testMatch: ["**/**/*.test.ts"],
//   testMatch: ["<rootDir>/lib/__tests__/*.test.ts"],

//   verbose: true,
//   forceExit: true,

//   // clearMocks: true,
//   // resetMocks: true,
//   // restoreMocks: true,
//   // clearMocks: true,
// };

// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "node",
// };

export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  moduleDirectories: ["node_modules", "src"],
};

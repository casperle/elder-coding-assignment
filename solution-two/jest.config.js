module.exports = {
  moduleDirectories: ['node_modules', 'src', __dirname],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  moduleNameMapper: {
    '^@api/(.*)$': ['<rootDir>/src/api/$1'],
    '^@api$': ['<rootDir>/src/api'],

    '^@context/(.*)$': ['<rootDir>/src/context/$1'],
    '^@utils/(.*)$': ['<rootDir>/src/utils/$1'],
    '^@views/(.*)$': ['<rootDir>/src/views/$1'],
    '^@layout/(.*)$': ['<rootDir>/src/layout/$1'],
    '^@sharedComponents/(.*)$': ['<rootDir>/src/sharedComponents/$1'],
  },
  testMatch: ['**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'],
  testURL: 'http://localhost/',
};

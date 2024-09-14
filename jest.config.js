module.exports = {
  preset: 'ts-jest',        // Use ts-jest to handle TypeScript files
  testEnvironment: 'jest-environment-jsdom', // Use jsdom to simulate browser environment
  transform: {
    '^.+\\.tsx?$': 'ts-jest',  // Transform TypeScript files
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',  // For CSS modules
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};

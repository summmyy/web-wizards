export default {
    transform: {
        '^.+\\.js$': 'babel-jest', // Ensures Jest can handle modern JavaScript
    },
    testEnvironment: 'node', // Use Node.js as the test environment
    setupFilesAfterEnv: ['./tests/jest.setup.js'], // Path to setup file
};

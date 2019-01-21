module.exports = {
  testPathIgnorePatterns: ['/node_modules/', '/helpers/'],
  setupTestFrameworkScriptFile: './rtl.setup.js',
  modulePaths: ['<rootDir>/src', '<rootDir>/__test__'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  }
};

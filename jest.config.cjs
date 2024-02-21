module.exports = {
    preset: 'ts-jest',
    testTimeout: 10000, // 10초 타임아웃 설정,
    transform: {
      '^.+\\.(ts|tsx)?$': 'ts-jest',
      '^.+\\.(js|jsx)$': 'babel-jest',
    }
  }

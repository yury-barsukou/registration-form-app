// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Cleanup after each test
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

// Set a longer timeout for tests
jest.setTimeout(10000);

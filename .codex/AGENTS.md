# React/registration-form-app

This is a React-based registration form application built with Create React App. The project includes user authentication forms with validation and comprehensive test coverage.

## Project Structure

- **Source code**: Located in the `src/` directory
- **Test files**: Co-located with source files using the `.test.js` naming convention
- **Coverage reports**: Generated in the `coverage/` directory

## Dependencies

- **React**: ^18.3.1
- **React Testing Library**: ^15.0.6
- **Jest**: Included with react-scripts
- **Node.js**: Required for running npm commands

## Code Conventions

- Use functional React components with hooks
- Follow React Testing Library best practices for user-centric testing
- Use `@testing-library/jest-dom` matchers for assertions
- Prefer user-event interactions over direct DOM manipulation when possible
- Keep test files co-located with their corresponding component files

### Component Structure

- Keep components focused and single-purpose
- Use controlled components for form inputs
- Implement validation logic within components
- Use CSS modules or external CSS files for styling (see `UserAuthForms.css`)

### Testing Conventions

- Use descriptive test names that explain what is being tested
- Group related tests using `describe` blocks
- Extract common setup logic into helper functions (e.g., `fillOutForm`)
- Define test constants at the top of test files for reusability
- Mock console methods and restore them in `afterEach` hooks
- Use `test.each` for testing similar scenarios with different inputs

## Tests

### Running Tests

Before running tests, ensure all dependencies are installed:

```powershell
npm install
```

#### Run all tests (interactive watch mode):

```powershell
npm test
```

This launches Jest in watch mode, which will:
- Run tests affected by changed files
- Provide an interactive menu for filtering tests
- Re-run tests automatically when files change

#### Run all tests once with coverage:

```powershell
npm test -- --coverage --watchAll=false
```

This will:
- Execute all test suites
- Generate a coverage report in the `coverage/` directory
- Display coverage summary in the terminal
- Exit after completion (non-interactive)

#### Run tests for a specific file:

```powershell
npm test -- SignUpForm.test.js --watchAll=false
```

#### Run tests matching a pattern:

```powershell
npm test -- --testNamePattern="Form Validation" --watchAll=false
```

### Coverage Configuration

The project is configured to collect coverage from:
- All `.js` and `.jsx` files in `src/`
- Excluding `src/index.js`
- Excluding `src/reportWebVitals.js`

Coverage reports are generated in multiple formats:
- **HTML report**: Open `coverage/lcov-report/index.html` in a browser
- **Console summary**: Displayed after running tests with `--coverage`
- **lcov.info**: For CI/CD integration
- **clover.xml**: For compatibility with various coverage tools

### Test Assertions

- Tests use `@testing-library/jest-dom` custom matchers like `toBeInTheDocument()`, `toHaveValue()`, and `toBeDisabled()`
- Use `screen` queries to find elements (e.g., `screen.getByLabelText()`, `screen.getByRole()`)
- Prefer accessible queries in this order:
  1. `getByRole`
  2. `getByLabelText`
  3. `getByText`
  4. `getByTestId` (last resort)

### Testing Best Practices

- Always clean up after tests (e.g., restore mocks in `afterEach`)
- Test user interactions, not implementation details
- Verify form validation states and error messages
- Test both valid and invalid form submissions
- Ensure buttons are enabled/disabled based on form state
- Use RegEx patterns for text matching to be resilient to minor text changes

## Building and Development

### Start development server:

```powershell
npm start
```

This runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### Build for production:

```powershell
npm run build
```

Creates an optimized production build in the `build/` folder.

## Final Checklist

Before finalizing changes to this project:

1. Run the complete test suite with coverage:
   ```powershell
   npm test -- --coverage --watchAll=false
   ```
2. Verify all tests pass
3. Check that coverage meets project standards (review `coverage/lcov-report/index.html`)
4. Ensure the app builds successfully:
   ```powershell
   npm run build
   ```
5. Verify no linting errors appear in the console during development

## Additional Resources

- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Create React App Testing Guide](https://create-react-app.dev/docs/running-tests/)

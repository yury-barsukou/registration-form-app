# Registration Form App

React-based registration form application with sign-up and sign-in capabilities, built with Create React App.

## Project Overview

This is a React application featuring user authentication forms:
- **SignUpForm**: Registration form with validation (first name, last name, email, password)
- **SignInForm**: Login form for existing users
- **UserAuthForms**: Parent component managing form switching

The project uses:
- React 18.3.1
- React Testing Library for unit tests
- Jest for test execution
- Create React App for build tooling

## Setup Commands

Install dependencies:
```bash
npm install
```

Start development server:
```bash
npm start
```
This opens [http://localhost:3000](http://localhost:3000) in your browser with hot-reload enabled.

Build for production:
```bash
npm run build
```

## Testing Instructions

⚠️ **IMPORTANT FOR AUTOMATED AGENTS/CODEX**: 
- Use the appropriate command syntax for your shell environment
- **PowerShell (Windows)**: Use `$env:VARIABLE=$value; command` with semicolon `;` as separator
- **Bash/Unix (Linux/Mac)**: Use `VARIABLE=value command` or `export VARIABLE=value && command`
- Never mix shell syntaxes (e.g., don't use `bash -lc` wrapper on Windows PowerShell)

### Run all tests with coverage (autonomous/CI mode)

**For PowerShell (Windows):**
```powershell
$env:CI=$true; npm test
```

**For Bash/Unix (Linux/Mac):**
```bash
CI=true npm test
```

**Common Mistakes to AVOID:**
- ❌ Using Bash syntax in PowerShell: `CI=true npm test` (fails on Windows)
- ❌ Using PowerShell syntax in Bash: `$env:CI=$true; npm test` (fails on Linux/Mac)
- ❌ Using `npm test -- --watchAll=false` (still prompts for confirmation in some cases)
- ❌ Using wrong separator: `export CI=true && npm test` in PowerShell (invalid operator)
- ❌ Using wrapper: `bash -lc 'CI=true npm test'` on Windows PowerShell
- ✅ **Match your command to your shell environment**

This command:
- Executes all test suites (currently `SignUpForm.test.js`)
- Generates coverage reports in the `coverage/` directory
- Runs in CI mode (non-interactive, no watch mode)
- Exits after test completion
- Does not prompt user for confirmation

### Run tests in watch mode (interactive)
```bash
npm test
```

This is useful during development:
- Automatically re-runs tests when files change
- Allows filtering by test name or file pattern
- Press `a` to run all tests
- Press `p` to filter by filename pattern
- Press `t` to filter by test name
- Press `q` to quit

### Run specific test file
```bash
npm test SignUpForm.test.js
```

### Run tests matching a pattern
```bash
npm test -- -t "validates email"
```

### View coverage report
After running tests with `--coverage`, open:
```
coverage/lcov-report/index.html
```

### Test Configuration Notes
The test script in `package.json` includes:
- `--coverage`: Automatically generates coverage reports
- `--maxWorkers=1`: Uses single worker to prevent "worker process failed to exit" warnings

This configuration ensures:
- Tests run reliably without worker process issues
- Coverage reports are always generated
- Tests complete cleanly in CI environments

### Coverage Configuration
Tests collect coverage for:
- All `.js` and `.jsx` files in `src/`
- Excludes: `src/index.js`, `src/reportWebVitals.js`

Coverage is configured in `package.json` under the `jest` section.

## Code Style Guidelines

### React Conventions
- Functional components with hooks (no class components)
- State management with `useState` hook
- Controlled form inputs
- Event handlers named with `handle` prefix (e.g., `handleSubmit`, `handleChange`)

### Component Structure
- Import statements first (React, libraries, local files)
- Component definition
- Export statement at the bottom

### Form Validation
- Real-time validation with immediate user feedback
- Validation messages displayed inline
- Visual indicators (red for invalid, green for valid)
- Submit button disabled until all fields are valid

### Testing Standards
- Use `@testing-library/react` for component testing
- Test behavior, not implementation details
- Use `screen` queries for accessing elements
- Group related tests with `describe` blocks
- Use `test.each` for testing similar scenarios
- Mock `console.log` when testing submission handlers

### Test File Naming
- Test files should be named `*.test.js` or `*.spec.js`
- Place test files alongside the components they test

## File Structure

```
src/
├── SignUpForm.js         # Registration form component
├── SignUpForm.test.js    # SignUpForm unit tests
├── SignInForm.js         # Login form component
├── UserAuthForms.js      # Parent component with form switching
├── UserAuthForms.css     # Shared styles for auth forms
├── index.js              # Application entry point
├── index.css             # Global styles
├── setupTests.js         # Jest configuration
└── reportWebVitals.js    # Performance monitoring
```

## Before Committing

Always run tests before committing changes:
```bash
# PowerShell
$env:CI=$true; npm test

# Bash/Unix
CI=true npm test
```

Ensure:
- All tests pass (green)
- No test failures or errors
- Code coverage remains at acceptable levels
- No console warnings or errors during test execution

## Common Tasks

### Adding a new component
1. Create component file in `src/` (e.g., `NewComponent.js`)
2. Create corresponding test file (e.g., `NewComponent.test.js`)
3. Write tests first (TDD approach recommended)
4. Implement component
5. Run tests to verify: `npm test NewComponent.test.js`

### Updating form validation
1. Modify validation logic in the component
2. Update or add corresponding tests
3. Run tests: `npm test -- -t "validation"`
4. Verify all validation tests pass

### Debugging test failures
1. Run tests in watch mode: `npm test`
2. Check the error messages and stack traces
3. Use `screen.debug()` in tests to see rendered output
4. Verify test expectations match actual component behavior

## Dependencies

### Production
- `react` & `react-dom`: UI library
- `web-vitals`: Performance metrics

### Development/Testing
- `@testing-library/react`: Component testing utilities
- `@testing-library/jest-dom`: Custom Jest matchers for DOM
- `@testing-library/user-event`: User interaction simulation
- `react-scripts`: Build tooling and dev server

## Known Constraints

- This is a Create React App project; avoid ejecting unless absolutely necessary
- Tests run with Jest configured by `react-scripts`
- ESLint configuration extends `react-app` and `react-app/jest`
- Node modules and build artifacts are in `.gitignore`

## Troubleshooting

### Tests fail with "cannot find module"
Run: `npm install`

### Port 3000 already in use
Either:
- Kill the process using port 3000
- Set a different port: `PORT=3001 npm start` (Unix/Mac) or `$env:PORT=3001; npm start` (PowerShell)

### Coverage reports not generating
Ensure you're using the `--coverage` flag: `npm test -- --coverage --watchAll=false`

# User Authentication Forms

This project is a simple user authentication system built with React. It includes sign-in and sign-up forms with basic validation.

## Project Structure

- `public/`: Contains static assets like the favicon, HTML file, and manifest.
- `src/`: Contains the source code for the React application.
  - `SignInForm.js`: Component for the sign-in form.
  - `SignUpForm.js`: Component for the sign-up form.
  - `SignUpForm.test.js`: Tests for the sign-up form component.
  - `UserAuthForms.css`: CSS file for styling the authentication forms.
  - `UserAuthForms.js`: Common logic for user authentication forms.
  - `index.js`: Entry point of the React application.
  - `index.css`: Global CSS file.
  - `logo.svg`: React logo.
  - `reportWebVitals.js`: Performance measuring tool.
  - `setupTests.js`: Configuration for running tests.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## User Guide

### Sign-In Form

1. Open the application in your browser.
2. Navigate to the sign-in page.
3. Enter your email and password.
4. Click the "Sign In" button.

### Sign-Up Form

1. Open the application in your browser.
2. Navigate to the sign-up page.
3. Enter your name, email, and password.
4. Click the "Sign Up" button.

## Testing Checklist

- Ensure the sign-in form validates user input correctly.
- Ensure the sign-up form validates user input correctly.
- Test edge cases such as empty fields, invalid email formats, and short passwords.
- Verify that error messages are displayed appropriately.
- Check that the forms submit successfully with valid input.
- Ensure that the application handles authentication states correctly.

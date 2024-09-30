import { render, screen, fireEvent } from '@testing-library/react';
import UserAuthForms from './UserAuthForms';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

jest.mock('./SignInForm', () => () => <div>SignInFormMock</div>);
jest.mock('./SignUpForm', () => () => <div>SignUpFormMock</div>);

describe('UserAuthForms', () => {
  beforeEach(() => {
    render(<UserAuthForms />);
  });

  test('renders SignInForm by default', () => {
    expect(screen.getByText('SignInFormMock')).toBeInTheDocument();
    expect(screen.queryByText('SignUpFormMock')).toBeNull();
  });

  test('switches to SignUpForm when Sign Up button is clicked', () => {
    fireEvent.click(screen.getByTestId('signup-button'));
    expect(screen.getByText('SignUpFormMock')).toBeInTheDocument();
    expect(screen.queryByText('SignInFormMock')).toBeNull();
  });

  test('switches back to SignInForm when Sign In button is clicked after being on the SignUpForm', () => {
    // Switch to SignUpForm first
    fireEvent.click(screen.getByTestId('signup-button'));
    expect(screen.getByText('SignUpFormMock')).toBeInTheDocument();

    // Switch back to SignInForm
    fireEvent.click(screen.getByTestId('signin-button'));
    expect(screen.getByText('SignInFormMock')).toBeInTheDocument();
  });

  test('displays the correct header for SignInForm', () => {
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  test('displays the correct header for SignUpForm after switching', () => {
    fireEvent.click(screen.getByTestId('signup-button'));
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('active button has active class', () => {
    const signinButton = screen.getByTestId('signin-button');
    const signupButton = screen.getByTestId('signup-button');

    // Initially, signin button is active
    expect(signinButton).toHaveClass('active');
    expect(signupButton).not.toHaveClass('active');

    // After clicking signup, signup button becomes active
    fireEvent.click(signupButton);
    expect(signupButton).toHaveClass('active');
    expect(signinButton).not.toHaveClass('active');
  });

  test('privacy policy link is rendered correctly', () => {
    expect(screen.getByText('Privacy Policy').closest('a')).toHaveAttribute('href', 'https://www.company.com/about-privacy-policy_US_AU_NZ_v10.html');
  });
});
import { render, screen, fireEvent } from '@testing-library/react';
import UserAuthForms from './UserAuthForms';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

describe('UserAuthForms', () => {
  beforeEach(() => {
    render(<UserAuthForms />);
  });

  test('initially renders the sign-in form', () => {
    expect(screen.getByTestId('signin-button')).toHaveClass('active');
    expect(screen.queryByTestId('signup-button')).not.toHaveClass('active');
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  test('switches to sign-up form when sign-up button is clicked', () => {
    fireEvent.click(screen.getByTestId('signup-button'));
    expect(screen.getByTestId('signup-button')).toHaveClass('active');
    expect(screen.queryByTestId('signin-button')).not.toHaveClass('active');
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('switches back to sign-in form when sign-in button is clicked', () => {
    fireEvent.click(screen.getByTestId('signup-button'));
    fireEvent.click(screen.getByTestId('signin-button'));
    expect(screen.getByTestId('signin-button')).toHaveClass('active');
    expect(screen.queryByTestId('signup-button')).not.toHaveClass('active');
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  test('renders Privacy Policy link', () => {
    expect(screen.getByText('Privacy Policy')).toHaveAttribute('href', 'https://www.company.com/about-privacy-policy_US_AU_NZ_v10.html');
  });

  describe('integration with SignInForm and SignUpForm components', () => {
    test('renders SignInForm component by default', () => {
      const signInForm = screen.getByTestId('signin-form');
      expect(signInForm).toBeInTheDocument();
    });

    test('renders SignUpForm component when sign-up button is clicked', () => {
      fireEvent.click(screen.getByTestId('signup-button'));
      const signUpForm = screen.getByTestId('signup-form');
      expect(signUpForm).toBeInTheDocument();
    });
  });
});
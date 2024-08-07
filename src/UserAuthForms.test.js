import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserAuthForms from './UserAuthForms';

describe('UserAuthForms Component', () => {
  test('renders without crashing', () => {
    render(<UserAuthForms />);
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });

  test('initially displays the Sign In form', () => {
    render(<UserAuthForms />);
    expect(screen.getByTestId('signin-button')).toHaveClass('active');
    expect(screen.queryByTestId('signup-button')).not.toHaveClass('active');
  });

  test('toggles between Sign In and Sign Up forms', () => {
    render(<UserAuthForms />);
    fireEvent.click(screen.getByTestId('signup-button'));
    expect(screen.getByTestId('signup-button')).toHaveClass('active');
    expect(screen.queryByTestId('signin-button')).not.toHaveClass('active');

    fireEvent.click(screen.getByTestId('signin-button'));
    expect(screen.getByTestId('signin-button')).toHaveClass('active');
    expect(screen.queryByTestId('signup-button')).not.toHaveClass('active');
  });

  test('highlights the active form button', () => {
    render(<UserAuthForms />);
    fireEvent.click(screen.getByTestId('signup-button'));
    expect(screen.getByTestId('signup-button')).toHaveClass('active');
    fireEvent.click(screen.getByTestId('signin-button'));
    expect(screen.getByTestId('signin-button')).toHaveClass('active');
  });

  test('contains a correct Privacy Policy link', () => {
    render(<UserAuthForms />);
    const privacyLink = screen.getByText(/Privacy Policy/i);
    expect(privacyLink).toHaveAttribute('href', 'https://www.company.com/about-privacy-policy_US_AU_NZ_v10.html');
    expect(privacyLink).toHaveAttribute('target', '_blank');
  });
});
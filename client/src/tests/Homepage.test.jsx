import { render, screen } from '@testing-library/react';
import Homepage from '../pages/HomePage';
import { BrowserRouter } from 'react-router-dom';

describe('Homepage Component', () => {
    test('renders Homepage with welcome message', () => {
        render(
            <BrowserRouter>
                <Homepage />
            </BrowserRouter>
        );

        expect(screen.getByText('Welcome to Web Wizards')).toBeInTheDocument();
        expect(screen.getByText('Create and manage your events seamlessly')).toBeInTheDocument();
    });

    test('renders navigation links', () => {
        render(
            <BrowserRouter>
                <Homepage />
            </BrowserRouter>
        );

        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByText('Register')).toBeInTheDocument();
        expect(screen.getByText('Explore Events')).toBeInTheDocument();
    });
});
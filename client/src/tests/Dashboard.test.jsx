import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../pages/Dashboard';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

describe('Dashboard Component', () => {
    beforeEach(() => {
        const user = { name: 'John Doe', email: 'john@example.com' };
        localStorage.setItem('user', JSON.stringify(user));
    });

    afterEach(() => {
        localStorage.clear();
    });

    test('renders user information', () => {
        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );

        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Welcome, John Doe')).toBeInTheDocument();
        expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });

    test('fetches and displays user events', async () => {
        const events = [
            { id: 1, title: 'Event One', date: '2023-10-10' },
            { id: 2, title: 'Event Two', date: '2023-11-15' },
        ];
        axios.get.mockResolvedValue({ data: events });

        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );

        expect(await screen.findByText('Your Events')).toBeInTheDocument();
        expect(screen.getByText('Event One')).toBeInTheDocument();
        expect(screen.getByText('Event Two')).toBeInTheDocument();
    });

    test('handles logout', () => {
        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );

        const logoutButton = screen.getByText('Logout');
        fireEvent.click(logoutButton);

        expect(localStorage.getItem('user')).toBeNull();
        expect(window.location.pathname).toBe('/login');
    });
});
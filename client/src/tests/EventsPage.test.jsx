import { render, screen, fireEvent } from '@testing-library/react';
import EventsPage from '../pages/EventsPage';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

describe('EventsPage Component', () => {
    test('renders list of events', async () => {
        const events = [
            { id: 1, title: 'Event One', date: '2023-10-10' },
            { id: 2, title: 'Event Two', date: '2023-11-15' },
        ];
        axios.get.mockResolvedValue({ data: events });

        render(
            <BrowserRouter>
                <EventsPage />
            </BrowserRouter>
        );

        expect(await screen.findByText('Event One')).toBeInTheDocument();
        expect(screen.getByText('Event Two')).toBeInTheDocument();
    });

    test('navigates to event details on click', async () => {
        const events = [{ id: 1, title: 'Event One', date: '2023-10-10' }];
        axios.get.mockResolvedValue({ data: events });

        render(
            <BrowserRouter>
                <EventsPage />
            </BrowserRouter>
        );

        const eventLink = await screen.findByText('Event One');
        fireEvent.click(eventLink);

        expect(window.location.pathname).toBe('/events/1');
    });

    test('handles no events found', async () => {
        axios.get.mockResolvedValue({ data: [] });

        render(
            <BrowserRouter>
                <EventsPage />
            </BrowserRouter>
        );

        expect(await screen.findByText('No events available')).toBeInTheDocument();
    });
});
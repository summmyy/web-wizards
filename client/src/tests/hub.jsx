// /client/src/tests/Register.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../pages/Register';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

describe('Register Component', () => {
    test('renders Register form', () => {
        render(
            <BrowserRouter>
                <Register />
      </BrowserRouter>
    );

        expect(screen.getByText('Register')).toBeInTheDocument();
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    test('submits the form with valid data', async () => {
        axios.post.mockResolvedValue({ data: { user: {} } });

        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText('Name'), {
            target: { value: 'John Doe' },
    });

        fireEvent.change(screen.getByLabelText('Email'), {
            target: { value: 'john@example.com' },
        });

        fireEvent.change(screen.getByLabelText('Password'), {
            target: { value: 'securepassword' },
        });

    fireEvent.click(screen.getByText('Submit'));

    expect(axios.post).toHaveBeenCalledWith(
            'https://web-wizards-ui0t.onrender.com/api/register',
            {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'securepassword',
            }
        );
    });
});

// /client/src/tests/EventList.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import EventList from '../pages/EventList';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

describe('EventList Component', () => {
    test('renders list of events', async () => {
        const events = [
            { id: 1, title: 'Event One', date: '2023-10-10' },
            { id: 2, title: 'Event Two', date: '2023-11-15' },
        ];
        axios.get.mockResolvedValue({ data: events });

        render(
            <BrowserRouter>
                <EventList />
            </BrowserRouter>
        );

        expect(await screen.findByText('Event One')).toBeInTheDocument();
        expect(screen.getByText('Event Two')).toBeInTheDocument();
    });

    test('handles event deletion', async () => {
        const events = [{ id: 1, title: 'Event One', date: '2023-10-10' }];
        axios.get.mockResolvedValue({ data: events });
        axios.delete.mockResolvedValue({});

        render(
            <BrowserRouter>
                <EventList />
            </BrowserRouter>
        );

        const deleteButton = await screen.findByText('Delete');
        fireEvent.click(deleteButton);

        expect(axios.delete).toHaveBeenCalledWith(
            'https://web-wizards-ui0t.onrender.com/api/events/1',
      {
        headers: {
          Authorization: expect.any(String),
        },
      }
    );
  });
});

// /client/src/tests/EventDetails.test.jsx
import { render, screen } from '@testing-library/react';
import EventDetails from '../pages/EventDetails';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

describe('EventDetails Component', () => {
    test('renders event details', async () => {
        const event = {
            id: 1,
            title: 'Sample Event',
            date: '2023-10-10',
            description: 'This is a sample event.',
            location: 'Online',
        };
        axios.get.mockResolvedValue({ data: event });

        render(
            <MemoryRouter initialEntries={['/events/1']}>
                <Routes>
                    <Route path="/events/:id" element={<EventDetails />} />
                </Routes>
            </MemoryRouter>
        );

        expect(await screen.findByText('Sample Event')).toBeInTheDocument();
        expect(screen.getByText('2023-10-10')).toBeInTheDocument();
        expect(screen.getByText('This is a sample event.')).toBeInTheDocument();
        expect(screen.getByText('Online')).toBeInTheDocument();
    });
});
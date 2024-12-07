import { render, screen, fireEvent } from '@testing-library/react';
import CreateEvent from './CreateEvent';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

describe('CreateEvent Component', () => {
  test('renders Create Event form', () => {
    render(
      <BrowserRouter>
        <CreateEvent />
      </BrowserRouter>
    );

    expect(screen.getByText('Create Event')).toBeInTheDocument();
    expect(screen.getByLabelText('Event Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Event Date')).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
    axios.post.mockResolvedValue({ data: {} });

    render(
      <BrowserRouter>
        <CreateEvent />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Event Title'), {
      target: { value: 'Test Event' },
    });

    // Add more fireEvent calls for other fields as needed

    fireEvent.click(screen.getByText('Submit'));

    expect(axios.post).toHaveBeenCalledWith(
      'https://web-wizards-ui0t.onrender.com/api/events',
      {
        title: 'Test Event',
        date: '',
        description: '',
        location: '',
      },
      {
        headers: {
          Authorization: expect.any(String),
        },
      }
    );
  });
});
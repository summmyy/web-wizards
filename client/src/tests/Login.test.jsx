import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../pages/Login';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

describe('Login Component', () => {
    test('renders Login form', () => {
    render(
      <BrowserRouter>
                <Login />
      </BrowserRouter>
    );

        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
        axios.post.mockResolvedValue({ data: { token: 'fakeToken' } });

    render(
      <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText('Email'), {
            target: { value: 'test@example.com' },
        });

        fireEvent.change(screen.getByLabelText('Password'), {
            target: { value: 'password123' },
        });

        fireEvent.click(screen.getByText('Submit'));

        expect(axios.post).toHaveBeenCalledWith(
            'https://web-wizards-ui0t.onrender.com/api/users/login',
            {
                email: 'test@example.com',
                password: 'password123',
            }
        );
    });
});
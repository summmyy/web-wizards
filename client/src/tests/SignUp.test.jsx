import { render, screen, fireEvent } from '@testing-library/react';
import SignUp from '../pages/SignUp';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

describe('SignUp Component', () => {
    test('renders SignUp form', () => {
        render(
            <BrowserRouter>
                <SignUp />
            </BrowserRouter>
        );

        expect(screen.getByText('Sign Up')).toBeInTheDocument();
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    test('submits the form with valid data', async () => {
        axios.post.mockResolvedValue({ data: { user: {} } });

        render(
            <BrowserRouter>
                <SignUp />
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
            'https://web-wizards-ui0t.onrender.com/api/users/register',
            {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'securepassword',
            }
        );
    });
});

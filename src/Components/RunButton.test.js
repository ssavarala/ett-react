import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RunButton from './RunButton';
import axios from 'axios';

jest.mock('axios');

describe('RunButton Component', () => {
    const props = {
        myObj: {
            email: 'test@example.com',
            hostname: 'smtp.example.com',
            password: 'password123',
            username: 'testuser'
        },
        id: '12345',
        testname: 'Test SMTP',
        moreinfo: 'More information about the test',
        testdesc: 'This is a description of the test'
    };

    beforeEach(() => {
        axios.post.mockClear();
    });

    test('should render initial state correctly', () => {
        render(<RunButton {...props} />);

        expect(screen.getByText('RUN')).toBeInTheDocument();
        expect(screen.getByText(props.testname)).toBeInTheDocument();
        expect(screen.getByText(props.moreinfo)).toBeInTheDocument();
        expect(screen.getByText(props.testdesc)).toBeInTheDocument();
    });

    test('should handle submit button click and show loading spinner', () => {
        axios.post.mockResolvedValueOnce({ data: [] });

        render(<RunButton {...props} />);

        fireEvent.click(screen.getByText('RUN'));

        // Check if the spinner is in the document
        expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    test('should handle successful API response', async () => {
        const response = {
            data: [
                {
                    lastTestResponse: 'Test passed successfully',
                    criteriaMet: 'TRUE'
                }
            ]
        };

        axios.post.mockResolvedValue(response);

        render(<RunButton {...props} />);

        fireEvent.click(screen.getByText('RUN'));

        await waitFor(() => expect(screen.getByText('Success')).toBeInTheDocument());
        expect(screen.getByText('Test passed successfully')).toBeInTheDocument();
    });

    test('should handle failed API response', async () => {
        const response = {
            data: [
                {
                    lastTestResponse: 'Test failed',
                    criteriaMet: 'FALSE'
                }
            ]
        };

        axios.post.mockResolvedValue(response);

        render(<RunButton {...props} />);

        fireEvent.click(screen.getByText('RUN'));

        await waitFor(() => expect(screen.getByText('Test Failed')).toBeInTheDocument());
        expect(screen.getByText('Test failed')).toBeInTheDocument();
    });

    test('should handle reset button click', async () => {
        const response = {
            data: [
                {
                    lastTestResponse: 'Test passed successfully',
                    criteriaMet: 'TRUE'
                }
            ]
        };

        axios.post.mockResolvedValue(response);

        render(<RunButton {...props} />);

        fireEvent.click(screen.getByText('RUN'));

        await waitFor(() => expect(screen.getByText('Success')).toBeInTheDocument());

        fireEvent.click(screen.getByText('Clear'));

        expect(screen.getByText('RUN')).toBeInTheDocument();
        expect(screen.queryByText('Success')).not.toBeInTheDocument();
    });
});

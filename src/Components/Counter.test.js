import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import axiosMock from 'axios-mock-adapter';
import Counter from './Counter';
import React from "react";

jest.mock('./RunButton', () => {
    return function MockRunButton() {
        return <div>Mocked RunButton</div>;
    };
});

const mock = new axiosMock(axios);

describe('Counter Component', () => {
    beforeEach(() => {
        mock.reset();
    });

    test('renders Counter component', async () => {
        mock.onGet('/ett/api/smtpcasesjson').reply(200, {
            tests: [
                { id: 1, name: 'Test 1', desc: 'Desc 1', sutRole: 'sender', longDesc: 'Long Desc 1', fields: {} },
                { id: 2, name: 'Test 2', desc: 'Desc 2', sutRole: 'receiver', longDesc: 'Long Desc 2', fields: {} },
            ],
        });

        render(<Counter />);

        await waitFor(() => {
            expect(screen.getByText('Your system as')).toBeInTheDocument();
        });
    });

    test('handles API error gracefully', async () => {
        mock.onGet('/ett/api/smtpcasesjson').reply(404);

        render(<Counter />);

        await waitFor(() => {
            expect(screen.getByText('Your system as')).toBeInTheDocument();
            // Optionally, check for the error message
            // expect(screen.getByText('Error retrieving data')).toBeInTheDocument();
        });
    });

    test('handles sender button click', async () => {
        mock.onGet('/ett/api/smtpcasesjson').reply(200, {
            tests: [
                { id: 1, name: 'Test 1', desc: 'Desc 1', sutRole: 'sender', longDesc: 'Long Desc 1', fields: {} },
                { id: 2, name: 'Test 2', desc: 'Desc 2', sutRole: 'receiver', longDesc: 'Long Desc 2', fields: {} },
            ],
        });

        render(<Counter />);

        // Ensure initial state and API response
        await waitFor(() => {
            expect(screen.getByText('Your system as')).toBeInTheDocument();
        });

        const senderButton = screen.getByText('Sender');
        fireEvent.click(senderButton);

        await waitFor(() => {
            // Ensure state update and re-rendering
            console.log('State after sender button click:', screen.debug());

            const runButtonElements = screen.queryAllByText('Mocked RunButton');
            console.log('RunButton Elements:', runButtonElements);
            expect(runButtonElements.length).toBeGreaterThan(0);
        });
    });

    test('handles input changes', () => {
        mock.onGet('/ett/api/smtpcasesjson').reply(200, { tests: [] });

        render(<Counter />);

        const emailInput = screen.getByPlaceholderText('SUT Email');
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        expect(emailInput.value).toBe('test@example.com');

        const hostnameInput = screen.getByPlaceholderText('Hostname');
        fireEvent.change(hostnameInput, { target: { value: 'localhost' } });
        expect(hostnameInput.value).toBe('localhost');

        const usernameInput = screen.getByPlaceholderText('Username');
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        expect(usernameInput.value).toBe('testuser');

        const passwordInput = screen.getByPlaceholderText('Password');
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        expect(passwordInput.value).toBe('password');
    });

    test('handles receiver button click', async () => {
        mock.onGet('/ett/api/smtpcasesjson').reply(200, {
            tests: [
                { id: 1, name: 'Test 1', desc: 'Desc 1', sutRole: 'sender', longDesc: 'Long Desc 1', fields: {} },
                { id: 2, name: 'Test 2', desc: 'Desc 2', sutRole: 'receiver', longDesc: 'Long Desc 2', fields: {} },
            ],
        });

        render(<Counter />);

        const receiverButton = screen.getByText('Receiver');
        fireEvent.click(receiverButton);

        await waitFor(() => {
            // Ensure state update and re-rendering
            console.log('State after receiver button click:', screen.debug());

            const runButtonElements = screen.queryAllByText('Mocked RunButton');
            console.log('RunButton Elements:', runButtonElements);
            expect(runButtonElements.length).toBeGreaterThan(0);
        });
    });

    test('handles TLS checkbox click', () => {
        mock.onGet('/ett/api/smtpcasesjson').reply(200, { tests: [] });

        render(<Counter />);

        const tlsCheckbox = screen.getByLabelText('TLS Required');
        fireEvent.click(tlsCheckbox);
        expect(tlsCheckbox.checked).toBe(true);

        fireEvent.click(tlsCheckbox);
        expect(tlsCheckbox.checked).toBe(false);
    });

    test('handles empty API response', async () => {
        mock.onGet('/ett/api/smtpcasesjson').reply(200, { tests: [] });

        render(<Counter />);

        await waitFor(() => {
            expect(screen.getByText('Your system as')).toBeInTheDocument();
        });

        const senderButton = screen.getByText('Sender');
        fireEvent.click(senderButton);

        await waitFor(() => {
            const runButtonElements = screen.queryAllByText('Mocked RunButton');
            expect(runButtonElements.length).toBe(0);
        });
    });

});

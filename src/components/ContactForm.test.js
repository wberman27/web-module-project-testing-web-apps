import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

describe('Happy Path', () =>{

    test('renders without errors', ()=>{
        render(<ContactForm />)
    });
    
    test('renders the contact form header', ()=> {
        render(<ContactForm />)
        const header = screen.getByText(/contact form/i);
        expect(header).toBeInTheDocument();
        expect(header).toBeTruthy();
        expect(header).not.toBeFalsy();
        expect(header).toHaveTextContent('Contact Form')
    });
    
    test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
        render(<ContactForm />)
        const firstNameInput = screen.getByLabelText('First Name*')
        userEvent.type(firstNameInput, 'Bob')
        const firstNameError = screen.getByText(/error/i)
        expect(firstNameError).toBeInTheDocument();
    });
    
    test('renders THREE error messages if user enters no values into any fields.', async () => {
        render(<ContactForm />)
        const submit = screen.getByRole('button')
        userEvent.click(submit)
        const error = screen.getAllByText(/error/i)
        expect(error.length===3).toBeTruthy();
    });
    
    test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
        render(<ContactForm />)
        const firstNameInput = screen.getByLabelText('First Name*')
        const lastNameInput = screen.getByLabelText('Last Name*')
        userEvent.type(firstNameInput, 'Johnathon')
        userEvent.type(lastNameInput, 'Smith')
        const submit = screen.getByRole('button')
        userEvent.click(submit)
        const emailError = screen.getByText(/email must be a valid email address./i)
        const error = screen.getAllByText(/error/i)
        expect(emailError).toBeInTheDocument();
        expect(error.length===1).toBeTruthy();
    });
    
    test('renders "email must be a valid email address" if an invalid email is entered', async () => {
        
    });
    
    test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
        
    });
    
    test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
        
    });
    
    test('renders all fields text when all fields are submitted.', async () => {
        
    });

})
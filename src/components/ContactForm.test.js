import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

describe('Form Tests', () =>{

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

        userEvent.type(firstNameInput, 'Bob') //this input should cause an error

        const firstNameError = screen.queryByText(/error/i)
        expect(firstNameError).toBeInTheDocument();
    });
    
    test('renders THREE error messages if user enters no values into any fields.', async () => {
        render(<ContactForm />)
        const submit = screen.getByRole('button')

        userEvent.click(submit) //submit form to cause errors

        const error = screen.queryAllByText(/error/i) //grab all errors
        expect(error.length===3).toBeTruthy(); //there should be three errors
    });
    
    test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
        render(<ContactForm />)
        const firstNameInput = screen.getByLabelText('First Name*')
        const lastNameInput = screen.getByLabelText('Last Name*')
        const submit = screen.getByRole('button')
        // no email
        userEvent.type(firstNameInput, 'Johnathon')
        userEvent.type(lastNameInput, 'Smith')
        userEvent.click(submit)

        const emailError = screen.queryByText(/email must be a valid email address./i)
        const error = screen.queryAllByText(/error/i)

        expect(emailError).toBeInTheDocument();
        expect(error.length===1).toBeTruthy(); //there should be only one error
    });
    
    test('renders "email must be a valid email address" if an invalid email is entered', async () => {
        render(<ContactForm />)
        const emailInput = screen.getByLabelText('Email*')

        userEvent.type(emailInput, 'Y') //not a valid email

        const emailError = screen.queryByText(/email must be a valid email address./i)
        expect(emailError).toBeInTheDocument();
    });
    
    test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
        render(<ContactForm />)
        const firstNameInput = screen.getByLabelText('First Name*')
        const emailInput = screen.getByLabelText('Email*')
        const submit = screen.getByRole('button')
        // no last name
        userEvent.type(firstNameInput, 'William')
        userEvent.type(emailInput, 'emaily@email.com')
        userEvent.click(submit)

        const lastNameError = screen.queryByText(/lastName is a required field./i)
        expect(lastNameError).toBeInTheDocument();
    });
    
    test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
        render(<ContactForm />)
        const firstNameInput = screen.getByLabelText('First Name*')
        const lastNameInput = screen.getByLabelText('Last Name*')
        const emailInput = screen.getByLabelText('Email*')
        const submit = screen.getByRole('button')
        // no message
        userEvent.type(firstNameInput, "William")
        userEvent.type(lastNameInput, "Berman")
        userEvent.type(emailInput, 'emaily@email.com')
        userEvent.click(submit)

        const firstNameRender = screen.queryByText(/first name:/i)
        const lastNameRender = screen.queryByText(/last name:/i)
        const emailRender = screen.queryByText(/email:/i)
        

        expect(firstNameRender).toBeInTheDocument();
        expect(lastNameRender).toBeInTheDocument();
        expect(emailRender).toBeInTheDocument();

        //get msg promise with .find, message shouldn't be in the document
        const msgRender = screen.findByText(/message:/i)
        msgRender.then(res =>{
            expect(res).not.toBeInTheDocument();
        })
            
    });
    
    test('renders all fields text when all fields are submitted.', async () => {
        render(<ContactForm />)
        const firstNameInput = screen.getByLabelText('First Name*')
        const lastNameInput = screen.getByLabelText('Last Name*')
        const emailInput = screen.getByLabelText('Email*')
        const submit = screen.getByRole('button')
        const msgInput = screen.getByLabelText(/message/i)


        userEvent.type(firstNameInput, "William")
        userEvent.type(lastNameInput, "Berman")
        userEvent.type(emailInput, 'emaily@email.com')
        userEvent.type(msgInput, "My message")
        userEvent.click(submit)

        //await for these to render
        await waitFor(()=>{
            const firstNameRender = screen.queryByText(/first name:/i)
            const lastNameRender = screen.queryByText(/last name:/i)
            const emailRender = screen.queryByText(/email:/i)
            const msgRender = screen.queryByText(/message:/i)

            expect(firstNameRender).toBeInTheDocument();
            expect(lastNameRender).toBeInTheDocument();
            expect(emailRender).toBeInTheDocument();
            expect(msgRender).toBeInTheDocument();
        })
    });

})
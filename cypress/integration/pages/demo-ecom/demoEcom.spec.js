/// <reference types="Cypress" />

import {LOGIN_USERS} from './mockData.data';

const ELEMENTS = {
    LOGIN_FORM: '.form.form-login',
    EMAIL_INPUT: 'input[name="login[username]"]',
    LOGIN_INPUT: 'input[name="login[password]"]',
    SUBMIT_BTN: 'button[type="submit"]',
    MY_ACCOUNT: '.panel.header .customer-welcome',
    LOGOUT: '.link.authorization-link'
};

describe('Test Demo Ecom', () => {
    before(() => {
        // cy.visit('/customer/account/login');
        // cy.getCookie(Cypress.env('COOKIE_USER')).then((cookie) => {
        //     const user = JSON.parse(cookie.value);

        //     cy.visit(`${user.user_id}/destination/connector/destinations`);
        // });
    });

    beforeEach(() => {
        cy.setUID();
        cy.on('uncaught:exception', () => {
            return false;
        });

    });

    it('Login page', () => {
       
        LOGIN_USERS.forEach(user => {
            const {email, password} = user;

            // User login
            cy.visit('/customer/account/login');
            
            cy.get(ELEMENTS.LOGIN_FORM).find(ELEMENTS.EMAIL_INPUT)
                .type(email, {delay: 0});
            
            cy.get(ELEMENTS.LOGIN_FORM).find(ELEMENTS.LOGIN_INPUT)
                .type(password, {delay: 0});
            
            cy.get(ELEMENTS.LOGIN_FORM).find(ELEMENTS.SUBMIT_BTN)
                .click();

            // User logout
            cy.get(ELEMENTS.MY_ACCOUNT).click();
            cy.get(ELEMENTS.MY_ACCOUNT).find(ELEMENTS.LOGOUT).click();
        });
    });
});

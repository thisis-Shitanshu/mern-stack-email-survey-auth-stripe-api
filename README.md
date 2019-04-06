# Emaily
A simple application to create a survey compaign. Handles payment via Stripe API.

## TECH STACK: MERN with Redux
1. User signs up via Google OAuth:
    - Express server: Back-end
    - MongoDB: User information
    - PassportJS: Handle OAuth & Authentication

1. User pays for email credits via stripe:
    - Stripe: Handle billing
    - MongoDB: Record payment information

1. User creats a new 'campaign':
    - React
    - Redux

1. User enters list of emails to send survey to:
    - React
    - Redux
    - Redux Form

1. We send email to list of surveyees:
    - Email Provider

1. Surveyees click on link in email to provide feedback:
    - Email Provider
    - Express
    - MongoDB

1. We tabulate feedback:
    - Mongo

1. User can see report of all survey responses:
    - Mongo
    - React
    - Redux
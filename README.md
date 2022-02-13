# Interview Scheduler

Interview Scheduler is a Single-Page App built with React that allows a user to book, edit and delete interviews for a specific day and time.
This is the client application, which interacts with Scheduler-API that runs our PostgreSQL database server using Express and WebSockets for real-time updating.

Testing was also incorporated using the JEST library for unit integration tests and Cypress was used for end to end testing.

## Final Product

!["Interview List Page"](https://github.com/Reflekshn/scheduler/blob/master/docs/interview-list.png)

!["Adding a new interview"](https://github.com/Reflekshn/scheduler/blob/master/docs/interview-add.png)

!["Saving progress while updating the DB"](https://github.com/Reflekshn/scheduler/blob/master/docs/interview-saving-progress.png)

!["Deleting an interview"](https://github.com/Reflekshn/scheduler/blob/master/docs/interview-delete.png)

## Dependencies

- React 16.9.0
- React-DOM 16.9.0
- React-Scripts 3.0.0
- Axios 0.25.0
- Normalize.css 8.0.1
- Classnames 2.2.6

## Getting Started

Install dependencies with `npm install`.

### Running Webpack Development Server

```sh
npm start
```

### Running Jest Test Framework

```sh
npm test
```

### Running Storybook Visual Testbed

```sh
npm run storybook
```

## Setting up the DB API Server

Fork and clone the [Scheduler-API](https://github.com/Reflekshn/scheduler-api) project and follow the instructions in the provided README.md
to setup and connect to the database server.

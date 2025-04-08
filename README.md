# Elegant ToDo Application

A beautiful, elegant ToDo application built with Node.js and EJS, following the MVC architecture pattern.

## Features

- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Set priority levels for tasks
- Beautiful, responsive UI
- Elegant animations
- Organized codebase following MVC architecture

## Project Structure

```
todo-app/
├── controllers/
│   └── todoController.js
├── models/
│   └── todoModel.js
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── routes/
│   └── todoRoutes.js
├── views/
│   ├── partials/
│   │   ├── footer.ejs
│   │   └── header.ejs
│   ├── index.ejs
│   └── error.ejs
├── app.js
├── package.json
└── README.md
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the application:
   ```
   npm start
   ```
   or for development with auto-restart:
   ```
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:3000`

## MVC Architecture

This application follows the Model-View-Controller (MVC) architecture:

- **Models**: Handles data logic and interactions with data storage (currently using an in-memory array)
- **Views**: EJS templates that render the UI
- **Controllers**: Manages the application logic and handles HTTP requests

## Future Enhancements

- Add user authentication
- Implement persistent data storage with a database
- Add due dates and reminders
- Create multiple todo lists/categories
- Add search and filtering functionality# week7-nodeApp

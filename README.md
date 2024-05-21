# Full Stack Project - (Music App) MERN Stack

## Overview
This project is a demonstration of my full stack development skills using the MERN (MongoDB, ExpressJS, ReactJS, NodeJS) stack. The application includes both frontend and backend components, seamlessly integrated to provide a full-fledged system for managing song information. The frontend has been styled using Tailwind CSS.

## Features
### Backend
- REST API: Developed using ExpressJS to handle song data, including creating, listing, updating, and deleting songs.
- Data Storage: MongoDB with Mongoose for schema modeling and data interaction.
- Statistics: Provides various statistics such as total number of songs, artists, albums, genres, and more.

### Frontend
- User Interface: Built with ReactJS and TypeScript for creating, updating, and deleting songs.
- State Management: Redux Toolkit for state management, with Redux-Saga handling API calls.
- Real-time Updates: The application reflects changes immediately without page reloads.
- Styling: Tailwind CSS for styling the application, providing a modern and responsive design.

## Technologies Used
### Backend
- ExpressJS: Handles HTTP requests and routing.
- MongoDB: NoSQL database for storing song data.
- Mongoose: ORM for MongoDB, providing schema validation and data modeling.
- Docker: Containerization for easy deployment and management.

### Frontend
- TypeScript: Ensures type safety and improved code quality.
- ReactJS: Component-based UI development.
- Redux Toolkit: Simplifies state management.
- Redux-Saga: Manages side effects and API calls.
- Tailwind CSS: Utility-first CSS framework for rapid UI development.

## Installation and Setup
### Prerequisites
- Node.js
- Docker (for backend)

### Backend Setup
1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the server:
    ```bash
    npm start
    ```
    Or Just run the following, if Docker is on your computer
    ```bash
    docker-compose up --build
    ```

### Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm run dev
    ```

## Screenshots
- Home Page
![Home Page](./frontend/src/assets/images/Screenshot%202024-05-21%20143413.png)
![Home Page](./frontend/src/assets/images/Screenshot%202024-05-21%20143427.png)
- Song List
![Song List](./frontend/src/assets/images/Screenshot%202024-05-21%20143354.png)

## Conclusion
This project showcases the integration of a complete MERN stack application with a focus on creating a seamless user experience and efficient data management. The switch to Tailwind CSS for styling has provided a more streamlined and responsive design. The application is hosted on Vercel for frontend and Render for backend, making it easily accessible and demonstrating my ability to deploy full stack applications on modern platforms.

Live: [Music Project](https://music-project-one.vercel.app/)

## Contact
For any questions or feedback, please contact me at [ritwanrashit@gmail.com].

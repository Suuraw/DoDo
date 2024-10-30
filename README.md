# README for To-Do Website

## Project Overview

This project is a **To-Do website** built using the **MERN** stack (with PostgreSQL as the database). The application allows users to manage their tasks efficiently and securely. It utilizes **React** for the frontend, **Node.js** and **Express** for the backend, and implements **JWT** for authentication. The UI is designed using **Material UI** for a modern and responsive experience.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Deployment](#deployment)
- [Getting Started](#getting-started)

## Technologies Used

- **Frontend**:
  - React
  - Material UI

- **Backend**:
  - Node.js
  - Express
  - JWT (JSON Web Tokens)

- **Database**:
  - PostgreSQL

## Features

- User authentication with JWT.
- Create, read, update, and delete (CRUD) tasks.
- Responsive design using Material UI.
- Secure API endpoints for task management.
- User-friendly interface for managing to-do items.

## Deployement

1. Configuring the API for a serverless architecture to deploy on Vercel.

## Getting Started

To get started with this project locally, follow these steps:

1. **Set up PostgreSQL Database**:
   - Install PostgreSQL and pgAdmin if you haven't already. You can download them from the [PostgreSQL official site](https://www.postgresql.org/download/) and the [pgAdmin official site](https://www.pgadmin.org/download/).
   - Open pgAdmin and create a new server connection:
     - Right-click on `Servers` in the left sidebar and select `Create -> Server`.
     - In the **General** tab, give your connection a name (e.g., `MyDatabase`).
     - In the **Connection** tab, fill in the following details:
       - **Host name/address**: `localhost`
       - **Port**: `5432`
       - **Maintenance database**: `postgres`
       - **Username**: `postgres`
       - **Password**: Enter your PostgreSQL password.
     - Click **Save** to create the server connection.
   - Create a new database for your application:
     - Right-click on your newly created server and select `Create -> Database`.
     - Enter a name for your database (e.g., `todo_db`) and click **Save**.

2. **Clone the repository**:
   ```bash
   git clone https://github.com/Suuraw/DoDo.git
3. **Steps to run the website locally**:
   - Backend
       - npm install
       - nodemon server.js 
   - Frontend
       - npm i
       - npm run start
  
{::comment} Make sure backend server and frontend server are running on seperate port {:/comment}

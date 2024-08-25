# Stray Animal Welfare

This project is designed to assist NGOs in managing and addressing requests related to stray animal welfare. It offers a platform for users to submit requests about stray animals needing help and allows NGOs to view, manage, and resolve these requests effectively.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Project Structure](#project-structure)

## Features
- **NGO Registration & Login:** NGOs can register and log in to the platform.
- **JWT Authentication:** Secure authentication with JSON Web Tokens (JWT).
- **Request Submission:** Users can submit requests for stray animal help, including details like location and contact information.
- **NGO Dashboard:** NGOs can view all active requests and mark them as resolved once addressed.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript, EJS (Embedded JavaScript templates)
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** Google Fonts, custom CSS

## Setup and Installation

### Prerequisites
- Node.js
- MySQL

### Installation Steps

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/067pratham/Animal-Welfare.git
    cd animal-welfare
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    ```

3. **Setup MySQL Database:**
    - Create a MySQL database named `ngo`.
    - Run the following SQL commands to create the necessary tables:

    ```sql
    CREATE TABLE user (
        NGO VARCHAR(50),
        Pincode VARCHAR(6),
        Location VARCHAR(30),
        contact VARCHAR(10),
        userId VARCHAR(255) PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );

    CREATE TABLE request (
        req VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        phone VARCHAR(10) NOT NULL,
        image VARCHAR(255),
        user VARCHAR(255),
        FOREIGN KEY (user) REFERENCES user(userId) ON DELETE CASCADE
    );
    ```

4. **Configure Environment Variables:**
    - Create a `.env` file in the root directory.
    - Add the following environment variables:

    ```plaintext
    JWT_SECRET=your_jwt_secret
    DB_PASSWORD=your_mysql_password
    img_key=your_imgur_key
    location_key=your_locationiq_key
    ```

5. **Run the Server:**
    ```bash
    npm start
    ```

6. **Access the Application:**
    - Open your browser and go to `http://localhost:3000`.

## Usage

### User Registration:
- Go to the registration page and sign up with a username and password.
- Provide details like NGO name, Pincode, Location, and Contact.

### Login:
- Login using the registered username and password.
- After login, you will be redirected to the NGO dashboard where you can view all active requests.

### Submit Request:
- Users can submit a request by filling out the required information.

### Manage Requests:
- NGOs can view requests on their dashboard and mark them as resolved.

## Project Structure

```plaintext
animal-welfare/
│
├── views/            # Contains all the EJS template files
├── public/           # Contains static assets like CSS, images, etc.
├── routes/           # Contains the route handlers for different parts of the application
├── utils/            # Contains utility functions for database operations
├── app.js            # The main server file
├── .env              # Environment variables configuration
└── README.md         # Project documentation (this file)

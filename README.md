# Dental office API - university project
> Back-end REST API used to manage a dental office's database

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Usage](#usage)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)
<!-- * [License](#license) -->


## General Information
- This is an university project. This REST API can be used to run and manage a dental office's mongoDB database.


## Technologies Used
- node.js - version 22.13.0
- bcrypt - version 5.1.1
- dotenv - version 16.4.7
- express - version 4.21.2
- express-validator - version 7.2.1
- jsonwebtoken - version 9.0.2
- mongoose - version 8.9.4
- morgan - version 1.10.0
- mongoDB - version 8.0.4 Atlas
- postman - version 11.27.3
- mongoDB compass - 8.0.4 Atlas
- MongoDB Atlas - 8.0.4 Atlas


## Features
List the ready features here:
- Authentication - This software uses authentication middleware. It allows user to sign up and login as either admin or user, both roles offer different abilities in managing the database.
- Adding, editing and deleting patients
- Managing visits (arranging planned visits, cancelling, changing dates)
- Storing doctor's data and assigning them to visits


## Screenshots
![Example screenshot](./img/screenshot.png)
<!-- If you have screenshots you'd like to share, include them here. -->


## Setup
1. Install Node.js ([link:](https://nodejs.org/en))
2. Clone repository https://github.com/Srippo/Gabinet-api.git
3. Install dependencies (dependencies can be found in the dependencies.txt file) 
    - npm install
4. Configure a database in MongoDB Atlas
    - Create a cluster in MongoDB Atlas
5. Create an .env file and insert
    - DB_USER = yourname
    - DB_PASSWORD = yourpassword
    - DB_NAME = yourdatabasename
    - JWT_KEY = secret
6. Create connection to your database
7. Launch the API with node server.js 


## Back-end

### API'S
The back-end exposes a set of RESTful API endpoints to interact with patients, dentists, visits and medical procedures. These endpoints allow users to create, read, update, and delete the necessary data. The API also supports assigning specific dentists and patients to visits, along with procedures that took place.

### RDBMS and Data Persistence
This application uses MongoDB with Mongoose for data storage and management. MongoDB is a NoSQL database that stores data in a flexible, JSON-like format. Mongoose is used to define schemas and models for the different entities, such as dentists, patients, visits, procedures and handle interactions with the database. All data is persisted in MongoDB, ensuring future retrieval and analysis.

### Authentication
The application implements authentication mechanisms, such as JWT (JSON Web Tokens), to ensure that only authorized users can access or modify data (e.g., dentists and procedures can only be added by user with the role 'admin', patients can be added by users with lower ranked role of 'user', viewing the data can be done by any logged in user etc.). Users must first sign up, then log in to receive an authentication token, which they include in the header of their API requests.


## API Endpoints


Use Base URL: [http://localhost:3000/](http://localhost:3000/)


### Register & Login


| Method | Route                | Description                |
|--------|----------------------|----------------------------|
| POST   | /userRoutes/signup   | Registers new users        |
| POST   | /userRoutes/login    | Logs into user account     |


### Dentysci


| Method | Route         | Description                                                            |
|--------|---------------|------------------------------------------------------------------------|
| GET    | /dentysci     | Returns array of dentists in database (user must be logged in)         |
| POST   | /dentysci     | Creates & returns a new dentist ('admin' role only)                    |
| DELETE | /dentysci/:id | Deletes a dentist specified by id ('admin' role only)                  |
| PATCH  | /dentysci/:id | Updates a given field of a dentist specified by id ('admin' role only) |


### Pacjenci


| Method | Route         | Description                                                                 |
|--------|---------------|-----------------------------------------------------------------------------|
| GET    | /pacjenci     | Returns array of patients in database (user must be logged in)              |
| POST   | /pacjenci     | Creates & returns a new patient (user must be logged in)                    |
| DELETE | /pacjenci/:id | Deletes a patient specified by id (user must be logged in)                  |
| PATCH  | /pacjenci/:id | Updates a given field of a patient specified by id (user must be logged in) |


### Wizyty


| Method | Route             | Description                                                               |
|--------|-------------------|---------------------------------------------------------------------------|
| GET    | /wizyty           | Returns array of visits in database (user must be logged in)              |
| POST   | /wizyty           | Creates & returns a new visit (user must be logged in)                    |
| DELETE | /wizyty/:wizytaId | Deletes a visit specified by id (user must be logged in)                  |
| PATCH  | /wizyty/:wizytaId | Updates a given field of a visit specified by id (user must be logged in) |


### Zabiegi


| Method | Route              | Description                                                                   |
|--------|--------------------|-------------------------------------------------------------------------------|
| GET    | /zabiegi           | Returns array of procedures in database (user must be logged in)              |
| POST   | /zabiegi           | Creates & returns a new procedure ('admin' role only)                         | 
| DELETE | /zabiegi/:zabiegId | Deletes a procedure specified by id ('admin' role only)                       |
| PATCH  | /zabiegi/:zabiegId | Updates a given field of a procedure specified by id (user must be logged in) |


### Zaplanowane wizyty


| Method | Route                        | Description                                                                       |
|--------|------------------------------|-----------------------------------------------------------------------------------|
| GET    | /zaplanowaneWizyty           | Returns array of planned visits in database (user must be logged in)              |
| POST   | /zaplanowaneWizyty           | Creates & returns a new planned visit (user must be logged in)                    |
| DELETE | /zaplanowaneWizyty/:wizytaId | Deletes a planned visit specified by id (user must be logged in)                  |
| PATCH  | /zaplanowaneWizyty/:wizytaId | Updates a given field of a planned visit specified by id (user must be logged in) |


## Register endpoint for the role "user"

### **POST** `/userRoutes/signup`

#### Expected Body
```json
{
    "email": "example@gmail.com", // string, unique, required
    "password": "password123", // string, required
    "name": "username" // string, required
}
```

#### Expected Response
```json
{
    "message": "User registered successfuly",
    "userId": "<userId>"
}
```

## Login endpoint

### **POST** `/userRoutes/login`

### Expected Body
```json
{
    "email": "example@gmail.com", // string, required
    "password": "password123", // string, required
}
```


### Expected Response
```json
{
    "message": "Login successful",
    "token": "<webtoken>",
    "user": {
        "id": "<userId>",
        "email": "example@gmail.com",
        "role": "user"
    }
}
```


## Register endpoint for the role "admin"

### **POST** `userRoutes/signup`

#### Expected Body
```json
{
    "email": "example@gmail.com", // string, unique, required
    "password": "password123", // string, required
    "name": "username", // string, required
    "role": "admin" // string
}
```

### Expected Response
```json
{
    "message": "User registered sucessfuly",
    "userId": "<userId>"
}
```

### Login endpoint remains the same for any role


## Dentysci endpoints


### **GET** `/dentysci`

You may download the list of dentists, and use filters to narrow down the search. Available query parameters:


| Parameter       | Type   | Description                                                  |
|-----------------|--------|--------------------------------------------------------------|
| `imie`          | string | Filters dentists by name (eg., "Anna").                      |
| `nazwisko`      | string | Filters dentists by surname (eg., "Nowak").                  |
| `specjalizacja` | string | Filters dentists by their expertise (eg., "Ortodonta").      |
| `telefon`       | string | Filters dentists by their phone number (eg., "123456789").   |
| `email`         | string | Filters dentists by their email (eg., anna.nowak@gmail.com). |

#### Few example uses of query filters:


- **Download dentists named "Anna":**


#### **GET** `/dentysci?imie=Anna`


- **Download dentists with expertise "Ortodonta":**


#### **GET** `/dentysci?specjalizacja=Ortodonta`


- **Download dentists with surname "Nowak" and phone number "123456789":**


#### **GET** `/dentysci?nazwisko=Nowak&telefon=123456789`



### Expected Response for **GET** `/dentysci`
```json
[
    {
        "godziny pracy": {
            "start": "08:00",
            "end": "16:00"
        },
        "_id": "67812fefda8a101cdfdcb3f5",
        "imie": "Anna",
        "nazwisko": "Nowak",
        "specjalizacja": "Ortodonta",
        "telefon": "123456789",
        "email": "anna.nowak@gmail.com",
        "__v": "0"
    }
]
```
## Usage
How does one go about using it?
Provide various use cases and code examples here.

`write-your-code-here`


## Project Status
Project is: _in progress_ / _complete_ / _no longer being worked on_. If you are no longer working on it, provide reasons why.


## Room for Improvement
Include areas you believe need improvement / could be improved. Also add TODOs for future development.

Room for improvement:
- Improvement to be done 1
- Improvement to be done 2

To do:
- Feature to be added 1
- Feature to be added 2


## Acknowledgements
Give credit here.
- This project was inspired by...
- This project was based on [this tutorial](https://www.example.com).
- Many thanks to...


## Contact
Created by [@flynerdpl](https://www.flynerd.pl/) - feel free to contact me!


<!-- Optional -->
<!-- ## License -->
<!-- This project is open source and available under the [... License](). -->

<!-- You don't have to include all sections - just the one's relevant to your project -->
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
    - DB_USER=yourusername
    - DB_PASSWORD=yourpassword
    - DB_NAME=yourdatabasename
    - DB_CLUSTER=yourdbclustername
    - DB_AUTH=mongodb
    - JWT_KEY=yourJWT
    - PORT=3000
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

User with any role may download the list of dentists, and use filters to narrow down the search. Available query parameters:


| Parameter       | Type   | Description                                                  |
|-----------------|--------|--------------------------------------------------------------|
| `imie`          | string | Filters dentists by name (eg., "Anna").                      |
| `nazwisko`      | string | Filters dentists by surname (eg., "Nowak").                  |
| `specjalizacja` | string | Filters dentists by their expertise (eg., "Ortodonta").      |
| `telefon`       | string | Filters dentists by their phone number (eg., "123456789").   |
| `email`         | string | Filters dentists by their email (eg., anna.nowak@gmail.com). |

### Few example uses of query filters:


#### **Download dentists named "Anna":**


-  **GET** `/dentysci?imie=Anna`


#### **Download dentists with expertise "Ortodonta":**


- **GET** `/dentysci?specjalizacja=Ortodonta`


#### **Download dentists with surname "Nowak" and phone number "123456789":**


- **GET** `/dentysci?nazwisko=Nowak&telefon=123456789`



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


### **POST** `/dentysci`


Please note that only users with the role "admin" may add new dentists.


#### Expected Body
```json
{
    "godziny_pracy": {
        "start": "06:30",
        "end" : "14:30"
    },
    "imie": "Janusz",
    "nazwisko": "Kowalski",
    "specjalizacja": "Chirurg szczękowy",
    "telefon": "555666777",
    "email": "JanuszKowal@gmail.com"
}
```


#### Expected Response
```json
{
    "message": "Dentysta dodany",
    "dentysta": {
        "_id": "678bbc6e2dbf02c71f607358",
        "imie": "Janusz",
        "nazwisko": "Kowalski",
        "specjalizacja": "Chirurg szczękowy",
        "godziny_pracy": {
            "start": "06:30",
            "end": "14:30"
        },
        "telefon": "555666777",
        "email": "JanuszKowal@gmail.com",
        "__v": 0
    }
}
```


### **DELETE** `/dentysci/:id`


Please note that only users with the role "admin" may delete dentists.


#### Expected Query


- **DELETE** `/dentysci/678bbc6e2dbf02c71f607358`


#### Expected Response
```json
{
    "message": "Dentysta usunięty",
    "dentysta": {
        "godziny_pracy": {
            "start": "06:30",
            "end": "14:30"
        },
        "_id": "678bbc6e2dbf02c71f607358",
        "imie": "Janusz",
        "nazwisko": "Kowalski",
        "specjalizacja": "Chirurg szczękowy",
        "telefon": "555666777",
        "email": "JanuszKowal@gmail.com",
        "__v": 0
    }
}
```


### **PATCH** `/dentysci/:id`


Please note that only users with the role of "admin" may update entries. You may update as many fields as you wish.


#### Expected Query


- **PATCH** `/dentysci/678bbc6e2dbf02c71f607358`


#### Expected Body
```json
{
    "telefon": "999888777",
    "email": "KowalJanusz@gmail.com"
}
```


#### Expected Response
```json
{
    "message": "Dentysta zaktualizowany",
    "dentysta": {
        "godziny_pracy": {
            "start": "06:30",
            "end": "14:30"
        },
        "_id": "678bbc6e2dbf02c71f607358",
        "imie": "Janusz",
        "nazwisko": "Kowalski",
        "specjalizacja": "Chirurg szczękowy",
        "telefon": "999888777",
        "email": "KowalJanusz@gmail.com",
        "__v": 0
    }
}
```


## Pacjenci Endpoints


### **GET** `/pacjenci`

Logged in user with any role may download the list of dentists, and use filters to narrow down the search. Available query parameters:


| Parameter       | Type   | Description                                                  |
|-----------------|--------|--------------------------------------------------------------|
| `imie`          | string | Filters patients by name (eg., "Jan").                       |
| `nazwisko`      | string | Filters patients by surname (eg., "Kowalski").               |
| `plec`          | string | Filters patients by their gender (eg., "kobieta").           |
| `telefon`       | string | Filters patients by their phone number (eg., "123456789").   |
| `email`         | string | Filters patients by their email (eg., Jan.Kowal@gmail.com).  |


### Few example uses of query filters:


#### **Download patients named "Jan":**

- **GET** `/pacjenci?imie=Jan`


#### **Download patients by surname "Kowalski":**

- **GET** `/pacjenci?nazwisko=Kowalski`


#### **Download patients by both name and surname "Jan Kowalski":**

- **GET** `/pacjenci?imie=Jan&nazwisko=Kowalski`


### **Download patients by both name and phone number "Jan 444555666":**

- **GET** `/pacjenci?imie=Jan&telefon=444555666`


### Expected Response for **GET** `/pacjenci`
```json
[
    {
        "_id": "67813048da8a101cdfdcb3f7",
        "imie": "Jan",
        "nazwisko": "Kowalski",
        "data_urodzenia": "1999-02-14T00:00:00.000Z",
        "plec": "mężczyzna",
        "telefon": "444555666",
        "email": "Jan.Kowal@gmail.com",
        "__v": 0
    }
]
```


### **POST** `/pacjenci`

Logged in user with any role may add new patients


### Expected Body
```json
{
    "imie": "Jan", // String, Required
    "nazwisko": "Kowalski", // String, Required
    "data_urodzenia": "1999-02-14", // Date, Required
    "plec": "mezczyzna", // String, Required
    "telefon": "444555666", // String, Required
    "email": "jan.kowal@gmail.com" // String, Required
}
```


### Expected Response
```json
{
    "message": "Pacjent dodany",
    "pacjent": {
        "_id": "67813048da8a101cdfdcb3f7",
        "imie": "Jan",
        "nazwisko": "Kowalski",
        "data_urodzenia": "1999-02-14T00:00:00.000Z",
        "plec": "mezczyzna",
        "telefon": "444555666",
        "email": "jan.kowal@gmail.com",
        "addedBy": "678a5dfa32f73ae6672bc6d6",
        "__v": 0
    }
}
```


### **DELETE** `/pacjenci/:id`


Logged in user with any role may delete patients.


### Expected Query


- **DELETE** `/pacjenci/67813048da8a101cdfdcb3f7`


### Expected Response
```json
{
    "message": "Pacjent usunięty",
    "pacjent": {
        "_id": "678bc3cd9ad93cddd33a077c",
        "imie": "Jan",
        "nazwisko": "Kowalski",
        "data_urodzenia": "1999-02-14T00:00:00.000Z",
        "plec": "mezczyzna",
        "telefon": "444555666",
        "email": "jan.kowal@gmail.com",
        "addedBy": "678a5dfa32f73ae6672bc6d6",
        "__v": 0
    }
}
```


### **PATCH** `/pacjenci/:id`


Logged in user with any role may update patients


### Expected Query


- **PATCH** `/pacjenci/678bc3cd9ad93cddd33a077c`


### Expected Body
```json
{
    "telefon": "111222333",
    "email": "kowal.jan@gmail.com"
}
```


### Expected Response
```json
{
    "message": "Pacjent zaktualizowany",
    "pacjent": {
        "_id": "678bc3cd9ad93cddd33a077c",
        "imie": "Jan",
        "nazwisko": "Kowalski",
        "data_urodzenia": "1999-02-14T00:00:00.000Z",
        "plec": "mezczyzna",
        "telefon": "111222333",
        "email": "kowal.jan@gmail.com",
        "addedBy": "678a5dfa32f73ae6672bc6d6",
        "__v": 0
    }
}
```


## Wizyty Endpoints

### **GET** `/wizyty`

Logged in user with any role may download the list of visits, and use filters to narrow down the search. Available query parameters:


| Parameter                | Type   | Description                                                           |
|--------------------------|--------|-----------------------------------------------------------------------|
| `imie_pacjenta`          | string | Filters visits by the patient's name (eg., "Joanna").                 |
| `nazwisko_pacjenta`      | string | Filters visits by the patient's surname (eg., "Krawczyk").            |
| `id_pacjenta`            | string | Filters visits by the patient's id                                    |
| `imie_dentysty`          | string | Filters visits by the dentist's name (eg., "Mariusz").                |
| `nazwisko_dentysty`      | string | Filters visits by the dentist's surname (eg., "Warszawski").          |
| `id_dentysty`            | string | Filters visits by the dentist's id                                    |
| `id_wizyty`              | string | Filters visits by the visit's id                                      |
| `platnosc`               | bool   | Filters visits by the payment's status (eg., "true", "false")         |
| `specjalizacja_dentysty` | string | Filters visits by the dentist's expertise (eg., "protetyk)            |
| `wykonane_zabiegi`       | string | Filters visits by done procedure's name (eg., "leczenie", "usuwanie") |
| `id_zabiegu`             | string | Filters visits by done procedure's Id                                 |
| `dodana_przez`           | string | Filters visits by the user who added them (eg., "user@gmail.com")     |


### Few example uses of query filters:


#### **Download visits by patient's name "Joanna":**

- **GET** `/wizyty?imie_pacjenta=Joanna`


### **Download visits by patient's Id":**

- **GET** `/wizyty?id_pacjenta=678138b93734560f2da0ecaf`


### **Download visits by dentist's surname":**

- **GET** `/wizyty?nazwisko_dentysty=Warszawski`


### **Download visits by dentist's name "Mariusz" and expertise "Stomatologia chirurgiczna":**

- **GET** `/wizyty?imie_dentysty=Mariusz&specjalizacja_dentysty=Stomatologia chirurgiczna`


### **Download visits by the payment's status "True":**

- **GET** `/wizyty?platnosc=True`


### **Download visits by the procedure's name "Leczenie kanałowe":**

- **GET** `/wizyty?wykonane_zabiegi=leczenie kanałowe`


### **Download visits by the procedure's Id:**

- **GET** `/wizyty?id_zabiegu=6781391f3734560f2da0ecbb`



### Expected Response for **GET** `/wizyty`
```json
[
    {
        "_id": "678a6eb1a53d8bc1d4a7b783",
        "id_pacjenta": {
            "_id": "678138b93734560f2da0ecaf",
            "imie": "Joanna",
            "nazwisko": "Krawczyk"
        },
        "id_dentysty": {
            "_id": "678a69eafb808b637ed9abcc",
            "imie": "Mariusz",
            "nazwisko": "Warszawski",
            "specjalizacja": "Stomatologia chirurgiczna"
        },
        "data": "2025-01-20T00:00:00.000Z",
        "platnosc": true,
        "koszt_wizyty": 500,
        "uwagi_wizyta": "Pacjent potrzebuje dodatkowej konsultacji",
        "dodanaPrzez": {
            "_id": "678a5dfa32f73ae6672bc6d6",
            "email": "filip@gmail.com"
        },
        "wykonane_zabiegi": [
            {
                "id_zabiegu": {
                    "_id": "6781391f3734560f2da0ecbb",
                    "nazwa": "Leczenie kanałowe",
                    "opis": "Usunięcie zainfekowanej miazgi z kanałów korzeniowych i ich szczelne wypełnienie.",
                    "cena": 600
                },
                "czas_trwania": "2 godziny",
                "koszt": 600,
                "_id": "678a6eb1a53d8bc1d4a7b784"
            }
        ],
        "__v": 0
    },
]
```

### **POST** `/wizyty`

### Expected Body
```json
{
    "pacjent": "678138d53734560f2da0ecb5",
    "dentysta": "678138853734560f2da0eca7",
    "data": "2025-01-20T10:00:00Z",
    "platnosc": true,
    "koszt_wizyty": 150,
    "uwagi_wizyta": "Wizyta standardowa z wypełnieniem ubytku.",
    "wykonane_zabiegi": [
        {
            "id_zabiegu": "678d0f9cd1110a6fd8618d82",
            "czas_trwania": "30 minut",
            "koszt": 150
        }
    ]
}
```


### Expected Respone 
```json
{
    "message": "Wizyta dodana pomyślnie!",
    "wizyta": {
        "_id": "678d13abf029feb624151121",
        "pacjent": "678138d53734560f2da0ecb5",
        "dentysta": "678138853734560f2da0eca7",
        "data": "2025-01-20T10:00:00.000Z",
        "platnosc": true,
        "koszt_wizyty": 150,
        "uwagi_wizyta": "Wizyta standardowa z wypełnieniem ubytku.",
        "dodanaPrzez": "678d13abf029feb624151122",
        "wykonane_zabiegi": [
            {
                "id_zabiegu": "678d0f9cd1110a6fd8618d82",
                "czas_trwania": "30 minut",
                "koszt": 150,
                "_id": "678d13abf029feb624151123"
            }
        ],
        "__v": 0
    }
}
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
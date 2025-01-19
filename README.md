# Dental office API - university project
> Back-end REST API used to manage a dental office's database

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Setup](#setup)
* [Api endpoints](#api-endpoints)
* [Register endpoints](#register-endpoint-for-the-role-user)
* [Dentysci endpoints](#dentysci-endpoints)
* [Pacjenci endpoints](#pacjenci-endpoints)
* [Wizyty endpoints](#wizyty-endpoints)
* [Zabiegi endpoints](#zabiegi-enpoints)
* [ZaplanowaneWizyty endpoints](#zaplanowane-wizyty-endpoints)
* [Project Status](#project-status)
* [Contact](#contact)


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
    "email": "example@gmail.com", // String, Unique, Required
    "password": "password123", // String, Required
    "name": "username" // String, Required
}
```

#### Expected Response
```json
{
    "message": "User registered successfuly",
    "userId": "678a5dfa32f73ae6672bc6d6"
}
```

## Login endpoint

### **POST** `/userRoutes/login`

### Expected Body
```json
{
    "email": "example@gmail.com", // String, Required
    "password": "password123", // String, Required
}
```


### Expected Response
```json
{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzhhNWRmYTMyZjczYWU2NjcyYmM2ZDYiLCJlbWFpbCI6ImZpbGlwQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM3MzE5NjMwLCJleHAiOjE3Mzc0MDYwMzB9.wKkVI2PTtYuTh3vTwhie2_6HyMdKH4NfdSKwnB_PbLY",
    "user": {
        "id": "678a5dfa32f73ae6672bc6d6",
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
    "email": "example@gmail.com", // String, Unique, Required
    "password": "password123", // String, Required
    "name": "username", // String, Required
    "role": "admin" // String
}
```

### Expected Response
```json
{
    "message": "User registered sucessfuly",
    "userId": "678a5dfa32f73ae6672bc6d6"
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
    "godziny_pracy": { // Object, Required
        "start": "06:30", // String, Required
        "end" : "14:30" // String, Required
    },
    "imie": "Janusz", // String, Required
    "nazwisko": "Kowalski", // String, Required
    "specjalizacja": "Chirurg szczękowy", // String, Required
    "telefon": "555666777", // String, Required
    "email": "JanuszKowal@gmail.com" // String, Required
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


Logged in users with the role "admin" may delete users from the database.


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


Logged in users with role "admin" may update dentists in the database.


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

Logged in user with any role may add new patients to the database.


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


Logged in user with any role may delete patients from the database.


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


Logged in user with any role may update patients in the database.


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
        "_id": "678d1924d272ce222587bf7d",
        "pacjent": {
            "_id": "678138d53734560f2da0ecb5",
            "imie": "Paweł",
            "nazwisko": "Nowosielski"
        },
        "dentysta": {
            "_id": "678a69eafb808b637ed9abcc",
            "imie": "Mariusz",
            "nazwisko": "Warszawski",
            "specjalizacja": "Stomatologia chirurgiczna"
        },
        "data": "2025-01-20T10:00:00.000Z",
        "platnosc": true,
        "koszt_wizyty": 800,
        "uwagi_wizyta": "Pierwsza wizyta - wybielanie zębów.",
        "wykonane_zabiegi": [
            {
                "id_zabiegu": {
                    "_id": "678139383734560f2da0ecbf",
                    "nazwa": "Wybielanie zębów",
                    "opis": "Profesjonalne wybielanie zębów przy użyciu preparatów na bazie nadtlenku wodoru.",
                    "cena": 800,
                    "czas_trwania": "1 godzina"
                },
                "czas_trwania": "1 godzina",
                "koszt": 800,
                "_id": "678d1924d272ce222587bf7e"
            }
        ],
        "__v": 0
    }
]
```

### **POST** `/wizyty`


Logged in user with any role may add new visits to the database.


### Expected Body
```json
{
    "pacjent": "678138d53734560f2da0ecb5", // String, Required
    "dentysta": "678a69eafb808b637ed9abcc", // String, Required
    "data": "2025-01-20", // Date, Required
    "platnosc": true, // Bool, Required
    "koszt_wizyty": 800, // Number, Required
    "uwagi_wizyta": "Pierwsza wizyta - wybielanie zębów.", // String
    "wykonane_zabiegi": [
        {
            "id_zabiegu": "678139383734560f2da0ecbf", // String, Required
            "czas_trwania": "1 godzina", // String, Required
            "koszt": 800 // Number, Required
        }
    ]
}
```


### Expected Respone 
```json
{
    "message": "Wizyta dodana",
    "wizyta": {
        "_id": "678d1924d272ce222587bf7d",
        "pacjent": "678138d53734560f2da0ecb5",
        "dentysta": "678a69eafb808b637ed9abcc",
        "data": "2025-01-20T10:00:00.000Z",
        "platnosc": true,
        "koszt_wizyty": 800,
        "uwagi_wizyta": "Pierwsza wizyta - wybielanie zębów.",
        "wykonane_zabiegi": [
            {
                "id_zabiegu": "678139383734560f2da0ecbf",
                "czas_trwania": "1 godzina",
                "koszt": 800,
                "_id": "678d1924d272ce222587bf7e"
            }
        ],
        "__v": 0
    }
}
```

### **DELETE** `/wizyty/:wizytaId`


Logged in user with any role may delete visits from the database.


### Expected Query

- **DELETE** `/wizyta/678d13abf029feb624151121`


### Expected Response
```json
{
    "message": "Wizyta została usunięta",
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


### **PATCH*** `/wizyty/:wizytaId`


Logged in user with any role may update visits in the database.


### Expected Query

- **PATCH** `/wizyta/678d1924d272ce222587bf7d`


### Expected Body
```json
{
    "koszt_wizyty": 750
}
```


### Expected Response
```json
{
    "message": "Wizyta zaktualizowana",
    "wizyta": {
        "_id": "678d1924d272ce222587bf7d",
        "pacjent": "678138d53734560f2da0ecb5",
        "dentysta": "678a69eafb808b637ed9abcc",
        "data": "2025-01-20T10:00:00.000Z",
        "platnosc": true,
        "koszt_wizyty": 750,
        "uwagi_wizyta": "Pierwsza wizyta - wybielanie zębów.",
        "wykonane_zabiegi": [
            {
                "id_zabiegu": "678139383734560f2da0ecbf",
                "czas_trwania": "1 godzina",
                "koszt": 800,
                "_id": "678d1924d272ce222587bf7e"
            }
        ],
        "__v": 0
    }
}
```


## Zabiegi enpoints

### **GET** `/zabiegi`

Logged in user with any role may download the list of procedures, and use filters to narrow down the search. Available query parameters:


| Parameter       | Type   | Description                                                                 |
|-----------------|--------|-----------------------------------------------------------------------------|
| `id_zabiegu`    | string | Filters procedures by procedure's id.                                       |
| `nazwa`         | string | Filters procedures by procedure's name (eg., "Usuwanie zęba").              |
| `opis`          | string | Filters procedures by procedure's description (eg., "Wyrywanie zęba siłą"). |
| `cena`          | string | Filters procedures by procedure's price (eg., 200).                         |
| `minCena`       | string | Filters procedures by minimum price (eg., 100).                             |
| `maxCena`       | string | Filters procedures by maximum price (eg., 500).                             |


### Few example uses of query filters:

#### **Download procedures by procedure's Id:**

- **GET** `/zabiegi?id_zabiegu=6781310569a7fe63f47ef015`

#### **Download procedures by procedure's name "Usuwanie kamienia nazębnego": (please note that you may abbreviate the name)**

- **GET** `/zabiegi?nazwa=Usuwanie kamienia nazębnego`
- **GET** `/zabiegi?nazwa=Usuwanie` (abbreviated form)

#### **Download procedures by procedure's price "200":**

-**GET** `/zabiegi?cena=200`

#### **Download procedures by a price range of "200" to "500":**

-**GET** `/zabiegi?minCena=200&maxCena=500`


### Expected response for **GET** `/zabiegi`
```json
[
    {
        "_id": "678139143734560f2da0ecb9",
        "nazwa": "Wypełnienie zęba",
        "opis": "Rekonstrukcja ubytku w zębie przy użyciu materiału kompozytowego.",
        "cena": 190,
        "czas_trwania": "40 minut",
        "__v": 0
    }
]
```


### **POST** `/zabiegi`

Logged in user with the role "admin" may add new procedures to the database.

### Expected Body
```json
{
    "nazwa": "Fluoryzacja zębów", // String, Required
    "opis": "Pokrycie zębów specjalnym preparatem zawierającym fluor w celu wzmocnienia szkliwa i zapobiegania próchnicy.", // String, Required
    "cena": 120, // Number, Required
    "czas_trwania": "15 minut" // String, Required
}
```


### Expected Response
```json
{
    "message": "Zabieg dodany",
    "zabieg": {
        "_id": "678d58354a9a79f31ddfa079",
        "nazwa": "Fluoryzacja zębów",
        "opis": "Pokrycie zębów specjalnym preparatem zawierającym fluor w celu wzmocnienia szkliwa i zapobiegania próchnicy.",
        "cena": 120,
        "czas_trwania": "15 minut",
        "__v": 0
    }
}
```


### **DELETE** `/zabiegi/:zabiegId`

Logged in user with the role "admin" may delete procedures from the database.

### Expected Query

- **DELETE** `/zabiegi/678d0f9cd1110a6fd8618d82`


### Expected Response
```json
{
    "message": "Zabieg usunięty"
}
```


### **PATCH** `/zabiegi/:zabiegId`

Logged in user with the role "admin" may update procedures in the database.

### Expected Query

- **PATCH** `/zabiegi/678d58354a9a79f31ddfa079`

### Expected Body
```json
{
    "cena": 130,
    "czas_trwania": "20 minut"
}
```

### Expected Response
```json
{
    "message": "Zabieg zaktualizowany",
    "zabieg": {
        "_id": "678d58354a9a79f31ddfa079",
        "nazwa": "Fluoryzacja zębów",
        "opis": "Pokrycie zębów specjalnym preparatem zawierającym fluor w celu wzmocnienia szkliwa i zapobiegania próchnicy.",
        "cena": 130,
        "czas_trwania": "20 minut",
        "__v": 0
    }
}
```

## Zaplanowane wizyty Endpoints


### **GET** `/zaplanowaneWizyty`

Logged in user with any role may download the list of planned visits, and use filters to narrow down the search. Available query parameters:

| Parameter       | Type   | Description                                                                  |
|-----------------|--------|------------------------------------------------------------------------------|
| `id`            | string | Filters planned visits by planned visit's id.                                |
| `imie`          | string | Filters planned visits by patient's name (eg., "Zofia").                     |
| `nazwisko`      | string | Filters planned visits by patient's surname (eg., "Wójcik").                 |
| `email`         | string | Filters planned visits by patient's email (eg., "zofia.wojcik@example.com"). | 
| `zrealizowana`  | bool   | Filters planned visits by the visit's status (eg., "true", "false").         |
|`telefon`        | string | Filters planned visits by patient's phone number (eg., "666777888").         |

### Few example uses of query filters:


#### Download planned visits by planned visit's id

- **GET** `/zaplanowaneWizyty?id=67867ff6fb259ac5e1c01930`

#### Download planned visits by patient's name "Zofia"

- **GET** `/zaplanowaneWizyty?imie=Zofia`

#### Download planned visits by patient's name "Zofia" and surname "Wójcik"

- **GET** `/zaplanowaneWizyty?imie=Zofia&nazwisko=Wójcik`

#### Download planned visits by patient's email "zofia.wojcik@example.com"

- **GET** `/zaplanowaneWizyty?email=zofia.wojcik@example.com`

#### Download planned visits by status "true"

- **GET** `/zaplanowaneWizyty?zrealizowana=true

### Expected response for **GET** `/zaplanowaneWizyty
```json
[
    {
        "_id": "67867f23539af774a9422808",
        "pacjent": {
            "_id": "678138ca3734560f2da0ecb3",
            "imie": "Zofia",
            "nazwisko": "Wójcik",
            "email": "zofia.wojcik@example.com"
        },
        "termin": "2025-01-15T10:00:00.000Z",
        "lekarz": {
            "_id": "678138853734560f2da0eca7",
            "imie": "Katarzyna",
            "nazwisko": "Wiśniewska",
            "specjalizacja": "stomatolog ogólny"
        },
        "potwierdzona": true,
        "zrealizowana": false,
        "__v": 0
    }
]
```

### **POST** `/zaplanowaneWizyty`

Logged in user with any role may add new planned visits to the database.

#### Expected Body
```json
{
    "pacjent": "678138c13734560f2da0ecb1", // String, Required
    "lekarz": "678138a13734560f2da0ecab", // String, Required
    "termin": "2025-07-30", // Date, Required
    "potwierdzona": "false", // Bool, Required
    "zrealizowana": "false" // Bool, Required
}
```

#### Expected Response
```json
[
    {
        "_id": "678d5f359246b888874575b9",
        "pacjent": {
            "_id": "678138c13734560f2da0ecb1",
            "imie": "Michał",
            "nazwisko": "Czarnecki",
            "telefon": "666777888",
            "email": "michal.czarnecki@example.com"
        },
        "termin": "2025-07-30T00:00:00.000Z",
        "lekarz": {
            "_id": "678138a13734560f2da0ecab",
            "imie": "Magdalena",
            "nazwisko": "Nowicka",
            "specjalizacja": "endodonta"
        },
        "potwierdzona": false,
        "zrealizowana": false,
        "dodanaPrzez": "678a64a3ff3c121b0d5151c7",
        "__v": 0
    }
]
```


### **DELETE** `/zaplanowaneWizyty/:wizytaId`

Logged in user with any role may delete planned visits from the database.

#### Expected Query

- **DELETE** `/zaplanowaneWizyty/678a74715a81bb5af3bac3a1

#### Expected Response
```json
{
    "message": "Zaplanowana wizyta została usunięta",
    "wizyta": {
        "_id": "678a74715a81bb5af3bac3a1",
        "pacjent": "678138ca3734560f2da0ecb3",
        "telefon": "777888999",
        "termin": "2025-02-17T12:00:00.000Z",
        "lekarz": "678138943734560f2da0eca9",
        "potwierdzona": true,
        "zrealizowana": false,
        "dodanaPrzez": "678a5dfa32f73ae6672bc6d6",
        "__v": 0
    }
}
```


### **PATCH** `/zaplanowaneWizyty/:wizytaId`

Logged in user with any role may update planned visits in the database.


#### Expected Query

- **PATCH** `/zaplanowaneWizyty/678d5f359246b888874575b9`


#### Expected Body
```json
{
    "potwierdzona": "true",
    "zrealizowana": "true"
}
```


#### Expected Response
```json
{
    "message": "Zaplanowana wizyta zaktualizowana",
    "wizyta": {
        "_id": "678d5f359246b888874575b9",
        "pacjent": "678138c13734560f2da0ecb1",
        "termin": "2025-07-30T00:00:00.000Z",
        "lekarz": "678138a13734560f2da0ecab",
        "potwierdzona": true,
        "zrealizowana": true,
        "dodanaPrzez": "678a64a3ff3c121b0d5151c7",
        "__v": 0
    }
}
```

## Project Status
Project is: _complete_

## Contact
Created by Srippo (filip.szreder.slupsk@gmail.com) and PiasKar (piaskar2004@gmail.com) - feel free to contact us!
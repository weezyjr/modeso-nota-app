# modeso-nota-app

Nota (note in Latin) is a note-taking service,  which is available on the web. Nota offers users to create notes, and share their notes with their friends.

## Live production
[nota-modeso](http://nota-modeso.ml).

## backend

a stack of express as web application framework for Node.js, sequalize as promise-based ORM for database. 

### run backend server

run the following command lines

` cd api `

` npm i `

` node app `

### run tests

` npm run test `

### backend production


#### create and edit .env file

` nano .env`

#### config .env file

Add the following configurations:

`SERVER=` your backend server url (e.g. example.com)

`PORT=` port (e.g. 3000)

`HOST_URL=` http://your_server_url:port (e.g. http://example:3000)

`DB_DIALECT=mysql`

`DB_HOST=` your database url (e.g. example.com)

`DB_PORT=` your database port (default is 3306)

`DB_USER=` your database username (e.g. root)

`DB_PASS=` your databse password

`DB_NAME=Nota`

`JWT_SECRET`= generate your own JWT secret code and save it here.

### backend documentation

[postman docs](https://documenter.getpostman.com/view/2667398/S17jWruX).


## Database

Mysql database named `Nota` it have 2 tables `Users` and `Note` where a user can create many notes but a note is created by 1 user, also the note can be shared with many users.

![ERD](https://i.imgur.com/cHNwPD5.png)

### Relationship

NOTE `M -> 1` USER
many to 1 relationship

### keys
- `user.id` is a primary key
- `note.id` is a primary key
- `note.author` is a `f.k.` reference to `user.username`
- `user.username` is unique
- `user.email` is unique


## Front-end

the front-end is responsive so it works fine on small, medium and large devices.

used a stack of angular as web framework, bootstrap as styling framework

### run the front-end

run the following commands: 

` cd frontend `

` npm i `

` ng serve `


### run tests

` ng test `

### deploy the front-end

edit `environment.prod.ts` file as the following

`apiHost: http://YOUR_BACKEND_URL:PORT/api/v1/`

run the following command to build

` ng build --prod `

# Outbrand Webcam Coding Assessment

This is a fullstack application made with Angular 17, Prime NG, Express, a Firebase realtime database, and Firebase cloud storage. This application also uses the RecordRTC and bcryptjs libraries. This is my first time working with Angular.

If you are afraid to enter made up credentials register account.......

Use these:

username: jason.kei.hall@gmail.com
password: password

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Frontend](#frontend)
- [Backend](#backend)
- [Deployment](#deployment)
- [Testing](#testing)
- [Bugs](#bugs)
- [License](#license)

## Features

Users can Create an account and log in. Once a user registers, their passsword is hashed and a user object is created in the database. User registration and login logic are handled in express, and are custom for this project. I've gotten a little spoiled working with Django and PostgreSQL. Once a user logs in a userEmail object is created in localStorage, containing the user's email address, and this localStorage object is used for user authentication. This site has a protected route, the webcam-demo route. After logging in, users can access the webcam-demo route and record a webcam video with audio. Afterwards they can review that video. Multiple videos can be displayed to be reviewed and or deleted. One video can then be saved to Firebase Cloud Storage. The site uses toast messages to let the user know if certain actions we completely successfully or not. Once the user logs out the localStorage object is deleted.

Webcam recording. To add webcam recording to an existing angular 17 application:

Before you begin ensure you have node.js, npm, and the Angular CLI installed. install RecordRTC using npm i recordrtc. Verify its been added to your package.json file.

next import RecordRTC.

RecordRTC has documentation on how to use it: https://recordrtc.org/

Now, when you try to use RecordRTC in Angular 17, your application will crash!

If you get an Uncaught TypeError: URL is not a constructor error, then follow these instructions to fix it:

open up your node modules, find the recordrtc folder, and open up RecordRTC.js.

Search for these lines of code:

/_jshint -W079 _/
var URL = window.URL;

change it to this:

/_jshint -W079 _/
// var URL = window.URL;
function URL(url, base) {
this.url = url;
this.base = base;
return window.URL
}

save the RecordRTC.js file and close it up. Now you should be free of that error.

## Technologies

- Frontend

  - Angular 17
  - Prime NG

- Backend
  - Express
  - Firebase
    - Firebase Realtime Database
    - Firebase Cloud Storage

## Getting Started

The Project code can be found here: https://github.com/Jkhall81/outbrand-intern-challenge. To use this project you need a firebase account, and have to set up a realtime database, and cloud storage service.
https://firebase.google.com/docs

## Frontend

This project's front end was created using Angular and Prime NG.

https://roach-hotel-booking.vercel.app/

## Backend

The backend for this project use express and Firebase.

## Deployment

Work in progress.

## Testing

Work in progress.

## Bugs

Have a console message about missing import for an animation when toast messages appear. App performance is not affected.

## License

This project use an MIT license.

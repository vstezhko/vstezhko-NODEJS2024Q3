# CRUD API Application

This is a CRUD API application built with Node.js and TypeScript. It allows users to perform basic CRUD operations on user data.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)

## Features

- Create, read, update, and delete users.
- Users are stored in the specified format.

## Installation

   ```bash
   git clone git@github.com:vstezhko/vstezhko-NODEJS2024Q3.git
   git checkout crud-api
   ```

## Configuration

Describe any environment variables that need to be set, such as PORT

## Running-the-application

Installation Instructions:

   ```bash
   npm install
   ```

Start Development Mode:

   ```bash
    npm run start:dev
   ```

Start Production Mode: 

   ```bash
    npm run start:prod
   ```

## Api-endpoints

 - GET /api/users: Retrieve a list of all users.
 - POST /api/users: Create a new user.
 - GET /api/users/{userId}: Retrieve a user by their ID.
 - PUT /api/users/{userId}: Update a user's information.
 - DELETE /api/users/{userId}: Remove a user by their ID.

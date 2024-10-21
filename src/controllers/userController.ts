import { IncomingMessage, ServerResponse } from 'http';
import {createUser, getUser, deleteUser, getUsers, updateUser} from '../models/user';
import { validate as isUuid } from 'uuid';
import { v4 as uuidv4 } from 'uuid';

export const createUserController = async (req: IncomingMessage, res: ServerResponse) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', () => {

        const { username, age, hobbies } = JSON.parse(body);

        if (!username || typeof username !== 'string') {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid or missing required field: username' }));
            return;
        }

        if (typeof age !== 'number') {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid or missing required field: age' }));
            return;
        }

        if (!Array.isArray(hobbies) || !hobbies.every(hobby => typeof hobby === 'string')) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid or missing required field: hobbies (must be an array of strings)' }));
            return;
        }

        const user = createUser(uuidv4(), username, age, hobbies);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));

    });
};

export const getUserController = (req: IncomingMessage, res: ServerResponse, id: string) => {

    if (!isUuid(id)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid userId: must be a valid UUID' }));
        return;
    }

    const user = getUser(id);
    if (user) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
    }
};

export const getUsersController = (req: IncomingMessage, res: ServerResponse) => {
    const users = getUsers();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
};


export const updateUserController = async (req: IncomingMessage, res: ServerResponse, id: string) => {
    let body = '';

    if (!isUuid(id)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid userId: must be a valid UUID' }));
        return;
    }

    const user = getUser(id);
    if (!user) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `User with id ${id} not found` }));
        return;
    }

    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', () => {

        const { username, age, hobbies } = JSON.parse(body);

        if (!username || typeof username !== 'string') {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid or missing required field: username' }));
            return;
        }

        if (typeof age !== 'number') {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid or missing required field: age' }));
            return;
        }

        if (!Array.isArray(hobbies) || !hobbies.every(hobby => typeof hobby === 'string')) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid or missing required field: hobbies (must be an array of strings)' }));
            return;
        }

        const updatedUser = updateUser(id, { username, age, hobbies });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updatedUser));

    });
};

export const deleteUserController = (req: IncomingMessage, res: ServerResponse, id: string) => {

    if (!isUuid(id)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid userId: must be a valid UUID' }));
        return;
    }

    const success = deleteUser(id);

    if (success) {
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User deleted' }));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
    }
};

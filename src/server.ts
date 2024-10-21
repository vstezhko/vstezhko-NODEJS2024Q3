import { createServer, IncomingMessage, ServerResponse } from 'http';
import {
    createUserController,
    getUserController,
    deleteUserController,
    getUsersController, updateUserController
} from './controllers/userController';
import { parse } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const handleRequest = (req: IncomingMessage, res: ServerResponse) => {

    try {
        const parsedUrl = parse(req.url || '', true);
        const path = parsedUrl.pathname || '';
        const method = req.method || '';

        if (method === 'POST' && path === '/api/users') {
            createUserController(req, res);
        } else if (method === 'GET' && path.startsWith('/api/users/')) {
            const id = path.split('/')[3];
            getUserController(req, res, id);
        } else if (method === 'GET' && path.startsWith('/api/users')) {
            getUsersController(req, res)
        } else if (method === 'DELETE' && path.startsWith('/api/users/')) {
            const id = path.split('/')[3];
            deleteUserController(req, res, id);
        } else if (method === 'PUT' && path.startsWith('/api/users/')) {
            const id = path.split('/')[3];
            updateUserController(req, res, id);
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Route not found' }));
        }

    } catch (error) {
        console.error('Error processing request:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal server error' }));
    }
};

export const server = createServer(handleRequest);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

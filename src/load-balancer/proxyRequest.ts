import { IncomingMessage, ServerResponse } from 'http';
import http from 'http';

let currentWorkerIndex = 0;
const workers = [4001, 4002, 4003];

export const proxyRequest = (req: IncomingMessage, res: ServerResponse) => {
    const workerPort = workers[currentWorkerIndex];
    currentWorkerIndex = (currentWorkerIndex + 1) % workers.length;

    const options = {
        hostname: 'localhost',
        port: workerPort,
        path: req.url,
        method: req.method,
        headers: req.headers
    };

    const proxy = http.request(options, (workerRes) => {
        res.writeHead(workerRes.statusCode || 200, workerRes.headers);
        workerRes.pipe(res, { end: true });
    });

    req.pipe(proxy, { end: true });
};

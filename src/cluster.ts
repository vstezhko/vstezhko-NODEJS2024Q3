import cluster from 'cluster';
import os from 'os';
import { createServer } from 'http';
import { proxyRequest } from './load-balancer/proxyRequest';

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < numCPUs - 1; i++) {
        cluster.fork();
    }

    createServer(proxyRequest).listen(4000, () => {
        console.log('Load balancer is listening on port 4000');
    });

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    require('./server');
}

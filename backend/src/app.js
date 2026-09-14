import express from 'express';
import clientRoutes from './routes/client.routes.js';
import vehicleRoutes from './routes/vehicle.routes.js';

const app = express();


app.use(express.json());


app.use('/api/clients', clientRoutes);
app.use('/api/vehicles', vehicleRoutes);

export default app;
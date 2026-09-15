import express from 'express';
import clientRoutes from './routes/client.routes.js';
import vehicleRoutes from './routes/vehicle.routes.js';
import osRoutes from './routes/os.routes.js';

const app = express();


app.use(express.json());


app.use('/api/clients', clientRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/os', osRoutes);


export default app;
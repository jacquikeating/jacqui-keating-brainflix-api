import express from 'express';
import cors from 'cors';
import fs from 'fs';
import uniqid from 'uniqid';
import 'dotenv/config';
import videoRoutes from './routes/videos.js';


const app = express();

let { PORT } = process.env;
PORT = PORT || 8080;
app.use(cors()); 

app.get('/healthcheck', (_req, res) => {
	res.send("If you're reading this, the server is running!");
});

app.use('/', videoRoutes);

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}.`);
});
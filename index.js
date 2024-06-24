import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import videoRoutes from './routes/videos.js';


const app = express();

let { PORT } = process.env;
PORT = PORT || 8080;
app.use(cors());
app.use(express.json());

app.get('/healthcheck', (_req, res) => {
	res.send("If you're reading this, the server is running!");
});

app.use('/', videoRoutes);

app.use(express.static("./public/images"));

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}.`);
});
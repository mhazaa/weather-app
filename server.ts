import express from 'express';
import { resolve } from 'path';
const PORT = 3000;
const app = express();
app.listen(PORT, () => console.log(`Listening to port: ${PORT}`));
app.use(express.json());
app.use(express.static(resolve('./build')));
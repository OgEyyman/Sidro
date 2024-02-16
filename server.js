import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

let postData = [];

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/test-web-service', (req, res) => {
  res.json(postData);
})

app.use(express.json());

app.post('/test-web-service', (req, res) => {
  postData.push(req.body);
  res.json({ message: "POST request received", receivedData: req.body});
});

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); })
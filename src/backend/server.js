const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use('/data', express.static(path.join(__dirname, '../data')));

app.post('/button-click', (req, res) => {
  console.log('Button was pressed');
  res.sendStatus(200);
});

app.get('/generate-file', (req, res) => {
  const words = ['foo', 'bar', 'mongus'];
  const randomWord = words[Math.floor(Math.random() * words.length)];
  const filePath = path.join(__dirname, '../data/randomWord.txt');

  fs.mkdir(path.dirname(filePath), { recursive: true }, (err) => {
    if (err) {
      console.error('Error creating directory:', err);
      return res.status(500).send('Error generating file');
    }

    fs.writeFile(filePath, randomWord, (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).send('Error generating file');
      }
      res.send('File generated with word: ' + randomWord);
    });
  });
});

app.get('/scrape-data', async (req, res) => {
  const { date, roll } = req.query;
  const fileName = `${date}roll${roll}.xml`;
  const filePath = path.join(__dirname, '../data', fileName);

  try {
    const url = `https://clerk.house.gov/evs/${date}/roll${roll}.xml`;
    const response = await axios.get(url);
    const xmlData = response.data;

    fs.writeFile(filePath, xmlData, (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).send('Error saving XML file');
      }
      res.send(`XML data scraped and saved as ${fileName}`);
    });
  } catch (error) {
    console.error('Error scraping data:', error);
    res.status(500).send('Error scraping data');
  }
});

app.get('/check-file', (req, res) => {
  const { fileName } = req.query;
  const filePath = path.join(__dirname, '../data', fileName);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    res.json({ exists: !err });
  });
});

app.get('/files', (req, res) => {
  const dataDir = path.join(__dirname, '../data');

  fs.readdir(dataDir, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return res.status(500).send('Error reading directory');
    }
    res.json(files);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
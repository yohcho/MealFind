const express = require('express');
const scrape = require('./scraper')

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/scrape', async (req, res) => {
    const results = await scrape()
    res.send(results)
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {});
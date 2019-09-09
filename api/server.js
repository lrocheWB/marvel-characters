const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('marvel-api');

const marvel = api.createClient({
  publicKey: process.env.MARVEL_PUBLIC_KEY,
  privateKey: process.env.MARVEL_PRIVATE_KEY
});

const config = {
  name: 'Smartrenting-marvel-api',
  port: 3000,
  host: '0.0.0.0'
};

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/v1/marvel/characters', (req, res, next) => {
  marvel.characters
    .findAll(req.query.limit || 10, req.query.offset || 0)
    .then(response => {
      res.json(response);
      next();
    })
    .fail(function(error) {
      console.error(error);
      res.status(500).json({ error: 'uh oh' });
      next();
    })
    .done();
});

app.get('/v1/marvel/characters/:id', (req, res, next) => {
  marvel.characters
    .find(req.params.id)
    .then(response => {
      res.json(response);
      next();
    })
    .fail(function(error) {
      console.error(error);
      res.status(500).json({ error: 'uh oh' });
      next();
    })
    .done();
});

app.listen(config.port, config.host, e => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  console.info(`${config.name} running on ${config.host}:${config.port}`);
});

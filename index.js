const bodyParser = require('body-parser');
const express = require('express');
const connection = require('./config.js');
const app = express();
const port = 3000;

// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

// ROOT ROUTE
app.get('/', (request, response) => {
  response.send('Bienvenue sur Express');
});

//GET ALL MOVIES
app.get('/api/movies', (request, response) => {
  connection.query('SELECT * FROM movies', (error, results) => {
    if (error) {
      response.status(500).send('Erreur lors de la récupération des movies'):
    } else {
      response.send(results);
    }
  });
});

//GET ALL MOVIE NAMES
app.get('/api/movies/names', (request, response) => {
  connection.query('SELECT movie_name FROM movies', (error, results) => {
    if (error) {
      response.status(500).send('Erreur lors de la récupération des movie names');
    } else {
      response.send(results);
    }
  });
});

//GET A MOVIE BY ID
app.get('/api/movies/:id', (request, response) => {
  connection.query('SELECT movie_name FROM movies', (error, results) => {
    if (error) {
      response.status(500).send('Erreur lors de la récupération des movie names');
    } else {
      response.send(results);
    }
  });
});

//INSERT A MOVIE
app.post('/api/movies', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO movies SET ?', formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'un movie");
    } else {
      res.sendStatus(200);
    }
  });
});

//UPDATE A MOVIE BY ID
app.put('/api/movies/:id', (req, res) => {
  const movieId = req.params.id;
  const isAdult = req.query.isAdult;
  const formData = req.body;

  //MODIFY `isAdult` STATE OF A MOVIE
  if (adultMovie) {
    connection.query('UPDATE movies SET ? WHERE id = ?', [!isAdult, movieId], err => {
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        console.log(err);
        res.status(500).send("Erreur lors de la modification d'un movie");
      } else {

        // Si tout s'est bien passé, on envoie un statut "ok".
        res.sendStatus(200);
      }
    });
  } else {
    // connection à la base de données, et insertion de l'movie
    connection.query('UPDATE movies SET ? WHERE id = ?', [formData, movieId], err => {

      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        console.log(err);
        res.status(500).send("Erreur lors de la modification d'un movie");
      } else {

        // Si tout s'est bien passé, on envoie un statut "ok".
        res.sendStatus(200);
      }
    });
  }
});

//DELETE ALL MOVIES
app.delete('/api/movies/', (req, res) => {
  const movieId = req.params.id;

  // connexion à la base de données, et suppression de l'movie
  connection.query('DELETE FROM movies', err => {

    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la suppression des movies");
    } else {

      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});

//DELETE A MOVIE BY ID
app.delete('/api/movies/:id', (req, res) => {
  const movieId = req.params.id;

  // connexion à la base de données, et suppression de l'movie
  connection.query('DELETE FROM movies WHERE id = ?', [movieId], err => {

    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un movie");
    } else {

      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});

app.listen(port, (error) => {
  if (error) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});

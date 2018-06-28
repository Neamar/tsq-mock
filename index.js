'use strict';

const express = require('express');

const app = express();


app.post('/question/:id', (req, res) => {
  console.log('Posted answer');
  res.send('POSTED answer');
});


app.get('/leaderboard', (req, res) => {
  console.log('Asked for leaderboard');
  res.send([
    {
      rank: 1,
      name: 'Matthieu',
      id: 123,
      points: 10,
    },
    {
      rank: 2,
      name: 'Alberto',
      id: 456,
      points: 5,
    }
  ]);
});


app.post('/username/:id', (req, res) => {
  console.log('Received username');
  res.send('POSTED answer');
});

app.listen(process.env.PORT || 3000, () => console.log('Mock listening!'));


module.exports.signalNewQuestion = function() {
  // {question: "Test", answers: ["Foo", "Bar"], timeout: 5, id: 1}
};


module.exports.signalLeaderboardUpdate = function() {
  // {id: 123}
};


module.exports.signalGameEnded = function() {
  // {id: 123, rank: 5, playerCount: 10}
};

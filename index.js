'use strict';

const express = require('express');
const GCM = require('gcm').GCM;
const app = express();


var gcm = new GCM(process.env.GCM_KEY);

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


app.post('/users', (req, res) => {
  console.log('Received username');
  res.send({ok: true});
});

app.listen(process.env.PORT || 3000, () => console.log('Mock listening!'));



app.get('/fake/new_question', function(req, res) {
  // {question: "Test", answers: ["Foo", "Bar"], timeout: 5, id: 1}
  const message = {
    registration_id: 'eBjNyz5Pg90:APA91bEi2IPqklgAJchcB1Er-tv-GjXQrtwRPIOQy4V_SkfDR6jhWlI95DjWbNR1A4IRbCWr2B3dtmNQ0U89hf96_JKbEVobr7cDYxjwYw_xhrQ-Gy9REhHgwJQVzpYYaMwI09O9_V-MeZRod29YrRqO_lLpeGyeSw',
    'data.type': 'new_question',
    'data.timeout': 5,
    'data.question_id': 1,
    'data.question': 'Test',
    'data.answers': ['Foo', 'Bar']
  };

  gcm.send(message, function(err, messageId) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Sent with message ID: ', messageId);
      res.send(messageId)
    }
  });
});


module.exports.signalLeaderboardUpdate = function() {
  // {id: 123}
};


module.exports.signalGameEnded = function() {
  // {id: 123, rank: 5, playerCount: 10}
};

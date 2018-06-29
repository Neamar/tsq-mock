'use strict';

const express = require('express');
const GCM = require('gcm').GCM;
const app = express();


var gcm = new GCM(process.env.GCM_KEY);

app.post('/questions/:id', (req, res) => {
  console.log('Posted answer');
  res.send({ok: true});
});

app.get('/questions/:id/stats', (req, res) => {
  res.send({
    question: 'This was my question',
    answers: [
      {
        answer: 'Foo',
        count: 3
      },
      {
        answer: 'Bar',
        count: 6
      }
    ]
  });
});

app.get('/leaderboard', (req, res) => {
  console.log('Asked for leaderboard');
  let a = [
    {
      rank: 1,
      name: 'Matthieu',
      id: 123,
      points: Math.round(1000 * Math.random()),
    },
    {
      rank: 2,
      name: 'Alberto',
      id: 456,
      points: Math.round(800 * Math.random()),
    },
    {
      rank: 2,
      name: 'Tatiana',
      id: 456,
      points: Math.round(600 * Math.random()),
    },
    {
      rank: 2,
      name: 'Stéphane',
      id: 456,
      points: Math.round(500 * Math.random()),
    },
    {
      rank: 2,
      name: 'Paulie',
      id: 456,
      points: Math.round(500 * Math.random()),
    }
  ];

  a.sort((a,b) => b.points - a.points);
  a.forEach((a, i) => a.rank = i + 1);
  res.send(a);
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
    time_to_live: 0,
    'data.type': 'new_question',
    'data.timeout': 5,
    'data.question_id': 1,
    'data.question': 'Alberto or foo or bar?',
    'data.answers': "['Foo', 'Bar']"
  };

  gcm.send(message, function(err, messageId) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Sent with message ID: ', messageId);
      res.send(messageId);
    }
  });
});



function send(message, res) {
  gcm.send(message, function(err, messageId) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Sent with message ID: ', messageId);
      res.send({id:messageId, message: message});
    }
  });
}

app.get('/', function(req, res) {
  res.send(`<a href="/fake/new_question" target="_blank">Send question</a> <a href="/fake/leaderboard_update" target="_blank">Send leaderboard update</a> <a href="/fake/game_ended" target="_blank">Send game end</a>`)
});

app.get('/fake/new_question', function(req, res) {
  // {question: "Test", answers: ["Foo", "Bar"], timeout: 5, id: 1}
  const message = {
    registration_id: 'eBjNyz5Pg90:APA91bEi2IPqklgAJchcB1Er-tv-GjXQrtwRPIOQy4V_SkfDR6jhWlI95DjWbNR1A4IRbCWr2B3dtmNQ0U89hf96_JKbEVobr7cDYxjwYw_xhrQ-Gy9REhHgwJQVzpYYaMwI09O9_V-MeZRod29YrRqO_lLpeGyeSw',
    time_to_live: 0,
    'data.type': 'new_question',
    'data.timeout': 5,
    'data.question_id': 1,
    'data.question': 'Alberto or foo or bar' + Math.random() + '?',
    'data.answers': `[{"answer":"Foo", "percentage": 25}, {"answer":"Bar", "percentage": 25}]`
  };

  send(message, res);
});

app.get('/fake/leaderboard_update', function(req, res) {
  const message = {
    registration_id: 'eBjNyz5Pg90:APA91bEi2IPqklgAJchcB1Er-tv-GjXQrtwRPIOQy4V_SkfDR6jhWlI95DjWbNR1A4IRbCWr2B3dtmNQ0U89hf96_JKbEVobr7cDYxjwYw_xhrQ-Gy9REhHgwJQVzpYYaMwI09O9_V-MeZRod29YrRqO_lLpeGyeSw',
    time_to_live: 0,
    'data.type': 'leaderboard_update'
  };

  send(message, res);
});



app.get('/fake/game_ended', function(req, res) {
  const message = {
    registration_id: 'eBjNyz5Pg90:APA91bEi2IPqklgAJchcB1Er-tv-GjXQrtwRPIOQy4V_SkfDR6jhWlI95DjWbNR1A4IRbCWr2B3dtmNQ0U89hf96_JKbEVobr7cDYxjwYw_xhrQ-Gy9REhHgwJQVzpYYaMwI09O9_V-MeZRod29YrRqO_lLpeGyeSw',
    time_to_live: 0,
    'data.type': 'game_ended',
    'data.rank': 1,
    'data.score': 55
  };

  send(message, res);
});

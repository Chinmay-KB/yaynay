const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const db = require('./init_db');
const PORT = process.env.PORT || 5000;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(express.json());

// Handle GET requests to /api route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from my side!' });
});

// All other GET requests not handled before will return our React app
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get('/getData', async (req, res) => {
  const getData = await db.collection('yaynay').doc('data').get();
  return res.send(
    JSON.stringify({
      yay: getData.get('yay'),
      nay: getData.get('nay'),
    })
  );
});

app.post('/vote', async (req, res) => {
  const isUserPresent = await db
    .collection('yaynay')
    .where('email', '==', req.body['identifier'])
    .get();
  if (isUserPresent.empty) {
    const voteYay = Math.floor(Math.random() * 10) % 2 == 0 ? true : false;
    db.collection('yaynay').doc().set({
      email: req.body['identifier'],
      vote_yay: voteYay,
    });
    const getData = await db.collection('yaynay').doc('data').get();
    if (voteYay)
      await db
        .collection('yaynay')
        .doc('data')
        .update({ yay: getData.get('yay') + 1 });
    else
      await db
        .collection('yaynay')
        .doc('data')
        .update({ nay: getData.get('nay') + 1 });
    return res.send(
      JSON.stringify({
        success: true,
        message: 'You have randomly voted for ' + voteYay ? 'Yay' : 'Nay',
      })
    );
  }
  return res.send(
    JSON.stringify({
      success: false,
      message: 'Alredy voted randomly with this email',
    })
  );
});

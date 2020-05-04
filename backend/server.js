const express = require('express');
const cors = require('cors');
const app = express();

app.set('port', process.env.PORT || 3001);
app.use(cors());
app.locals.title = 'Booking Flow Automation';

app.get('/', (request, response) => {
  response.json('Welcome to the Booking Flow Automation Tool!');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
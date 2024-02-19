const express = require('express');
const bodyParser = require('body-parser');
const { YoutubeTranscript } = require('youtube-transcript');
const { parseISO, format, getDay } = require('date-fns');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/getTranscript', (req, res) => {
  // Your existing code for fetching the YouTube transcript goes here...
});

app.post('/getWeekday', (req, res) => {
  const dateString = req.body.date; // Assuming the date comes in the body of the POST request
  if (!dateString) {
    return res.status(400).send({ error: 'No date provided' });
  }

  const date = parseISO(dateString);
  if (isNaN(date)) {
    return res.status(400).send({ error: 'Invalid date provided' });
  }  const weekday = format(date, 'EEEE'); // Get the weekday name (e.g. "Monday", "Tuesday", etc.)
  res.status(200).json({
    date: dateString,
    weekday: weekday
  });
});const PORT = 20388; // Port the server will listen on
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
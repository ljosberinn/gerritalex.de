const music = require('../../music.json')
  .filter((dataset) => !dataset.hidden)
  .reverse();

export default async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.json(music);
}

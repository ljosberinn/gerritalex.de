const concerts = require('../../concerts.json')
  .reduce((carry, { artist, venue, date, concert }) => {
    // reduce to {artist: ..., shows: [showArr]}
    const previousEntry = carry.find((dataset) => dataset.artist === artist);

    if (!previousEntry) {
      return carry.concat({ artist, shows: [{ venue, date, concert }] });
    }

    return carry.map((dataset) => {
      if (dataset.artist === artist) {
        return {
          ...dataset,
          shows: dataset.shows.concat({ venue, date, concert }),
        };
      }

      return dataset;
    });
  }, [])
  .sort(
    (a, b) => (new Date(a.shows[0].date) < new Date(b.shows[0].date) ? 1 : -1), // sort DESC
  )
  .map((dataset) => ({ ...dataset, shows: dataset.shows.reverse() })); // reverse shows

export default async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.json(concerts);
}

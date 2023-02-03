export default async function (req, res) {
  return new Promise(function (resolve, reject) {
    try {
      fetch('https://17e622c9569e3fa85e0e3247f346ce6d-17523.sites.k-hosting.co.uk/cockpit-core/api/content/items/Images', {
        method: 'GET',
        headers: {
          'api-key' :`${process.env.API_KEY}`,
        }
      })
      .then(response => response.json())
      .then(result => {
        res.json(result);
        res.status(200).end();
        resolve(result);
      })
    }
    catch (err) {
      res.status(500).send(err);
      reject(err);
    }
  })
}
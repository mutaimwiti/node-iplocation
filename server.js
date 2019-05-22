const iplocate = require("node-iplocate");
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  const appUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

  return res.status(422).json({
    message: `Supply the IP address: ${appUrl}ipAddress`,
    example: `${appUrl}8.8.8.8`
  })
});

app.get('/:ipAddress', async (req, res, next) => {
  const {params: {ipAddress}} = req;

  if (ipAddress) {
    try {
      const results = await iplocate(ipAddress);

      if (results) {
        return res.json({
          location: results
        })
      }
    } catch (e) {}
  }

  return res.status(500).json({
    message: "Could not get your location. Ensure the IP address is valid and try again"
  })
});

app.listen(3001, () => {
  console.log("App is listening at http://localhost:3001");
});

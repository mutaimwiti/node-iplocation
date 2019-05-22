const express = require('express');

const app = express();

app.get('/:ipAddress', (req, res) => {
  const {params: {ipAddress}} = req;

  const iplocate = require("node-iplocate");

  iplocate(ipAddress).then(function (results) {
    return res.json({
      location: results
    })
  });
});

app.listen(3000, () => {
  console.log("App is listening at http://localhost:3000");
});

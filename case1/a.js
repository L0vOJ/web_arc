const express = require('express');

const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname,'/index.html'))
});

app.listen(app.get('port'), () => {
  var string = 'http://127.0.0.1:' + app.get('port')
  console.log(string);
});

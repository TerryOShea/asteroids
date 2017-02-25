'use strict';

const express = require('express');
const app = express();
const path = require('path');

app.use('/public', express.static(path.join(__dirname, '/public')));

app.listen(process.env.PORT || 3000, () => {
  console.log('listening on 3000');
});

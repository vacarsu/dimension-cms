const express = require('express');
var path = require('path');
const app = express();

app.use(express.static(__dirname + '/client'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/client')));

app.listen(9000, () => console.log('Example app listening on port 9000!'));

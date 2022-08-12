'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('Testing Server Request Recieve')
})

app.listen(PORT, () => console.log(`Server is starting on ${PORT}`))
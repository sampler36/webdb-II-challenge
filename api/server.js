const express = require('express');
const helmet = require('helmet');

const zooRouter = require('../zoos/zoo-router');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/zoos', zooRouter);

module.exports = server;

const express = require('express');
const helmet = require('helmet');

const zooRouter = require('../zoos/zoo-router');
const bearRouter = require('../bears/bear-router');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/zoos', zooRouter);
server.use('/api/bears', bearRouter);

module.exports = server;

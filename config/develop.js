'use strict';

process.env.PORT = '3030';
process.env.HOST = 'localhost';

process.env.DB_PORT = '27017';
process.env.DB_HOST = 'localhost';
process.env.DB_NAME = 'posts';

exports.mongoConfig = {
  db: { native_parser: true },
  server: { poolSize: 5 }
};

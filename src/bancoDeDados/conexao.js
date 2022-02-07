const knex = require('knex')({
  client: 'pg',
  connection: {
      host: "ec2-34-206-148-196.compute-1.amazonaws.com",
      user: "cowopnnkrfpxxz",
      password: "e2c61bf5be6d046125461d59f719970e31fedf122079e998d08748ee2256d1ac",
      database: "deihjakpag9mhs",
      port: 5432,
      ssl: {
        rejectUnauthorized: false
      }
  }
});

module.exports = knex;

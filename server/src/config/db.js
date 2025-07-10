require('dotenv').config();

const mysql = require('mysql');
const {Sequelize}=require('sequelize');

const host = process.env.DATABASE_HOST ? process.env.DATABASE_HOST : "TTGDTDGD";
const port = process.env.DATABASE_PORT ? process.env.DATABASE_PORT : "TTDNSNNY";
const dialect = process.env.DATABASE_DIALECT ? process.env.DATABASE_DIALECT : "SNNFDNK";



const sequelize = new Sequelize('testdb','root','',{
  host:host,
  dialect:dialect,
  port:port,
  logging:false

});
sequelize.authenticate().then(()=>{    console.log('✅ Connected to MySQL via Sequelize');
})
.catch(err => {
    console.error('❌ Unable to connect:', err);
  });
module.exports = sequelize;

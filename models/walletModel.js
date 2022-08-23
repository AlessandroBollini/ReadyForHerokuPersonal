const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('dcu344n2k32btb', 'mjddykctccxvur', 'fc09634645184a69104e3e7409a4714e71ff054aa2eda022b781934f8c9678a7', {
    host: 'ec2-52-19-188-149.eu-west-1.compute.amazonaws.com',
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
          require: true, 
          rejectUnauthorized: false
        }
      },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
class Wallet extends Model { }
Wallet.init({
    address: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    publicKey: {
        type: DataTypes.STRING,
        unique: true
    },
    privateKey: DataTypes.STRING,
    seedPhrase: DataTypes.STRING,
    used:DataTypes.BOOLEAN,
    image:DataTypes.STRING
}, {
    timestamps: false,
    sequelize
});

(async () => {
    await sequelize.sync({ alter: true });
})();

module.exports.Wallet = Wallet;
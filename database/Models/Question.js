const Sequelize = require('sequelize');
const connection = require('../config');

const Question = connection.define('questions',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    }, 
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Question.sync({force:false}).then(()=>{
    console.log("Migration - table 'question' created!");
})


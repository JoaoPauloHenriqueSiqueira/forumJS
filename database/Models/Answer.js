const Sequelize = require('sequelize');
const connection = require('../config');

const Answer = connection.define('answers', {
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    question_id:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Answer.sync({ force: false }).then(() => {
    console.log("Migration - table 'answers' created!");
})


module.exports = Answer;
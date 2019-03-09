const Sequelize = require('sequelize');
const db = require('./db.connection');

const Note = db.define('Note', {

    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },

    title: {
        type: Sequelize.STRING,
        allowNull: true,
    },

    text: {
        type: Sequelize.STRING,
        allowNull: true,
    },

    image: {
        type: Sequelize.STRING,
        allowNull: true,
    },

    public: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true
    },

    author: {
        type: Sequelize.STRING,
    }

}, {
    timestamps: true
})

module.exports = Note;
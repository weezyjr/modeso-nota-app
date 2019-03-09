const User = require('./user.model')
const Note = require('./note.model')


// User has many notes (1:M)
User.hasMany(Note, {
    foreignKey: 'author',
    sourceKey: 'username'
});

Note.belongsTo(User, {
    foreignKey: 'author',
    targetKey: 'username'
});

module.exports = {
    Note,
    User
};
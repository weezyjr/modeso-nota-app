const Sequelize = require('sequelize');
const db = require('./db.connection');

const User = db.define('User', {

    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            is: {
                args: /^[a-zA-Z1-9_]+$/i,
                msg: 'Username can only consist of alphabetic characters, numbers and underscores (e.g. John_Doe123).'
            },
            len: {
                args: [3, 20],
                msg: 'Username length must be 3 to 20 charachters.'
            }
        }
    },

    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: {
                args: true,
                msg: 'The e-mail is invaild'
            },
            len: {
                args: [5, 40],
                msg: 'Email length must be 5 to 40 charachters.'
            }
        }
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [8, 255],
                msg: 'Password length must be 8 to 255 charachters.'
            }
        }
    },

    fullname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            is: {
                args: /^[a-zA-Z\s]+$/i,
                msg: 'Names can only consist of alphabetic characters and spaces (e.g. John Doe).'
            },
            len: {
                args: [3, 30],
                msg: 'Full name length must be 3 to 30 charachters.'
            }
        }
    },

}, {
    timestamps: true
})

// override the user object to hide sensitive feilds 
User.prototype.toJSON = function () {
    // copy all the user feilds
    const user = Object.assign({}, this.get());
    // delete the sensitive feilds
    delete user.password;
    // return the new object
    return user;
}
module.exports = User;
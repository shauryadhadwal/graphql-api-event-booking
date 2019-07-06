const eventResolver = require('./event');
const bookingResolver = require('./booking');
const userResolver = require('./user');

module.exports = {
    ...eventResolver,
    ...bookingResolver,
    ...userResolver
}
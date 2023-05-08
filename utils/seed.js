const connection = require('../config/connection');
const {Thought, User} = require('../models');
const userD = require('./userData');
const thoughtD = require('./thoughtData');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected to mongo');

    await User.deleteMany({});

    await Thought.deleteMany({});

    await User.collection.insertMany(userD);

    await Thought.collection.insertMany(thoughtD);

    console.table(userD);
    console.table(thoughtD);
    console.info('Seeding complete! 🌱');
    process.exit(0);
})
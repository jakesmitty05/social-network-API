const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUsername, getRandomText } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    try {
        // clear database
        await Thought.deleteMany({});
        await User.deleteMany({});

    } catch (err) {
        console.log(err);
    }


        // create users and thoughts
        const users = [];
        const thoughts = [];
        for (let i = 0; i < 5; i++) {
          const username = getRandomUsername();
          const email = `${username}@gmail.com`;
          const thoughtText = getRandomText();

          users.push({ username, email });
          thoughts.push({ thoughtText, username });
        }

        // insert users and thoughts
        await User.collection.insertMany(users);
        await Thought.collection.insertMany(thoughts);

                console.log('database reset');

  });
  
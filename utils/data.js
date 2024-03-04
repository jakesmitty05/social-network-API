const adj = [
    'Admirable',
    'Ambitious',
    'Artistic',
    'Awesome',
    'Beautiful',
    'Brave',
    'Busy',
    'Charming',
    'Cheerful',
    'Clever',
    'Colorful',
    'Comfortable',
    'Cool',
    'Creative',
    'Curious',
    'Daring',
    'Delightful',
    'Determined',
    'Eager',
    'Elegant',
    'Enthusiastic',
    'Exciting',
    'Fabulous',
    'Fancy',
    'Friendly',
    'Fun',
    'Generous',
    'Gentle',
    'Happy',
    'Hilarious',
    'Hopeful',
    'Imaginative',
    'Inspiring',
    'Kind',
    'Lively',
    'Lovely',
  ];

  const noun = [
    'Adventure',
    'Bandit',
    'Baseball',
    'Battle',
    'Bird',
    'Book',
    'Brainiac',
    'Campaign',
    'Candy',
    'Cave',
    'Challenge',
    'Champion',
    'Chief',
    'Civic',
    'City',
    'Climb',
    'Combat',
    'Conquest',
    'Cookie',
    'Court',
    'Craft',
    'Crown',
    'Culture',
    'Dance',
    'Danger',
    'Death',
    'Defeat',
    'Diamond',
    'Discovery',
    'Dragon',
    'Dream',
  ]
  
  const text = [
    'bla',
    'blarp',
    'bloop',
    'blop',
    'boop',
    'bruh',
    'banana',
  ];
  
    // Get a random item given an array
    const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // Get a random 2 digit number
    const getRandom2DigitNum = () => Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, '0');
  
    // Gets a random username
    const getRandomUsername = () =>
      `${getRandomArrItem(adj)}${getRandomArrItem(noun)}${getRandom2DigitNum()}`;

    // gets random text
    const getRandomText = () => 
      [...Array(20)]
        .map(_ => getRandomArrItem(text))
        .join(' ');



  // Export the functions for use in seed.js
  module.exports = { getRandomUsername, getRandomText };
  
const { User, Thought } = require('../models');

module.exports = {
    // get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // get one user
    async getOneUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v')
                .populate('thoughts')
                .populate('friends');
            
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // POST a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);

            // example data
            // {
            //     "username": "lernantino",
            //     "email": "lernantino@gmail.com"
            // }

            res.status(201).json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // PUT to update a user by its _id
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, req.body, {
                new: true,
                runValidators: true
            });

            if (!user) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // DELETE to remove user by its _id
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            // remove the user's associated thoughts
            await Thought.deleteMany({ _id: { $in: user.thoughts } });

            res.json({ message: 'User and associated thoughts deleted!' });

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
}
    


// /api/users/:userId/friends/:friendId


// POST to add a new friend to a user's friend list


// DELETE to remove a friend from a user's friend list
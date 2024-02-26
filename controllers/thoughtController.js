const { User, Thought } = require('../models');

module.exports = {
    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // get one thought
    async getOneThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v')
                .populate('user');
            
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // POST to create a new thought
    async createThought(req, res) {
        try {
            const { thoughtText, username, userId } = req.body;

            // example data
            // {
            //     "thoughtText": "Here's a cool thought...",
            //     "username": "lernantino",
            //     "userId": "5edff358a0fcb779aa7b118b"
            //   }
  
            const thought = await Thought.create({ thoughtText, username });
            
            // push the created thought's _id to the associated user's thoughts array field
            await User.findOneAndUpdate(
                { _id: userId },
                { $push: { thoughts: thought._id } }
            );

            res.status(201).json(thought);

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // PUT to update a thought by its _id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                req.body,
                { new: true, runValidators: true }
            );
    
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
    
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // DELETE to remove a thought by its _id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
    
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
    
            res.json({ message: 'Thought and associated reactions deleted!' });
    
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    
    // /api/thoughts/:thoughtId/reactions

    // POST to create a reaction stored in a single thought's reactions array field
    async createReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { new: true }
            );
    
            if (!reaction) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
    
            res.json(reaction);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // DELETE to pull and remove a reaction by the reaction's reactionId value
    async deleteReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
    
            if (!reaction) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
    
            res.json(reaction);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
}

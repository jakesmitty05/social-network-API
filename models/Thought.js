const { Schema, model, Types } = require('mongoose');
const Reaction = require('./Reaction');

const ThoughtSchema = new Schema (
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal =>
        createdAtVal.toLocaleString()
    },
    username: {
      type: String,
      required: true
    },
    reactions: [Reaction]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// get total count of reactions
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;

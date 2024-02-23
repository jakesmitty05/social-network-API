const { Schema, Types } = require('mongoose');

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    _id: false
  }
);

// format date as MM/DD/YYYY
const dateFormat = createdAtVal =>
  createdAtVal.toLocaleDateString();

module.exports = ReactionSchema;

import mongoose, { Schema, models } from 'mongoose';

export interface IResult {
  tournament: mongoose.Types.ObjectId;
  team: mongoose.Types.ObjectId;
  position: number;
  kills: number;
  points: number;
  prizeWon?: number;
  createdAt: Date;
}

const ResultSchema = new Schema<IResult>({
  tournament: {
    type: Schema.Types.ObjectId,
    ref: 'Tournament',
    required: true,
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
  position: {
    type: Number,
    required: [true, 'Position is required'],
  },
  kills: {
    type: Number,
    default: 0,
  },
  points: {
    type: Number,
    required: [true, 'Points are required'],
  },
  prizeWon: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Result = models.Result || mongoose.model<IResult>('Result', ResultSchema);

export default Result;

import mongoose, { Schema, models } from 'mongoose';

export interface ITournament {
  title: string;
  game: 'BGMI' | 'FreeFire';
  description: string;
  prizePool: number;
  entryFee: number;
  maxTeams: number;
  maxPlayers?: number;
  registeredTeams: number;
  registeredPlayers: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  startDate: Date;
  endDate: Date;
  rules: string;
  mapType?: string;
  mode?: string;
  image?: string;
  createdAt: Date;
}

const TournamentSchema = new Schema<ITournament>({
  title: {
    type: String,
    required: [true, 'Tournament title is required'],
  },
  game: {
    type: String,
    enum: ['BGMI', 'FreeFire'],
    required: [true, 'Game type is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  prizePool: {
    type: Number,
    required: [true, 'Prize pool is required'],
  },
  entryFee: {
    type: Number,
    required: [true, 'Entry fee is required'],
    default: 0,
  },
  maxTeams: {
    type: Number,
    required: [true, 'Maximum teams is required'],
  },
  maxPlayers: {
    type: Number,
  },
  registeredTeams: {
    type: Number,
    default: 0,
  },
  registeredPlayers: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming',
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
  },
  rules: {
    type: String,
    required: [true, 'Rules are required'],
  },
  mapType: String,
  mode: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Tournament = models.Tournament || mongoose.model<ITournament>('Tournament', TournamentSchema);

export default Tournament;

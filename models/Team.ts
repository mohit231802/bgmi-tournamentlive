import mongoose, { Schema, models } from 'mongoose';

export interface IPlayer {
  name: string;
  inGameId: string;
  role?: string;
}

export interface ITeam {
  teamName: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  leaderWhatsApp?: string;
  players: IPlayer[];
  tournament: mongoose.Types.ObjectId;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentId?: string;
  registrationDate: Date;
}

const PlayerSchema = new Schema<IPlayer>({
  name: {
    type: String,
    required: [true, 'Player name is required'],
  },
  inGameId: {
    type: String,
    required: [true, 'In-game ID is required'],
  },
  role: String,
});

const TeamSchema = new Schema<ITeam>({
  teamName: {
    type: String,
    required: [true, 'Team name is required'],
  },
  leaderName: {
    type: String,
    required: [true, 'Leader name is required'],
  },
  leaderEmail: {
    type: String,
    required: [true, 'Leader email is required'],
  },
  leaderPhone: {
    type: String,
    required: [true, 'Leader phone is required'],
  },
  leaderWhatsApp: {
    type: String,
    required: false,
  },
  players: [PlayerSchema],
  tournament: {
    type: Schema.Types.ObjectId,
    ref: 'Tournament',
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  paymentId: String,
  registrationDate: {
    type: Date,
    default: Date.now,
  },
});

const Team = models.Team || mongoose.model<ITeam>('Team', TeamSchema);

export default Team;

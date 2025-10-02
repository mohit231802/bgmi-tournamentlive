import mongoose, { Document } from 'mongoose';

interface IParticipant extends Document {
  tournament: mongoose.Types.ObjectId;
  team: mongoose.Types.ObjectId;
  participantId: string;
  name: string;
  email: string;
  inGameId: string;
  role: string;
  status: 'REGISTERED' | 'JOINED' | 'DROPPED' | 'BANNED';
  joinedAt: Date;
  teamLeader: boolean;
  paymentId?: string;
}

const ParticipantSchema = new mongoose.Schema({
  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tournament',
    required: true
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  participantId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  inGameId: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['REGISTERED', 'JOINED', 'DROPPED', 'BANNED'],
    default: 'REGISTERED'
  },
  joinedAt: {
    type: Date,
    default: Date.now
  },
  teamLeader: {
    type: Boolean,
    default: false
  },
  paymentId: {
    type: String,
    required: false
  }
});

ParticipantSchema.index({ tournament: 1, status: 1 });
ParticipantSchema.index({ team: 1 });

const Participant = mongoose.models.Participant || mongoose.model<IParticipant>('Participant', ParticipantSchema);

export default Participant;
export type { IParticipant };
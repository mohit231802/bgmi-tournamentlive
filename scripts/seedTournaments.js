const mongoose = require('mongoose');

const TournamentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  game: { type: String, enum: ['BGMI', 'FreeFire'], required: true },
  description: { type: String, required: true },
  prizePool: { type: Number, required: true },
  entryFee: { type: Number, required: true, default: 0 },
  maxTeams: { type: Number, required: true },
  maxPlayers: { type: Number },
  registeredTeams: { type: Number, default: 0 },
  registeredPlayers: { type: Number, default: 0 },
  status: { type: String, enum: ['upcoming', 'ongoing', 'completed', 'cancelled'], default: 'upcoming' },
  startDate: { type: Date, required: true },
  startTime: { type: Date },
  endDate: { type: Date, required: true },
  endTime: { type: Date },
  rules: { type: String, required: true },
  mapType: String,
  mode: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
});

const Tournament = mongoose.models.Tournament || mongoose.model('Tournament', TournamentSchema);

// Try Atlas first, then fallback to local
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bgmi-tournaments';

async function seedTournaments() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing tournaments
    await Tournament.deleteMany({});
    console.log('Cleared existing tournaments');

    // Get future dates for tournaments
    const now = new Date();
    const futureDate1 = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours from now
    const futureDate2 = new Date(now.getTime() + 4 * 60 * 60 * 1000); // 4 hours from now
    const futureDate3 = new Date(now.getTime() + 6 * 60 * 60 * 1000); // 6 hours from now

    const tournaments = [
      {
        title: 'BGMI Solo Championship',
        game: 'BGMI',
        mode: 'Solo',
        description: 'Individual tournament for BGMI players',
        prizePool: 10000,
        entryFee: 50,
        maxTeams: 100,
        maxPlayers: 100,
        startDate: futureDate1,
        startTime: futureDate1,
        endDate: new Date(futureDate1.getTime() + 2 * 60 * 60 * 1000),
        endTime: new Date(futureDate1.getTime() + 2 * 60 * 60 * 1000),
        rules: 'Standard BGMI tournament rules apply.',
        mapType: 'Erangel',
        status: 'upcoming',
        registeredPlayers: 0,
        registeredTeams: 0,
      },
      {
        title: 'BGMI Duo Battle Royale',
        game: 'BGMI',
        mode: 'Duo',
        description: 'Team tournament for 2 players',
        prizePool: 20000,
        entryFee: 100,
        maxTeams: 50,
        maxPlayers: 100,
        startDate: futureDate2,
        startTime: futureDate2,
        endDate: new Date(futureDate2.getTime() + 2 * 60 * 60 * 1000),
        endTime: new Date(futureDate2.getTime() + 2 * 60 * 60 * 1000),
        rules: 'Standard duo rules apply.',
        mapType: 'Miramar',
        status: 'upcoming',
        registeredPlayers: 0,
        registeredTeams: 0,
      },
      {
        title: 'BGMI Squad Challenge',
        game: 'BGMI',
        mode: 'Squad',
        description: '4-player squad tournament',
        prizePool: 50000,
        entryFee: 200,
        maxTeams: 25,
        maxPlayers: 100,
        startDate: futureDate3,
        startTime: futureDate3,
        endDate: new Date(futureDate3.getTime() + 2 * 60 * 60 * 1000),
        endTime: new Date(futureDate3.getTime() + 2 * 60 * 60 * 1000),
        rules: 'Standard squad rules apply.',
        mapType: 'Livik',
        status: 'upcoming',
        registeredPlayers: 0,
        registeredTeams: 0,
      }
    ];

    const createdTournaments = await Tournament.insertMany(tournaments);
    console.log('Created sample tournaments:');
    createdTournaments.forEach(t => {
      console.log(`${t.title} - Mode: ${t.mode} - ID: ${t._id}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding tournaments:', error);
    process.exit(1);
  }
}

seedTournaments();
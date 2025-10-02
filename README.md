# BGMI & Free Fire Tournament Website

A complete tournament management platform for BGMI and Free Fire tournaments in India with admin dashboard.

## Features

### Public Features
- **Home Page**: Attractive landing page with tournament statistics
- **Tournaments**: Browse active and upcoming tournaments
- **Team Registration**: Easy registration form with player details
- **Results**: View past tournament results and leaderboards
- **Responsive Design**: Mobile-friendly interface

### Admin Features
- **Secure Authentication**: Admin login with NextAuth
- **Dashboard**: Overview of tournaments, teams, and revenue
- **Tournament Management**: Create, edit, and manage tournaments
- **Team Management**: View all registered teams
- **Results Management**: Add tournament results and prize distribution

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB installed and running

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env.local` file with:
```
MONGODB_URI=mongodb://localhost:27017/bgmi-tournaments
NEXTAUTH_SECRET=your-secret-key-change-in-production
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=admin@bgmitournaments.com
ADMIN_PASSWORD=Admin@123
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

### Create Admin User

Run this script to create the initial admin user:

```bash
node scripts/createAdmin.js
```

Or use the default credentials:
- Email: admin@bgmitournaments.com
- Password: Admin@123

## Project Structure

```
bgmi-tournament-website/
├── app/
│   ├── admin/              # Admin dashboard pages
│   ├── api/                # API routes
│   ├── tournaments/        # Tournament pages
│   ├── results/            # Results page
│   └── page.tsx            # Home page
├── components/             # Reusable components
├── models/                 # MongoDB models
├── lib/                    # Utility functions
└── public/                 # Static assets
```

## Database Models

### Tournament
- Title, game type, description
- Prize pool, entry fee
- Team limits, dates
- Status, rules

### Team
- Team information
- Player details (name, in-game ID, role)
- Payment status
- Tournament reference

### User
- Admin authentication
- Email, password (hashed)
- Role-based access

### Result
- Tournament results
- Team rankings
- Kills, points, prizes

## API Routes

- `GET /api/tournaments` - Get all tournaments
- `POST /api/tournaments` - Create tournament (admin)
- `GET /api/teams` - Get registered teams
- `POST /api/teams` - Register team
- `POST /api/auth/[...nextauth]` - Authentication

## Customization

### Colors
Edit `tailwind.config.ts` to change theme colors:
- Primary: Tournament action buttons
- Secondary: Navigation and headers
- Accent: Highlights and CTAs

### Payment Integration
Add payment gateway in:
- `app/tournaments/[id]/register/page.tsx`
- `app/api/teams/route.ts`

Popular options for India:
- Razorpay
- Paytm
- PhonePe

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

### Other Platforms
- Netlify
- Railway
- DigitalOcean

## Security Notes

⚠️ **Important**: Before deploying to production:
1. Change `NEXTAUTH_SECRET` to a strong random string
2. Update admin credentials
3. Use environment variables for all secrets
4. Enable HTTPS
5. Set up proper CORS policies
6. Add rate limiting to API routes

## Future Enhancements

- [ ] Real-time match updates
- [ ] Live streaming integration
- [ ] Player statistics and profiles
- [ ] Automated bracket generation
- [ ] Email notifications
- [ ] Discord bot integration
- [ ] Sponsor management
- [ ] Advanced analytics dashboard

## Support

For issues or questions, please create an issue in the repository.

## License

MIT License - feel free to use for your tournaments!

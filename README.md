# Campwork

**Freelancing for students, by students**

Campwork is a web-based freelance marketplace designed exclusively for university students. It allows students to offer skills, find flexible gigs, and earn income while studying, while providing clients access to affordable, trusted campus talent.

---

## Features (MVP)

- **Student Authentication & Verification**: Sign up with university info, get verified.
- **Student Profiles**: Skills, portfolio, bio, profile image.
- **Job Posting**: Post jobs with title, description, budget, deadline.
- **Proposals**: Students can send proposals with price and delivery time.
- **Messaging**: In-app messaging between freelancers and clients.
- **Image Upload**: Profile and portfolio images stored on Cloudinary.
- **Admin Dashboard**: Approve/reject jobs, suspend users, moderate content.

---

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS / Foundation
- **Backend**: Supabase (Auth + PostgreSQL)
- **Image Storage**: Cloudinary
- **Payments (Future)**: Paystack
- **Hosting**: Vercel

---

## Getting Started

### Prerequisites

- Node.js >=18
- npm or yarn
- Supabase account
- Cloudinary account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/campwork.git
```
2. Install dependencies:
```bash
cd campwork
npm install
```
3. Setup environment variables (.env.local):
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```
4. Run the development server:
```bash
npm run dev
```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

- `pages/` - Next.js pages (Landing, Auth, Dashboard, Jobs, etc.)
- `components/` - Reusable UI components
- `lib/` - Supabase and Cloudinary helper functions
- `public/` - Static assets
- `styles/` - Global styles (Tailwind/Foundation)

---

## Future Features

- Paystack integration for escrow payments
- Ratings & reviews
- Notifications
- Mobile app
- Campus ambassador program

---

## Contributing

1. Fork the repository
2. Create a branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## License

MIT License


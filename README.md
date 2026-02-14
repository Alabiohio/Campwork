# Campwork

**Freelancing for students, by students**

Campwork is a web-based student-first marketplace that combines a freelance platform and a campus product marketplace. It allows university students to offer skills, find flexible gigs, sell physical and digital products (such as bags, books and other student items), and earn income while studying — while giving clients access to trusted student talent.

Non-students can only register as clients to hire students or purchase items.

---

## Features (MVP)

### Core platform

- **Student Authentication & Verification**
  - Sign up with university information
  - Manual verification for students
  - Non-students can only register as clients

- **Student Profiles**
  - Skills
  - Bio
  - Portfolio
  - Profile image

- **Job Posting**
  - Post jobs with title, description, budget and deadline

- **Proposals**
  - Students submit proposals with price and delivery time

- **Messaging**
  - In-app messaging between students and clients

- **Image Upload**
  - Profile images and portfolio images stored on Cloudinary

- **Admin Dashboard**
  - Approve or remove jobs
  - Suspend users
  - Moderate content

---

## Student Product Marketplace (MVP – Added)

Students can also sell physical and digital products on the platform (for example: bags, books, gadgets, course materials, digital files and other student-relevant items).

### Product listing

- Students can create product listings with:
  - Product title
  - Description
  - Price
  - Category
  - Location (optional)
  - Listing status (active / sold)

### Product images

- All product images are uploaded to **Cloudinary**
- Only the returned image URLs are stored in Supabase

### Product browsing

- All users (students and clients) can:
  - Browse product listings
  - View product details
  - Contact the seller through in-app messaging

### Seller rules

- Only verified students can:
  - create product listings
  - upload product images
  - manage their products

- Non-students can only buy and message sellers.

### Payments (MVP)

- Payments are handled outside the platform for now
- The platform only supports:
  - listing
  - discovery
  - chat between buyer and seller

---

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS / Foundation
- **Backend**: Supabase (Auth + PostgreSQL)
- **Image Storage**: Cloudinary (profile, portfolio and product images)
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
````

2. Install dependencies:

```bash
cd campwork
npm install
```

3. Setup environment variables (`.env.local`):

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

* `pages/`

  * Landing pages
  * Auth pages
  * Jobs pages
  * Product marketplace pages
  * Profile pages

* `components/`

  * Reusable UI components

* `lib/`

  * Supabase client
  * Queries and mutations
  * Cloudinary upload helpers

* `public/`

  * Static assets

* `styles/`

  * Global styles (Tailwind / Foundation)

---

## Future Features

* Paystack integration for job and product payments
* Escrow and order tracking
* Ratings & reviews
* Notifications
* Mobile app
* Campus ambassador program
* Product order history and delivery tracking

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

```

This version now clearly positions Campwork as:

**✔ freelance marketplace**  
**✔ student product marketplace (bags, books, etc.)**  
**✔ Cloudinary-backed image system for products and portfolios**
```

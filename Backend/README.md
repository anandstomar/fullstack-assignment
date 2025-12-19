# Backend API

A Node.js + Express + MongoDB backend for the portfolio website.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file:**
   Copy `env.example` to `.env` and fill in your credentials:
   ```bash
   cp env.example .env
   ```

3. **Configure environment variables:**
   - `MONGODB_URI`: Your MongoDB connection string
   - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
   - `CLOUDINARY_API_KEY`: Your Cloudinary API key
   - `CLOUDINARY_API_SECRET`: Your Cloudinary API secret
   - `PORT`: Server port (default: 5000)

4. **Start the server:**
   ```bash
   npm start
   # or for development with auto-restart:
   npm run dev
   ```

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a new project (with image upload)
- `DELETE /api/projects/:id` - Delete a project

### Clients
- `GET /api/clients` - Get all clients
- `POST /api/clients` - Create a new client (with image upload)
- `DELETE /api/clients/:id` - Delete a client

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact submissions (admin)

### Newsletter
- `POST /api/newsletter` - Subscribe to newsletter
- `GET /api/newsletter` - Get all subscriptions (admin)

## Image Upload

Images are automatically cropped and uploaded to Cloudinary:
- Project images: 450x350
- Client images: 150x150 
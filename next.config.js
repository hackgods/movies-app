/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['image.tmdb.org', 'www.themoviedb.org', 'res.cloudinary.com'],
        unoptimized: true,
    }
}

module.exports = nextConfig

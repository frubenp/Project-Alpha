/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/encrypt', destination: 'http://localhost:5000/encrypt' },
      { source: '/crack', destination: 'http://localhost:5000/crack' }
    ]
  }
}
module.exports = nextConfig;
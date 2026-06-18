/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
  },
  experimental: {
    optimizePackageImports: ['motion', 'gsap'],
  },
}

export default nextConfig

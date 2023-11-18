import withPlaiceholder from '@plaiceholder/next'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        hostname: 'i.ytimg.com'
      },
      {
        hostname: 'i.vimeocdn.com'
      }
    ]
  }
}

export default withPlaiceholder(nextConfig)

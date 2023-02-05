/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['17e622c9569e3fa85e0e3247f346ce6d-17523.sites.k-hosting.co.uk'],
  },
  env: {
    SITE_URL: process.env.SITE_URL,
    API_ENDPOINT: process.env.API_ENDPOINT,
    API_KEY: process.env.API_KEY,
  }
}

module.exports = nextConfig

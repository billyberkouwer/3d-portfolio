/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{
      source: '/api/:path*',
      headers: [
            {
              key: 'api-key',
              value: "API-c1377005fdccca4d56cf6d42176dbb5fba698e7f",
            }
          ]
        }
      ]
  }
}

module.exports = nextConfig

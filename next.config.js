/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGO_URI: 'mongodb+srv://m220student:perchik@cluster0.jb7dw.mongodb.net/?retryWrites=true&w=majority',
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig

// module.exports = {
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.resolve.fallback.fs = false
//     }
//     return config
//   },
// }

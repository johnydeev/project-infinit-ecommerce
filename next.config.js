const dom = [
  "https://www.com",
  "upload.wikimedia.org",
  "c6-pi-grupo3.s3.amazonaws.com",
  "cdn.pixabay.com",
  "assets.example.com",
  "new-domain.com",
];
const remPat = [
  {
    protocol: "https",
    hostname: "assets.example.com",
    port: "",
    pathname: "via.placeholder.com",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: dom,
    remotePatterns: remPat,
    unoptimized: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};
module.exports = nextConfig;

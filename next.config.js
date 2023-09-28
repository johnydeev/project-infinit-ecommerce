const dom = ['https://www.com', 'upload.wikimedia.org', 'c6-pi-grupo3.s3.amazonaws.com', 'cdn.pixabay.com', 'assets.example.com', 'new-domain.com']
const remPat = [
  {
    protocol: "https",
    hostname: "assets.example.com",
    port: "",
    pathname: "via.placeholder.com",
  }]

/** @type {import('next').NextConfig} */
const nextConfig = {  
  // output: "export", 
  
  images: {
    domains: dom,
    remotePatterns: remPat,
    unoptimized: true
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};
module.exports = nextConfig;

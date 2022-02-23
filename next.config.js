module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.mattermix.com', 'storage.googleapis.com', 'dummyimage.com'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

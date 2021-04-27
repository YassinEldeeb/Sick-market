const config = {
  apps: [
    {
      name: 'server',
      script: 'backend/server.js',
      instances: 'max',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}

module.exports = config

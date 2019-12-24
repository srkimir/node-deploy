/**
 * run "pm2 ecosystem" to generate this file
 *
 * PM2 reload <app name> feature will restart your workers one by one,
 * and for each worker, wait till the new one has spawned before killing the old one.
 * This way, your server keeps running even when you are deploying the new patch straight to production.
 * You can also use gracefulReload feature which does pretty much the same thing but instead of
 * immediatly killing the worker it will send it a shutdown signal via IPC so it can close ongoing
 * connections or perform some custom tasks before exiting gracefully.
 *
 * Downside of cluster mode
 * If you rely on sessions, the cluster module may cause you some headache.
 * You can imagine that sticky sessions are bound to a given process and since PM2 passes requests
 * in round robin manner to the workers, you might not be sent to the same worker as before.
 * That means, you need to store session and websocket information outside of your app, like in a database.
 *
 * In cluster mode the master process is a single point of failure.
 *
 * I personally think pm2 is overkill. Throng is a super lightweight wrapper around cluster written
 * by Heroku's Hunter Loftis. We use it in production at ShellyPalmer. It's rock solid.
 *
 * artillery quick --count 50 -n 40 http://localhost:3000
 * This tells artillery to create 50 virtual users, and each should send 40 HTTP requests
 * to http://localhost:3000
 */
module.exports = {
  apps : [{
    name: 'node-deploy',
    append_env_to_name: true,
    script: 'index.js',
    args: 'one two',
    autorestart: true,
    instances: 1,
    watch: false,
    max_memory_restart: '1G',
    /**
     * default env variables
     * pm2 start ecosystem.config.js --env development
     */
    env_development: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    /**
     * pm2 start ecosystem.config.js --env staging
     */
    env_staging: {
      NODE_ENV: 'staging',
      PORT: 3002,
    },
    /**
     * pm2 start ecosystem.config.js --env production
     */
    env_production: {
      NODE_ENV: 'production',
      PORT: 3003
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
}


module.exports = {
  apps: [
    {
      name: 'frontend-api',
      script: './src/server.js',
      // "args"        : ["--toto=heya coco", "-d", "1"],
      //   watch: true,
      watch: ['./src/'],
      //   watch_delay: 1000,
      //   ignore_watch: ['node_modules'],
      // "node_args"   : "--harmony",
      // "merge_logs"  : true,
      // "cwd"         : "/this/is/a/path/to/start/script",
      env: {
        NODE_ENV: 'development',
        AWESOME_SERVICE_API_TOKEN: 'abc'
      },
      error_file: './err-pm2_myapp.log',
      out_file: './out-pm2_myapp.log'
    }
  ]
}

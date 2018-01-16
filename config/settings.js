/**
 * Created by haialaluf on 05/12/2017.
 */
const env = 'dev';

module.exports  = {
  env: env,
  dbUrl: env === 'prod' ? 'mongodb://admin:Hh057657363@10.0.31.215:27017' : 'mongodb://localhost/',
  webSiteOrigen: env === 'prod' ? 'http://easy-client.s3-website.eu-central-1.amazonaws.com/' : 'http://localhost:3000'
};
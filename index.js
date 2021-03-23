require('dotenv').config()
const path = require('path')
const routes = require('./src/routes')

// Require Provider 
const lti = require('ltijs').Provider
const Database = require('ltijs-sequelize')

// Setup ltijs-sequelize using the same arguments as Sequelize's generic contructor
const db = new Database(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, 
  { 
    host: 'localhost',
    dialect: 'mysql',
    logging: false 
  })



// Setup provider
lti.setup('LTIKEY', // Key used to sign cookies and tokens
  { 
    plugin: db // Passing db object to plugin field
  },
  { // Options
    staticPath: path.join(__dirname, 'public/'),
    appRoute: '/', loginRoute: '/login', // Optionally, specify some of the reserved routes
    cookies: {
      secure: false, // Set secure to true if the testing platform is in a different domain and https is being used
      sameSite: 'None' // Set sameSite to 'None' if the testing platform is in a different domain and https is being used
    },
    devMode: true // Set DevMode to true if the testing platform is in a different domain and https is not being used
  }
)



// Set lti launch callback - from mysql plugin
lti.onConnect((token, req, res) => {
  console.log(token)
  //return res.send('All good');
  // if (token)
  //   return res.sendFile(path.join(__dirname, '../client/build/index.html'));
  // else
  // lti.redirect(res, '/namesandroles');
  // lti.redirect(res, '/nolti');
  lti.redirect(res, '/info');
})

// When receiving deep linking request redirects to deep screen
lti.onDeepLinking(async (token, req, res) => {
  return lti.redirect(res, '/deeplink', { newResource: true })
})

// Setting up routes
lti.app.use(routes)

// Setup function
const setup = async () => {
  await lti.deploy({ port: process.env.PORT })

  /**
   * Register platform
   */
  await lti.registerPlatform({
    url: 'https://canvas.instructure.com',
    name: 'CD Canvas',
    clientId: '123670000000000352',
    authenticationEndpoint: 'https://canvas.instructure.com/api/lti/authorize_redirect',
    accesstokenEndpoint: 'https://canvas.instructure.com/login/oauth2/token',
    authConfig: { method: 'JWK_SET', key: 'https://canvas.instructure.com/api/lti/security/jwks' }
  })
}


setup()
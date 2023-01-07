const customerRoute = require('./customerRoute')
const routes = (app) => {
  app.use('/api/customers', customerRoute)
}
module.exports = routes

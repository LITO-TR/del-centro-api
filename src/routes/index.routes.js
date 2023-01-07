const customerRoute = require('./customer.routes')
const routes = (app) => {
  app.use('/api/customers', customerRoute)
}
module.exports = routes

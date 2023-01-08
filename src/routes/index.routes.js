const employeeRoutes = require('../routes/employee.routes')
const customerRoutes = require('../routes/customer.routes')
const creditRoutes = require('./credit.routes')
const routes = (app) => {
  app.use('/api/customers', customerRoutes)
  app.use('/api/employees', employeeRoutes)
  app.use('/api/credit', creditRoutes)
}
module.exports = routes

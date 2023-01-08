const employeeRoutes = require('../routes/employee.routes')
const customerRoutes = require('../routes/customer.routes')
const routes = (app) => {
  app.use('/api/customers', customerRoutes)
  app.use('/api/employees', employeeRoutes)
}
module.exports = routes

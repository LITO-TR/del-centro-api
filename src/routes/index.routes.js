const employeeRoutes = require('../routes/employee.routes')
const customerRoutes = require('../routes/customer.routes')
const creditRoutes = require('./credit.routes')
const paymentRoutes = require('./payment.routes')

const routes = (app) => {
  app.use('/api/customers', customerRoutes)
  app.use('/api/employees', employeeRoutes)
  app.use('/api/credits', creditRoutes)
  app.use('/api/payments', paymentRoutes)
}
module.exports = routes

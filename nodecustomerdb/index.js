const express = require('express');
const bodyParser = require('body-parser');
const query = require('./db/customers');

const app = express();
app.use(bodyParser.json());

const port = 3000;

// Get all customer
app.get("api/customers",query.getAllCustomers);
// Get customer by id
app.get("api/customers/:id",query.getCustomerById);
//Add new customer
app.post("/api/customers", query.addCustomer);
//Delete all customer
app.delete("/api/customers", query.deleteAllCustomers);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

module.exports = app;
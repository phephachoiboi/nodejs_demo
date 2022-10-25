const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 3000;

let customers = [
    {id: '1588323375416', firstName: 'John', lastName: 'Johnson', email: 'john@johnson.com', phone: '8233243'},
    {id: '1588323375417', firstName: 'Mary', lastName: 'Smith', email: 'mary@smith.com', phone: '6654113'},
    {id: '1588323375418', firstName: 'Peter', lastName: 'North', email: 'peter@north.com', phone: '901176'},
]

// Get all customers
app.get("/api/customers", (req, res) => {
    res.json(customers);
})

// Get customers by id
app.get("/api/customers/:id", (req, res) => {
    const customersId = req.params.id;

    const customers = customers.filter(customers => customers.id === customersId);
    if (customers.length > 0)
        res.json(customers);
    else
        res.status(404).end();
})

// Post new customers
app.post("/api/customers", (req, res) => {
    // Extract customers from the request body and generate id
    const newCustomers = { 'id': Date.now(), ...req.body };

    // Add new customer at the end of the movies array
    customers = [...customers, newCustomers];

    res.json(newCustomers);
});

//Delete customers
app.delete("/api/customers/:id", (req, res) => {
    const id = req.params.id;

    customers = customers.filter(customers => customers.id !== id);
    res.status(204).end();
})

//Update customers
app.put("/api/customers/:id", (req, res) => {
    const id = req.params.id;
    const updateCustomers = { 'id': id, ...req.body };

    //Get the index of updated customers
    const index = customers.findIndex(customers => customers.id === id);
    //Replace updated customers in the array
    customers.splice(index, 1, updateCustomers);

    res.json(updateCustomers);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
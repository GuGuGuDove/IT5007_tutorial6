/*
 * should create collections named "counters" and "customers"  frst
 * localhost:
 *   mongo hotel scripts/init.mongo.js
 */


db.createCollection('customers')
db.createCollection('counters')

db.customers.remove({});
db.counters.remove({});

const customerDB = [
  {
    id: 1, name: 'Jerry', phone: 110,
    created: "10/25/2021, 2:26:10 AM", 
  },

  {
    id: 2, name: 'Beth', phone: 120,
    created: "10/26/2021, 3:26:10 AM",
  },

  {
    id: 3, name: 'Rick', phone: 119,
    created: "11/06/2021, 8:26:10 AM",
  },

  {
    id: 4, name: 'Morty', phone: 911,
    created: "11/07/2021, 9:26:10 PM",
  },

  {
    id: 5, name: 'Summer', phone: 165,
    created: "11/08/2021, 5:26:10 PM",
  },

  {
    id: 6, name: 'Jessica', phone: 286,
    created: "11/11/2021, 7:26:10 AM",
  },

  {
    id: 7, name: 'Mr. Poopybutthole', phone: 301,
    created: "11/12/2021, 6:26:10 AM",
  }
];

db.customers.insertMany(customerDB);
const count = db.customers.count();
print('Inserted', count, 'customers');

db.counters.remove({ _id: 'customer_counter' });
db.counters.insert({ _id: 'customer_counter', current: count });

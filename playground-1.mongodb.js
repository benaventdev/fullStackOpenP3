/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('thePhoneBook');

// Insert a few documents into the sales collection.
db.getCollection('contacts').insertMany([
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
},
{
    id: 2,
    name: "Ada Loveace",
    number: "39-44-123456"
},
{
    id: 3,
    name: "Dan Abramov",
    number: "12-43-123456"
},
{
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-123456"
},
{
    id: 5,
    name: "Carlos Mollà",
    number: "312-23-123456"
},
{
    id: 6,
    name: "Arnold Perez",
    number: "112-63-126256"
},
]);

// Run a find command to view items sold on April 4th, 2014.
const salesOnApril4th = db.getCollection('phonebook').find({
  date: { $ne: "" }
}).count();

// Print a message to the output window.
console.log(`${salesOnApril4th} sales occurred in 2014.`);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
db.getCollection('thephonebook').aggregate([
  // Find all of the sales that occurred in 2014.
  { $match: { date: { $ne: null } } },
  // Group the total sales for each product.
  // { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
]);

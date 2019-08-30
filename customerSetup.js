// Import packages
var inquirer = require('inquirer');
var pass = require('./pw');
var mysql = require('mysql');

var data;

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: pass,
  database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    readProducts();
  
    takeCommand();
  });

//   Takes command from user
  function takeCustomerQuestions() {
    inquirer
      .prompt([{
        name: 'item_id',
        type: 'input',
        message: 'What is the ID of the item you wish to purchase?'
        // validate: Add function here to check if valid id selected
      },
      {
        name: 'quantity',
        type: 'input',
        message: 'Quantity of item to purchase?',
        // validate: Add function to check a number has been entered
        }
    ])
      .then(answers => {
        console.log(answers)
        
      });
  }
  
//   Function that bids
  function productBid(bid, bidderName, itemName) {
    console.log("Inserting a new product...\n");
    var query = connection.query(
      "UPDATE products SET ? WHERE ?", [{
        current_highest_bid: bid,
        highest_bidder: bidderName
      }, {item: itemName},
    ],
      function (err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " bid accepted\n");
        // Call updateProduct AFTER the INSERT completes
        console.log(res);
      }
    );
  
    // logs the actual query being run
    console.log(query.sql);
  }
  
//   Function that reads all products
  function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      data = res;
    });
  }

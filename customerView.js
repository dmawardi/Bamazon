// Import packages
var inquirer = require('inquirer');
var mysql = require('mysql');
var pass = require('./pw');

// Build connection to sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: pass,
    database: "BamazonDB"
});
// Initialize data for later assignment
var data;

// Function List
// 
//   Takes customer questions
function takeCustomerOrder() {
    // Prompt customer with two questions to complete their order
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
            // Make purchase using user input
            makePurchase(answers.item_id, answers.quantity);
            // Read and print all products
            readProducts();

        });
}

// Takes purchase quantity and item id and fulfills order if quantity available
function makePurchase(item_id, purchaseQuantity) {

    // Fetch needed details using the item id
    let [currentStock, currentProductSales, currentPrice] = fetchDetailsUsingID(item_id, data);

    // Reduce the current stock by the purchase quantity: update value
    currentStock = currentStock - purchaseQuantity;

    // Multiply new sales value and add to current total
    currentProductSales = currentProductSales + (purchaseQuantity*currentPrice);
    // if the current stock allows for this purchase to proceed
    if (currentStock > 0) {
        // Build query to edit specific item id's details
        let query = 'UPDATE BamazonDB.products SET ? WHERE item_id = ?';
        connection.query(query,
            [{
                // Update stock quantity with the updated stock value
                    stock_quantity: currentStock,
                    // Update product sales with sum including current sale
                    product_sales: currentProductSales
                },
                item_id
            ],
    
            // Callback function
            function (err, res) {
                if (err) throw err;
    
                // Log status complete to user
                console.log('Purchase Complete!\n');
            });

    } else {
        // Inform user purchase failed
        console.log('Insufficient Quantity for Purchase!\n');
    }

}

// Takes item_id of item and data and fetches 
function fetchDetailsUsingID(item_id, data) {
    // Iterate through data
    for (let i = 0; i < data.length; i++) {
        // if a matching item id is found
        if (data[i].item_id == item_id){
            // assign required details to variables for return
            let currentStock = data[i].stock_quantity;
            let currentProductSales = data[i].product_sales;
            let currentPrice = data[i].price;

            return [currentStock, currentProductSales, currentPrice]
        }
    
    }

}

//   Function that reads and prints all products then takes customer's order
function readProducts() {
    console.log("Fetching all products...\n");
    connection.query("SELECT * FROM BamazonDB.products", function (err, res) {
        if (err) throw err;

        // Log all results of the SELECT statement
        console.table(res);
        data = res;
        takeCustomerOrder();
    });
}

// Arguments start
// 
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    // Read products and take customer questions
    readProducts();
});
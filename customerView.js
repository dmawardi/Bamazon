// Import packages
var inquirer = require('inquirer');
var mysql = require('mysql');

// Build connection to sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: 'ricochet505',
    database: "BamazonDB"
});
var data;

// Function List
// 

//   Takes customer questions
function takeCustomerOrder() {
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
            // console.log(answers);
            // console.log(data);
            console.log(fetchCurrentStockUsingID(answers.item_id, data));
            makePurchase(answers.item_id, answers.quantity);
            readProducts();

        });
}

// Takes purchase quantity and item id and fulfills order if quantity available
function makePurchase(item_id, purchaseQuantity) {

    let currentStock = fetchCurrentStockUsingID(item_id, data);
    currentStock = currentStock - purchaseQuantity;

    if (currentStock > 0) {
        let query = 'UPDATE BamazonDB.products SET ? WHERE item_id = ?';
        connection.query(query,
            [{
                    stock_quantity: currentStock
                },
                item_id
            ],
    
            function (err, res) {
                if (err) throw err;
    
                // Complete purchase and 
                console.log('Purchase Complete!\n');
            });

    } else {
        console.log('Insufficient Quantity for Purchase!\n');
    }

}

// Takes item_id of item and data and fetches 
function fetchCurrentStockUsingID(item_id, data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].item_id == item_id){
            let currentStock = data[i].stock_quantity;
            return currentStock
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
// Import packages
var inquirer = require('inquirer');
var mysql = require('mysql');

var data;

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

// Reads and prints products
function readProducts() {
    console.log("Fetching all products...\n");
    connection.query("SELECT * FROM BamazonDB.products", function (err, res) {
        if (err) throw err;

        // Log all results of the SELECT statement
        console.table(res);
        data = res;
    });
}

// Reads and prints products
function fetchLowStockProducts() {
    console.log("Fetching all products below 5 stock...\n");
    connection.query("SELECT * FROM BamazonDB.products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;

        // Log all results of the SELECT statement
        console.table(res);
        data = res;
    });
}

function addToInventory(item_id, addQuantity) {

    let currentStock = fetchCurrentStockUsingID(item_id, data);
    currentStock = currentStock + addQuantity;

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
                console.log('Inventory Added!\n');
            });

    } else {
        console.log('Insufficient Quantity for Purchase!\n');
    }

}

inquirer
    .prompt([{
        name: 'command',
        type: 'list',
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
    }])
    .then(answers => {
        console.log(answers);
        switch (answers.command) {
            case 'View Products for Sale':
                readProducts();
                break;
            case 'View Low Inventory':
                fetchLowStockProducts();
                break;
            case 'Add to Inventory':
                break;
            case 'Add New Product':
                break;
        }

    });
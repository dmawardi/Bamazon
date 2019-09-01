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
function readProducts(recurse = true) {
    console.log("Fetching all products...\n");
    connection.query("SELECT * FROM BamazonDB.products", function (err, res) {
        if (err) throw err;

        // Log all results of the SELECT statement
        console.table(res);
        data = res;
        if (recurse) {
            adminMenu();
        }
    });
}

// Takes item_id of item and data and fetches 
function fetchCurrentStockUsingID(item_id, data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].item_id == item_id) {
            let currentStock = data[i].stock_quantity;
            return currentStock
        }

    }

}

// Reads and prints products with a stock level below 5
function fetchLowStockProducts() {
    console.log("Fetching all products below 5 stock...\n");
    connection.query("SELECT * FROM BamazonDB.products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;

        // Log all results of the SELECT statement
        console.table(res);
        adminMenu();
    });
}

// Prompt user for additional answers given they select to add inventory
function promptForInventoryAdd() {
    // Run read products without recursive effect
    readProducts(false);
    inquirer
        .prompt([{
                name: 'item_id',
                type: 'input',
                message: "What's the item_id of the product you wish to add?"

            },
            {
                name: 'quantityToAdd',
                type: 'input',
                message: "What's the quantity you wish to add?"

            }
        ])
        .then(answers => {
            addToInventory(answers.item_id, answers.quantityToAdd);

        });
}

// Adds to current inventory level if addQuantity is greater than 0
function addToInventory(item_id, addQuantity) {

    if (addQuantity > 0) {
        // Add the add quantity to current quantity to determine update value
        let newQuantity = fetchCurrentStockUsingID(item_id, data);
        newQuantity = newQuantity + parseInt(addQuantity);

        // Update stock value of item
        let query = 'UPDATE BamazonDB.products SET ? WHERE item_id = ?';
        connection.query(query,
            [{
                    stock_quantity: newQuantity
                },
                item_id
            ],

            function (err, res) {
                if (err) throw err;

                // Alert user inventory has been added to
                console.log('Inventory Added!\n');
                adminMenu();
            });

    } else {
        console.log('Please input a valid quantity!\n');
    }

}

// Prompt user for additional answers given they select to add a new product
function promptForProductAdd() {
    return inquirer
        .prompt([{
                name: 'product_name',
                type: 'input',
                message: "What's the name of the product you wish to add?"

            },
            {
                name: 'department_name',
                type: 'input',
                message: "What's the dept/category of the item?"
            },
            {
                name: 'price',
                type: 'input',
                message: "What's the retail price of the item?"
            },
            {
                name: 'stock_quantity',
                type: 'input',
                message: "Is there an initial quantity stock for this item?"
            }
        ])
        .then(answers => {
            return Promise.resolve(addNewProduct(answers.product_name, answers.department_name, answers.price, answers.stock_quantity));

        });
}

// Adds to current inventory level if addQuantity is greater than 0
function addNewProduct(product_name, department_name, price, stock_quantity) {
    console.log(product_name, department_name, price, stock_quantity);

    if (product_name && department_name && price) {
        // Insert a new item into the products table
        let query = 'INSERT INTO BamazonDB.products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)';
        let sql = connection.query(query,
            [product_name, department_name, price, stock_quantity],
            // callback function
            function (err, res) {
                if (err) throw err;
                console.log(sql);;
                // Alert user new product added
                console.log('New Product Added!\n');
                // Send user back to admin menu
                adminMenu();
            });
    } else {
        // Provide user prompt as to why the product failed to be added
        console.log('You must at least provide a product name, department name and price!');

        adminMenu();
    }


}

// Shows admin menu and prompts user for action
function adminMenu() {
    inquirer
        .prompt([{
            name: 'command',
            type: 'list',
            message: 'Manager Admin Controls\nPlease Select an Option',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit']
        }])
        .then(answers => {
            console.log(answers);
            switch (answers.command) {
                case 'View Products for Sale':
                    readProducts();
                    break;
                case 'View Low Inventory':
                    fetchLowStockProducts()
                    break;
                case 'Add to Inventory':
                    promptForInventoryAdd();
                    break;
                case 'Add New Product':
                    promptForProductAdd();
                    break;
                case 'Exit':
                    connection.end();
                    break;
            }

        });

}

// Arguments begin here
// 
adminMenu();
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
function readProducts(recursive = true) {
    console.log("Fetching all products...\n");
    // Select all items from products to display
    connection.query("SELECT * FROM BamazonDB.products", function (err, res) {
        if (err) throw err;

        // Log all results of the SELECT statement to console for user
        console.table(res);
        // Safe for future use
        data = res;

        // If this function was not given a false argument, proceed to the admin menu
        if (recursive) {
            adminMenu();
        }
    });
}

// Takes item_id and data as input and fetches the current stock level
function fetchCurrentStockUsingID(item_id, data) {
    // Iterate through data
    for (let i = 0; i < data.length; i++) {
        // If you find the match of item id
        if (data[i].item_id == item_id) {
            // grab the stock quantity of that item & return
            let currentStock = data[i].stock_quantity;
            return currentStock
        }

    }

}

// Reads and prints products with a stock level below 5
function fetchLowStockProducts() {
    console.log("Fetching all products below 5 stock...\n");
    // Query database with condition to only return items with less than 5 stock
    connection.query("SELECT * FROM BamazonDB.products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;

        // Log all results of the SELECT statement
        console.table(res);
        // Send back to the admin menu
        adminMenu();
    });
}

// Prompt user for additional answers given they select to add inventory
function promptForInventoryAdd() {
    // Run read products without recursive effect to display products
    readProducts(false);
    // Prompt user for additional data to fulfill adding inventory
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
            // Use input parameters to add to inventory using function
            addToInventory(answers.item_id, answers.quantityToAdd);
            // Above function will send back to the menu

        });
}

// Adds to current inventory level if addQuantity is greater than 0
function addToInventory(item_id, addQuantity) {

    // If input: addQuantity is greater than 0
    if (addQuantity > 0) {
        // Add the add quantity to current quantity to determine update value
        let newQuantity = fetchCurrentStockUsingID(item_id, data);
        newQuantity = newQuantity + parseInt(addQuantity);

        // build query to update stock value of item
        let query = 'UPDATE BamazonDB.products SET ? WHERE item_id = ?';
        // Execute
        connection.query(query,
            [{
                    stock_quantity: newQuantity
                },
                item_id
            ],

            // Callback function
            function (err, res) {
                if (err) throw err;

                // Alert user inventory has been added to
                console.log('Inventory Added!\n');
                // Send user back to admin menu
                adminMenu();
            });

    } else {
        // Don't allow user to proceed to add
        console.log('Please input a valid quantity!\n');
    }

}

// Prompt user for additional answers given they select to add a new product
function promptForProductAdd() {
    // Prompt user with questions to add  new product
    inquirer
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
            // Pass parameters from input answers to add new product function
            addNewProduct(answers.product_name, answers.department_name, answers.price, answers.stock_quantity);
            // Function above will send user back to menu
        });
}

// Adds to current inventory level if addQuantity is greater than 0
function addNewProduct(product_name, department_name, price, stock_quantity) {
    // If product name, dept name & price are not undefined, proceed
    if (product_name && department_name && price) {
        // Build query to insert a new item into the products table
        let query = 'INSERT INTO BamazonDB.products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)';
        // Execute
        let sql = connection.query(query,
            [product_name, department_name, price, stock_quantity],

            // callback function
            function (err, res) {
                if (err) throw err;
                // Alert user new product added
                console.log('New Product Added!\n');
                // Send user back to admin menu
                adminMenu();
            });
    } else {
        // Provide user prompt as to why the product failed to be added
        console.log('You must at least provide a product name, department name and price!');
        // Send user back to menu
        adminMenu();
    }


}

// Shows admin menu and prompts user for action
function adminMenu() {
    // Prompt user with menu selection
    inquirer
        .prompt([{
            name: 'command',
            type: 'list',
            message: 'Manager Admin Controls\nPlease Select an Option',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit']
        }])

        .then(answers => {
            // Depending on answer, perform command
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
                // If user presses exit, close the connection and break
                case 'Exit':
                    connection.end();
                    break;
            }

        });

}

// Arguments begin here
// 
// Start with admin menu
adminMenu();
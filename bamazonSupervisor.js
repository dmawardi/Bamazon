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
// Prompt user for additional answers given they select to add a new product
function promptForDepartmentAdd() {
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

function fetchSalesByDept() {
    console.log("Fetching product sales by Department...\n");
    let query = ['SELECT b.department_id, a.department_name, a.product_sales,b.over_head_costs',
    'FROM BamazonDB.products as a INNER JOIN BamazonDB.departments as b',
    'on a.department_name=b.department_name',
    'GROUP BY a.department_name, b.department_id, a.product_sales, b.over_head_costs'
    ].join(' ')
    connection.query(query, function (err, res) {
        if (err) throw err;

        // Log all results of the SELECT statement
        console.table(res);
        supervisorMenu();
    });
}

// Adds to current inventory level if addQuantity is greater than 0
function addNewDepartment(product_name, department_name, price, stock_quantity) {
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
                supervisorMenu();
            });
    } else {
        // Provide user prompt as to why the product failed to be added
        console.log('You must at least provide a product name, department name and price!');

        adminMenu();
    }


}

// Shows admin menu and prompts user for action
function supervisorMenu() {
    inquirer
        .prompt([{
            name: 'command',
            type: 'list',
            message: 'Manager Admin Controls\nPlease Select an Option',
            choices: ['View Product Sales by Department', 'Create New Department', 'Exit']
        }])
        .then(answers => {
            switch (answers.command) {
                case 'View Product Sales by Department':
                    fetchSalesByDept();
                    break;
                case 'Create New Department':
                    break;
               
                case 'Exit':
                    connection.end();
                    break;
            }

        });

}

// Arguments begin
// 
supervisorMenu();
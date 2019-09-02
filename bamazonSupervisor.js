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
// Initialize data variable for future assignment
var data;

// Function List
// 
// Prompt user for additional answers given they select to add a new product
function promptForDepartmentAdd() {
    // Prompt user for additional information for adding department
    return inquirer
        .prompt([
            {
                name: 'department_name',
                type: 'input',
                message: "What's the dept/category of the item?"
            },
            {
                name: 'over_head_costs',
                type: 'input',
                message: "What are the overhead costs of the department?"
            }
            
        ])
        .then(answers => {
            // Use input answers to add a new department using a function
            addNewDepartment(answers.department_name,answers.over_head_costs);

        });
}

// Fetch product sales, overhead costs, and total profit by department and print for user
function fetchSalesByDept() {
    console.log("Fetching product sales by Department...\n");
    // Build query to produce financials by department
    let query = ['SELECT b.department_id, b.department_name, a.product_sales,b.over_head_costs,',
    // Make total profit = product sales - overhead costs
    '(IFNULL(a.product_sales,0)-b.over_head_costs) AS Total_Profit',
    'FROM BamazonDB.products as a RIGHT OUTER JOIN  BamazonDB.departments as b',
    'on a.department_name=b.department_name',
    'GROUP BY b.department_id, a.department_name, a.product_sales, b.over_head_costs'
    ].join(' ');
    connection.query(query, function (err, res) {
        if (err) throw err;

        // Log all results of the SELECT statement
        console.table(res);
        // Send back to supervisor menu
        supervisorMenu();
    });
}

// Adds to current inventory level if addQuantity is greater than 0
function addNewDepartment(department_name, over_head_costs) {

    // if overhead costs and department name are not null, proceed with query
    if (over_head_costs && department_name) {
        // Build query to nsert a new item into the products table
        let query = 'INSERT INTO BamazonDB.departments (department_name, over_head_costs) VALUES (?,?)';
        // Execute
        connection.query(query,
            [department_name, parseInt(over_head_costs)],

            // callback function
            function (err, res) {
                if (err) throw err;

                // Alert user new product added
                console.log('New Department Added!\n');
                // Send user back to supervisor menu
                supervisorMenu();
            });
    } else {
        // Provide user prompt as to why the product failed to be added
        console.log('Failed to add department!\nYou must provide a department name and the overhead costs!');

        // Send user back to supervisor menu
        supervisorMenu();
    }


}

// Shows admin menu and prompts user for action
function supervisorMenu() {
    // Prompt user with menu
    inquirer
        .prompt([{
            name: 'command',
            type: 'list',
            message: 'Supervisor Admin Controls\nPlease Select an Option',
            choices: ['View Product Sales by Department', 'Create New Department', 'Exit']
        }])
        .then(answers => {
            // Depending on user response, proceed with process
            switch (answers.command) {
                case 'View Product Sales by Department':
                    fetchSalesByDept();
                    break;
                case 'Create New Department':
                    promptForDepartmentAdd();
                    break;
            //    Exit ends the connection and exits
                case 'Exit':
                    connection.end();
                    break;
            }

        });

}

// Arguments begin
// 
// Start menu
supervisorMenu();
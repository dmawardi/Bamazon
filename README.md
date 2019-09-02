# Bamazon
Web Application Development Bootcamp Week 12: SQL assignment - Bamazon

### Goal: 
To build a database accessible by three separate files/interfaces: Supervisor, Manager, and Customer.

## Installation
To install, download the files and use npm to install the required packages.

```
npm install
```

Then run the individual files using node
```
node customerView.js
```
```
node bamazonManager.js
```
```
node bamazonSupervisor.js
```

#### Customer View:
![alt text](https://media.giphy.com/media/LrLanEM5qwGECFM1Oc/giphy.gif)
* Make purchases by selecting an item id and quantity
* This will trigger in a reduction of the stock quantity in the database

#### Manager View View:
![alt text](https://media.giphy.com/media/IbCpqTAXyS5E9d8G98/giphy.gif)
* View all products or filter by those with low inventory
* Able to add to inventory
* Able to add new item

#### Supervisor View:
![alt text](https://media.giphy.com/media/YSBF5U6a8TViNgXQpA/giphy.gif)
* View financials (product sales, overhead costs and total profit) by department
* Able to add new department

### Prerequisites
NPM packages
* Mysql
* inquirer

## Built With

* Node JS
* SQL

## Authors

* **Dannar Mawardi** - *Initial work* - [GitHub IO](https://dmawardi.github.io)

See also the list of [contributors](https://github.com/dmawardi/Bamazon/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* Monash/Trilogy Web Application Bootcamp Coursework

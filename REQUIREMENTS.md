# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)


## database tables
TABLE products(id SERIAL PRIMARY KEY, product_name VARCHAR(100) NOT NULL, price INTEGER NOT NULL, category VARCHAR(100));
TABLE users(id SERIAL PRIMARY KEY, first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100) NOT NULL, user_password VARCHAR(100) NOT NULL);
TABLE orders(id SERIAL PRIMARY KEY, status VARCHAR(100) NOT NULL, user_id INTEGER REFERENCES users table);
TABLE order_products(id SERIAL PRIMARY KEY, order_id INTEGER REFERENCES orders table, product_id INTEGER REFERENCES products table, quantity INTEGER NOT NULL);


## RESTFUL routes
#### products
index: '/products' [GET]
show: '/products/:id' [GET]
create: '/products' [POST]
categoryProducts: '/products/category' [POST]
delete: '/products/:id' [DELETE]

#### orders
index: '/orders' [GET]
show: '/orders/:id' [GET]
create: '/orders' [POST]
userOrders: '/orders/users/:user_id' [GET]
delete: '/orders/:id' [DELETE]

#### users
index: '/users' [GET]
show: '/users/:id' [GET]
create: '/users' [POST]
delete: '/users/:id' [DELETE]
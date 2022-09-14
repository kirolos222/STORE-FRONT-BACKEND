# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 'products'[GET](token is used here)
- Show'products/id'[GET](token is used here)
- Create [token required]'products'[POST](token is used here)
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]'users'[GET](token is used here)
- Show [token required]'users/id'[GET](token is used here)
- Create N[token required]'users'[post](token is used here)

#### Orders
- Current Order by user (args: user id)[token required]'orders/users_id'[post](token is used here)
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id : SERIAL PRIMARY KEY
- name : VARCHAR
- price : integer
- [OPTIONAL] category

#### User
-  id : SERIAL PRIMARY KEY
- firstName : VARCHAR
- lastName : VARCHAR
- password : VARCHAR

#### Orders
- id : SERIAL PRIMARY KEY
- id of each product in the order : bigint REFERENCES
- quantity of each product in the order:integer
- user_id  : bigint REFERENCES
- status of order (active or complete) : varchar


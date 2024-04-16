# ShopCart - E-commerce Website

ShopCart is an e-commerce website developed in React that offers an intuitive and enjoyable shopping experience. It allows users to explore a variety of products, add them to the shopping cart, and securely make purchases.

## Used technology
* React: JavaScript library for building user interfaces.
* React Router: For navigation between pages.
* Firebase Firestore: For the contact database.
* Firebase Authentication: To store user data.
* react-hook-form: For form validation.
* Swiper: To create image sliders.
* react-hot-toast: To show notification messages.
* CSS and SASS: CSS styles for design and presentation.

## Main Components

### App
The App component is the main component of the application. It contains the main structure of the application and uses React Router to handle navigation between different pages.

### AuthContext (Authentication Context)
The AuthContext is used to manage the user's authentication state. It provides functions for logging in, logging out, and checking the authentication status.

### PrivateRoute
PrivateRoute is a custom routing component that protects routes requiring authentication. It redirects the user to the login page if they are not authenticated.

### ProductCards
The ProductCards component displays a list of products in the form of cards. It allows the user to switch between a grid view and a list view and provides options to view product details and add them to the cart.

### ProductDisplay
ProductDisplay shows the details of a specific product, including its image, description, price, and purchase options. It allows the user to select the quantity, size, and color of the product before adding it to the cart.

### Review
The Review component displays customer reviews of a product. It allows users to add their own reviews and ratings, provided they are authenticated.

### Search
Search is a component that allows the user to search for products by name. It displays real-time search results and provides direct links to the found products.

### ShopCategory
The ShopCategory component displays a list of product categories available for filtering. It allows the user to select a specific category to view related products.

### SingleProduct
SingleProduct displays the details of an individual product, including its image, description, and reviews. It allows the user to add the product to the cart from this page.

### Tags
The Tags component displays a list of popular tags that can be used to search for related products. Each tag is a link that shows the associated products when clicked.

### PopularPost
PopularPost displays a list of popular or featured posts. Each post can be a link to a related blog page or article.

## Key Features

- User Authentication: Allows users to register, log in, and log out of their accounts.
- Shopping Cart: Allows users to add products to the cart, update quantities, and proceed to checkout.
- Product Filtering: Allows users to filter products by category, price, and other features.
- Product Reviews: Allows users to read and add reviews and ratings to products.
- Product Search: Allows users to search for products by name and see real-time results.
- Category Management: Allows administrators to add, edit, and delete product categories.

## Installation and Running

* Clone the repository: `git clone https://github.com/your-username/shopcart.git`
* Install dependencies: `npm install`
* Configure Firebase database and authentication.
* Start the application: `npm start`


### Author

- **Ivan Ezequiel Shifman**

- Visit my profile on [LinkedIn](https://ar.linkedin.com/in/iv%C3%A1n-ezequiel-shifman-042b0726a)
// import Login from './pages/Login';
// import Register from './pages/Register';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Product from './pages/Product';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import ProductPage from './pages/ProductPage';

import NotFound from './pages/Page404';

import {FC} from "react";

type Route = {
	key: string,
	title: string,
	path: string,
	enabled: boolean,
	component: FC<{}>
}

export const routes: Array<Route> = [
	{
		key: 'login-route',
		title: 'Login',
		path: '/login',
		enabled: true,
		component: LogIn
	},
	{
		key: 'register-route',
		title: 'Register',
		path: '/register',
		enabled: true,
		component: Register
	},
	{
		key: 'home-route',
		title: 'Home',
		path: '/',
		enabled: true,
		component: Home
	},
	{
		key: 'cart-route',
		title: 'Cart',
		path: '/cart',
		enabled: true,
		component: Cart
	},
	{
		key: 'product-route',
		title: 'Products',
		path: '/products',
		enabled: true,
		component: Product
	},
	{
		key: 'add-product-route',
		title: 'Add Product',
		path: '/add-product',
		enabled: true,
		component: ProductPage
	},
	{
		key: 'update-product-route',
		title: 'Update Product',
		path: '/update-product',
		enabled: true,
		component: ProductPage
	},
	{ 
		key: 'notfound-route',
		title: 'Not Found',
		path: '*', 
		enabled: true,
		component: NotFound
	}
]
import Layout from "../components/Layout/Layout"

import Home from "../containers/HomePage/Home";

// user
import Login from "../containers/GetUser/Login";
import Register from "../containers/GetUser/Register";

//account
import AccountLayout from "../containers/AccountPage/AccountLayout";
import Profile from "../containers/AccountPage/Profile";
import Orders from "../containers/AccountPage/Orders";
import Setting from "../containers/AccountPage/Setting";
import Contact from "../containers/AccountPage/Contact";

// search
import SearchResult from "../containers/SearchResult";

// product
import ProductsPage from "../containers/ProductsPage/ProductsPage";
import ProductDetail from "../containers/ProductDetail";

// categories
import CategoriesLayout from "../containers/CategoriesLayout/CategoriesLayout";

// cart
import Cart from "../containers/Cart/Cart";

// checkout
import Checkout from "../containers/CheckoutPage/Checkout";

// admin
import Categories from "../containers/AdminPage/PageCategories/Categories";
import Products from "../containers/AdminPage/PageProduct/Products";
import StatisticsPage from "../containers/AdminPage/StatisticsPage";
import LayoutAdmin from "../containers/AdminPage/LayoutAdmin";
import Users from "../containers/AdminPage/PageUser/Users";
import OrdersManager from "../containers/AdminPage/PageOrder/OrdersManager";
// import { lazy } from "react";

// const Layout = lazy(() => import("../components/Layout/Layout"))
// const Login = lazy(() => import("../containers/getUser/Login"))
// const Register = lazy(() => import("../containers/getUser/Register"))
// const Categories = lazy(() => import("../containers/adminPage/pageCategories/Categories"))
// const Products = lazy(() => import("../containers/adminPage/pageProduct/Products"))
// const Home = lazy(() => import("../containers/HomePage/Home"))
// const StatisticsPage = lazy(() => import("../containers/adminPage/StatisticsPage"))
// const LayoutAdmin = lazy(() => import("../containers/adminPage/LayoutAdmin"))
// const ProductDetail = lazy(() => import("../containers/ProductDetail"))
// const CategoriesLayout = lazy(() => import("../containers/CategoriesLayout/CategoriesLayout"))
// const SearchResult = lazy(() => import("../containers/SearchResult"))
// const Cart = lazy(() => import("../containers/cart/Cart"))


const publicRoutes = [
    { path: '/', component: Home, layout: Layout },
    { path: '/login', component: Login, layout: Layout },
    { path: '/register', component: Register, layout: Layout },
    { path: '/products/:productSlug', component: ProductDetail, layout: Layout },
    { path: '/:groupProducts', component: CategoriesLayout, layout: Layout },
    { path: '/:groupProducts/:products', component: ProductsPage, layout: Layout},
    { path: '/search-result', component: SearchResult, layout: Layout },
    { path: '/cart', component: Cart, layout: Layout },
];

const privateRoutes = [
    { path: '/', component: Home, layout: Layout },
    { path: '/account', component: Profile, layout: Layout, layoutChill: AccountLayout },
    { path: '/account/orders', component: Orders, layout: Layout, layoutChill: AccountLayout },
    { path: '/account/setting', component: Setting, layout: Layout, layoutChill: AccountLayout },
    { path: '/account/contact', component: Contact, layout: Layout, layoutChill: AccountLayout },
    { path: '/products/:productSlug', component: ProductDetail, layout: Layout },
    { path: '/:groupProducts', component: CategoriesLayout, layout: Layout },
    { path: '/:groupProducts/:products', component: ProductsPage, layout: Layout},
    { path: '/search-result', component: SearchResult, layout: Layout },
    { path: '/cart', component: Cart, layout: Layout },
    { path: '/checkout', component: Checkout, layout: Layout },
];

const adminRoutes = [
    { path: '/admin', component: StatisticsPage, layout: LayoutAdmin },
    { path: '/admin/manage-categories', component: Categories, layout: LayoutAdmin },
    { path: '/admin/manage-products', component: Products, layout: LayoutAdmin },
    { path: '/admin/manage-users', component: Users, layout: LayoutAdmin },
    { path: '/admin/manage-orders', component: OrdersManager, layout: LayoutAdmin },
];

export {
    publicRoutes,
    privateRoutes,
    adminRoutes,
}
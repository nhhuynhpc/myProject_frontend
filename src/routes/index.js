import Layout from "../components/Layout/Layout"
import Login from "../containers/getUser/Login";
import Register from "../containers/getUser/Register";
import Profile from "../containers/AccountPage/Profile";
import Categories from "../containers/adminPage/pageCategories/Categories";
import Products from "../containers/adminPage/pageProduct/Products";
import Home from "../containers/HomePage/Home";
import StatisticsPage from "../containers/adminPage/StatisticsPage";
import LayoutAdmin from "../containers/adminPage/LayoutAdmin";
import ProductDetail from "../containers/ProductDetail";
import CategoriesLayout from "../containers/CategoriesLayout/CategoriesLayout";
import SearchResult from "../containers/SearchResult";
import Cart from "../containers/cart/Cart";
import ProductsPage from "../containers/ProductsPage/ProductsPage";
import AccountLayout from "../containers/AccountPage/AccountLayout";
import HistoryProduct from "../containers/AccountPage/HistoryProduct";
import Setting from "../containers/AccountPage/Setting";
import Contact from "../containers/AccountPage/Contact";
import Users from "../containers/adminPage/pageUser/Users";
import Orders from "../containers/adminPage/pageOrder/Orders";
import Checkout from "../containers/CheckoutPage/Checkout";
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
    { path: '/account/history-product', component: HistoryProduct, layout: Layout, layoutChill: AccountLayout },
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
    { path: '/admin/manage-orders', component: Orders, layout: LayoutAdmin },
];

export {
    publicRoutes,
    privateRoutes,
    adminRoutes,
}
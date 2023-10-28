import React, { Suspense, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
// import StatisticsPage from './containers/adminPage/StatisticsPage';
// import Layout from './components/Layout/Layout'
import NotFound from './components/NotFound';
// import Login from './containers/getUser/Login';
// import Register from './containers/getUser/Register';
// import Categories from './containers/adminPage/pageCategories/Categories'
// import Products from './containers/adminPage/pageProduct/Products';
// import Home from './containers/HomePage/Home';
// import LayoutAdmin from './containers/adminPage/LayoutAdmin';
// import ProductDetail from './containers/ProductDetail';
// import CategoriesLayout from './containers/CategoriesLayout/CategoriesLayout';
// import SearchResult from './containers/SearchResult';
// import Cart from './containers/cart/Cart';

import { publicRoutes, privateRoutes, adminRoutes } from './routes';
import { useSelector } from 'react-redux';
import ScrollToTopOnPageChange from './helper/ScrollToTopOnPageChange';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const authRedux = useSelector((state) => state.auth);

    React.useEffect(() => {
        let state = authRedux;
        if (state?.isLoggedIn) {
            setIsLoggedIn(true);
            if (state.user.role === 'admin') {
                setIsAdmin(true);
                return
            }
            return
        }
        setIsLoggedIn(false)
        setIsAdmin(false)
    }, [authRedux]);

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {!isLoggedIn &&
                        !isAdmin &&
                        publicRoutes.map((publicRoute, index) => {
                            const PublicLayout = publicRoute.layout;
                            const PublicPage = publicRoute.component;

                            return (
                                <Route
                                    key={index}
                                    path={publicRoute.path}
                                    element={
                                        <PublicLayout>
                                            <PublicPage />
                                        </PublicLayout>
                                    }
                                />
                            );
                        })}
                    {isLoggedIn &&
                        !isAdmin &&
                        privateRoutes.map((privateRoute, index) => {
                            const PrivateLayout = privateRoute.layout;
                            const PrivateChillLayout =
                                privateRoute.layoutChill ?? '';
                            const PrivatePage = privateRoute.component;

                            return (
                                <Route
                                    key={index}
                                    path={privateRoute.path}
                                    element={
                                        PrivateChillLayout ? (
                                            <PrivateLayout>
                                                <PrivateChillLayout>
                                                    <PrivatePage />
                                                </PrivateChillLayout>
                                            </PrivateLayout>
                                        ) : (
                                            <PrivateLayout>
                                                <PrivatePage />
                                            </PrivateLayout>
                                        )
                                    }
                                />
                            );
                        })}
                    {isLoggedIn &&
                        isAdmin &&
                        adminRoutes.map((adminRoute, index) => {
                            const AdminLayout = adminRoute.layout;
                            const AdminPage = adminRoute.component;

                            return (
                                <Route
                                    key={index}
                                    path={adminRoute.path}
                                    element={
                                        <AdminLayout>
                                            <AdminPage />
                                        </AdminLayout>
                                    }
                                />
                            );
                        })}
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <ScrollToTopOnPageChange />
                {/* <Routes >
        <Route path='/' element={ <Layout /> }>
          <Route index element={ <Home /> } />
          <Route path='login' element={ <Login /> } />
          <Route path='register' element={ <Register /> } />
          <Route path=':productSlug' element={ <ProductDetail /> } />
          <Route path='nu' element={ <CategoriesLayout />} ></Route> 
          <Route path='nam' element={ <CategoriesLayout />} ></Route> 
          <Route path='be-trai' element={ <CategoriesLayout />} ></Route> 
          <Route path='be-gai' element={ <CategoriesLayout />} ></Route>
          <Route path='search-result' element={ <SearchResult />} />
          <Route path='cart' element={ <Cart /> } />

          <Route path='admin' element={ <LayoutAdmin /> } >
            <Route index element={ <StatisticsPage /> } />
            <Route path='manage-categories' element={ <Categories /> } />
            <Route path='manage-products' element={ <Products /> } />
          </Route>

          <Route path='*' element={ <NotFound /> } />
        </Route>
      </Routes> */}
            </Suspense>
        </>
    );
};

export default App;

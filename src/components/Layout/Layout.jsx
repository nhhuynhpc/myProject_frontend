import React from 'react';
import './Layout.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './img-vector/logo.svg';
import Search from './img-vector/search.svg';
import Person from './img-vector/person.svg';
import Cart from './img-vector/cart.svg';
import { Box, Button, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';
import { clearState } from '../../redux/slides/authSlide';
import CardInCart from '../CardProduct/CardInCart';
import { getTitle } from '../../services/titleService';
import { searchProduct } from '../../redux/slides/searchSlide';
import { clearCart, originalCart } from '../../redux/slides/cartSlide';

const settings = [
    {
        label: 'Tài khoản',
        link: '/account',
    },
];

const Header = ({ children }) => {
    const navigate = useNavigate([]);
    const dispatch = useDispatch();

    const authRedux = useSelector((state) => state.auth);
    const cartRedux = useSelector((state) => state.cart);

    const [navbarData, setNavbarData] = React.useState();
    const [isLogin, setIsLogin] = React.useState(false);
    const [countProduct, setCountProduct] = React.useState();
    const [textSearch, setTextSearch] = React.useState();

    const [dataProduct, setDataProduct] = React.useState([]);
    const [sumPriceProduct, setSumPriceProduct] = React.useState([]);

    //   set title

    React.useEffect(() => {
        setTitle();
    }, []);

    React.useEffect(() => {
        handleStatusLogin();
    }, [authRedux]);

    React.useEffect(() => {
        let stateCart = cartRedux.cart.result;
        let countProduct = 0;
        let sumPriceProduct = 0;
        for (let key in stateCart) {
            countProduct += parseInt(stateCart[key].quantity);
            sumPriceProduct +=
                parseInt(stateCart[key].quantity) *
                parseInt(stateCart[key].price);
        }
        setCountProduct(countProduct);
        setSumPriceProduct(sumPriceProduct);
        setDataProduct(stateCart);
    }, [cartRedux]);

    const setTitle = async () => {
        let result = await getTitle();

        setNavbarData(result.data?.title);
    };

    const handleDataCartDefault = () => {
        let action = originalCart({ user_id: authRedux?.user?.result.id });
        dispatch(action);
    };

    const handleStatusLogin = () => {
        let state = authRedux;
        if (state?.isLoggedIn) {
            handleDataCartDefault();
            setIsLogin(true);
            return;
        }
        setIsLogin(false);
    };

    const handleLogout = () => {
        dispatch(clearState());
        dispatch(clearCart());
        navigate('/');
    };

    //   search
    const handleSearch = () => {
        if (textSearch) {
            let action = searchProduct({ textSearch: textSearch });
            dispatch(action);
            setTextSearch('');
            navigate('/search-result');
        }
    };

    return (
        <>
            <header className="page-header">
                <p className="logo">
                    <img src={Logo} alt="img Logo" />
                </p>
                <Link to="/" className="brand">
                    Fashion Frenzy
                </Link>
                <div className="nav" style={{ display: 'flex' }}>
                    <ul className="navbar">
                        {navbarData &&
                            navbarData.map((navbarItem, index) => (
                                <ItemNav key={index} {...navbarItem} />
                            ))}
                    </ul>
                    <ul className="header-toolbar">
                        <li className="form-search">
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                value={textSearch}
                                onChange={(e) => setTextSearch(e.target.value)}
                            />
                            <button
                                className="header-button"
                                onClick={() => handleSearch()}
                            >
                                <img src={Search} alt="img Search" />
                            </button>
                        </li>
                        <li className="header-toolbar__item header-cart">
                            <a href="/cart">
                                <button
                                    className="header-button"
                                    title="Giỏ hàng"
                                >
                                    <img src={Cart} alt="img Cart" />
                                </button>
                            </a>
                            <span className="count-product" hidden={countProduct === 0}>
                                {countProduct}
                            </span>
                            <div className="toolbar-cart">
                                <div className="is-login"></div>
                                <div className="content">
                                    {countProduct === 0 ? (
                                        <Typography
                                            sx={{
                                                fontSize: '20px',
                                                color: '#C9C9C9',
                                                fontWeight: '500',
                                                textAlign: 'center',
                                            }}
                                        >
                                            Không có sản phẩm nào
                                        </Typography>
                                    ) : (
                                        dataProduct.map((data) => (
                                            <CardInCart
                                                key={data.cartsDetailsId}
                                                dataProduct={data}
                                            />
                                        ))
                                    )}
                                </div>
                                <Box
                                    sx={{
                                        margin: '20px 10px 0',
                                        padding: '8px 12px',
                                        borderTop: '1px solid #BCBCBC',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '16px',
                                            textAlign: 'end',
                                        }}
                                    >
                                        Tổng cộng:{' '}
                                        <span
                                            style={{
                                                fontSize: '18px',
                                                fontWeight: '700',
                                                color: '#EA3639',
                                            }}
                                        >
                                            {sumPriceProduct?.toLocaleString(
                                                'it-IT'
                                            )}
                                        </span>
                                        <span>
                                            {' '}
                                            <b>
                                                {' '}
                                                <u>đ</u>
                                            </b>
                                        </span>
                                    </Typography>
                                    <a href="/cart">
                                        <Button
                                            variant="contained"
                                            sx={{
                                                fontSize: '15px',
                                                height: '35px',
                                                margin: '10px auto 5px',
                                                display: 'block',
                                            }}
                                        >
                                            Xem giỏ hàng
                                        </Button>
                                    </a>
                                </Box>
                            </div>
                        </li>
                        <li className="header-toolbar__item">
                            <button className="header-button">
                                <img src={Person} alt="img Person" />
                            </button>
                            <div className="toolbar-menu">
                                <ul hidden={isLogin}>
                                    <li>
                                        <Link to={'/register'}>Đăng ký</Link>
                                    </li>
                                    <li>
                                        <Link to={'/login'}>Đăng nhập</Link>
                                    </li>
                                </ul>
                                <ul hidden={!isLogin}>
                                    {settings.map((data, index) => (
                                        <li key={index}>
                                            <Link to={data.link}>
                                                {data.label}
                                            </Link>
                                        </li>
                                    ))}
                                    <li>
                                        <Button
                                            sx={{
                                                display: 'block',
                                                color: 'inherit',
                                                padding: '0',
                                            }}
                                            onClick={() => handleLogout()}
                                        >
                                            Đăng xuất
                                        </Button>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </header>
            <div className="space-header"></div>
            {/* <Outlet /> */}
            {children}
            <Box
                component="footer"
                sx={{
                    marginTop: '100px',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                    p: 6,
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={4}>
                            <Typography
                                variant="h6"
                                color="text.primary"
                                gutterBottom
                            >
                                About Us
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                We are XYZ company, dedicated to providing the
                                best service to our customers.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography
                                variant="h6"
                                color="text.primary"
                                gutterBottom
                            >
                                Contact Us
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                123 Main Street, Anytown, USA
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Email: info@example.com
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Phone: +1 234 567 8901
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography
                                variant="h6"
                                color="text.primary"
                                gutterBottom
                            >
                                Follow Us
                            </Typography>
                            <Link
                                href="https://www.facebook.com/"
                                color="inherit"
                            >
                                <Facebook />
                            </Link>
                            <Link
                                href="https://www.instagram.com/"
                                color="inherit"
                                sx={{ pl: 1, pr: 1 }}
                            >
                                <Instagram />
                            </Link>
                            <Link
                                href="https://www.twitter.com/"
                                color="inherit"
                            >
                                <Twitter />
                            </Link>
                        </Grid>
                    </Grid>
                    <Box mt={5}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            align="center"
                        >
                            {'Copyright © '}
                            <Link
                                color="inherit"
                                href="https://your-website.com/"
                            >
                                Your Website
                            </Link>{' '}
                            {new Date().getFullYear()}
                            {'.'}
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

const ItemNav = ({ label, link, options }) => {
    if (options) {
        return (
            <React.Fragment>
                <li className="nav-item">
                    <Link to={`/${link}`} className="nav-item__link">
                        <span style={{ textTransform: 'uppercase' }}>
                            {label}
                        </span>
                    </Link>
                    <div className="subnav">
                        <div className="subnav-left">
                            {options &&
                                options.map((option, i) => (
                                    <ul key={i}>
                                        <li>
                                            <a href={`/${link}/${option.link}`}>
                                                {option.label}
                                            </a>
                                        </li>
                                        {option.options &&
                                            option.options.map((item, key) => (
                                                <li key={key}>
                                                    <a
                                                        href={`/${link}/${item.link}`}
                                                    >
                                                        {item.label}
                                                    </a>
                                                </li>
                                            ))}
                                    </ul>
                                ))}
                        </div>
                        {/* <div className="subnav-right">
              <ul>
                <li>
                  <a href="/">Sản phẩm 1</a>
                </li>
                <li>
                  <a href="/">Sản phẩm 2</a>
                </li>
                <li>
                  <a href="/">Sản phẩm 3</a>
                </li>
              </ul>
            </div> */}
                    </div>
                </li>
            </React.Fragment>
        );
    } else {
        return (
            <li className="nav-item">
                <Link to="/" className="nav-item__link">
                    {label}
                </Link>
            </li>
        );
    }
};

export default Header;

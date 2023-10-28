import React from 'react';
import './home.css';
import Carousel from 'react-material-ui-carousel';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, Container } from '@mui/material';

import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { Pagination } from '@mui/material';
import Grid from '@mui/material/Grid';

// card
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

// slick-carousel
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// service
import { GetProduct } from '../../services/productService';
import CardProduct from '../../components/CardProduct/CardProduct';

const api_url = 'http://localhost:8080/';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const Home = () => {
    const images = [
        {
            label: 'Bird',
            imgPath:
                'https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/slider_3.jpg?1696657714469',
        },
        {
            label: 'Bali, Indonesia',
            imgPath:
                'https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/slider_5.jpg?1696657714469',
        },
    ];

    const [page, setPage] = React.useState(1);
    const [dataAPage, setDataAPage] = React.useState([]);
    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const [dataProduct, setDataProduct] = React.useState([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
    };

    const datatest = [
        {
            title: 'NỮ',
            imgUrl: 'https://media.canifa.com/Simiconnector/list_image_tablet1694484733.webp',
        },
        {
            title: 'NAM',
            imgUrl: 'https://media.canifa.com/Simiconnector/list_image_tablet_second1694484734.webp',
        },
        {
            title: 'BÉ GÁI',
            imgUrl: 'https://media.canifa.com/Simiconnector/list_image_tablet_third1694484734.webp',
        },
        {
            title: 'BÉ TRAI',
            imgUrl: 'https://media.canifa.com/Simiconnector/list_image_tablet_41694484734.webp',
        },
    ];

    React.useEffect(() => {
        getProducts();
    }, []);

    // set data for block new product
    React.useEffect(() => {
        setDataAPage(dataProduct.slice(page * 12 - 12, page * 12));
    }, [page, dataProduct]);

    const getProducts = async () => {
        try {
            let result = await GetProduct();
            let newDataProduct = result.data.dataProduct;

            for (let i = newDataProduct.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newDataProduct[i], newDataProduct[j]] = [
                    newDataProduct[j],
                    newDataProduct[i],
                ]; // Tráo đổi phần tử i và j.
            }

            if (newDataProduct.length > 24) {
                let random = Math.floor(
                    Math.random() * (newDataProduct.length - 24)
                );
                setDataProduct(newDataProduct.slice(random, random + 24));
                return;
            }
            setDataProduct(newDataProduct);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="home-page">
            <Carousel
                NextIcon={<NavigateNextIcon />}
                PrevIcon={<ArrowBackIosNewIcon />}
            >
                {images.map((item, i) => (
                    <Item key={i} item={item} />
                ))}
            </Carousel>
            <Container sx={{ marginTop: '25px' }}>
                {/* <Box sx={{ bgcolor: "background.paper" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="NỮ" {...a11yProps(0)} />
              <Tab label="NAM" {...a11yProps(1)} />
              <Tab label="TRẺ EM" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              Item One
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              Item Three
            </TabPanel>
          </SwipeableViews>
        </Box> */}
            </Container>
            <div className="site-main">
                <div className="block-product">
                    <Container sx={{ marginTop: '25px' }}>
                        <div className="bock-product-heading">
                            <h2>BST Thu đông 2023</h2>
                        </div>
                        <Slider {...settings}>
                            {dataProduct.slice(0, 6).map((item, i) => (
                                <ItemBlockProduct key={i} item={item} />
                            ))}
                        </Slider>
                    </Container>
                </div>
                <Container sx={{ marginTop: '25px' }}>
                    <div className="bock-product-heading">
                        <h2>Sản phẩm mới</h2>
                    </div>
                    <Box
                        sx={{ display: 'flex', justifyContent: 'space-evenly' }}
                    >
                        {datatest.map((item, key) => (
                            <Card
                                key={key}
                                sx={{
                                    maxWidth: 245,
                                    maxHeight: '435px',
                                    minHeight: '330px',
                                    margin: 'auto',
                                }}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="340"
                                        image={item.imgUrl}
                                        alt="green iguana"
                                    />
                                </CardActionArea>
                            </Card>
                        ))}
                    </Box>
                </Container>
                <div className="block-newProduct">
                    <Container sx={{ marginTop: '25px' }}>
                        <div
                            className="bock-product-heading"
                            id="blockProductHeading"
                        >
                            <h2>Gợi ý cho bạn</h2>
                        </div>
                        <Box
                            sx={{
                                margin: 'auto',
                                width: 'fit-content',
                                alignItems: 'center',
                            }}
                        >
                            <Grid
                                container
                                spacing={{ xs: 2, md: 3 }}
                                columns={{ xs: 16, sm: 8, md: 16 }}
                            >
                                {dataAPage.map((item, i) => (
                                    <Grid
                                        item
                                        xs={2}
                                        sm={4}
                                        md={dataAPage.length > 3 ? 4 : 8}
                                        key={i}
                                    >
                                        <ItemBlockProduct item={item} />
                                    </Grid>
                                ))}
                            </Grid>
                            <a href="#blockProductHeading">
                                <Pagination
                                    count={
                                        dataProduct.length % 2 === 0
                                            ? dataProduct.length / 12
                                            : Math.floor(
                                                  dataProduct.length / 12
                                              ) + 1
                                    }
                                    page={page}
                                    onChange={handleChangePage}
                                    sx={{
                                        marginTop: '30px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                />
                            </a>
                        </Box>
                    </Container>
                </div>
            </div>
        </div>
    );
};

function ItemBlockProduct(props) {
    return (
        <>
            <CardProduct
                linkImage={api_url + props.item.image}
                Title={props.item.name}
                price={props.item.price}
                link={props.item.slug}
            />
        </>
    );
}

function Item(props) {
    return (
        <Box
            sx={{
                img: {
                    maxWidth: '100%',
                    height: 'auto',
                },
            }}
        >
            <img src={props.item.imgPath} alt={props.item.label} />
        </Box>
    );
}

export default Home;

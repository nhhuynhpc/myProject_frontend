import React from 'react';
import './ProductsPage.css';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Container,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Pagination,
    Slider,
    Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardProduct from '../../components/CardProduct/CardProduct';
import { useDispatch, useSelector } from 'react-redux';
import { setDataFilterCateDetail, setDataFilterPrice, setDataProducts } from '../../redux/slides/productSlide';
import { useParams } from 'react-router-dom';
import { productsRemainingSelector } from '../../redux/selectors';
import { getTitle } from '../../services/authService';
const api_url = 'http://localhost:8080/';

const ProductsPage = () => {
    const [dataProduct, setDataProduct] = React.useState([]);
    const [listProduct, setListProduct] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [dataAPage, setDataAPage] = React.useState([]);
    const handleChangePage = (event, value) => {
        setPage(value);
    };
    const param = useParams()
    const dispatch = useDispatch()
    const productRedux = useSelector(productsRemainingSelector)

    React.useEffect(() => {
        setDataProduct(productRedux)
    }, [productRedux])

    React.useEffect(() => {
        setCateDetailDefault(param.products);
        setProductsDefault();
        fetchListProducts()
    }, []);

    const fetchListProducts = async () => {
        let result = await getTitle()
        let listProduct = result.data?.title.filter(data => data.link.includes(param.groupProducts))
    
        setListProduct(listProduct[0]?.options ?? [])
    }

    const setCateDetailDefault = async (data) => {
        let action = setDataFilterCateDetail(data)
        dispatch(action)
    };

    const setProductsDefault = async () => {
        let action = setDataProducts({typeCustomer: param.groupProducts})
        dispatch(action)
    };

    // set data for block new product
    React.useEffect(() => {
        setDataAPage(dataProduct.slice(page * 24 - 24, page * 24));
    }, [page, dataProduct]);

    // style slidebar
    const [value, setValue] = React.useState([0, 100]);
    const minDistance = 10;

    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance);
                setValue([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setValue([clamped - minDistance, clamped]);
            }
        } else {
            setValue(newValue);
        }
    };

    React.useEffect(() => {
        let action = setDataFilterPrice({data: [value[0] * 20000, value[1] * 20000]})
        dispatch(action)
    }, [value])

    return (
        <>
            <div className="product-view">
                <div className="slide-bar">
                    <Typography sx={{ fontWeight: '700' }}>Danh mục</Typography>
                    <List>
                        {listProduct && listProduct.map(({label, options}, index) => (
                            <Accordion key={index}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography>{ label }</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {options && options.map((option, i) => (
                                    <ListItem key={i} disablePadding>
                                        <ListItemButton onClick={() => setCateDetailDefault(option.link)}>
                                            <ListItemText primary={option.label} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </AccordionDetails>
                          </Accordion>
                        ))}
                    </List>
                    <div className="filter">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography sx={{ fontWeight: '700' }}>
                                    Khoảng giá
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            p: {
                                                fontSize: '12px',
                                            },
                                        }}
                                    >
                                        <p>{value[0] * 20000} đ</p>
                                        <p>{value[1] * 20000} đ</p>
                                    </Box>
                                    <Slider
                                        value={value}
                                        onChange={handleChange}
                                        aria-labelledby="non-linear-slider"
                                    />
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
                <div className="product-main">
                    <Container>
                        {
                            dataAPage.length === 0 ?
                            <Box sx={{marginTop: '30px'}}><Typography sx={{textAlign: 'center', fontSize: '24px', fontWeight: '600'}}>Không có sản phẩm</Typography></Box> :
                            <Box
                                sx={{
                                    width: 'fit-content',
                                    alignItems: 'center',
                                }}
                            >
                                <Grid
                                    container
                                    spacing={{ xs: 2, md: 3 }}
                                    columns={{ xs: 16, sm: 8, md: 16 }}
                                >
                                    {dataAPage && dataAPage.map((item, i) => (
                                        <Grid item xs={2} sm={4} md={dataAPage.length > 3 ? 4: 8} key={i}>
                                            <ItemBlockProduct item={item} />
                                        </Grid>
                                    ))}
                                </Grid>
                                <a href="#blockProductHeading">
                                    <Pagination
                                        count={Math.floor(dataProduct.length / 24) + 1}
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
                        }
                    </Container>
                </div>
            </div>
        </>
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

export default ProductsPage;

import React from 'react';
import { Link } from 'react-router-dom';
import ArticleIcon from '@mui/icons-material/Article';
import RestoreIcon from '@mui/icons-material/Restore';
import {
    Box,
    Button,
    Card,
    CardMedia,
    CircularProgress,
    Fade,
    Typography,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { GetDataProductInOrder } from '../../services/orderDetailService';
import { GetOrders } from '../../services/orderService';
import { useSelector } from 'react-redux';

const api_url = 'http://localhost:8080/';

const Orders = () => {
    const authRedux = useSelector((state) => state.auth);

    const [productInOrder, setProductInOrder] = React.useState([]);
    const [productEachOrder, setProductEachOrder] = React.useState([]);

    const [dataOrder, setDataOrder] = React.useState([]);
    const [orderId, setorderId] = React.useState('');

    const [query, setQuery] = React.useState('idle');
    const timerRef = React.useRef();

    React.useEffect(() => {
        handleDataOrders();
    }, [authRedux]);

    React.useEffect(() => {
        handleDataHistory();
    }, [dataOrder]);

    React.useEffect(
        () => () => {
            clearTimeout(timerRef.current);
        },
        []
    );

    React.useEffect(() => {
        setProductEachOrder(
            productInOrder.filter((item) => item.order_id === orderId)
        );
    }, [orderId]);

    const handleDataOrders = async () => {
        let resutlDataOrders = await GetOrders({
            user_id: authRedux.user.result.id,
        });

        setDataOrder(resutlDataOrders.data.result ?? []);
    };

    const handleDataHistory = async () => {
        let listOrderId = [];
        for (let item of dataOrder) {
            listOrderId.push(item?.id);
        }

        let resultDataHistoryProduct = await GetDataProductInOrder({
            listOrderId: listOrderId,
        });

        setProductInOrder(resultDataHistoryProduct.data.result ?? []);
    };

    // handle open product detail

    const handleClickQuery = (order_id) => {
        if (order_id) {
            setorderId(order_id);
        }

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        if (query !== 'idle') {
            setQuery('idle');
            return;
        }

        setQuery('progress');
        timerRef.current = window.setTimeout(() => {
            setQuery('success');
        }, 1300);
    };

    return (
        <>
            <div className="order-container">
                <div className="order-header">
                    <Box
                        sx={{
                            height: '50px',
                            marginBottom: '-1px',
                            paddingRight: '10px',
                            width: 'fit-content',
                            borderBottom: '4px solid #d2dc64',
                            overflowY: 'hidden',
                        }}
                    >
                        <div
                            className={
                                query !== 'success'
                                    ? 'order-header_item'
                                    : 'order-header_item_change'
                            }
                        >
                            <div className="header_item-content">
                                <ArticleIcon sx={{ fontSize: '30px' }} />
                                <p>Đơn hàng</p>
                            </div>
                            <div
                                className="header_item-content"
                                onClick={() => handleClickQuery()}
                            >
                                <ArrowBackIosNewIcon
                                    sx={{ fontSize: '30px' }}
                                />
                                <p>Quay lại</p>
                            </div>
                        </div>
                    </Box>
                </div>
                <div className="order-main">
                    <Box>
                        {query === 'success' ? (
                            <div className="order-products__detail">
                                {productEachOrder.map((data, index) => (
                                    <ItemProductInOrder
                                        key={index}
                                        dataProduct={data}
                                    />
                                ))}
                            </div>
                        ) : (
                            <Box
                                marginTop={query !== 'idle' ? '50px' : '0'}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Fade in={query === 'progress'} unmountOnExit>
                                    <CircularProgress />
                                </Fade>
                            </Box>
                        )}
                    </Box>
                    <div
                        className="order-products"
                        hidden={query === 'idle' ? false : true}
                    >
                        {dataOrder.length !== 0 ? (
                            dataOrder.map((data, index) => (
                                <div
                                    key={index}
                                    className="order-products__item"
                                    onClick={() => handleClickQuery(data.id)}
                                >
                                    <ItemOrder
                                        dataOrders={data}
                                        productOrder={productInOrder.filter(
                                            (item) => item.order_id === data.id
                                        )}
                                    />
                                </div>
                            ))
                        ) : (
                            <Box sx={{ marginTop: '30px' }}>
                                <Typography
                                    sx={{
                                        fontSize: '22px',
                                        fontWeight: '550',
                                        color: '#AAAAAA',
                                        textAlign: 'center',
                                    }}
                                >
                                    Bạn chưa mua sản phẩm nào!:))
                                </Typography>
                            </Box>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

const ItemProductInOrder = (props) => {
    return (
        <React.Fragment>
            <Card sx={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <CardMedia
                    component="img"
                    sx={{ width: '17%' }}
                    image={api_url + props.dataProduct.image}
                /> 
                <Box sx={{ width: '82%', padding: '18px 15px 10px' }}>
                    <Link to={'/products/' + props.dataProduct.slug}>
                        <Typography
                            sx={{
                                fontSize: '17px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',

                                ":hover": {
                                    color: '#6C9DE3',
                                    textDecoration: 'underline'
                                }
                            }}
                        >
                            <b>Tên: </b>
                            {props.dataProduct.name}
                        </Typography>
                    </Link>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography>
                            <b>Kích cỡ: </b>
                            {props.dataProduct.size}
                        </Typography>
                        <Typography sx={{ fontWeight: '550' }}>
                            x{props.dataProduct.quantity}
                        </Typography>
                    </Box>
                    <Typography sx={{ textAlign: 'end', color: '#CED11F' }}>
                        {props.dataProduct?.price?.toLocaleString('it-It')} <b>đ</b>
                    </Typography>
                    <Box
                        sx={{
                            borderTop: '1px solid #AAAAAA',
                            marginTop: '10px',
                            paddingTop: '10px',
                        }}
                    >
                        <Typography sx={{textAlign: 'end'}}>
                            <b>Thành tiền: </b>
                            <span style={{
                                fontSize: '18px',
                                fontWeight: '550',
                                color: '#CB4874',
                            }}>
                                {(
                                    parseInt(props.dataProduct.price ?? 0) *
                                    parseInt(props.dataProduct.quantity ?? 0)
                                ).toLocaleString('it-It')}
                            </span>
                            <b> đ</b>
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </React.Fragment>
    );
};

const ItemOrder = (props) => {
    const date = new Date(props.dataOrders.created_at ?? '');
    const caculateTotalPrice = () => {
        let sumPrice = 0;

        if (props.productOrder.length !== 0) {
            for (let item of props.productOrder) {
                sumPrice += parseInt(item.price) * parseInt(item.quantity);
            }
        }

        return sumPrice;
    };
    return (
        <React.Fragment>
            <Card
                sx={{
                    display: 'flex',
                    margin: '15px 0',
                    justifyContent: 'space-between',
                }}
            >
                <Box sx={{ width: '100%', padding: '10px 15px' }}>
                    <Typography
                        sx={{
                            fontSize: '16px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <b>Đơn hàng: </b>
                        {props.dataOrders.code_order}
                    </Typography>
                    <Typography sx={{ fontSize: '18px', fontWeight: '550', color: '#4DC9AD' }}>
                        Địa chỉ nhận hàng
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography>
                            <b>Tên: </b>
                            {props.dataOrders.name}
                        </Typography>
                        <Typography>
                            <b>Số điện thoại: </b>
                            {props.dataOrders.phone}
                        </Typography>
                    </Box>
                    <Typography>
                        <b>Địa chỉ: </b>
                        {props.dataOrders.address}
                    </Typography>
                    <Typography>
                        <b>Thời gian: </b>
                        {date.getHours() + ':' + date.getMinutes()}
                        <span>, Ngày: </span>
                        {date.getDate() +
                            '-' +
                            (parseInt(date.getMonth()) + 1) +
                            '-' +
                            date.getFullYear()}
                    </Typography>
                    <Typography>
                        <b>Trạng thái: </b>
                        {props.dataOrders?.status === 0 ? (
                            <span style={{ color: '#5AC96F' }}>Đang xử lý</span>
                        ) : props.dataOrdersr?.status === 1 ? (
                            <span style={{ color: '#5AC96F' }}>
                                Đang giao hàng
                            </span>
                        ) : props.dataOrders?.status === 2 ? (
                            <span style={{ color: '#5AC96F' }}>
                                Đã giao thành công
                            </span>
                        ) : (
                            <span style={{ color: '#B9526F' }}>Đã hủy</span>
                        )}
                    </Typography>
                    <Box
                        sx={{
                            marginTop: '15px',
                            padding: '8px 15px 0 0',
                            textAlign: 'end',
                            borderTop: '1px solid #AAAAAA',
                        }}
                    >
                        <Typography>
                            <b>Giá trị đơn: </b>
                            <span
                                style={{ color: '#CE5579', fontSize: '18px' }}
                            >
                                {caculateTotalPrice()?.toLocaleString('it-It')}
                            </span>
                            <b> đ</b>
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </React.Fragment>
    );
};

export default Orders;

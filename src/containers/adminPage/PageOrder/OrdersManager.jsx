import React from 'react';
import '../adminPage.css';
import fileIcon from '../img-vector/fileIcon.svg';
import {
    Box,
    Button,
    Card,
    CardMedia,
    MenuItem,
    Select,
    SwipeableDrawer,
    Typography,
} from '@mui/material';
import {
    GetOrdersAll,
    GetOrdersById,
    PostUpdateOrder,
} from '../../../services/orderService';
import {
    GetDataProductInOrder,
    GetDataProductInOrderByOrderId,
    PostUpdateOrderDetail,
} from '../../../services/orderDetailService';

const api_url = 'http://localhost:8080/';

const OrdersManager = () => {
    const [dataSearch, setDataSearch] = React.useState();
    const [dataResultSearch, setDataResultSearch] = React.useState([]);
    const [isSearch, setIsSearch] = React.useState(false);

    const [dataOrder, setDataOrder] = React.useState([]);

    React.useEffect(() => {
        handleDataOrder();
    }, []);

    const handleDataOrder = async () => {
        let resultOrder = await GetOrdersAll();

        setDataOrder(resultOrder.data.result);
    };

    // handle search
    const handleSearch = async () => {};

    return (
        <div>
            <div className="adminpage-container">
                <div className="adminpage-title">
                    <div className="title-icon">
                        <img src={fileIcon} alt="img file" />
                    </div>
                    <span className="title-text">Quản lý đơn hàng</span>
                </div>
                <div className="admin-form-search">
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm"
                        onChange={(e) => setDataSearch(e.target.value)}
                    />
                    <button onClick={() => handleSearch()}>Search</button>
                </div>
                <div className="categories-content">
                    <table className="cgr-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Mã đơn</th>
                                <th>Người mua</th>
                                <th>Thời gian</th>
                                <th>Số lượng sản phẩm</th>
                                <th>Giá trị đơn</th>
                                <th>Trạng thái</th>
                                <th>Xem chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataOrder &&
                                dataOrder.map((data, index) => (
                                    <ItemOrders
                                        key={index}
                                        dataOrder={data.id}
                                    />
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const ItemOrders = (props) => {
    const [dataOrder, setDataOrder] = React.useState();
    const [dataProductInOrder, setDataProductInOrder] = React.useState([]);
    const [valueStatusOrder, setValueStatusOrder] = React.useState({
        id: props.dataOrder ?? '',
        status: '',
    });
    const [openTapProductInOrder, setOpenTapProductInOrder] =
        React.useState(false);

    const givenDate = new Date(dataOrder?.created_at ?? '');
    const currentDate = new Date();

    const timeDifference = currentDate.getTime() - givenDate.getTime();

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;

    const daysDifference = Math.floor(timeDifference / msPerDay);
    const remainingTime = timeDifference % msPerDay;
    const hoursDifference = Math.floor(remainingTime / msPerHour);

    React.useEffect(() => {
        handleDataOrder();
        handleDataProductInOrder();
    }, []);

    React.useEffect(() => {
        handleUpdateStatus();
    }, [valueStatusOrder]);

    React.useEffect(() => {
        setValueStatusOrder({
            ...valueStatusOrder,
            status: dataOrder?.status ?? '',
        });
        handleDataStatus();
    }, [dataOrder]);

    React.useEffect(() => {handleDataStatus()}, [dataProductInOrder])

    const handleDataOrder = async () => {
        let resultOrder = await GetOrdersById({ id: props.dataOrder });

        setDataOrder(resultOrder.data.result[0]);
    };

    const handleDataProductInOrder = async () => {
        let resultProductInOrder = await GetDataProductInOrderByOrderId({
            id: props.dataOrder,
        });
        setDataProductInOrder(resultProductInOrder.data.result);
    };

    const handleDataStatus = () => {
        if (dataProductInOrder.length !== 0) {
            if (dataProductInOrder.length === dataProductInOrder.filter((item) => item.status === dataProductInOrder[0].status).length) {
                setValueStatusOrder({
                    ...valueStatusOrder,
                    status: dataProductInOrder[0]?.status,
                });
                return
            }
            let check = dataProductInOrder[0].status;
            for (let i = 0; i < dataProductInOrder.length; i++) {
                if (dataProductInOrder[i].status <= check) {
                    check = dataProductInOrder[i].status
                }
            }
            setValueStatusOrder({
                ...valueStatusOrder,
                status: check,
            });
        }
    };

    const handleUpdateStatus = async () => {
        await PostUpdateOrder(valueStatusOrder);
    };

    const handleDataDetail = () => {
        let sumPrice = 0;
        let sumQuantity = 0;

        if (dataProductInOrder.length !== 0) {
            for (let item of dataProductInOrder) {
                sumPrice += parseInt(item.quantity) * parseInt(item.price);
                sumQuantity += parseInt(item.quantity);
            }
        }

        return {
            sumPrice: sumPrice,
            sumQuantity: sumQuantity,
        };
    };

    const handleChangeStatusOrder = (event) => {
        setValueStatusOrder({
            ...valueStatusOrder,
            status: event.target.value,
        });
    };

    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setOpenTapProductInOrder(open);
    };
    return (
        <React.Fragment>
            <tr>
                <td>{dataOrder?.id ?? 'err'}</td>
                <td>{dataOrder?.code_order ?? 'err'}</td>
                <td>{dataOrder?.name ?? 'err'}</td>
                <td>
                    {daysDifference >= 1 ? (
                        <span>
                            {daysDifference} Ngày, {hoursDifference} giờ trước
                        </span>
                    ) : (
                        <span>{hoursDifference} giờ trước</span>
                    )}
                </td>
                <td>{handleDataDetail().sumQuantity}</td>
                <td>
                    {handleDataDetail().sumPrice?.toLocaleString('it-It') ??
                        'err'}{' '}
                    <b>đ</b>
                </td>
                <td>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={valueStatusOrder.status}
                        onChange={handleChangeStatusOrder}
                    >
                        <MenuItem value={0}>Xử lý Đơn</MenuItem>
                        <MenuItem value={1}>Giao hàng</MenuItem>
                        <MenuItem value={2}>Hoàn thành</MenuItem>
                        <MenuItem value={3}>Hủy</MenuItem>
                    </Select>
                </td>
                <td>
                    <Button
                        sx={{ textTransform: 'none' }}
                        variant="contained"
                        onClick={() => setOpenTapProductInOrder(true)}
                    >
                        Xem chi tiết
                    </Button>
                    <SwipeableDrawer
                        anchor={'right'}
                        open={openTapProductInOrder}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                    >
                        {dataProductInOrder &&
                            dataProductInOrder.map((data, index) => (
                                <ItemProductInOrder
                                    key={index}
                                    dataProduct={data}
                                    handleDataProductInOrder={handleDataProductInOrder}
                                />
                            ))}
                    </SwipeableDrawer>
                </td>
            </tr>
        </React.Fragment>
    );
};

const ItemProductInOrder = (props) => {
    const [valueStatusOrderDetail, setValueStatusOrderDetail] = React.useState({
        id: props.dataProduct.id,
        status: props.dataProduct.status,
    });
    const [dataUpdate, setDataUpdate] = React.useState()

    React.useEffect(() => {
        handleUpdateStatus()
    }, [valueStatusOrderDetail]);

    React.useEffect(() => {
        props.handleDataProductInOrder()
    }, [dataUpdate])

    const handleUpdateStatus = async () => {
        let result = await PostUpdateOrderDetail(valueStatusOrderDetail);

        setDataUpdate(result.data?.result ?? '')
    };

    const handleChangeStatusOrderDetail = (event) => {
        setValueStatusOrderDetail({
            ...valueStatusOrderDetail,
            status: event.target.value,
        });
    };
    return (
        <React.Fragment>
            <Card
                sx={{
                    width: '400px',
                    padding: '20px 8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <CardMedia
                    component={'img'}
                    image={api_url + props.dataProduct.image}
                    title="img product"
                    sx={{ width: '32%' }}
                />
                <Box sx={{ width: '67%' }}>
                    <Typography
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <b>Tên: </b> {props.dataProduct.name}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '17px',
                            color: '#C4CE4D',
                        }}
                    >
                        {props.dataProduct.price?.toLocaleString('it-It') ??
                            'err'}
                        <b>đ</b>
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography>
                            <b>Kích thước: </b> {props.dataProduct.size}
                        </Typography>
                        <Typography>x{props.dataProduct.quantity}</Typography>
                    </Box>
                    <Typography>
                        <b>Tổng giá: </b>
                        {(
                            parseInt(props.dataProduct.quantity ?? 0) *
                            parseInt(props.dataProduct.price ?? 0)
                        ).toLocaleString('it-It')}
                        <b>đ</b>
                    </Typography>
                    <Box
                        sx={{
                            borderTop: '1px solid #AAAAAA',
                            paddingTop: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'end',
                            marginTop: '15px',
                        }}
                    >
                        <Typography
                            sx={{ fontSize: '18px', fontWeight: '550' }}
                        >
                            Trạng thái:{' '}
                        </Typography>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={valueStatusOrderDetail.status}
                            onChange={handleChangeStatusOrderDetail}
                            sx={{ height: '30px', marginLeft: '10px' }}
                        >
                            <MenuItem value={0}>Xử lý Đơn</MenuItem>
                            <MenuItem value={1}>Giao hàng</MenuItem>
                            <MenuItem value={2}>Hoàn thành</MenuItem>
                            <MenuItem value={3}>Hủy</MenuItem>
                        </Select>
                    </Box>
                </Box>
            </Card>
        </React.Fragment>
    );
};

export default OrdersManager;

import React from 'react';
import '../adminPage.css';
import fileIcon from '../img-vector/fileIcon.svg';
import {
    Box,
    Button,
    Card,
    CardMedia,
    MenuItem,
    Pagination,
    Select,
    Stack,
    SwipeableDrawer,
    Typography,
} from '@mui/material';
import Input from '@mui/joy/Input';
import {
    GetOrdersAll,
    GetOrdersById,
    PostUpdateOrder,
} from '../../../services/orderService';
import {
    GetDataProductInOrderByOrderId,
} from '../../../services/orderDetailService';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Swal from 'sweetalert2';
import Scroll from 'react-scroll';
var Link = Scroll.Link;
var Element = Scroll.Element;

const StyledBadge = styled(Badge)(({ theme, stylecolor }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: stylecolor ?? '#44b700',
        color: stylecolor ?? '#44b700',
        boxShadow: `0 0 0 5px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const api_url = 'http://localhost:8080/';

const OrdersManager = () => {
    const [dataSearch, setDataSearch] = React.useState();
    const [dataResultSearch, setDataResultSearch] = React.useState([]);
    const [isSearch, setIsSearch] = React.useState(false);

    const [dataOrder, setDataOrder] = React.useState([]);

    const [page, setPage] = React.useState(1);
    const [dataAPage, setDataAPage] = React.useState([]);

    React.useEffect(() => {
        handleDataOrder();
    }, []);

    React.useEffect(() => {
        if (isSearch) {
            setDataAPage(dataResultSearch.slice(page * 8 - 8, page * 8));
            return;
        }
        setDataAPage(dataOrder.slice(page * 8 - 8, page * 8));
    }, [page, dataOrder, dataResultSearch]);

    React.useEffect(() => {
        if (!dataSearch) {
            setDataResultSearch([])
            setIsSearch(false)
        }
    }, [dataSearch])

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const handleDataOrder = async () => {
        let resultOrder = await GetOrdersAll();

        setDataOrder(resultOrder.data.result);
    };

    // handle search
    const handleSearch = async () => {
        let regex = new RegExp(dataSearch, "i")
        let data = dataOrder.filter(item => regex.test(item?.code_order))
        if (data.length !== 0) {
            setIsSearch(true)
            setDataResultSearch(data)
            return
        }

        Swal.fire({
            icon: 'warning',
            html: `<h3>Không tìm thấy sản phẩm</h3>`,
        });
        setIsSearch(false)
    };

    return (
        <div>
            <Element name="secondInsideContainer"></Element>
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
                        placeholder="Tìm kiếm đơn hàng"
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
                                <th>Thời gian đặt</th>
                                <th>Ngày giao</th>
                                <th>Số lượng sản phẩm</th>
                                <th>Giá trị đơn</th>
                                <th>Trạng thái</th>
                                <th>Khách hàng</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataAPage &&
                                dataAPage.map((data, index) => (
                                    <ItemOrders
                                        key={index}
                                        dataOrder={data.id}
                                    />
                                ))}
                        </tbody>
                    </table>
                    {dataOrder.length < 8 ? '':
                        <Box sx={{
                            button: {
                                color: 'black'
                            }
                        }}>
                            <Link
                                activeClass="active"
                                to="secondInsideContainer"
                                spy={true}
                                smooth={true}
                                duration={250}
                            >
                                <Pagination
                                    count={
                                        isSearch
                                            ? dataResultSearch.length % 8 === 0
                                                ? dataResultSearch.length / 8
                                                : Math.floor(
                                                    dataResultSearch.length / 8
                                                ) + 1
                                            : dataOrder.length % 8 === 0
                                            ? dataOrder.length / 8
                                            : Math.floor(dataOrder.length / 8) + 1
                                    }
                                    page={page}
                                    onChange={handleChangePage}
                                    sx={{
                                        marginTop: '30px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                />
                            </Link>
                        </Box>
                    }
                </div>
            </div>
        </div>
    );
};

const ItemOrders = (props) => {
    const [dataOrder, setDataOrder] = React.useState();
    const [dataProductInOrder, setDataProductInOrder] = React.useState([]);
    const [dataUpdateOrder, setDataUpdateOrder] = React.useState({
        id: props.dataOrder ?? '',
        status: '',
        deliveryDate: '',
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
        setDataUpdateOrder({
            ...dataUpdateOrder,
            status: dataOrder?.status ?? '',
            deliveryDate: dataOrder?.delivery_date ?? '',
        });
    }, [dataOrder]);

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

    const handleUpdateDataOrder = async () => {
        let isChange = false;
        Swal.fire({
            icon: 'error',
            html: '<h3>Bạn có chắc muốn thay đổi?</h3>',
            focusConfirm: false,
            cancelButtonText: 'Hủy',
            confirmButtonText: 'Xác nhận',
            showCancelButton: true,
            preConfirm: async () => {
                isChange = true;
                await PostUpdateOrder(dataUpdateOrder);
            },
        }).then(async () => {
            if (isChange) handleDataOrder()
        });
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

    const handleChangeInDeliveryDate = (event) => {
        setDataUpdateOrder({
            ...dataUpdateOrder,
            deliveryDate: event.target.value,
        });
    };

    const handleChangeStatusOrder = (event) => {
        setDataUpdateOrder({
            ...dataUpdateOrder,
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
                <td>
                    {daysDifference >= 1 ? (
                        <span>
                            {daysDifference} Ngày, {hoursDifference} giờ trước
                        </span>
                    ) : (
                        <span>{hoursDifference} giờ trước</span>
                    )}
                </td>
                <td>{dataOrder?.delivery_date ?? ''}</td>
                <td>{handleDataDetail().sumQuantity}</td>
                <td>
                    {handleDataDetail().sumPrice?.toLocaleString('it-It') ??
                        'err'}{' '}
                    <b>đ</b>
                </td>
                <td>
                    {dataOrder?.status === 0 ? (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <StyledBadge
                                overlap="circular"
                                sx={{ marginRight: '15px' }}
                                stylecolor="#E0DE40"
                                variant="dot"
                            ></StyledBadge>
                            <Typography>Xử lý đơn</Typography>
                        </Box>
                    ) : dataOrder?.status === 1 ? (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <StyledBadge
                                overlap="circular"
                                sx={{ marginRight: '15px' }}
                                stylecolor="#2CD6DB"
                                variant="dot"
                            ></StyledBadge>
                            <Typography>Giao hàng</Typography>
                        </Box>
                    ) : dataOrder?.status === 2 ? (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <StyledBadge
                                overlap="circular"
                                sx={{ marginRight: '15px' }}
                                variant="dot"
                            ></StyledBadge>
                            <Typography>Hoàn thành</Typography>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <StyledBadge
                                overlap="circular"
                                sx={{ marginRight: '15px' }}
                                stylecolor="#EA393B"
                                variant="dot"
                            ></StyledBadge>
                            <Typography>Hủy</Typography>
                        </Box>
                    )}
                </td>
                <td>
                    {dataOrder?.name ?? 'null'}
                </td>
                <td>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        <Button
                            sx={{ textTransform: 'none' }}
                            variant="contained"
                            onClick={() => setOpenTapProductInOrder(true)}
                        >
                            Xem chi tiết & chỉnh sửa
                        </Button>
                    </Box>
                    <SwipeableDrawer
                        anchor={'right'}
                        open={openTapProductInOrder}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                        sx={{zIndex: '11'}}
                    >
                        <Box
                            sx={{
                                width: '380px',
                                margin: '10px auto',
                                padding: '5px 8px',
                                border: '1px solid #AAAAAA',
                                borderRadius: '7px',
                            }}
                        >
                            <Typography
                                sx={{ fontSize: '18px', fontWeight: '550' }}
                            >
                                Thông tin
                            </Typography>
                            <Typography>
                                <b>Tên: </b>
                                {dataOrder?.name ?? 'err'}
                            </Typography>
                            <Typography>
                                <b>Ngày đặt: </b>
                                {givenDate.getDate() +
                                    '-' +
                                    (parseInt(givenDate.getMonth()) + 1) +
                                    '-' +
                                    givenDate.getFullYear()}
                            </Typography>
                            <Typography>
                                <b>Số điện thoại: </b>
                                {dataOrder?.phone ?? 'err'}
                            </Typography>
                            <Typography>
                                <b>Địa chỉ giao: </b>
                                {dataOrder?.address ?? 'err'}
                            </Typography>
                            <Box
                                sx={{
                                    marginTop: '8px',
                                    padding: '8px 0',
                                    borderTop: '1px solid #AAAAAA',
                                }}
                            >
                                <Typography
                                    sx={{ fontSize: '18px', fontWeight: '550' }}
                                >
                                    Cập nhật hóa đơn
                                </Typography>
                                <Stack spacing={1.5}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography>
                                            <b>Ngày giao: </b>
                                        </Typography>
                                        <Input
                                            type="date"
                                            slotProps={{
                                                input: {
                                                    min: '2018-06-07T00:00',
                                                    max: '2018-06-14T00:00',
                                                },
                                            }}
                                            value={dataUpdateOrder.deliveryDate}
                                            onChange={(e) =>
                                                handleChangeInDeliveryDate(e)
                                            }
                                            sx={{
                                                marginLeft: '7px',
                                                height: '30px',
                                            }}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography sx={{ fontWeight: '550' }}>
                                            Trạng thái:{' '}
                                        </Typography>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            sx={{
                                                marginLeft: '7px',
                                                height: '30px',
                                                width: '135px',
                                            }}
                                            value={dataUpdateOrder.status}
                                            onChange={handleChangeStatusOrder}
                                        >
                                            <MenuItem value={0}>
                                                Xử lý Đơn
                                            </MenuItem>
                                            <MenuItem value={1}>
                                                Giao hàng
                                            </MenuItem>
                                            <MenuItem value={2}>
                                                Hoàn thành
                                            </MenuItem>
                                            <MenuItem value={3}>Hủy</MenuItem>
                                        </Select>
                                    </Box>
                                </Stack>
                                <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
                                    <Button
                                        sx={{ textTransform: 'none' }}
                                        variant="contained"
                                        onClick={() =>
                                            handleUpdateDataOrder()
                                        }
                                    >
                                        Xác nhận
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ overflowY: 'scroll', height: '60vh' }}>
                            {dataProductInOrder &&
                                dataProductInOrder.map((data, index) => (
                                    <ItemProductInOrder
                                        key={index}
                                        dataProduct={data}
                                    />
                                ))}
                        </Box>
                    </SwipeableDrawer>
                </td>
            </tr>
        </React.Fragment>
    );
};

const ItemProductInOrder = (props) => {
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
                    <Typography>
                        <b>Số lượng: </b>
                        {props.dataProduct.quantity}
                    </Typography>
                    <Typography>
                        <b>Kích thước: </b> {props.dataProduct.size}
                    </Typography>
                    <Box
                        sx={{
                            borderTop: '1px solid #AAAAAA',
                            marginTop: '20px',
                            paddingTop: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'end',
                        }}
                    >
                        <Typography>
                            <b>Tổng giá: </b>
                            {(
                                parseInt(props.dataProduct.quantity ?? 0) *
                                parseInt(props.dataProduct.price ?? 0)
                            ).toLocaleString('it-It')}
                            <b>đ</b>
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </React.Fragment>
    );
};

export default OrdersManager;

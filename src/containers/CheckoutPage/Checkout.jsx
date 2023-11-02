import React from 'react';
import './checkout.css';
import momoIcon from './ImgVector/logo-momo.png';
import moneyIcon from './ImgVector/icons8-money.png';
import {
    Box,
    Button,
    Card,
    CardMedia,
    Container,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import Swal from 'sweetalert2';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useDispatch, useSelector } from 'react-redux';
import subVn from 'sub-vn';
import { v4 as uuidv4 } from 'uuid';
import { uid } from 'uid';
import { PostAddOrders } from '../../services/orderService';
import { PostAddOrdersDetail } from '../../services/orderDetailService';
import { deleteProdcutCart } from '../../redux/slides/cartSlide';
import { Link, useNavigate } from 'react-router-dom';
import { getUserById } from '../../services/authService';
const api_url = 'http://localhost:8080/';

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const authRedux = useSelector((state) => state.auth);
    const cartRedux = useSelector((state) => state.cart);

    const [cartData, setCartData] = React.useState([]);
    const [ordersData, setOrderData] = React.useState({
        user_id: authRedux.user.result.id,
        code_order: '',
        name: '',
        phone: '',
        address: '',
        city: '',
        district: '',
        note: '',
    });
    const [sumPriceProduct, setSumPriceProduct] = React.useState(0);
    const [additionalCosts, setAdditionalCosts] = React.useState(0);
    const [countProduct, setCountProduct] = React.useState(0);
    const [typePay, setTypePay] = React.useState('money');

    const [provinces, setProvinces] = React.useState({
        province: [],
        districts: [],
    });
    const [provincesIn, setProvincesIN] = React.useState({
        provinceIn: '',
        districtsIN: '',
    });

    React.useEffect(() => {
        let stateCart = cartRedux.cart.result;
        let countProduct = 0;
        let sumPrice = 0;
        for (let key in stateCart) {
            countProduct += parseInt(stateCart[key].quantity);
            sumPrice +=
                parseInt(stateCart[key].quantity) *
                parseInt(stateCart[key].price);
        }
        setCartData(stateCart);
        setSumPriceProduct(sumPrice);
        setCountProduct(countProduct);
    }, [cartRedux]);

    React.useEffect(() => {
        setProvinces({ ...provinces, province: subVn.getProvinces() });
        handleDataInUser();
    }, []);

    const handleDataInUser = async () => {
        let result = await getUserById(
            { id: authRedux?.user?.result?.id },
            authRedux?.user?.token
        );

        setOrderData({
            ...ordersData,
            code_order: 'FF-' + uid(),
            name: result.data?.dataUser?.name ?? '',
            phone: result.data?.dataUser?.phone ?? '',
            address: result.data?.dataUser?.address ?? '',
        });
    };

    const handleOnchangeInfo = (event) => {
        let { name, value } = event.target;
        setOrderData({ ...ordersData, [name]: value });
    };

    const handleOnchangeTypePay = (event) => {
        setTypePay(event.target.value);
    };

    const handleSubmitOrder = async () => {
        let resutlOrder = await PostAddOrders(ordersData);

        if (resutlOrder.data.err > 0) {
            Swal.fire({
                icon: 'warning',
                title: resutlOrder.data.msg,
                focusConfirm: false,
            });
            return;
        }

        let dataOrderDetail = {
            order_id: resutlOrder.data.result.id,
            products: cartData,
        };

        let resutlOrderDetail = await PostAddOrdersDetail(dataOrderDetail);

        if (resutlOrderDetail.data.err > 0) {
            Swal.fire({
                icon: 'warning',
                title: resutlOrderDetail.data.msg,
                focusConfirm: false,
            });
            return;
        }

        Swal.fire({
            icon: 'success',
            title: resutlOrderDetail.data.msg,
            focusConfirm: false,
        }).then(() => {
            for (let dataItem of cartData) {
                dispatch(
                    deleteProdcutCart({
                        cartsDetailsId: dataItem.cartsDetailsId,
                        token: authRedux?.user?.token ?? '',
                    })
                );
            }
            navigate('/account/orders');
        });
    };
    // set in provinces vn
    const onProvinceClick = (event) => {
        event.preventDefault();
        let provinceCode = event.target.value;
        setProvinces({
            ...provinces,
            districts: subVn.getDistrictsByProvinceCode(provinceCode),
        });
        setProvincesIN({ ...provincesIn, provinceIn: provinceCode });

        let provinceCurrent =
            provinces.province?.find((data) => data.code === provinceCode) ??
            [];
        setOrderData({ ...ordersData, city: provinceCurrent?.name });
    };

    const handleChangeDistrictsIn = (event) => {
        event.preventDefault();
        let districtsCode = event.target.value;
        setProvincesIN({ ...provincesIn, districtsIN: districtsCode });

        let districtsCurrent =
            provinces.districts?.find((data) => data.code === districtsCode) ??
            [];
        setOrderData({ ...ordersData, district: districtsCurrent.name });
    };
    return (
        <div>
            <Container
                sx={{
                    marginTop: '145px',
                    backgroundColor: 'white',
                    padding: '20px 10px',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    position: 'relative',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '-40px',
                        left: '0',
                        padding: '5px 10px',
                        backgroundColor: 'white',
                        borderRadius: '10px',
                    }}
                >
                    <Link to={'/cart'}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        ':hover': {
                            color: '#36BFEA',
                            fontStyle: 'italic'
                        }
                    }}>

                        <ArrowBackIosIcon />
                            <Typography sx={{fontWeight: '550'}}>Quay lại</Typography>
                    </Box>
                    </Link>
                </Box>
                <Box sx={{ width: '35%' }}>
                    <Typography sx={{ fontWeight: '700', fontSize: '19px' }}>
                        Đơn hàng <span>({countProduct} sản phẩm)</span>
                    </Typography>
                    <Box>
                        <Box>
                            {cartData.length === 0 ? (
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
                                cartData.map((data) => (
                                    <ItemCardProduct
                                        key={data.cartsDetailsId}
                                        dataProduct={data}
                                    />
                                ))
                            )}
                        </Box>
                        <Box>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="left">
                                            Tạm tính
                                        </TableCell>
                                        <TableCell align="right">
                                            {sumPriceProduct?.toLocaleString(
                                                'it-It'
                                            )}{' '}
                                            <span>đ</span>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">
                                            Phí vận chuyển
                                        </TableCell>
                                        {additionalCosts === 0 ? (
                                            <TableCell align="right">
                                                Miễn phí
                                            </TableCell>
                                        ) : (
                                            <TableCell align="right">
                                                {additionalCosts?.toLocaleString(
                                                    'it-It'
                                                )}{' '}
                                                <span>đ</span>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                    <TableRow sx={{ fontSize: '18px' }}>
                                        <TableCell align="left">
                                            Tổng cộng
                                        </TableCell>
                                        <TableCell align="right">
                                            <span
                                                style={{
                                                    fontSize: '18px',
                                                    fontWeight: '600',
                                                    color: '#E86783',
                                                }}
                                            >
                                                {(
                                                    parseInt(sumPriceProduct) +
                                                    parseInt(additionalCosts)
                                                )?.toLocaleString('it-It')}
                                            </span>{' '}
                                            <span>đ</span>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: '60%',
                        display: 'flex',
                        justifyContent: 'space-around',
                        flexWrap: 'wrap',
                    }}
                >
                    <Box sx={{ width: '47%' }}>
                        <Typography
                            sx={{ fontWeight: '600', fontSize: '18px' }}
                        >
                            Thông tin giao hàng
                        </Typography>
                        <Stack spacing={2}>
                            <TextField
                                id="outlined-basic"
                                name="name"
                                value={ordersData.name}
                                label="Họ và tên"
                                variant="outlined"
                                onChange={(e) => handleOnchangeInfo(e)}
                            />
                            <TextField
                                id="outlined-basic"
                                name="phone"
                                value={ordersData.phone}
                                label="Số điện thoại"
                                variant="outlined"
                                onChange={(e) => handleOnchangeInfo(e)}
                            />
                            <TextField
                                id="outlined-basic"
                                name="address"
                                value={ordersData.address}
                                label="Địa chỉ"
                                variant="outlined"
                                onChange={(e) => handleOnchangeInfo(e)}
                            />

                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-helper-label">
                                    Tỉnh/ thành phố
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    label="Tỉnh/ thành phố"
                                    value={provincesIn.provinceIn}
                                    onChange={onProvinceClick}
                                >
                                    <MenuItem value="">
                                        Tỉnh/ thành phố
                                    </MenuItem>
                                    {provinces.province &&
                                        provinces.province.map((data) => {
                                            return (
                                                <MenuItem
                                                    key={data.code}
                                                    value={data.code ?? ''}
                                                >
                                                    {data.name}
                                                </MenuItem>
                                            );
                                        })}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-helper-label">
                                    Quận/ huyện
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    label="Quận/ huyện"
                                    value={provincesIn.districtsIN}
                                    onChange={handleChangeDistrictsIn}
                                >
                                    <MenuItem value="">Quận/ huyện</MenuItem>
                                    {provinces.districts &&
                                        provinces.districts.map((data) => {
                                            return (
                                                <MenuItem
                                                    key={data.code}
                                                    value={data.code ?? ''}
                                                >
                                                    {data.name}
                                                </MenuItem>
                                            );
                                        })}
                                </Select>
                            </FormControl>

                            <Box>
                                <Typography
                                    sx={{ fontWeight: '600', fontSize: '18px' }}
                                >
                                    Ghi chú
                                </Typography>
                                <textarea
                                    name="note"
                                    id="message"
                                    style={{
                                        width: '100%',
                                        height: '100px',
                                        border: '1px solid #BCBCBC',
                                        borderRadius: '8px',
                                        outline: 'none',
                                        padding: '10px',
                                        fontSize: '18px',
                                        placeholder: { fontSize: '18px' },
                                    }}
                                    value={ordersData.note}
                                    placeholder="Ghi chú (tùy chọn)..."
                                    onChange={(e) => handleOnchangeInfo(e)}
                                ></textarea>
                            </Box>
                        </Stack>
                    </Box>
                    <Box sx={{ width: '47%' }}>
                        <Box sx={{ marginBottom: '15px' }}>
                            <Typography
                                sx={{ fontWeight: '600', fontSize: '18px' }}
                            >
                                Vận chuyển
                            </Typography>
                            <Box
                                sx={{
                                    border: '1px solid #AAAAAA',
                                    borderRadius: '5px',
                                    padding: '8px',
                                }}
                            >
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="freeTransport"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel
                                        value="freeTransport"
                                        control={<Radio />}
                                        label="Miễn phí vận chuyển đơn hàng từ 200k"
                                    />
                                </RadioGroup>
                            </Box>
                        </Box>
                        <Typography
                            sx={{ fontWeight: '600', fontSize: '18px' }}
                        >
                            Thanh toán
                        </Typography>
                        <Box>
                            <RadioGroup
                                aria-labelledby="radio-buttons-group-label"
                                defaultValue={typePay}
                                name="radio-buttons-group"
                                onChange={handleOnchangeTypePay}
                            >
                                <table className="checkout-select">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <FormControlLabel
                                                    value="momo"
                                                    control={<Radio disabled />}
                                                    label="	Thanh toán qua Ví MoMo"
                                                />
                                                <img
                                                    src={momoIcon}
                                                    alt=""
                                                    width={'30px'}
                                                    height={'30px'}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <FormControlLabel
                                                    value="money"
                                                    control={<Radio />}
                                                    label="Thanh toán khi nhận hàng (COD)"
                                                />
                                                <img
                                                    src={moneyIcon}
                                                    alt=""
                                                    width={'30px'}
                                                    height={'30px'}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </RadioGroup>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            marginTop: '25px',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{ width: '270px' }}
                            onClick={() => handleSubmitOrder()}
                        >
                            Đặt hàng
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

const ItemCardProduct = (props) => {
    return (
        <React.Fragment>
            <Card sx={{ display: 'flex', margin: '15px 0' }}>
                <CardMedia
                    component="img"
                    sx={{ width: '24%' }}
                    image={
                        props.dataProduct.image
                            ? api_url + props.dataProduct.image
                            : ''
                    }
                    alt="Live from space album cover"
                />
                <Box sx={{ width: '76%', padding: '3px 10px' }}>
                    <Box>
                        <Typography
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {props.dataProduct?.name ?? 'none'}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography>
                                <b>Số lượng: </b>
                                {props.dataProduct?.quantity ?? 'none'}
                            </Typography>
                            <Typography>
                                <b>Kích cỡ: </b>
                                <span>{props.dataProduct?.size ?? 'none'}</span>
                            </Typography>
                        </Box>
                    </Box>
                    <Typography>
                        <b>Giá: </b>
                        <span style={{ color: '#E86783' }}>
                            {(
                                parseInt(props.dataProduct.price) *
                                parseInt(props.dataProduct.quantity)
                            ).toLocaleString('it-It')}{' '}
                        </span>
                        <span>đ</span>
                    </Typography>
                </Box>
            </Card>
        </React.Fragment>
    );
};

export default Checkout;

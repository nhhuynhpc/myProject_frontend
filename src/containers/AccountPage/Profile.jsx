import {
    Avatar,
    Box,
    Card,
    CardMedia,
    Container,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Rating,
    Typography,
} from '@mui/material';
import React from 'react';
import Slider from 'react-slick';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CardProduct from '../../components/CardProduct/CardProduct';
import { useSelector } from 'react-redux';
import { authRedux } from '../../redux/selectors';
import { getUserById } from '../../services/authService';
import { GetDataProductInOrder } from '../../services/orderDetailService';
import { GetOrders } from '../../services/orderService';
import { Link } from 'react-router-dom';
const api_url = 'http://localhost:8080/';

const Profile = () => {
    const authData = useSelector(authRedux);
    const [dataUser, setDataUser] = React.useState();

    const [productInOrder, setProductInOrder] = React.useState([]);
    const [productInOrderRandom, setProductInOrderRandom] = React.useState([]);

    React.useEffect(() => {
        handleDataUser();
        handleDataProduct();
    }, [authData]);

    const handleDataUser = async () => {
        let result = await getUserById(
            { id: authData.user.result.id },
            authData.user.token
        );
        setDataUser(result.data.dataUser);
    };

    const handleDataProduct = async () => {
        let resutlDataOrders = await GetOrders({
            user_id: authData.user.result.id,
        });
        let handleDataOrder = resutlDataOrders.data.result.filter(
            (item) => item.status === 2
        );

        let listOrderId = [];
        for (let item of handleDataOrder) {
            listOrderId.push(item?.id);
        }

        let resultDataHistoryProduct = await GetDataProductInOrder({
            listOrderId: listOrderId,
        });

        let indexRandom = Math.floor(Math.random() * (resultDataHistoryProduct.data.result?.length - 3));
        setProductInOrderRandom(resultDataHistoryProduct.data.result?.slice(indexRandom, indexRandom + 3) ?? [])

        setProductInOrder(resultDataHistoryProduct.data.result ?? []);
    };

    // style slider
    const ArrowLeft = (props) => {
        const { className, onClick } = props;
        return (
            <ArrowBackIosNewIcon
                className={className}
                onClick={onClick}
                sx={{
                    left: '-50px',
                    padding: '8px',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'rgba(72, 72, 72, 0.437)',
                    color: 'white',
                    ':hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.618)',
                        color: 'white',
                    },
                }}
            />
        );
    };
    const ArrowRight = (props) => {
        const { className, onClick } = props;
        return (
            <NavigateNextIcon
                className={className}
                onClick={onClick}
                sx={{
                    right: '-50px',
                    padding: '8px',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'rgba(72, 72, 72, 0.437)',
                    color: 'white',
                    ':hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.618)',
                        color: 'white',
                    },
                }}
            />
        );
    };

    const settings = {
        // className: 'center',
        // centerMode: true,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
        prevArrow: <ArrowLeft />,
        nextArrow: <ArrowRight />,
    };

    return (
        <div>
            <Container
                sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
                <Box sx={{ width: '65%', padding: '8px 50px' }}>
                    {productInOrderRandom.length === 0 ? '': 
                        <Box>
                            <Typography sx={{fontSize: '18px', fontWeight: '550', margin: '-30px 0 20px -50px',}}>Đã mua</Typography>
                            <Slider {...settings}>
                                {
                                productInOrderRandom.map((item, i) => (
                                    <ItemBlockProduct key={i} item={item} />
                                ))
                                }
                            </Slider>
                        </Box>
                    }
                </Box>
                <Box sx={{ width: '33%' }}>
                    <Box sx={{ padding: '15px 0' }}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={api_url + 'userImg.webp'}
                                    sx={{
                                        width: '80px',
                                        height: '80px',
                                        marginRight: '15px',
                                    }}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography
                                        sx={{
                                            marginTop: '15px',
                                            fontSize: '20px',
                                            fontWeight: '500',
                                        }}
                                    >
                                        {dataUser?.name ?? 'err'}
                                    </Typography>
                                }
                                secondary={
                                    <Typography>
                                        {dataUser?.email ?? 'err'}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </Box>
                    <Box>
                        <List>
                            <ListItem
                                disablePadding
                                sx={{
                                    borderTop: '1px solid #C4C4C4',
                                    padding: '10px 15px',
                                }}
                            >
                                <ListItemText
                                    primary={
                                        'ĐÃ MUA: ' +
                                        productInOrder.length +
                                        'sản phẩm'
                                    }
                                />
                            </ListItem>
                        </List>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

function ItemBlockProduct(props) {
    const [valueProductQuanlity, setValueProductQuanlity] = React.useState(4);
    return (
        <>
            <Card sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link to={'/products/' + props.item.slug}>
                    <CardMedia
                        component="img"
                        sx={{ width: '130px' }}
                        image={api_url + props.item.image}
                        alt="green iguana"
                    />
                </Link>
                <Box sx={{ width: '63%', padding: '15px 10px' }}>
                    <Link to={'/products/' + props.item.slug}>
                        <Typography
                            sx={{
                                fontSize: '15px',
                                fontWeight: '550',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                ':hover': {
                                    color: '#DE294D',
                                },
                            }}
                        >
                            {props.item.name}
                        </Typography>
                    </Link>
                    <Box
                        sx={{
                            '& > legend': { mt: 2 },
                        }}
                    >
                        <Rating
                            name="simple-controlled"
                            value={valueProductQuanlity}
                            onChange={(event, newValue) => {
                                setValueProductQuanlity(newValue);
                            }}
                        />
                    </Box>
                    <Typography sx={{ fontSize: '17px', color: '#EA5581' }}>
                        {props.item.price.toLocaleString('it-It')}
                        <b>đ</b>
                    </Typography>
                </Box>
            </Card>
        </>
    );
}

export default Profile;

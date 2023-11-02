import React from 'react';
import './Card.css';
import { Box, Card, CardMedia, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProdcutCart, updateCart } from '../../redux/slides/cartSlide';

const CardInCart = (props) => {
    const api_url = 'http://localhost:8080/';
    const [image, setImage] = React.useState();
    const [productInCart, setProductInCart] = React.useState(props.dataProduct);
    const [countProduct, setCountProduct] = React.useState(
        props.dataProduct?.quantity ?? 0
    );
    const [sizeProduct, setSizeProduct] = React.useState(
        props.dataProduct?.size
    );

    const authRedux = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    React.useEffect(() => {
        // update cart
        let dataCart = {
            user_id: authRedux?.user?.result?.id ?? '',
            cart_id: productInCart?.cart_id ?? '',
            product_id: productInCart?.product_id ?? '',
            quantity: countProduct ?? '',
            size: sizeProduct ?? '',
            token: authRedux?.user?.token ?? ''
        };
        let action = updateCart(dataCart);
        dispatch(action);
    }, [countProduct, sizeProduct]);

    React.useEffect(() => {
        setSizeProduct(props.dataProduct?.size);
        setCountProduct(props.dataProduct?.quantity);
        setProductInCart(props.dataProduct);
        if (props.dataProduct?.image) {
            setImage(api_url + props.dataProduct?.image);
            return;
        }
        setImage('');
    }, [props.dataProduct]);

    const handleSelectSize = (event) => {
        setSizeProduct(event.target.value);
    };

    const handleDeleteInCart = () => {
        // delete product in cart
        let action = deleteProdcutCart({
            user_id: productInCart?.user_id ?? '0',
            cartsDetailsId: productInCart?.cartsDetailsId ?? '',
            token: authRedux?.user?.token ?? ''
        });
        dispatch(action);
    };

    return (
        <React.Fragment>
            <Card sx={{ display: 'flex', margin: '15px 0' }}>
                <CardMedia
                    component="img"
                    sx={{ width: '24%' }}
                    image={image}
                    alt="Live from space album cover"
                />
                <Box sx={{ width: '76%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box
                            sx={{
                                padding: '8px 0 0 20px',
                                flexGrow: '1',
                                width: 100,
                            }}
                        >
                            <Typography
                                sx={{
                                    display: 'block',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {productInCart?.name ?? 'name'}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '18px',
                                    fontWeight: '700',
                                    color: '#C9DB5D',
                                }}
                            >
                                {productInCart?.price?.toLocaleString(
                                    'it-IT'
                                ) ?? 'price'}
                                <span>
                                    {' '}
                                    <b>
                                        {' '}
                                        <u>đ</u>
                                    </b>
                                </span>
                            </Typography>
                            <div className="form-size-product">
                                <label htmlFor="sizeProduct">Kích cỡ: </label>
                                <select
                                    id="sizeProduct"
                                    value={sizeProduct}
                                    onChange={(e) => handleSelectSize(e)}
                                >
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                </select>
                            </div>
                        </Box>
                        <IconButton
                            aria-label="delete"
                            onClick={() => handleDeleteInCart()}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                    <Box
                        sx={{
                            padding: '0 20px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <div className="cart-update-number">
                            <button
                                onClick={() => {
                                    setCountProduct(
                                        countProduct > 1
                                            ? parseInt(countProduct) - 1
                                            : 1
                                    );
                                }}
                            >
                                -
                            </button>
                            <input type="text" value={countProduct} readOnly />
                            <button
                                onClick={() =>
                                    setCountProduct(parseInt(countProduct) + 1)
                                }
                            >
                                +
                            </button>
                        </div>
                        <Typography sx={{ fontSize: '14px' }}>
                            Tổng cộng:{' '}
                            <span
                                style={{
                                    fontSize: '16px',
                                    fontWeight: '700',
                                    color: '#EA3639',
                                }}
                            >
                                {(
                                    parseInt(productInCart?.price) *
                                    parseInt(countProduct)
                                )?.toLocaleString('it-IT')}
                            </span>
                            <span>
                                {' '}
                                <b>
                                    <u>đ</u>
                                </b>
                            </span>
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </React.Fragment>
    );
};

export default CardInCart;

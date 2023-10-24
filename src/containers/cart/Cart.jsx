import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import NoCrashIcon from '@mui/icons-material/NoCrash';
import ElectricMopedIcon from '@mui/icons-material/ElectricMoped';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Slider from "react-slick";
import CardProduct from "../../components/CardProduct/CardProduct";
import { GetProduct } from "../../services/authService";
import CardInCart from "../../components/CardProduct/CardInCart";
import {  useSelector } from "react-redux";
const api_url = "http://localhost:8080/";

const Cart = () => {
    const [dataProductsuggest, setDataProductSuggest] = React.useState([]);
    const [dataProduct, setDataProduct] = React.useState([])
    const [countProduct, setCountProduct] = React.useState();
    const [sumPriceProduct, setSumPriceProduct] = React.useState([])
    const cartRedux = useSelector((state) => state.cart);


    //set cart
    React.useEffect(() => {
        let stateCart = cartRedux.cart.result;
        let countProduct = 0; 
        let sumPriceProduct = 0
        for (let key in stateCart) {
          countProduct += parseInt(stateCart[key].quantity);
          sumPriceProduct += parseInt(stateCart[key].quantity) * parseInt(stateCart[key].price)
        }
        setCountProduct(countProduct);
        setSumPriceProduct(sumPriceProduct)
        setDataProduct(stateCart)
    }, [cartRedux]);


    //get random product
    React.useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
          let result = await GetProduct();
          let dataProduct = result.data.dataProduct;
          let random = Math.floor(Math.random() * (dataProduct.length - 6));
          setDataProductSuggest(dataProduct.slice(random, random + 6));
        } catch (error) {
          console.log(error);
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
    };
  return (
    <div>
      <div className="cart-view">
        <Container sx={{ marginTop: "140px" }}>
          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              justifyContent: 'space-evenly',
              flexWrap: { xs: "wrap" },
            }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                padding: "10px",
                width: { sm: "100%", lg: "60%" },
                borderRadius: "8px"
              }}
            >
                <Box sx={{padding: '5px 0', borderBottom: '1px solid #B9B9B9', marginBottom: '20px'}}>
                    <Typography sx={{fontSize: '20px', fontWeight: '600'}}>
                        Giỏ hàng <span style={{fontWeight: '300', fontSize: '16px'}}>({countProduct}) Sản phẩm</span>
                    </Typography>
                </Box>

                <Box>
                    {parseInt(countProduct) === 0 ?
                        <Typography sx={{fontSize: '20px', color: '#C9C9C9', fontWeight: '500', textAlign: 'center'}}>
                        Không có sản phẩm nào
                        </Typography>
                        :dataProduct.map((data) => (
                        <CardInCart key={data.cartsDetailsId} dataProduct={data}/>
                    ))}
                </Box>
            </Box>
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: '8px',
                padding: "10px",
                width: { sm: "100%", lg: "35%" },
              }}
            >
              <Box
                className="box-pay"
                sx={{
                    borderBottom: '1px solid #B9B9B9',
                    padding: '10px 5px',
                  display: "flex",
                  flexDirection: "row",
                  alignItems: 'center',
                  justifyContent: "space-between",
                }}
              >
                <Typography>
                  Tổng đơn:{" "}
                  <span style={{fontWeight:"700", fontSize: '18px'}}>
                    {sumPriceProduct?.toLocaleString('it-It')} <span>đ</span>
                  </span>
                </Typography>
                <Button variant="contained">Thanh toán</Button>
              </Box>
              <Box sx={{margin: '30px 0',display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
                <Box sx={{width: '135px',  textAlign: 'center', padding: '5px'}}>
                    <Box>
                        <NoCrashIcon sx={{fontSize: '35px'}} />
                    </Box>
                    <Typography sx={{fontSize: '13px',}}>Miễn phí vận chyển với đơn hàng từ 200k</Typography>
                </Box>
                <Box sx={{width: '135px',  textAlign: 'center', padding: '5px'}}>
                    <Box>
                        <PublishedWithChangesIcon sx={{fontSize: '35px'}} />
                    </Box>
                    <Typography sx={{fontSize: '13px',}}>Miễn phí đổi trả lại trong vòng 15 ngày</Typography>
                </Box>
                <Box sx={{width: '135px',  textAlign: 'center', padding: '5px'}}>
                    <Box>
                        <AccountBalanceWalletIcon sx={{fontSize: '35px'}} />
                    </Box>
                    <Typography sx={{fontSize: '13px',}}>Đa dạng phương thức thanh toán</Typography>
                </Box>
                <Box sx={{width: '135px',  textAlign: 'center', padding: '5px'}}>
                    <Box>
                        <ElectricMopedIcon sx={{fontSize: '35px'}} />
                    </Box>
                    <Typography sx={{fontSize: '13px',}}>Vận chuyển siêu tốc từ 1 đến 3 ngày</Typography>
                </Box>
              </Box>
            </Box>
          </Box>

            <Box className="product-related">
                <Container sx={{ marginTop: "35px" }}>
                    <div className="bock-product-heading">
                    <h2>Gợi ý cho bạn</h2>
                    </div>
                    <Slider {...settings}>
                    {dataProductsuggest.map((item, i) => (
                        <ItemBlockProduct key={i} item={item} />
                    ))}
                    </Slider>
                </Container>
            </Box>
        </Container>
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

export default Cart;

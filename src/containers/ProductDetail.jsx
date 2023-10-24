import React from "react";
import { Box, Container, ButtonGroup, Button } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Rating from '@mui/material/Rating';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// service
import { GetProduct, getProductDetail } from "../services/authService";
import CardProduct from "../components/CardProduct/CardProduct";
import { Link, useNavigate, useParams } from "react-router-dom";
import Add from "@mui/icons-material/Add";
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../redux/slides/CartSlide"; 
const api_url = "http://localhost:8080/";

const ProductDetail = () => {
  const navigate = useNavigate()
  const [productSize, setProductSize] = React.useState("S");
  const [dataProductsuggest, setDataProductSuggest] = React.useState([]);
  const [dataProductDetail, setDataProductDetail] = React.useState([]);
  const [valueProduct, setValueProduct] = React.useState(1)
  const params = useParams();
  const [value, setValue] = React.useState(4);
  const [expanded, setExpanded] = React.useState('panel1');
  
  const dispatch = useDispatch()

  const authRedux = useSelector(state => state.auth)

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

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

  React.useEffect(() => {
    getProductDetailData(); 
  }, [params]);

  const getProductDetailData = async () => {
    try {
      let result = await getProductDetail({ slugProduct: params.productSlug });
      setDataProductDetail(result.data.dataProduct);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeValueProduct = (e) => {
    let value = e.target.value
    if (parseInt(value) < 1) {
      setValueProduct(1);
      return
    }
    setValueProduct(value)
  }

  // add product to cart
  
  const handleAddProduct = () => {
    if (!authRedux.isLoggedIn) {
      navigate('/login')
      return
    }
    let dataToUpdateCart = {
      user_id: authRedux?.user?.result?.id ?? '',
      product_id: dataProductDetail.id,
      quantity: valueProduct,
      size: productSize,
    }
    const action = updateCart(dataToUpdateCart)
    dispatch(action)
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
  };
  return (
    <div>
      <Container
        sx={{
          padding: "25px 20px 60px",
          backgroundColor: "white",
        }}
      >
        <Box sx={{ marginBottom: "45px" }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link to={'/'}>
              <span style={{color: '#959598'}}>Trang chủ</span>
            </Link>
            <Link to={'/'}>
              <span style={{color: '#959598'}}>{dataProductDetail?.typeCustomer ?? 'err'}</span>
            </Link>
            <Link to={'/'}>
              <span style={{color: '#959598'}}>{dataProductDetail?.typeProduct ?? 'err'}</span>
            </Link>
            <span style={{color: '#1C1F1F'}}>{dataProductDetail?.typeProductDetail ?? 'err'}</span>
          </Breadcrumbs>
        </Box>
        <Box
          className="main-product-detail"
          sx={{
            marginBottom: "50px",
            flexWrap: { xs: "wrap" },
          }}
        >
          <div className="product-detail_img">
            <img src={dataProductDetail?.image ? (api_url + dataProductDetail.image): ''} alt="img product" />
          </div>
          <Box
            className="product-detail_content"
            sx={{
              width: { sm: "100%", lg: "45%" },
            }}
          >
            <Typography sx={{ fontSize: "23px", fontWeight: "500" }}>
              {dataProductDetail?.name ?? 'err'}
            </Typography>
            <Box
              sx={{
                '& > legend': { mt: 2 },
              }}
            >
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Box>
            <span className="price">{dataProductDetail?.price?.toLocaleString('it-IT')}</span>
            <span>
              {" "}
              <b>
                <u>đ</u>
              </b>
            </span>
            <p className="product-size">Kích cỡ: {productSize}</p>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button onClick={() => setProductSize("S")}>S</Button>
              <Button onClick={() => setProductSize("M")}>M</Button>
              <Button onClick={() => setProductSize("L")}>L</Button>
              <Button onClick={() => setProductSize("XL")}>XL</Button>
            </ButtonGroup>
            <Typography sx={{margin: '20px 0 0'}}>Số lượng: </Typography>
            <Box className='form-number-product'>
              <button  onClick={() => setValueProduct(parseInt(valueProduct) - 1 < 1 ? 1 : parseInt(valueProduct) - 1)}><RemoveIcon /></button>
              <input type="text" value={valueProduct} onChange={handleChangeValueProduct} />
              <button onClick={() => setValueProduct(parseInt(valueProduct) + 1)}><Add /></button>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                "& > *": {
                  m: 1,
                },
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#E04343",
                  margin: "20px auto",
                  width: { lg: "100%", sm: "250px" },
                  height: "50px",
                  ":hover": { backgroundColor: "#F2718B" },
                }}
                onClick={() => handleAddProduct()}
              >
                Thêm vào giỏ
              </Button>
            </Box>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary
                expandIcon={<AddIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Mô tả</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{dataProductDetail?.description ?? 'err'}</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary
                expandIcon={<AddIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Chất liệu</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
              <AccordionSummary
                expandIcon={<AddIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>Hướng dẫn sử dụng</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
        <Box className="product-related">
          <Container sx={{ marginTop: "25px" }}>
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

export default ProductDetail;

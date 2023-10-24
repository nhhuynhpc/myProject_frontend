import React from "react";
import "./categoriesLayout.css";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

// slick-carousel
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useParams } from "react-router-dom";
import { FetchCateWithSlug } from "../../services/authService";

const api_url = "http://localhost:8080/";

const CategoriesLayout = () => {
  const [cateData, setCateData] = React.useState([]);
  //get slug
  const param = useParams().groupProducts
 
  // set data
  React.useEffect(() => {
    getProductDetailData();
  }, [param]);

  const getProductDetailData = async () => {
    try {
      let result = await FetchCateWithSlug({ slugCate: param });
      if (result?.data) {
        if (result.data.dataCateDetail.length > 7) {
          const shuffledArray = result.data.dataCateDetail.slice(); 
          for (let i = shuffledArray.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; 
          }
          setCateData(shuffledArray.slice(0, 7));
          return
        }
        setCateData(result.data.dataCateDetail);
      }
    } catch (error) {
      console.log(error);
    }
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
            backgroundColor: "rgba(72, 72, 72, 0.437)",
            color: "white",
            ":hover": {
              backgroundColor: "rgba(0, 0, 0, 0.618)",
              color: "white",
            }
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
            right:'-50px',
            padding: '8px',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            backgroundColor: "rgba(72, 72, 72, 0.437)",
            color: "white",
            ":hover": {
              backgroundColor: "rgba(0, 0, 0, 0.618)",
              color: "white",
            }
          }}
        />
    );
  };

  const settings = {
    className: "center",
    centerMode: true,
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <ArrowLeft />,
    nextArrow: <ArrowRight />,
  };
  return (
    <>
      <div className="categories-view">
        <div className="category-image">
          <a href="/">
            <img
              width={100}
              height={100}
              src="https://media.canifa.com/Simiconnector/banner_name_tablet1690001466.webp"
              alt="cate img"
            />
          </a>
        </div>
        <Container sx={{ marginTop: "20px" }}>
          <Box sx={{ width: "95%", margin: "20px auto" }}>
            <Typography sx={{fontWeight: '700', fontSize: '20px'}}>BẠN CẦN TÌM</Typography>
            <Box sx={{ width: "90%", margin: "15px auto" }}>
              <Slider {...settings}>
                {cateData.map((item, i) => (
                  <ItemBlockCate key={i} item={item} />
                ))}
              </Slider>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default CategoriesLayout;

function ItemBlockCate(props) {
  return (
    <>
      <Card sx={{ maxWidth: 190 }}>
        <Link to={props.item.slug}>
          <CardMedia
            sx={{ width: 100, height: 100, borderRadius: "50%", margin: "auto" }}
            image={props.item?.image ? api_url + props.item.image : ''}
            title="img"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h7"
              component="div"
              sx={{ textTransform: "uppercase", textAlign: "center" }}
            >
              {props.item.name}
            </Typography>
          </CardContent>
        </Link>
      </Card>
    </>
  );
}

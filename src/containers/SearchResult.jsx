import React from "react";
import { Box, Container, Grid, Pagination, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import CardProduct from "../components/CardProduct/CardProduct";

const api_url = "http://localhost:8080/";

const SearchResult = () => {
  const resultSearch = useSelector((state) => state.search);
  const [resultProduct, setResultProduct] = React.useState([]);
  const [quantitySearch, setQuantitySearch] = React.useState();

  const [page, setPage] = React.useState(1);
  const [dataAPage, setDataAPage] = React.useState([]);
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  React.useEffect(() => {
    setResultProduct(resultSearch.productSearched.resultSearchProduct ?? []);
    setQuantitySearch(resultSearch.productSearched.quantityResult ?? '0');
  }, [resultSearch]);

  // set data for block new product
  React.useEffect(() => {
    setDataAPage(resultProduct.slice(page * 12 - 12, page * 12));
  }, [page, resultProduct]);

  return (
    <div>
      <div className="search-view">
        <Container
          sx={{ marginTop: "45px", backgroundColor: "white", padding: "10px" }}
        >
          <Box sx={{ margin: "25px 0" }}>
            <Typography>
              <b>Kết quả tìm kiếm: </b>{" "}
              {
                <span>
                    <span>{quantitySearch}</span>{" "}
                     sản phẩm
                </span>
              }
            </Typography>
          </Box>
            <Box sx={{display: `${quantitySearch === '0' ? 'block': 'none'}`, marginTop: '80px', textAlign: 'center', height: '450px'}}>
                <Typography sx={{fontSize: '30px', fontWeight: '500'}}>Không tìm thấy sản phẩm!</Typography>
                <Typography sx={{fontSize: '14px', color:'#B7B7B7'}}>Vui lòng thay đổi tiêu chí tìm kiếm của bạn và thử lại. Nếu vẫn không tìm thấy bất kỳ điều gì có liên quan, vui lòng truy cập Trang chủ và thử một phần bán chạy nhất của chúng tôi!</Typography>
            </Box>
          <Box
            sx={{
              margin: "auto",
              width: "fit-content",
              alignItems: "center",
            }}
          >
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 16, sm: 8, md: 16 }}
            >
              {dataAPage.map((item, i) => (
                <Grid item xs={2} sm={4} md={dataAPage.length > 3 ? 4: 8} key={i}>
                  <ItemBlockProduct item={item} />
                </Grid>
              ))}
            </Grid>
            <a href="#blockProductHeading">
              <Pagination
                count={Math.floor(resultProduct.length / 12)}
                page={page}
                onChange={handleChangePage}
                sx={{
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "center",
                }}
              />
            </a>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default SearchResult;

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

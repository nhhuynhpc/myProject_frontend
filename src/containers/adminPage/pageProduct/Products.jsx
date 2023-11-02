import React from 'react';
import '../adminPage.css';
import fileIcon from '../img-vector/fileIcon.svg';
import { Outlet } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import Swal from 'sweetalert2';

import Button from '../../../components/Button/Button';

import {
    GetProduct,
    DeleteProduct,
    SearchProduct,
    UpdateProduct,
    Postimg,
    PostProduct,
} from '../../../services/productService';

import { Box, Pagination } from '@mui/material';

import { useSelector } from 'react-redux';

import AddProduct from './AddProduct';
import Scroll from 'react-scroll';
var Link = Scroll.Link;
var Element = Scroll.Element;

const Products = () => {
    const API = 'http://localhost:8080/';

    const authRedux = useSelector((state) => state.auth);

    const [dataProduct, setDataProduct] = React.useState([]);

    // in search product
    const [dataSearch, setDataSearch] = React.useState();
    const [dataResultSearch, setDataResultSearch] = React.useState([]);
    const [isSearch, setIsSearch] = React.useState(false);

    // in add product
    const [openHandleData, setOpenHandleData] = React.useState(false);
    const [logMsg, setLogMsg] = React.useState({
        open: false,
        msg: '',
    });
    const [typeEdit, setTypeEdit] = React.useState(); //0: add cate, 1: edit cate
    const [dataThisProduct, setDataThisProduct] = React.useState({});

    const [page, setPage] = React.useState(1);
    const [dataAPage, setDataAPage] = React.useState([]);

    React.useEffect(() => {
        getProducts();
    }, []);

    React.useEffect(() => {
        if (isSearch) {
            setDataAPage(dataResultSearch.slice(page * 8 - 8, page * 8));
            return;
        }
        setDataAPage(dataProduct.slice(page * 8 - 8, page * 8));
    }, [page, dataProduct, dataResultSearch]);

    React.useEffect(() => {
        if (!dataSearch) {
            setDataResultSearch([])
            setIsSearch(false)
        }
    }, [dataSearch])

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const getProducts = async () => {
        try {
            let token = authRedux.user.token ?? '';
            let result = await GetProduct(token);
            setDataProduct(result.data.dataProduct);
        } catch (error) {
            console.log(error);
        }
    };

    //add product
    const handleOpenAddData = (type, aData) => {
        setTypeEdit(type);
        setDataThisProduct(aData);
        setOpenHandleData(true);
    };
    const handleCloseAddData = () => {
        setLogMsg({ open: false, msg: '' });
        setOpenHandleData(false);
    };

    const uploadImage = async (file, id) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('id', id);

        try {
            await Postimg(formData, id);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const postProduct = async (dataProduct, selectedImage) => {
        let result = await PostProduct(dataProduct);

        if (result.data.err !== 0) {
            setLogMsg({ open: true, msg: result.data.msg });
            return;
        }

        uploadImage(selectedImage, result.data.dataitem.id);
        handleCloseAddData();
        Swal.fire({
            icon: 'success',
            title: result.data.msg,
            focusConfirm: false,
        }).then(getProducts());
    };

    // edit product

    const handleEditProduct = async (dataProduct, selectedImage) => {
        let result = await UpdateProduct(dataProduct);

        if (result.data.err !== 0) {
            setLogMsg({ open: true, msg: result.data.msg });
            return;
        }

        if (selectedImage) {
            uploadImage(selectedImage, result.data.updateProduct.id);
        }
        handleCloseAddData();
        Swal.fire({
            icon: 'success',
            title: result.data.msg,
            focusConfirm: false,
        }).then(getProducts());
    };

    const handleDeleteProduct = async (data) => {
        let isDelete = false;
        Swal.fire({
            icon: 'error',
            html: '<h3>Bạn có chắc muốn xóa?</h3>',
            focusConfirm: false,
            cancelButtonText: 'Hủy',
            confirmButtonText: 'Xác nhận',
            showCancelButton: true,
            preConfirm: async () => {
                isDelete = true;
                await DeleteProduct({ id: data });
            },
        }).then(() => {
            if (isDelete) getProducts();
        });
    };

    // handle search
    const handleSearch = async () => {
        let result = await SearchProduct({ data: dataSearch });
        if (result.data.err !== 0) {
            Swal.fire({
                icon: 'warning',
                html: `<h3>${result.data.msg}</h3>`,
            });
            return;
        }

        setDataResultSearch(result.data.result);
        setIsSearch(true);
    };

    const ItemCate = (item) => {
        return (
            <React.Fragment>
                <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                        <img
                            src={API + item.image}
                            alt=""
                            width={150}
                            height={150}
                        />
                    </td>
                    <td>{item.price}</td>
                    <td>{item?.typeProduct ?? 'err'}</td>
                    <td>{item?.typeCustomer ?? 'err'}</td>
                    <td>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                            }}
                        >
                            <IconButton
                                sx={{
                                    backgroundColor: '#4BA0E0',
                                    ':hover': { backgroundColor: '#81C9EA' },
                                }}
                                onClick={() => handleOpenAddData(1, item)}
                            >
                                <BorderColorIcon />
                            </IconButton>
                            <IconButton
                                color="error"
                                sx={{
                                    backgroundColor: '#D65F67',
                                    ':hover': { backgroundColor: '#ED938B' },
                                }}
                                onClick={() => handleDeleteProduct(item.id)}
                            >
                                <DeleteForeverIcon />
                            </IconButton>
                        </Box>
                    </td>
                </tr>
            </React.Fragment>
        );
    };
    return (
        <>
            <AddProduct
                isOpen={openHandleData}
                isClose={handleCloseAddData}
                typeEdit={typeEdit}
                alertMsg={logMsg}
                dataThisProduct={typeEdit === 0 ? '' : dataThisProduct}
                postData={typeEdit === 0 ? postProduct : handleEditProduct}
            />
            <Element name="secondInsideContainer"></Element>
            <div className="adminpage-container">
                <div className="adminpage-title">
                    <div className="title-icon">
                        <img src={fileIcon} alt="img file" />
                    </div>
                    <span className="title-text">Quản lý sản phẩm</span>
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
                    <Button
                        className="add-data"
                        dataValue="Thêm sản phẩm"
                        onClick={() => handleOpenAddData(0)}
                    />
                    <table className="cgr-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên</th>
                                <th>image</th>
                                <th>Giá</th>
                                <th>Loại sản phẩm</th>
                                <th>Loại khách hàng</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataAPage.map((item, index) => (
                                <ItemCate key={index} {...item} />
                            ))}
                        </tbody>
                    </table>
                    <Box
                        sx={{
                            button: {
                                color: 'black',
                            },
                        }}
                    >
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
                                        : dataProduct.length % 8 === 0
                                        ? dataProduct.length / 8
                                        : Math.floor(dataProduct.length / 8) + 1
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
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default Products;

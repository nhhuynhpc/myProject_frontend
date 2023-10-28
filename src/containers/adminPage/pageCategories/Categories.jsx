import React from 'react';
import '../adminPage.css';
import fileIcon from '../img-vector/fileIcon.svg';
import {
    GetListCategories,
    PostDeleteCategories,
    PostListCategories,
    PostUpdateCategories,
    PostimgCate,
} from '../../../services/categoriesService';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import Swal from 'sweetalert2';

import Button from '../../../components/Button/Button';
import AddCate from './AddCate';
import { Box, IconButton } from '@mui/material';
const API = 'http://localhost:8080/';

const Categories = () => {
    const [dataCate, setDataCate] = React.useState([]);
    const [openHandleData, setOpenHandleData] = React.useState(false);
    const [typeEdit, setTypeEdit] = React.useState(); //0: add cate, 1: edit cate
    const [logMsg, setLogMsg] = React.useState({
        open: false,
        msg: '',
    });
    const [dataThisCate, setDataThisCate] = React.useState({});

    React.useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        try {
            let result = await GetListCategories();
            setDataCate(result.data.cateInfo);
        } catch (error) {
            console.log(error);
        }
    };

    // add data
    const handleChangeData = (type, data) => {
        setLogMsg({...logMsg, open: false})
        setDataThisCate(data);
        setTypeEdit(type);
        setOpenHandleData(true);
    };

    const uploadImage = async (file, id) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('id', id);

        try {
            await PostimgCate(formData, id);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleCloseEdit = () => {
        setOpenHandleData(false);
    };

    const handleSubcribeAddData = async (dataCate, selectedImage) => {
        let result = await PostListCategories(dataCate);

        if (result.data.err !== 0) {
            setLogMsg({ open: true, msg: result.data.msg });
            return;
        }

        uploadImage(selectedImage, result.data.dataitem.id);
        handleCloseEdit();
        Swal.fire({
            icon: 'success',
            title: result.data.msg,
            focusConfirm: false,
        }).then(getCategories());
    };

    // edit data
    const handleEditCate = async (data, selectedImage) => {
        let result = await PostUpdateCategories(data);

        if (result.data.err !== 0) {
            setLogMsg({ open: true, msg: result.data.msg });
            return;
        }

        if (selectedImage) {
            uploadImage(selectedImage, data.id);
        }
        handleCloseEdit();
        Swal.fire({
            icon: 'success',
            title: result.data.msg,
            focusConfirm: false,
        }).then(getCategories());
    };

    // delete data

    const handleDeleteCate = async (id) => {
        let isDelete = false
        Swal.fire({
            icon: 'error',
            html: '<h3>Bạn có chắc muốn xóa?</h3>',
            focusConfirm: false,
            cancelButtonText: 'Hủy',
            confirmButtonText: 'Xác nhận',
            showCancelButton: true,
            preConfirm: async () => {
                isDelete = true;
                await PostDeleteCategories({ id: id });
            },
        }).then(() => {
            if (isDelete) getCategories();
            Swal.fire('Good job!', 'You clicked the button!', 'success');
        });
    };

    const ItemCate = (item) => {
        return (
            <React.Fragment>
                <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                        {item?.image ? (
                            <img
                                src={API + item.image}
                                alt=""
                                width={150}
                                height={150}
                            />
                        ) : (
                            'Null'
                        )}
                    </td>
                    <td>{item.type}</td>
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
                                onClick={() => handleChangeData(1, item)}
                            >
                                <BorderColorIcon />
                            </IconButton>
                            <IconButton
                                color="error"
                                sx={{
                                    backgroundColor: '#D65F67',
                                    ':hover': { backgroundColor: '#ED938B' },
                                }}
                                onClick={() => handleDeleteCate(item.id)}
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
            <AddCate
                isOpen={openHandleData}
                isClose={handleCloseEdit}
                typeEdit={typeEdit}
                alertMsg={logMsg}
                dataThisCate={typeEdit === 0 ? '' : dataThisCate}
                postData={
                    typeEdit === 0 ? handleSubcribeAddData : handleEditCate
                }
            />
            <div className="adminpage-container">
                <div className="adminpage-title">
                    <div className="title-icon">
                        <img src={fileIcon} alt="img file" />
                    </div>
                    <span className="title-text">Quản lý loại sản phẩm</span>
                </div>
                <div className="admin-form-search">
                    <input type="text" placeholder="Tìm kiếm sản phẩm" />
                    <button>Search</button>
                </div>
                <div className="categories-content">
                    <Button
                        className="add-data"
                        dataValue="Thêm loại sản phẩm"
                        onClick={() => handleChangeData(0)}
                    />
                    <table className="cgr-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên</th>
                                <th>image</th>
                                <th>Loại</th>
                                <th colSpan={2}>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataCate &&
                                dataCate.map((item, index) => (
                                    <ItemCate key={index} {...item} />
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Categories;

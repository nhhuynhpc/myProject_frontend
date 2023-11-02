import React from 'react';
import '../adminPage.css';
import fileIcon from '../img-vector/fileIcon.svg';
import {
    Box,
    Button,
    IconButton,
    MenuItem,
    Pagination,
    Select,
    Stack,
    SwipeableDrawer,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { getUser, postDeleteUser, postUpdateUser } from '../../../services/authService';
import { useSelector } from 'react-redux';
import { authRedux } from '../../../redux/selectors';

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

const Users = () => {
    const authData = useSelector(authRedux);

    const [dataSearch, setDataSearch] = React.useState();
    const [dataResultSearch, setDataResultSearch] = React.useState([]);
    const [isSearch, setIsSearch] = React.useState(false);

    const [dataUser, setDataUser] = React.useState([]);
    
    const [page, setPage] = React.useState(1);
    const [dataAPage, setDataAPage] = React.useState([]);

    React.useEffect(() => {
        handleDataUser();
    }, []);

    React.useEffect(() => {
        if (isSearch) {
            setDataAPage(dataResultSearch.slice(page * 8 - 8, page * 8));
            return;
        }
        setDataAPage(dataUser.slice(page * 8 - 8, page * 8));
    }, [page, dataUser, dataResultSearch]);

    React.useEffect(() => {
        if (!dataSearch) {
            setDataResultSearch([])
            setIsSearch(false)
        }
    }, [dataSearch])

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const handleDataUser = async () => {
        let result = await getUser(
            { role: authData.user.role },
            authData.user.token
        );

        if (result?.data.msg) {
            Swal.fire({
                icon: 'error',
                html: `<h3>${result?.data.msg}</h3>`,
            });
            return;
        }
        setDataUser(result?.data.dataUser);
    };

    // handle search
    const handleSearch = async () => {
        let regex = new RegExp(dataSearch, "i")
        let data = dataUser.filter(item => regex.test(item?.name))
        if (data.length === 0) {
            data = dataUser.filter(item => regex.test(item?.email))
        }
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

    const hanldeDeleteUser = async (id) => {
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
                await postDeleteUser({ id: id }, authData.user.token);
            },
        }).then(() => {
            if (isDelete) handleDataUser();
        });
    }

    const ItemCate = (item) => {
        const [openTapProductInOrder, setOpenTapProductInOrder] =
            React.useState(false);
        const [dataUser, setDataUser] = React.useState({
            id: item?.id ?? '',
            name: item?.name ?? '',
            email: item?.email ?? '',
            role: item?.role ?? '',
            status: item?.status ?? '',
            email_verified_at: item.email_verified_at,
        });
        const [dataUpdateUser, setDataUpdateUser] = React.useState({
            id: item.id,
            role: item.role,
            status: item.status,
        });

        const handleChangeDataUpdateUser = (event) => {
            let { name, value } = event.target;
            setDataUpdateUser({ ...dataUpdateUser, [name]: value });
        };

        const handleUpdateDataUser = async () => {
            let result = await postUpdateUser(
                dataUpdateUser,
                authData.user.token
            );

            if (result.data.err !== 0) {
                Swal.fire({
                    icon: 'warning',
                    html: `<h3>${result.data.msg}</h3>`,
                });
                return;
            }

            setDataUser({
                ...dataUser,
                role: dataUpdateUser.role,
                status: dataUpdateUser.status,
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
                    <td>{dataUser.id}</td>
                    <td>{dataUser.name}</td>
                    <td>{dataUser.email}</td>
                    <td>{dataUser?.role ?? 'err'}</td>
                    <td>
                        {dataUser?.status === 0 ? (
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
                                    stylecolor="#6AD352"
                                    variant="dot"
                                ></StyledBadge>
                                <Typography>Active</Typography>
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
                                    stylecolor="#F03B5D"
                                    variant="dot"
                                ></StyledBadge>
                                <Typography>Disabled</Typography>
                            </Box>
                        )}
                    </td>
                    <td>{dataUser?.email_verified_at ?? 'err'}</td>
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
                                onClick={() => setOpenTapProductInOrder(true)}
                            >
                                <BorderColorIcon />
                            </IconButton>
                            <IconButton
                                color="error"
                                sx={{
                                    backgroundColor: '#D65F67',
                                    ':hover': { backgroundColor: '#ED938B' },
                                }}
                                onClick={() => hanldeDeleteUser(dataUser.id)}
                            >
                                <DeleteForeverIcon />
                            </IconButton>
                        </Box>
                        <SwipeableDrawer
                            anchor={'right'}
                            open={openTapProductInOrder}
                            onClose={toggleDrawer(false)}
                            onOpen={toggleDrawer(true)}
                            sx={{ zIndex: '11' }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '20px',
                                    fontWeight: '550',
                                    marginTop: '20px',
                                    marginLeft: '10px',
                                }}
                            >
                                Thông tin
                            </Typography>
                            <Box
                                sx={{
                                    padding: '5px 8px',
                                    margin: '0px 10px',
                                    border: '1px solid #AAAAAA',
                                    borderRadius: '10px',
                                }}
                            >
                                <Typography>
                                    <b>Tên user: </b>
                                    {item?.name}
                                </Typography>
                                <Typography>
                                    <b>Email: </b>
                                    {item?.email}
                                </Typography>
                                <Typography>
                                    <b>Ngày kích hoạt email: </b>
                                    {item?.email_verified_at}
                                </Typography>
                            </Box>
                            <Typography
                                sx={{
                                    fontSize: '20px',
                                    fontWeight: '550',
                                    marginTop: '20px',
                                    marginLeft: '10px',
                                }}
                            >
                                Cập nhật
                            </Typography>
                            <Box
                                sx={{
                                    padding: '10px 13px',
                                    margin: '0px 10px',
                                    border: '1px solid #AAAAAA',
                                    borderRadius: '10px',
                                }}
                            >
                                <Stack spacing={2}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography sx={{ fontWeight: '550' }}>
                                            Phân quyền:{' '}
                                        </Typography>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="role"
                                            sx={{
                                                marginLeft: '7px',
                                                height: '30px',
                                                width: '135px',
                                            }}
                                            value={dataUpdateUser.role}
                                            onChange={
                                                handleChangeDataUpdateUser
                                            }
                                        >
                                            <MenuItem value={'admin'}>
                                                Admin
                                            </MenuItem>
                                            <MenuItem value={'user'}>
                                                User
                                            </MenuItem>
                                        </Select>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography sx={{ fontWeight: '550' }}>
                                            Trạng thái:{' '}
                                        </Typography>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="status"
                                            sx={{
                                                marginLeft: '7px',
                                                height: '30px',
                                                width: '135px',
                                            }}
                                            value={dataUpdateUser.status}
                                            onChange={
                                                handleChangeDataUpdateUser
                                            }
                                        >
                                            <MenuItem value={0}>
                                                Active
                                            </MenuItem>
                                            <MenuItem value={1}>
                                                Disabled
                                            </MenuItem>
                                        </Select>
                                    </Box>
                                </Stack>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        marginTop: '15px',
                                    }}
                                >
                                    <Button
                                        sx={{ textTransform: 'none' }}
                                        variant="contained"
                                        onClick={() => handleUpdateDataUser()}
                                    >
                                        Xác nhận
                                    </Button>
                                </Box>
                            </Box>
                        </SwipeableDrawer>
                    </td>
                </tr>
            </React.Fragment>
        );
    };
    return (
        <div>
            <Element name="secondInsideContainer"></Element>
            <div className="adminpage-container">
                <div className="adminpage-title">
                    <div className="title-icon">
                        <img src={fileIcon} alt="img file" />
                    </div>
                    <span className="title-text">Quản lý User</span>
                </div>
                <div className="admin-form-search">
                    <input
                        type="text"
                        placeholder="Tìm kiếm user"
                        onChange={(e) => setDataSearch(e.target.value)}
                    />
                    <button onClick={() => handleSearch()}>Search</button>
                </div>
                <div className="categories-content">
                    <table className="cgr-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên user</th>
                                <th>email</th>
                                <th>Quyền</th>
                                <th>Trạng thái</th>
                                <th>Ngày Kích hoạt email</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataAPage &&
                                dataAPage.map((item, index) => (
                                    <ItemCate key={index} {...item} />
                                ))
                            }
                        </tbody>
                    </table>
                    {dataUser.length < 8 ? '' :
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
                                            : dataUser.length % 8 === 0
                                            ? dataUser.length / 8
                                            : Math.floor(dataUser.length / 8) + 1
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

export default Users;

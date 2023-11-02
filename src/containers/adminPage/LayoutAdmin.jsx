import React from 'react';
import Logo from '../../components/Layout/img-vector/logo.svg';
import houseIcon from './img-vector/houseblack.svg';
import fileIconBlack from './img-vector/fileIconBlack.svg';
import cubeIcon from './img-vector/cubeIcon.svg';
import userIcon from './img-vector/user.svg';
import fileIcon from './img-vector/file.svg';
import { Link, useNavigate } from 'react-router-dom';
import {
    Avatar,
    Box,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { clearState } from '../../redux/slides/authSlide';
import { useDispatch, useSelector } from 'react-redux';
import { authRedux } from '../../redux/selectors';
import { getUserById } from '../../services/authService';

const settingsAdmin = [
    {
        text: 'Dashboard',
        link: '/admin',
    },
    {
        text: 'Account',
        link: '/acount',
    },
];
const LayoutAdmin = ({ children }) => {
    const authData = useSelector(authRedux);
    const [dataUser, setDataUser] = React.useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    React.useEffect(() => {
        handleDataUser();
    }, [authData]);

    const handleDataUser = async () => {
        let result = await getUserById(
            { id: authData.user.result.id },
            authData.user.token
        );
        setDataUser(result.data.dataUser);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        dispatch(clearState());
        navigate('/');
    };

    return (
        <>
            <header className="page-header">
                <p className="logo">
                    <img src={Logo} alt="img Logo" />
                </p>
                <Link to="/admin" className="brand">
                    Fashion Frenzy
                </Link>
                <Box
                    sx={{
                        flexGrow: 1,
                        display: `flex`,
                        justifyContent: 'flex-end',
                    }}
                >
                    <ListItem
                        sx={{
                            width: '250px',
                            marginRight: '20px',
                            position: 'relative',
                        }}
                        button
                        onClick={handleOpenUserMenu}
                    >
                        <ListItemAvatar>
                            <Avatar
                                alt="Profile Picture"
                                src={
                                    'https://mui.com/static/images/avatar/1.jpg'
                                }
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={dataUser?.name ?? 'err'}
                            secondary={`[${dataUser?.role}]`}
                        />
                    </ListItem>
                    <Menu
                        sx={{ mt: '50px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settingsAdmin.map((setting, key) => (
                            <MenuItem key={key} onClick={handleCloseUserMenu}>
                                <Link to={setting.link}>
                                    <Typography textAlign="center">
                                        {setting.text}
                                    </Typography>
                                </Link>
                            </MenuItem>
                        ))}
                        <MenuItem onClick={handleLogout}>
                            <Typography textAlign="center">
                                Đăng xuất
                            </Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </header>

            <div className="toolbar">
                <ul>
                    <li className="toolbar-item">
                        <Link to="/admin">
                            <button>Trang chủ</button>
                            <img src={houseIcon} alt="img house" />
                        </Link>
                    </li>
                    <li className="toolbar-item">
                        <Link to="/admin/manage-categories">
                            <button>Quản lý loại sản phẩm</button>
                            <img src={fileIconBlack} alt="img file" />
                        </Link>
                    </li>
                    <li className="toolbar-item">
                        <Link to="/admin/manage-products">
                            <button>Quản lý sản phẩm</button>
                            <img src={cubeIcon} alt="img cube" />
                        </Link>
                    </li>
                    <li className="toolbar-item">
                        <Link to={'/admin/manage-orders'}>
                            <button>Quản lý đơn hàng</button>
                            <img src={fileIcon} alt="img icon" />
                        </Link>
                    </li>
                    <li className="toolbar-item">
                        <Link to={'/admin/manage-users'}>
                            <button>Quản lý user</button>
                            <img src={userIcon} alt="img user" />
                        </Link>
                    </li>
                </ul>
            </div>
            {/* <Outlet /> */}
            {children}
        </>
    );
};

export default LayoutAdmin;

import React from 'react';
import './getUser.css';
import userIcon from './userIcon.svg';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { useDispatch, useSelector } from 'react-redux';
import { login, clearState } from '../../redux/slides/authSlide';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authRedux = useSelector((state) => state.auth);

    const [inData, setInData] = React.useState({
        email: '',
        password: '',
        saveAccount: false,
    });

    const handleOnChangeInput = React.useCallback(
        (e) => {
            const { name, value } = e.target;
            setInData({ ...inData, [name]: value });
        },
        [inData]
    );

    React.useEffect(() => {
        if (Object.keys(authRedux.user).length !== 0) {
            let result = authRedux.user;

            if (result.err !== 0) {
                Swal.fire({
                    icon: 'error',
                    title: result.msg,
                });
                dispatch(clearState());
                return;
            }

            Swal.fire({
                icon: 'success',
                title: result.msg,
                focusConfirm: false,
            }).then(() => {
                if (result.role === 'admin') {
                    navigate('/admin');
                    return;
                }
                navigate('/');
            });
        }
    }, [authRedux]);

    const handleBtnClick = async () => {
        const action = login(inData);
        dispatch(action).then(() => {});
    };

    return (
        <>
            <div className="form-getuser">
                <div className="title-getuser">
                    <img src={userIcon} alt="img user icon" />
                    <span>LOGIN</span>
                </div>
                <div className="form-input">
                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        onChange={(e) => handleOnChangeInput(e)}
                        variant="standard"
                        sx={{
                            width: '85%',
                            margin: '10px auto',
                            fontSize: '16px',
                        }}
                    />
                    <TextField
                        id="password"
                        name="password"
                        label="Mật khẩu"
                        type="password"
                        onChange={(e) => handleOnChangeInput(e)}
                        variant="standard"
                        sx={{
                            width: '85%',
                            margin: '10px auto',
                            fontSize: '16px',
                        }}
                    />
                </div>
                <FormControlLabel
                    control={
                        <Checkbox
                            id="check-rule"
                            name="checkRule"
                            onClick={(e) =>
                                setInData({
                                    ...inData,
                                    saveAccount: e.target.checked,
                                })
                            }
                            size="small"
                        />
                    }
                    label="lưu thông tin đăng nhập."
                    sx={{
                        marginTop: '10px',
                        fontSize: '15px',
                    }}
                />
                <Button
                    dataValue="Đăng nhập"
                    onClick={() => handleBtnClick()}
                />
                <div className="footer-form">
                    <span>
                        Chưa có tài khoản? <a href="/register">Đăng ký ngay.</a>
                    </span>
                </div>
            </div>
        </>
    );
};

export default Login;

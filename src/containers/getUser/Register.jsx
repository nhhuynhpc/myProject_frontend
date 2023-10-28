import React from 'react';
import UserIcon from './userIcon.svg';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { clearState, register } from '../../redux/slides/authSlide';

import Swal from 'sweetalert2';

const Register = () => {
    const dispatch = useDispatch();

    const authRedux = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const [inData, setInData] = React.useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        checkRule: false,
    });

    React.useEffect(() => {
        if (Object.keys(authRedux.user).length !== 0) {
            let result = authRedux;
            if (result.user.err !== 0) {
                Swal.fire({
                    icon: 'error',
                    title: result.user.msg,
                });
                dispatch(clearState());
                return;
            }

            Swal.fire({
                icon: 'success',
                title: result.user.msg,
                focusConfirm: false,
            }).then(() => {
                navigate('/');
            });
        }
    }, [authRedux]);

    const handleOnChangeInput = React.useCallback(
        (e) => {
            const { name, value } = e.target;
            setInData({ ...inData, [name]: value });
        },
        [inData]
    );

    const handleBtnClick = async () => {
        const action = register(inData);
        dispatch(action);
    };

    return (
        <div>
            <div className="form-getuser">
                <div className="title-getuser">
                    <img src={UserIcon} alt="img user" />
                    <span>REGISTER</span>
                </div>
                <div className="form-input">
                    <TextField
                        id="username"
                        name="username"
                        label="Tên tài khoản"
                        type="text"
                        onChange={(e) => handleOnChangeInput(e)}
                        variant="standard"
                        sx={{
                            width: '85%',
                            margin: '10px auto',
                            fontSize: '16px',
                        }}
                    />
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
                    <TextField
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Nhập lại mật khẩu"
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
                                    checkRule: e.target.checked,
                                })
                            }
                            size="small"
                        />
                    }
                    label="Đồng ý với những điều khoản dịch vụ."
                    sx={{
                        marginTop: '10px',
                        fontSize: '15px',
                    }}
                />
                <Button dataValue="Đăng ký" onClick={() => handleBtnClick()} />
                <div className="footer-form">
                    <span>
                        Đã có tài khoản? <a href="/login">Đăng nhập ngay.</a>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Register;

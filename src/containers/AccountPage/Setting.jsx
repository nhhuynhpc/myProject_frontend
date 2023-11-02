import React from 'react';
import PropTypes from 'prop-types';
import {
    Avatar,
    Box,
    Button,
    Container,
    Stack,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import { IMaskInput } from 'react-imask';
import Input from '@mui/joy/Input';
import { useSelector } from 'react-redux';
import { authRedux } from '../../redux/selectors';
import {
    getUserById,
    postUpdateDataPasswordById,
    postUpdateDataUserById,
} from '../../services/authService';
import Swal from 'sweetalert2';
const api_url = 'http://localhost:8080/';

const TextMaskAdapter = React.forwardRef(function TextMaskAdapter(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="000-0000-0000"
            definitions={{
                '#': /[1-9]/,
            }}
            inputRef={ref}
            onAccept={(value) =>
                onChange({ target: { name: props.name, value } })
            }
            overwrite
        />
    );
});

TextMaskAdapter.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Setting = () => {
    const authData = useSelector(authRedux);

    const [valueTapSetting, setValueTapSetting] = React.useState(0);
    const [dataInUser, setDataInUser] = React.useState({
        id: authData?.user?.result?.id,
        name: '',
        email: '',
        dateOfBirth: '',
        phone: '',
        address: '',
    });

    const [dataPassword, setDataPassword] = React.useState({
        id: authData?.user?.result?.id,
        password: '',
        newPassword: '',
        newConfirmPassword: ''
    })

    React.useEffect(() => {
        handleDataInUser();
    }, []);

    const handleDataInUser = async () => {
        let result = await getUserById(
            { id: authData?.user?.result?.id },
            authData?.user?.token
        );

        setDataInUser({
            ...dataInUser,
            name: result.data?.dataUser?.name ?? '',
            email: result.data?.dataUser?.email ?? '',
            dateOfBirth: result.data?.dataUser?.date_of_birth ?? '',
            phone: result.data?.dataUser?.phone ?? '',
            address: result.data?.dataUser?.address ?? '',
        });
    };

    const handleChangeInData = (event) => {
        let { name, value } = event.target;
        setDataInUser({ ...dataInUser, [name]: value });
    };

    const handleChange = (event, newValue) => {
        setValueTapSetting(newValue);
    };

    const handleUpdateDataUser = async () => {
        let isUpdate = false;
        Swal.fire({
            icon: 'error',
            html: '<h3>Bạn có chắc muốn thay đổi?</h3>',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy',
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: async () => {
                isUpdate = true;
                await postUpdateDataUserById(dataInUser, authData.user.token);
            },
        }).then(() => {
            if (isUpdate) {
                Swal.fire({
                    icon: 'success',
                    html: '<h3>Cập nhật thành công</h3>',
                    focusConfirm: false,
                });
                handleDataInUser();
            }
        });
    };

    const handleChangeInPasword = (event) => {
        let {name, value} = event.target
        setDataPassword({...dataPassword, [name]: value})
    }

    const handleUpdatePassword = async () => {
        let isUpdate = false;
        let result = ''
        Swal.fire({
            icon: 'error',
            html: '<h3>Bạn có chắc muốn thay đổi mật khẩu?</h3>',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy',
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: async () => {
                isUpdate = true;
                result = await postUpdateDataPasswordById(dataPassword, authData.user.token);
            },
        }).then(() => {
            if (result?.data?.err !== 0) {
                Swal.fire({
                    icon: 'warning',
                    html: `<h3>${result?.data?.msg}</h3>`,
                    focusConfirm: false,
                });
                return
            }
            if (isUpdate) {
                Swal.fire({
                    icon: 'success',
                    html: '<h3>Thay đổi thành công</h3>',
                    focusConfirm: false,
                });
                handleDataInUser();
            }
        });
    }
    return (
        <>
            <Container
                sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={valueTapSetting}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                        >
                            <Tab
                                label="Hồ sơ"
                                {...a11yProps(0)}
                                sx={{ fontWeight: '550' }}
                            />
                            <Tab
                                label="Bảo mật"
                                {...a11yProps(1)}
                                sx={{ fontWeight: '550' }}
                            />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={valueTapSetting} index={0}>
                        <Box>
                            <Box
                                sx={{
                                    borderBottom: '1px solid #AAAAAA',
                                    marginBottom: '20px',
                                    padding: '10px 0',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                }}
                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    src={api_url + 'userImg.webp'}
                                    sx={{
                                        width: '100px',
                                        height: '100px',
                                        marginRight: '15px',
                                    }}
                                />
                                <Typography
                                    sx={{
                                        fontSize: '12px',
                                        color: '#AAAAAA',
                                        width: '250px',
                                        textAlign: 'center',
                                        marginTop: '10px',
                                    }}
                                >
                                    ấn vào ảnh trên để đổi ảnh đại diện, file
                                    ảnh không nặng quá 1MB
                                </Typography>
                            </Box>
                            <Stack spacing={3}>
                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: '550',
                                            marginLeft: '5px',
                                        }}
                                    >
                                        Họ tên
                                    </Typography>
                                    <Input
                                        name="name"
                                        value={dataInUser.name}
                                        onChange={handleChangeInData}
                                        placeholder="Nhập họ và tên…"
                                        variant="outlined"
                                    />
                                </Box>
                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: '550',
                                            marginLeft: '5px',
                                        }}
                                    >
                                        Email
                                    </Typography>
                                    <Input
                                        name="email"
                                        value={dataInUser.email}
                                        onChange={handleChangeInData}
                                        placeholder="Nhập email…"
                                        variant="outlined"
                                    />
                                </Box>
                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: '550',
                                            marginLeft: '5px',
                                        }}
                                    >
                                        Ngày sinh
                                    </Typography>
                                    <Input
                                        name="dateOfBirth"
                                        type="date"
                                        slotProps={{
                                            input: {
                                                min: '2018-06-07T00:00',
                                                max: '2018-06-14T00:00',
                                            },
                                        }}
                                        value={dataInUser.dateOfBirth}
                                        onChange={(e) => handleChangeInData(e)}
                                    />
                                </Box>
                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: '550',
                                            marginLeft: '5px',
                                        }}
                                    >
                                        Số điện thoại
                                    </Typography>
                                    <Input
                                        name="phone"
                                        value={dataInUser.phone}
                                        onChange={handleChangeInData}
                                        placeholder="Nhập số điện thoại…"
                                        variant="outlined"
                                        slotProps={{
                                            input: {
                                                component: TextMaskAdapter,
                                            },
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: '550',
                                            marginLeft: '5px',
                                        }}
                                    >
                                        Địa chỉ
                                    </Typography>
                                    <Input
                                        name="address"
                                        value={dataInUser.address}
                                        onChange={handleChangeInData}
                                        placeholder="Nhập địa chỉ…"
                                        variant="outlined"
                                    />
                                </Box>
                            </Stack>
                            <Box
                                sx={{
                                    marginTop: '20px',
                                    display: 'flex',
                                    justifyContent: 'end',
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleUpdateDataUser()}
                                >
                                    Cập nhật
                                </Button>
                            </Box>
                        </Box>
                    </CustomTabPanel>
                    <CustomTabPanel value={valueTapSetting} index={1}>
                        <Box>
                            <Box>
                                <Typography sx={{marginBottom: '20px', textAlign: 'center', fontSize: '20px', fontWeight: '550'}}>Thay đổi mật khẩu</Typography>
                            </Box>
                            <Stack spacing={3}>
                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: '550',
                                            marginLeft: '5px',
                                        }}
                                    >
                                        Mật khẩu cũ
                                    </Typography>
                                    <Input
                                        type='password'
                                        name="password"
                                        value={dataPassword.password}
                                        onChange={handleChangeInPasword}
                                        placeholder="Nhập mật khẩu cũ…"
                                        variant="outlined"
                                    />
                                </Box>
                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: '550',
                                            marginLeft: '5px',
                                        }}
                                    >
                                        Mật khẩu mới
                                    </Typography>
                                    <Input
                                        type='password'
                                        name="newPassword"
                                        value={dataPassword.newPassword}
                                        onChange={handleChangeInPasword}
                                        placeholder="Nhập mật khẩu mới…"
                                        variant="outlined"
                                    />
                                </Box>
                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: '550',
                                            marginLeft: '5px',
                                        }}
                                    >
                                        Xác nhận mật khẩu mới
                                    </Typography>
                                    <Input
                                        type='password'
                                        name="newConfirmPassword"
                                        value={dataPassword.newConfirmPassword}
                                        onChange={handleChangeInPasword}
                                        placeholder="Nhập lại mật khẩu mới…"
                                        variant="outlined"
                                    />
                                </Box>
                            </Stack>
                            <Box
                                sx={{
                                    marginTop: '20px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={() => handleUpdatePassword()}
                                    sx={{width: '160px'}}
                                >
                                    Thay đổi
                                </Button>
                            </Box>
                        </Box>
                    </CustomTabPanel>
                </Box>
            </Container>
        </>
    );
};

export default Setting;

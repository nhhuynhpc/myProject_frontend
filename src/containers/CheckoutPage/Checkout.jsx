import React from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import subVn from 'sub-vn';

const Checkout = () => {
    // set in provinces vn
    const [provinces, setProvinces] = React.useState({
        province: [],
        districts: [],
    });
    const [provincesIn, setProvincesIN] = React.useState({
        provinceIn: '',
        districtsIN: '',
    });

    React.useEffect(() => {
        setProvinces({ ...provinces, province: subVn.getProvinces() });
    }, []);

    const onProvinceClick = (event) => {
        event.preventDefault();
        let provinceCode = event.target.value;
        setProvinces({
            ...provinces,
            districts: subVn.getDistrictsByProvinceCode(provinceCode),
        });
       setProvincesIN({...provincesIn, provinceIn: provinceCode})
    };

    const handleChangeDistrictsIn = (event) => {
        event.preventDefault();
        setProvincesIN({...provincesIn, districtsIN: event.target.value})
    }
    return (
        <div>
            <Container
                sx={{
                    marginTop: '145px',
                    backgroundColor: 'white',
                    padding: '20px 10px',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Box sx={{ width: '35%' }}>
                    <Typography sx={{ fontWeight: '700', fontSize: '17px' }}>
                        Đơn hàng <span>(0 sản phẩm)</span>
                    </Typography>
                    <Box>
                        <Box>Sanr phamr</Box>
                        <Box>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="left">
                                            Tạm tính
                                        </TableCell>
                                        <TableCell align="right">0</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left">
                                            Phí vận chuyển
                                        </TableCell>
                                        <TableCell align="right">0</TableCell>
                                    </TableRow>
                                    <TableRow sx={{ fontSize: '18px' }}>
                                        <TableCell align="left">
                                            Tổng cộng
                                        </TableCell>
                                        <TableCell align="right">0</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: '60%',
                        display: 'flex',
                        justifyContent: 'space-around',
                        flexWrap: 'wrap',
                    }}
                >
                    <Box sx={{ width: '47%' }}>
                        <Typography>Thông tin giao hàng</Typography>
                        <Stack spacing={2}>
                            <TextField
                                id="outlined-basic"
                                label="Họ và tên"
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-basic"
                                label="Số điện thoại"
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-basic"
                                label="Địa chỉ"
                                variant="outlined"
                            />

                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-helper-label">
                                    Tỉnh/ thành phố
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    label="Tỉnh/ thành phố"
                                    value={provincesIn.provinceIn}
                                    onChange={onProvinceClick}
                                >
                                    <MenuItem value="">
                                        Tỉnh/ thành phố
                                    </MenuItem>
                                    {provinces.province &&
                                        provinces.province.map((data) => {
                                            return (
                                                <MenuItem
                                                    key={data.code}
                                                    value={data.code ?? ''}
                                                >
                                                    {data.name}
                                                </MenuItem>
                                            );
                                        })}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-helper-label">
                                    Quận/ huyện
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    label="Quận/ huyện"
                                    value={provincesIn.districtsIN}
                                    onChange={handleChangeDistrictsIn}
                                >
                                    <MenuItem value="">Quận/ huyện</MenuItem>
                                    {provinces.districts &&
                                        provinces.districts.map((data) => {
                                            return (
                                                <MenuItem
                                                    key={data.code}
                                                    value={data.code ?? ''}
                                                >
                                                    {data.name}
                                                </MenuItem>
                                            );
                                        })}
                                </Select>
                            </FormControl>

                            <Box>
                                <Typography>Ghi chú</Typography>
                                <textarea
                                    name="message"
                                    id="message"
                                    style={{
                                        width: '100%',
                                        height: '100px',
                                        border: '1px solid #BCBCBC',
                                        borderRadius: '8px',
                                        outline: 'none',
                                        padding: '10px',
                                        fontSize: '18px',
                                        placeholder: { fontSize: '18px' },
                                    }}
                                    placeholder="Ghi chú (tùy chọn)..."
                                ></textarea>
                            </Box>
                        </Stack>
                    </Box>
                    <Box sx={{ width: '47%' }}>
                        <Typography>Thông tin giao hàng</Typography>
                        <Stack spacing={2}>
                            <TextField
                                id="outlined-basic"
                                label="Họ và tên"
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-basic"
                                label="Số điện thoại"
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-basic"
                                label="Địa chỉ"
                                variant="outlined"
                            />

                            <Box>
                                <Typography>Ghi chú</Typography>
                                <textarea
                                    name="message"
                                    id="message"
                                    style={{
                                        width: '100%',
                                        height: '100px',
                                        border: '1px solid #BCBCBC',
                                        borderRadius: '8px',
                                        outline: 'none',
                                        padding: '10px',
                                        fontSize: '18px',
                                        placeholder: { fontSize: '18px' },
                                    }}
                                    placeholder="Ghi chú (tùy chọn)..."
                                ></textarea>
                            </Box>
                        </Stack>
                    </Box>
                    <Box
                        sx={{
                            marginTop: '25px',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Button variant="contained" sx={{ width: '270px' }}>
                            Đặt hàng
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default Checkout;

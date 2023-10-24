import React from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';

const Contact = () => {
    return (
        <div>
            <Container>
                <Box
                    sx={{
                        margin: '45px auto',
                        width: '80%',
                        border: '1px solid #939393',
                        borderRadius: '8px',
                    }}
                >
                    <Typography
                        sx={{
                            margin: '25px 0 20px',
                            textAlign: 'center',
                            fontSize: '25px',
                            fontWeight: '700',
                        }}
                    >
                        Liên hệ
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <FormControl
                            sx={{ margin: '15px 25px' }}
                            variant="outlined"
                        >
                            <InputLabel htmlFor="outlined-adornment-name">
                                Tên
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-name"
                                type={'text'}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                }
                                label="Tên"
                                placeholder="Nhập họ tên..."
                            />
                        </FormControl>
                        <FormControl
                            sx={{ margin: '15px 25px' }}
                            variant="outlined"
                        >
                            <InputLabel htmlFor="outlined-adornment-email">
                                Email
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email"
                                type={'email'}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                }
                                label="Email"
                                placeholder="Nhập email..."
                            />
                        </FormControl>
                        <Box sx={{ margin: '15px 25px' }}>
                            <Typography>Lời nhắn</Typography>
                            <textarea
                                name="message"
                                id="message"
                                style={{
                                    width: '100%',
                                    height: '150px',
                                    border: '1px solid #BCBCBC',
                                    borderRadius: '8px',
                                    outline: 'none',
                                    padding: '10px',
                                    fontSize: '18px',
                                    placeholder: { fontSize: '18px' },
                                }}
                                placeholder="Nhập lời nhắn..."
                            ></textarea>
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
                      <Button variant="contained" endIcon={<SendIcon />} sx={{width: '200px'}}>
                          Send
                      </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default Contact;

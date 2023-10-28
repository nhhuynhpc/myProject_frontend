import React from 'react';
import './account.css';
import {
    Box,
    Container,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';

const AccountLayout = ({ children }) => {
    return (
        <div>
            <Container
                sx={{
                    marginTop: '140px',
                    padding: '20px 15px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                }}
            >
                <Box
                    sx={{
                        width: '23%',
                        padding: '0 15px',
                        backgroundColor: '#F5F5DE',
                        borderRadius: '7px',
                    }}
                >
                    <nav aria-label="secondary mailbox folders">
                        <List>
                            <ListItem disablePadding>
                                <Link to={'/account'} className="account-link">
                                    <ListItemButton>
                                        <ListItemText primary="Hồ sơ" />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                            <ListItem disablePadding>
                                <Link
                                    to={'/account/orders'}
                                    className="account-link"
                                >
                                    <ListItemButton>
                                        <ListItemText primary="Đơn hàng" />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                            <ListItem disablePadding>
                                <Link
                                    to={'/account/setting'}
                                    className="account-link"
                                >
                                    <ListItemButton>
                                        <ListItemText primary="Cài đặt" />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                            <ListItem disablePadding>
                                <Link
                                    to={'/account/contact'}
                                    className="account-link"
                                >
                                    <ListItemButton>
                                        <ListItemText primary="Liên hệ" />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        </List>
                    </nav>
                </Box>
                <Box sx={{ width: '70%', padding: '20px 15px' }}>
                    {children}
                </Box>
            </Container>
        </div>
    );
};

export default AccountLayout;

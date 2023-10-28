import {
    Avatar,
    Box,
    Container,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@mui/material';
import React from 'react';
import Slider from 'react-slick';
import CardProduct from '../../components/CardProduct/CardProduct';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';
import { authRedux } from '../../redux/selectors';
const api_url = 'http://localhost:8080/';

const Profile = () => {
    const authData = useSelector(authRedux);
    const [dataUser, setDataUser] = React.useState();

    React.useEffect(() => {
        setDataUser(authData.user.result);
    }, [authData]);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
    };
    return (
        <div>
            <Container sx={{ display: 'flex' }}>
                <Box sx={{ width: '45%' }}>
                    <Slider {...settings}>
                        {/* {dataProductsuggest.map((item, i) => (
                  <ItemBlockProduct key={i} item={item} />
                ))} */}
                    </Slider>
                </Box>
                <Box sx={{ width: '50%' }}>
                    <Box sx={{ padding: '15px 0' }}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={api_url + 'userImg.webp'}
                                    sx={{
                                        width: '80px',
                                        height: '80px',
                                        marginRight: '15px',
                                    }}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography
                                        sx={{
                                            marginTop: '15px',
                                            fontSize: '20px',
                                            fontWeight: '500',
                                        }}
                                    >
                                        {dataUser?.username ?? 'err'}
                                    </Typography>
                                }
                                secondary={
                                    <Typography>
                                        {dataUser?.email ?? 'err'}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </Box>
                    <Box>
                        <List>
                            <ListItem
                                disablePadding
                                sx={{
                                    borderTop: '1px solid #C4C4C4',
                                    padding: '10px 15px',
                                }}
                            >
                                <ListItemText primary="ĐÃ MUA: " />
                            </ListItem>
                        </List>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

function ItemBlockProduct(props) {
    return (
        <>
            <CardProduct
                linkImage={api_url + props.item.image}
                Title={props.item.name}
                price={props.item.price}
                link={props.item.slug}
            />
        </>
    );
}

export default Profile;

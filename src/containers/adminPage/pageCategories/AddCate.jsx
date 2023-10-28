import React from 'react';
import '../adminPage.css';
import {
    Container,
    Button,
    Stack,
    TextField,
    Box,
    Alert,
    Collapse,
    styled,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { GetCategories } from '../../../services/categoriesService';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
const API = 'http://localhost:8080/';

const AddCate = (props) => {
    const [typeCate, setTypeCate] = React.useState([]);
    const [dataCate, setDataCate] = React.useState({
        id: '',
        name: '',
        image: '',
        categories_id: '',
    });

    const [selectedImage, setSelectedImage] = React.useState(null);
    const [showImage, setShowImage] = React.useState(null);

    React.useEffect(() => {
        getDataCateDetail();
    }, []);

    React.useEffect(() => {
        setDataCate({
            id: props.dataThisCate?.id ?? '',
            name: props.dataThisCate?.name ?? '',
            categories_id: props.dataThisCate?.categories_id ?? '',
        });
        setShowImage(
            props.dataThisCate?.image ? API + props.dataThisCate?.image : null
        );
    }, [props.dataThisCate]);

    React.useEffect(() => {
        if (!props.isOpen) {
            setDataCate({
                id: '',
                name: '',
                categories_id: '',
            });
            setSelectedImage(null);
            setShowImage(null);
        }
    }, [props.isOpen]);

    const getDataCateDetail = async () => {
        let result = await GetCategories();
        setTypeCate(result.data?.categories);
    };

    const handleChangeInput = React.useCallback(
        (event) => {
            event.preventDefault();
            const { name, value } = event.target;
            setDataCate({ ...dataCate, [name]: value });
        },
        [dataCate]
    );

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        setShowImage(URL.createObjectURL(file));
    };

    return (
        <>
            <Container>
                <Dialog
                    fullWidth={true}
                    maxWidth={'sm'}
                    open={props.isOpen}
                    onClose={props.isClose}
                >
                    <DialogTitle>
                        {props.typeEdit === 0
                            ? 'Thêm loại sản phẩm'
                            : 'Chỉnh sửa'}
                    </DialogTitle>
                    <DialogContent>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: '20px',
                            }}
                        >
                            <Stack spacing={2}>
                                <TextField
                                    id="name"
                                    name="name"
                                    label="Tên"
                                    variant="outlined"
                                    onChange={handleChangeInput}
                                    sx={{
                                        width: '350px',
                                    }}
                                    value={dataCate.name}
                                />
                                <label htmlFor="img-file">Thêm ảnh</label>
                                <Button
                                    component="label"
                                    variant="contained"
                                    startIcon={<CloudUploadIcon />}
                                    sx={{ width: '250px' }}
                                >
                                    Chọn file...
                                    <VisuallyHiddenInput
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </Button>
                                {showImage && (
                                    <img
                                        src={showImage}
                                        alt="Uploaded"
                                        width={360}
                                    />
                                )}
                                <select
                                    name="categories_id"
                                    id="categories_id"
                                    className="swal2-select"
                                    onChange={handleChangeInput}
                                    value={dataCate.categories_id}
                                >
                                    <option value="">Loại</option>
                                    {typeCate &&
                                        typeCate.map((item, key) => (
                                            <option value={item.id} key={key}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </Stack>
                        </Box>
                        <Collapse
                            in={props.alertMsg.open}
                            sx={{ marginTop: '20px' }}
                        >
                            <Alert variant="filled" severity="error">
                                {props.alertMsg.msg}
                            </Alert>
                        </Collapse>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.isClose}>Cancel</Button>
                        <Button
                            onClick={() =>
                                props.postData(dataCate, selectedImage)
                            }
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </>
    );
};

export default AddCate;

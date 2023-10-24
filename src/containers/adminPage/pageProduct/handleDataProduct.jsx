import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import '../adminPage.css'
import Container from '@mui/material/Container';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Alert from '@mui/material/Alert';

import { Postimg, UpdateProduct } from '../../../services/authService';
import { GetListCategories } from '../../../services/authService';
import { Collapse } from '@mui/material';

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

const EditDataProduct = (props) => {
  const API = 'http://localhost:8080/'
  const [dataProduct, setDataProduct] = React.useState({
    id: '',
    categories_id: '',
    name: '',
    description: '',
    content: '',
    price: '',
  })
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [showImage, setShowImage] = React.useState(null)
  const [dataCate, setDataCate] = React.useState([])
  const [isMsgErr, setIsMsgErr] = React.useState({open: false, msg: ''})

  React.useEffect(() => {
    setDataProduct({
      id: props.dataProduct?.id,
      name: props.dataProduct?.name,
      price: props.dataProduct?.price,
    })
    setShowImage(props.dataProduct?.image ? (API + props.dataProduct?.image): null)
  }, [props.dataProduct])
  React.useEffect(() => {
    getCategories();
  }, [])
  
  const getCategories = async () => {
    try {
      let result = await GetListCategories();
      setDataCate(result.data.cateInfo);
    } catch (error) {
      console.log(error);
    }
  }

  const handleInputChange = React.useCallback(e => {
    const {name, value} = e.target;
    setDataProduct({ ...dataProduct, [name]: value})
  }, [dataProduct])

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(URL.createObjectURL(file));
    setSelectedImage(file);
    setShowImage(URL.createObjectURL(file));
  };

  const uploadImage = async (file, id) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);

    try {
      const response = await Postimg(formData, id)
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const updateProduct = async () => {
    let resutl = await UpdateProduct(dataProduct)

    if (resutl.data.err !== 0) {
      setIsMsgErr({open: true, msg: resutl.data.msg})
      return
    }

    if (selectedImage) {
      uploadImage(selectedImage, dataProduct.id)
    }

    window.location.reload()
  }
  return (
    <div>
      <Dialog fullWidth={true} maxWidth={'md'} open={props.isOpen} onClose={props.handleCloseEdit} >
        <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
        <DialogContent>
          <Container sx={{bgcolor: 'white', borderRadius: '10px', padding: '20px 20px'}}>
            <div>
              <Stack spacing={2}>
                <label htmlFor="name">Tên sản phẩm: </label>
                <Input
                  size="lg"
                  type='text'
                  name='name'
                  placeholder="Nhập tên..."
                  onChange={e => handleInputChange(e)}
                  value={dataProduct.name}
                />
                <label htmlFor="productdescription">Mô tả sản phẩm: </label>
                <Input
                  size='lg'
                  type='text'
                  name='description'
                  placeholder='Nhập mô tả...'
                  onChange={e => handleInputChange(e)}
                  value={dataProduct.description}
                />
                <label htmlFor="productContent">Nội dung sản phẩm: </label>
                <Input
                  size='lg'
                  type='text'
                  name='content'
                  placeholder='Nhập mô tả...'
                  onChange={e => handleInputChange(e)}
                  value={dataProduct.content}
                />
                <label htmlFor="img-file">Thêm ảnh</label>
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{width: '250px'}}>
                  Chọn file...
                  <VisuallyHiddenInput type="file" accept="image/*" onChange={handleImageChange} />
                </Button>
                {showImage && <img src={showImage} alt="Uploaded" width={360}/>}
                <label htmlFor="price">Đơn giá</label>
                <Input
                  size='lg'
                  type='text'
                  name='price'
                  placeholder='Nhập giá...'
                  onChange={e => handleInputChange(e)}
                  value={dataProduct.price}
                />
                <label htmlFor="list-product">Chọn loại sản phẩm: </label>
                <select
                  name="categories_id"
                  id='categories_id'
                  onChange={e => handleInputChange(e)}
                  aria-label="label for the select"
                >
                  <option value="">Chọn loại sản phẩm...</option>
                  {dataCate && dataCate.map((index, key) => (
                    <option key={key} value={index.id}>{index.name}</option>
                  ))}
                </select>
              </Stack>
              <Collapse in={isMsgErr.open} sx={{marginTop: '20px'}}>
                <Alert variant="filled" severity="error">
                  {isMsgErr.msg}
                </Alert>
              </Collapse>
            </div>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => updateProduct()}
            sx={{
              width: '250px',
              backgroundColor: '#40AAEA',
              color: 'white',
              ":hover": {
                backgroundColor: '#8EBFF2'
              }
            }}
          >Thêm
          </Button>
          <Button
            sx={{
              width: '250px',
              backgroundColor: '#6F717C',
              color: 'white',
              ":hover": {
                backgroundColor: '#C6C9D3'
              }
            }}
            onClick={props.handleCloseEdit}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default EditDataProduct
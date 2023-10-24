import React from 'react'
import '../adminPage.css'
import Container from '@mui/material/Container';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Alert, Collapse } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { GetCustomerObject } from '../../../services/authService';
import { GetListCategories } from '../../../services/authService';

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

const AddProduct = (props) => {
  const API = 'http://localhost:8080/'
  const [dataProduct, setDataProduct] = React.useState({
    id: '',
    categories_id: '',
    customers_object_id: '',
    name: '',
    description: '',
    content: '',
    price: '',
  })

  const [selectedImage, setSelectedImage] = React.useState(null);
  const [showImage, setShowImage] = React.useState(null)

  const [dataCate, setDataCate] = React.useState([])
  const [dataTypeCustomer, setDataTypeCustomer] = React.useState([])

  React.useEffect(() => {
    if (!props.isOpen) {
      setDataProduct({
        categories_id: '',
        customers_object_id: '',
        name: '',
        description: '',
        content: '',
        price: '',
      })
      setSelectedImage(null)
      setShowImage(null)
    }
  }, [props.isOpen])

  React.useEffect(() => {
    setDataProduct({
      id: props.dataThisProduct?.id ?? '',
      categories_id: props.dataThisProduct?.categories_id ?? '',
      customers_object_id: props.dataThisProduct?.customers_object_id ?? '',
      name: props.dataThisProduct?.name ?? '',
      description: props.dataThisProduct?.description ?? '',
      content: props.dataThisProduct?.content ?? '',
      price: props.dataThisProduct?.price ?? ''
    })
    setShowImage(props.dataThisProduct?.image ? (API + props.dataThisProduct?.image): null)
  }, [props.dataThisProduct])

  React.useEffect(() => {
    getCategories();
    getCustomerObject()
  }, [])
  
  const getCategories = async () => {
    try {
      let result = await GetListCategories();
      setDataCate(result.data.cateInfo);
    } catch (error) {
      console.log(error);
    }
  }

  const getCustomerObject = async () => {
    try {
      let result = await GetCustomerObject();
      setDataTypeCustomer(result.data.customersObject);
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
    setSelectedImage(file);
    setShowImage(URL.createObjectURL(file));
  };

  return (
    <>
      <Container >
        <Dialog fullWidth={true} maxWidth={'md'} open={props.isOpen} onClose={props.handleCloseEdit} >
          <DialogTitle>{(props.typeEdit === 0) ? 'Thêm sản phẩm': 'Chỉnh sửa'}</DialogTitle>
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
                    value={dataProduct.categories_id}
                  >
                    <option value="">Chọn loại sản phẩm...</option>
                    {dataCate && dataCate.map((index, key) => (
                      <option key={key} value={index.id}>{index.name}</option>
                    ))}
                  </select>
                  <select
                    name="customers_object_id"
                    id='customers_object_id'
                    onChange={e => handleInputChange(e)}
                    aria-label="label for the select"
                    value={dataProduct.customers_object_id}
                  >
                    <option value="">Chọn loại khách hàng...</option>
                    {dataTypeCustomer && dataTypeCustomer.map((index, key) => (
                      <option key={key} value={index.id}>{index.name}</option>
                    ))}
                  </select>
                </Stack>
                <Collapse in={props.alertMsg.open} sx={{marginTop: '20px'}}>
                  <Alert variant="filled" severity="error">
                    {props.alertMsg.msg}
                  </Alert>
                </Collapse>
              </div>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => props.postData(dataProduct, selectedImage)}
              sx={{
                width: '250px',
                backgroundColor: '#40AAEA',
                color: 'white',
                ":hover": {
                  backgroundColor: '#8EBFF2'
                }
              }}
            >{(props.typeEdit === 0) ? 'Thêm': 'Chỉnh sửa'}
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
              onClick={props.isClose}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  )
}

export default AddProduct
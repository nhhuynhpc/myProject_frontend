import React from 'react'
import '../adminPage.css'
import fileIcon from '../img-vector/fileIcon.svg'
import { Button } from '@mui/material'

const Users = () => {
    const [dataSearch, setDataSearch] = React.useState()
    const [dataResultSearch, setDataResultSearch] = React.useState([])
    const [isSearch, setIsSearch] = React.useState(false) 

        // handle search
        const handleSearch = async () => {
          }
  return (
    <div>
        <div className="adminpage-container">
            <div className="adminpage-title">
            <div className="title-icon">
                <img src={fileIcon} alt="img file" />
            </div>
            <span className="title-text">Quản lý loại sản phẩm</span>
            </div>
            <div className="admin-form-search">
            <input
              type="text"
              placeholder='Tìm kiếm sản phẩm'
              onChange={e => setDataSearch(e.target.value)}
            />
            <button onClick={() => handleSearch()}>Search</button>
            </div>
            <div className="categories-content">
            <table className='cgr-table'>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>image</th>
                    <th>Giá</th>
                    <th>Loại sản phẩm</th>
                    <th>Loại khách hàng</th>
                    <th>Chức năng</th>
                </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            </div>
        </div>
    </div>
  )
}

export default Users
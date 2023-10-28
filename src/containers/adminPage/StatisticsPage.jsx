import React from 'react';
import './adminPage.css';
import houseIcon from './img-vector/house.svg';
import { GetProduct } from '../../services/productService';
import { GetOrdersAll } from '../../services/orderService';
import { GetDataProductInOrder } from '../../services/orderDetailService';

const StatisticsPage = () => {
    const [dataOrder, setDataOrder] = React.useState([]);
    const [productInOrder, setProductInOrder] = React.useState([])
    //set number product
    const [quantityProduct, setQuantityProduct] = React.useState();

    // set date
    var curr = new Date();
    curr.setDate(curr.getDate() + 3);
    var date = curr.toISOString().substring(0, 10);

    const [month, setMonth] = React.useState(getCurrentMonth());

    React.useEffect(() => {
        setMonth(getCurrentMonth());
        getProduct();
        handleDataOrder();
    }, []);

    React.useEffect(() => {
        handleDataProductInOrder()
    }, [dataOrder])

    const handleDataOrder = async () => {
        let result = await GetOrdersAll();

        setDataOrder(result.data.result);
    };

    const getProduct = async () => {
        let result = await GetProduct();

        setQuantityProduct(result.data.dataProduct?.length ?? '0');
    };

    const handleDataProductInOrder = async () => {
        if (dataOrder.length !== 0) {
            let listOrderId = []
            for (let item of dataOrder) {
                listOrderId.push(item.id)
            }
    
            let result = await GetDataProductInOrder({listOrderId: listOrderId})
            setProductInOrder(result.data.result)
        }
    }

    const caculateSumprice = () => {
        if (productInOrder.length !== 0) {
            let sumPrice = 0
            for (let item of productInOrder) {
                if (item?.status === 2) {
                    sumPrice += parseInt(item.price ?? 0) * parseInt(item.quantity ?? 0)
                }
            }
            return sumPrice
        }
        return 0
    }

    function getCurrentMonth() {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        return `${year}-${month}`;
    }
    return (
        <>
            <div className="adminpage-container">
                <div className="adminpage-title">
                    <div className="title-icon">
                        <img src={houseIcon} alt="img house" />
                    </div>
                    <span className="title-text">Trang chủ</span>
                </div>
                <div className="statistic-content">
                    <div className="row">
                        <div className="statistic-card card-1">
                            <p>Tổng doanh thu</p>
                            <span>{caculateSumprice()?.toLocaleString('it-It')}</span>
                        </div>
                        <div className="statistic-card card-2">
                            <p>Tổng số hóa đơn</p>
                            <span>{dataOrder?.length ?? 'err'}</span>
                        </div>
                        <div className="statistic-card card-3">
                            <p>Số lượng sản phẩm</p>
                            <span>{quantityProduct ?? '0'}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="statistic-card">
                            <p>Tổng doanh thu theo ngày</p>
                            <span>0</span>
                        </div>
                        <div className="statistic-card">
                            <p>Tổng doanh thu theo tháng</p>
                            <span>0</span>
                        </div>
                    </div>
                    <div className="statistic-setdate">
                        <div className="setdate">
                            <label htmlFor="date-day">Ngày: </label>
                            <input
                                type="date"
                                id="date-day"
                                defaultValue={date}
                            />
                            <button>Thống kê</button>
                        </div>
                        <div className="setdate">
                            <label htmlFor="date-month">Tháng: </label>
                            <input
                                type="month"
                                id="date-month"
                                defaultValue={month}
                            />
                            <button>Thống kê</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StatisticsPage;

import React from 'react';
import './adminPage.css';
import houseIcon from './img-vector/house.svg';
import { GetProduct } from '../../services/productService';
import { GetOrdersAll } from '../../services/orderService';
import { GetDataProductInOrder } from '../../services/orderDetailService';

const StatisticsPage = () => {
    // set date
    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substring(0, 10);

    const [dataOrder, setDataOrder] = React.useState([]);
    const [productInOrder, setProductInOrder] = React.useState([]);
    const [listProductInOrderIsSuccess, setListProductInOrderIsSuccess] =
        React.useState([]);
    //set number product
    const [quantityProduct, setQuantityProduct] = React.useState();

    const [dataDateForStatistics, setDataDateForStatistics] = React.useState({
        dataMonth: '',
        dataDay: ''
    })
    const [sumPriceProductInOrderByDay, setSumPriceProductInOrderByDay] = React.useState('0')
    const [sumPriceProductInOrderByMonth, setSumPriceProductInOrderByMonth] = React.useState('0')

    React.useEffect(() => {
        setDataDateForStatistics({...dataDateForStatistics, dataMonth: getCurrentMonth(), dataDay: date})
        getProduct();
        handleDataOrder();
    }, []);

    React.useEffect(() => {
        handleDataProductInOrder();
    }, [dataOrder]);

    React.useEffect(() => {
        handleListProductInOrderIsSuccess();
    }, [productInOrder]);

    React.useEffect(() => {
        caculateSumPriceByMonth(dataDateForStatistics.dataMonth)
        caculateSumPriceByDay(dataDateForStatistics.dataDay)
    }, [listProductInOrderIsSuccess])

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
            let listOrderId = [];
            for (let item of dataOrder) {
                listOrderId.push(item.id);
            }

            let result = await GetDataProductInOrder({
                listOrderId: listOrderId,
            });
            setProductInOrder(result.data.result);
        }
    };

    const handleListProductInOrderIsSuccess = () => {
        let listProductInOrderIsSuccess = [];
        for (let item of dataOrder) {
            if (item?.status === 2) {
                listProductInOrderIsSuccess =
                    listProductInOrderIsSuccess.concat(
                        productInOrder.filter(
                            (data) => data?.order_id === item.id
                        )
                    );
            }
        }
        setListProductInOrderIsSuccess(listProductInOrderIsSuccess);
    };

    const caculateSumprice = () => {
        if (productInOrder.length !== 0) {
            let sumPrice = 0;

            for (let item of listProductInOrderIsSuccess) {
                sumPrice +=
                    parseInt(item.price ?? 0) * parseInt(item.quantity ?? 0);
            }
            return sumPrice;
        }
        return 0;
    };

    const handleChangeInDay = (event) => {
        setDataDateForStatistics({...dataDateForStatistics, dataDay: event.target.value});
    };
// chưa sửa
    const caculateSumPriceByDay = (day) => {
        if (day) {
            let sumPrice = 0;
            let listProductInOrderByDay = listProductInOrderIsSuccess.filter(
                (data) => {
                    let date = new Date(data?.delivery_date);
                    const yearOrder = date.getFullYear();
                    const monthOrder = date.getMonth() + 1;
                    const dayOrder = date.getDate();
                    return (
                        yearOrder +
                            '-' +
                            monthOrder +
                            '-' +
                            (dayOrder > 9
                                ? dayOrder
                                : '0' + dayOrder) ===
                        day
                    );
                }
            );
            for (let item of listProductInOrderByDay) {
                sumPrice += parseInt(item.quantity) * parseInt(item.price)
            }
            setSumPriceProductInOrderByDay(sumPrice)
        }
    };

    const handleChangeInMonth = (event) => {
        setDataDateForStatistics({...dataDateForStatistics, dataMonth: event.target.value});
    };

    const caculateSumPriceByMonth = (month) => {
        if (month) {
            let date = new Date(month);
            let dataMonth = date.getMonth() + 1;
            let sumPrice = 0;
            let listProductInOrderByMonth = listProductInOrderIsSuccess.filter(
                (data) => {
                    let date = new Date(data?.delivery_date);
                    return date.getMonth() + 1 === dataMonth;
                }
            );
            for (let item of listProductInOrderByMonth) {
                sumPrice += parseInt(item.quantity) * parseInt(item.price);
            }
            setSumPriceProductInOrderByMonth(sumPrice)
        }
    };

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
                            <span>
                                {caculateSumprice()?.toLocaleString('it-It')}
                            </span>
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
                            <span>
                                {sumPriceProductInOrderByDay?.toLocaleString('it-It')}
                            </span>
                        </div>
                        <div className="statistic-card">
                            <p>Tổng doanh thu theo tháng</p>
                            <span>
                                {sumPriceProductInOrderByMonth?.toLocaleString('it-It')}
                            </span>
                        </div>
                    </div>
                    <div className="statistic-setdate">
                        <div className="setdate">
                            <label htmlFor="date-day">Ngày: </label>
                            <input
                                type="date"
                                id="date-day"
                                value={dataDateForStatistics.dataDay}
                                onChange={handleChangeInDay}
                            />
                            <button onClick={() => caculateSumPriceByDay(dataDateForStatistics.dataDay)}>Thống kê</button>
                        </div>
                        <div className="setdate">
                            <label htmlFor="date-month">Tháng: </label>
                            <input
                                type="month"
                                id="date-month"
                                value={dataDateForStatistics.dataMonth}
                                onChange={handleChangeInMonth}
                            />
                            <button onClick={() => caculateSumPriceByMonth(
                                    dataDateForStatistics.dataMonth
                                )}>Thống kê</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StatisticsPage;

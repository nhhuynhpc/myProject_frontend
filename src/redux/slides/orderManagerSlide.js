import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { GetOrdersAll, PostUpdateOrder } from "../../services/orderService"


const initialState = {
    dataOrder: []
}

export const allDataOrders = createAsyncThunk(
    "orders/get-data",
    async () => {
        return await GetOrdersAll()
    }
)

export const updateDataOrders = createAsyncThunk(
    "orders/update",
    async (data) => {
        await PostUpdateOrder(data)
        return await GetOrdersAll()
    }
)

const orderManagerSlide = createSlice({
    name: 'orders',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(allDataOrders.fulfilled, (state, action) => {
            state.dataOrder = action.payload?.data?.result;
        })
        .addCase(updateDataOrders.fulfilled, (state, action) => {
            state.dataOrder = action.payload?.data?.result;
        })
    }
})

const { reducer } = orderManagerSlide;

export default reducer;
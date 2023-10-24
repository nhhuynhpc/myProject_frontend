import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { GetProductByCustomer } from "../../services/authService"


const initialState = {
    filter: {
        categoriesDetail: '',
        priceRange: [0, 2000000]
    },
    products: []
}

export const setDataProducts = createAsyncThunk(
    "products/setData",
    async (data) => {
        return await GetProductByCustomer(data)
    }
)

export const setDataFilterPrice = createAsyncThunk(
    "products/setFilterPrice",
    (data) => {
        return data
    }
)

export const setDataFilterCateDetail = createAsyncThunk(
    "products/setFilterCateDetail",
    (data) => {
        return data
    }
)

const productSlide = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(setDataProducts.fulfilled, (state, action) => {
            state.products = action.payload?.data?.dataProduct;
        })
        .addCase(setDataFilterPrice.fulfilled, (state, action) => {
            state.filter.priceRange = action.payload?.data
        })
        .addCase(setDataFilterCateDetail.fulfilled, (state, action) => {
            state.filter.categoriesDetail = action.payload
        })
    }
})

const { reducer } = productSlide;

export default reducer;
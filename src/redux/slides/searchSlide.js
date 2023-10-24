import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { GetProductSearched } from "../../services/authService"

const initialState = {
    productSearched: {
        productSearched: {

        }
    },
    statusSearch: false,
}

export const searchProduct = createAsyncThunk(
    "search/all",
    async (data) => {
        return await GetProductSearched(data)
    }
)

const searchSlice = createSlice({
    name: 'search',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(searchProduct.fulfilled, (state, action) => {
            state.productSearched = action.payload?.data;
            if (state.productSearched.length > 0) {
                state.statusSearch = true
            }
        })
    }
})

const { reducer } = searchSlice;

export default reducer;
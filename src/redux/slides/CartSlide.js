import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { DeleteProductInCart, GetProductInCart, PostCarts, PostCartsDetail } from "../../services/authService"

const initialState = {
    cart: {
        cart: {

        }
    },
    statusCart: false,
}

export const updateCart = createAsyncThunk(
    "cart/update-cart",
    async (data) => {
        let resultPostCarts = await PostCarts({user_id: data.user_id})
        let dataPostcartDetail = {
            cart_id: resultPostCarts.data.cart_id,
            product_id: data.product_id,
            quantity: data.quantity,
            size: data.size,
        }

        await PostCartsDetail(dataPostcartDetail)
        let result = await GetProductInCart({user_id: data.user_id})
        return result
    }
)

export const deleteProdcutCart = createAsyncThunk(
    "cart/delete-cart",
    async (data) => {
        let id = data.cartsDetailsId
        await DeleteProductInCart({id: id})
        return await GetProductInCart({user_id: data.user_id})
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(updateCart.fulfilled, (state, action) => {
            state.cart = action.payload?.data;
            if (state.cart.length > 0) {
                state.statusCart = true
            }
        })
        .addCase(deleteProdcutCart.fulfilled, (state, action) => {
            state.cart = action.payload?.data
            if (state.cart.length > 0) {
                state.statusCart = true
            }
        })
    }
})

const { reducer } = cartSlice;

export default reducer;
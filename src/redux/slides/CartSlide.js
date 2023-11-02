import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetProductInCart, PostCarts } from '../../services/cartsService';
import {
    DeleteProductInCart,
    PostAddCartDetail,
    PostUpdateCartsDetail,
} from '../../services/cartsDetailService';

const initialState = {
    cart: {
        cart: {},
    },
    statusCart: false,
};

export const originalCart = createAsyncThunk('cart/original', async (data) => {
    return await GetProductInCart({ user_id: data.user_id }, data.token ?? '');
});

export const addCart = createAsyncThunk(
    'cart/add-cart',
    async (data) => {
        let token = data.token
        let resultPostCarts = await PostCarts({ user_id: data.user_id ?? '' }, token);
        let dataPostcartDetail = {
            cart_id: resultPostCarts.data.cart_id,
            product_id: data.product_id,
            quantity: data.quantity,
            size: data.size,
        };

        await PostAddCartDetail(dataPostcartDetail, token);
        let result = await GetProductInCart({ user_id: data.user_id }, token);
        return result;
    }
);

export const updateCart = createAsyncThunk('cart/update-cart', async (data) => {
    let token = data.token
    let resultPostCarts = await PostCarts({ user_id: data.user_id }, token);
    let dataPostcartDetail = {
        cart_id: resultPostCarts.data.cart_id,
        product_id: data.product_id,
        quantity: data.quantity,
        size: data.size,
    };

    await PostUpdateCartsDetail(dataPostcartDetail, token);
    let result = await GetProductInCart({ user_id: data.user_id }, token);
    return result;
});

export const deleteProdcutCart = createAsyncThunk(
    'cart/delete-cart',
    async (data) => {
        let token = data.token
        let id = data.cartsDetailsId;
        await DeleteProductInCart({ id: id }, token);
        return await GetProductInCart({ user_id: data.user_id }, token);
    }
);

export const clearCart = createAsyncThunk('cart/clear', () => {
    return;
});

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(originalCart.fulfilled, (state, action) => {
                state.cart = action.payload?.data;
                if (state.cart.length > 0) {
                    state.statusCart = true;
                }
            })
            .addCase(addCart.fulfilled, (state, action) => {
                state.cart = action.payload?.data;
                if (state.cart.length > 0) {
                    state.statusCart = true;
                }
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.cart = action.payload?.data;
                if (state.cart.length > 0) {
                    state.statusCart = true;
                }
            })
            .addCase(deleteProdcutCart.fulfilled, (state, action) => {
                state.cart = action.payload?.data;
                if (state.cart.length > 0) {
                    state.statusCart = true;
                }
            })
            .addCase(clearCart.fulfilled, (state, action) => {
                state.cart = {};
                state.statusCart = false;
            });
    },
});

const { reducer } = cartSlice;

export default reducer;

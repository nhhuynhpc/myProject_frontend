import { createSelector } from "@reduxjs/toolkit";

export const authRedux = (state) => state.auth;


export const filterSelector = (state) => state.product.filter;
export const getProductByCus = (state) => state.product.products;

export const productsRemainingSelector =
    createSelector(filterSelector,
    getProductByCus,
    (filter, product) => {
        if (product.length !== 0) {
            return product.filter((data) => {
                return (
                    data.cateDetailSlug.includes(filter.categoriesDetail)  &&
                    (
                        parseInt(data.price) > filter.priceRange[0] &&
                        parseInt(data.price) < filter.priceRange[1] 
                    )
                );
            })
        }
        return product

    });

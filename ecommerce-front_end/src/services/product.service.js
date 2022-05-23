const apiUrl = "https://adidas-back-end.herokuapp.com/api";
//https://adidas-back-end.herokuapp.com/api/orders?filters[products][name][$contains]=T-shirt&populate=*

export default {
    getProductsByCategory(id) {
        return fetch(`${apiUrl}/products?filters[subcategory][id][$eq]=${id}&populate[image][fields][1]=url`)
        .then((res) => res.json())
    },
    getProductById(id) {
        return fetch(`${apiUrl}/products/${id}?populate=*`)
        .then((res) => res.json())
    },
    getProductByPriceDesc(id){
        return fetch(`${apiUrl}/products?sort[0]=price:desc&filters[subcategory][id][$eq]=${id}&populate[image][fields][1]=url`)
        .then((res) => res.json())
    },
    getProductByPriceAsc(id){
        return fetch(`${apiUrl}/products?sort[0]=price:asc&filters[subcategory][id][$eq]=${id}&populate[image][fields][1]=url`)
        .then((res) => res.json())
    },
    getProductByPriceAsc(id){
        return fetch(`${apiUrl}/products?sort=createdAt:asc&filters[subcategory][id][$eq]=${id}&populate[image][fields][1]=url`)
        .then((res) => res.json())
    },
    getProductBySize(size, id){
        return fetch(`${apiUrl}/products?filters[attributes][size][$contains]=${size}&filters[subcategory][id][$eq]=${id}&populate[image][fields][1]=url`)
        .then((res) => res.json())
    }
}

/*
https://adidas-back-end.herokuapp.com/api/products?filters[subcategory][name][$eq]=T-Shirts&populate[image][populate]=* 
*/
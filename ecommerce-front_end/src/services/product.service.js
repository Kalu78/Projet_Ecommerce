const apiUrl = "https://adidas-back-end.herokuapp.com/api";


export default {
    getProductsByCategory(id) {
        return fetch(`${apiUrl}/products?filters[subcategory][id][$eq]=${id}&populate[image][fields][1]=url`)
        .then((res) => res.json())
    },
    getProductById(id) {
        return fetch(`${apiUrl}/products/${id}?populate=*`)
        .then((res) => res.json())
    },
}

/*
https://adidas-back-end.herokuapp.com/api/products?filters[subcategory][name][$eq]=T-Shirts&populate[image][populate]=* 
*/
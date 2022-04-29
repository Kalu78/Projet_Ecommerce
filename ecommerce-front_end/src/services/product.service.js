const apiUrl = "https://adidas-back-end.herokuapp.com/api";


export default {
    getProductsByCategory(name) {
        return fetch(`${apiUrl}/products?filters[subcategory][name][$eq]=${name}&?populate=image`)
        .then((res) => res.json())
    }
}
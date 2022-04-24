const apiUrl = "http://localhost:1337/api";


export default {
    getProductsByCategory(name) {
        return fetch(`${apiUrl}/products?filters[subcategory][name][$eq]=${name}`)
        .then((res) => res.json())
    }
}
const apiUrl = "https://adidas-back-end.herokuapp.com/api";


export default {
    getCategories() {
        return fetch(`${apiUrl}/categories?populate=*`)
        .then((res) => res.json())
    },
    getSubcategories(){
        return fetch(`${apiUrl}/subcategories?populate=*`)
        .then((res) => res.json())
    },
    getSubcategoriesName(name){
        return fetch(`${apiUrl}/subcategories?filters[category][name][$eq]=${name}`)
        .then((res) => res.json())
    },
    getSubcategoriesById(id){
        return fetch (`${apiUrl}/subcategories/${id}?populate=*`)
        .then((res) => res.json())
    }
}
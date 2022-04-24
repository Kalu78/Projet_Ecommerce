const apiUrl = "http://localhost:1337/api";


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
    }
}
const apiUrl = "https://adidas-back-end.herokuapp.com/api";


export default {
    getAttributes() {
        return fetch(`${apiUrl}/attributes?populate=*`)
        .then((res) => res.json())
    }
}
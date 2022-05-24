/* eslint-disable import/no-anonymous-default-export */
const apiUrl = "https://adidas-back-end.herokuapp.com/api";

export default {
    register(payload) {
        return fetch(`${apiUrl}/auth/local/register`, {
            method: "POST",
            headers: {
                "Content-Type":"Application/json"
            },
            body: JSON.stringify(payload)
        })
        .then(
            (res) => res.json(),
        )
    },
    login(payload){
        return fetch(`${apiUrl}/auth/local`, {
            method: "POST",
            headers: {
                "Content-Type":"Application/json"
            },
            body: JSON.stringify(payload)
        })
        .then((res) => res.json());
    },
    getMe(jwt){
        return fetch(`${apiUrl}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type":"Application/json",
                "Authorization": `Bearer ${jwt}`,
            }
        })
        .then((res) => res.json())
    }, 
    getUserOrder(id) {
        return fetch(`${apiUrl}/orders?filters[user][id][$eq]=${id}&populate=*`, {
            method: "GET",
            headers: {
                "Content-Type":"Application/json",
            }
        })
        .then((res) => res.json())
    }
};
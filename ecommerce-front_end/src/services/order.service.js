/* eslint-disable import/no-anonymous-default-export */
const apiUrl = "https://adidas-back-end.herokuapp.com/api";

export default {
    confirm_order(payload) {
        return fetch(`${apiUrl}/orders`, {
            method: "POST",
            headers: {
                "Content-Type":"Application/json"
            },
            body: JSON.stringify({data: payload })
        })
        .then(
            (res) => res.json(),
        )
    }
}
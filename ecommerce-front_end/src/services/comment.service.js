const apiUrl = "https://adidas-back-end.herokuapp.com/api";

export default {
    setComment(payload) {
        return fetch(`${apiUrl}/comments`, {
            method: "POST",
            mode: 'cors',
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
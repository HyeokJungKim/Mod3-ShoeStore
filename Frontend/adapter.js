const adapter = {
    index: () => fetch("http://localhost:3000/shoes").then(res => res.json()),
    show: (id) => fetch(`http://localhost:3000/shoes/${id}`).then(res => res.json()),
    postReview: (id, content) => {
        return fetch(`http://localhost:3000/shoes/${id}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            content: content
        })
    })
    .then(res => res.json())
    }
}

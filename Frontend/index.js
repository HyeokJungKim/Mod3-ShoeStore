// Code your solution here

document.addEventListener("DOMContentLoaded", () => {
    // Adapter is in the other file
    adapter.index().then(initializePage)

    const mainShoe = document.getElementById("main-shoe")
    
    // initialize
    function initializePage(response){
        response.forEach(addShoeToList)
        addShoeToShow(response[0].id)
    }
    
    // Renders
    function addShoeToList(shoe){
        shoeList = document.getElementById("shoe-list")
        li = document.createElement("LI")
        li.classList.add("list-group-item")
        li.innerText = shoe.name
        li.addEventListener("click", () => addShoeToShow(shoe.id))
        document.getElementById("shoe-list").append(li)
    }
    
    function addShoeToShow(id){    
        adapter.show(id).then(shoe => {
        mainShoe.innerHTML = 
        `<img class="card-img-top" id="shoe-image" src=${shoe.image}>
        <div class="card-body">
            <h4 class="card-title" id="shoe-name">${shoe.name}</h4>
            <p class="card-text" id="shoe-description">${shoe.description}</p>
            <p class="card-text"><small class="text-muted" id="shoe-price">${shoe.price}</small></p>
            <div class="container" id="form-container">
                <form id="new-review" data-id=${shoe.id}>
                    <div class="form-group">
                    <textarea class="form-control" id="review-content" rows="3"></textarea>
                    <input type="submit" class="btn btn-primary"></input>
                    </div>
                </form>
            </div>
        </div>
        <h5 class="card-header">Reviews</h5>
        <ul class="list-group list-group-flush" id="reviews-list">
        </ul>
        `
        shoe.reviews.forEach(slapReviewOnDom)
        })
    }

    mainShoe.addEventListener("submit", (e) => {
        e.preventDefault()
        const id = e.target.dataset.id
        const content = e.target["review-content"].value
        adapter.postReview(id, content).then(slapReviewOnDom)
    })

    function slapReviewOnDom(res){
        list = document.getElementById("reviews-list")
        li = document.createElement("LI")
        li.classList.add("list-group-item")
        li.innerText = res.content
        list.append(li)
    }

})

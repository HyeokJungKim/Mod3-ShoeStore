// Code your solution here

document.addEventListener("DOMContentLoaded", () => {
    // Adapter is in the other file
    adapter.index().then(initializePageFromInitialFetch)
    
    let shoes = []
    const mainShoe = document.getElementById("main-shoe")
    
    // initialize
    function initializePageFromInitialFetch(response){
        shoes = response
        shoes.forEach(addShoeToList)
        addShoeToShow(shoes[0].id)
    }

    // Help
    const findShoeById = (id) => shoes.find(shoe => shoe.id === id)
    
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
        const shoe = findShoeById(id) 
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
    }

    mainShoe.addEventListener("submit", (e) => {
        e.preventDefault()
        const id = e.target.dataset.id
        const content = e.target["review-content"].value
        addReview(id, content)
    })

    function slapReviewOnDom(res){
        list = document.getElementById("reviews-list")
        li = document.createElement("LI")
        li.classList.add("list-group-item")
        li.innerText = res.content
        list.append(li)
    }
    
    // Submit review code
    function addReview(id, content){
        adapter.postReview(id, content).then(updateCodeWithNewReview)
    }

    function updateCodeWithNewReview(res){
        slapReviewOnDom(res)
        findShoeById(res.id).reviews.push(res)
    }  
})

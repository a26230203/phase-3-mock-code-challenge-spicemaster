// write your code here
let spiceImg = document.querySelector('#spice-images')
let detialimg = document.querySelector('.detail-image')
let ingredients = document.querySelector('.ingredients-list')
let updateFrom = document.querySelector('#update-form')
let addIngredient = document.querySelector('#ingredient-form')
console.log(addIngredient)

let title = document.querySelector('.title')

fetch("http://localhost:3000/spiceblends")
.then(res => res.json())
.then(spiceArr => {
    detialimg.src = spiceArr[0].image
    spiceArr.forEach(spice => {
        newLsit(spice)
    })
})

function newLsit(spiceData) {
    let newImg = document.createElement('img')
    newImg.className = "newImg"
    newImg.src = spiceData.image
    spiceImg.append(newImg)

    newImg.addEventListener('click', (event) => {
        title.innerHTML = spiceData.title
        detialimg.src = newImg.src   
    })
}

fetch('http://localhost:3000/ingredients') 
.then(res => res.json())
.then(ingredientsArr => {
    ingredientsArr.forEach(ingredient => {
        ingredientsList(ingredient)
    })
})

function ingredientsList(ingredient) {
    let newList = document.createElement('li')
    newList.className = "ingredients-list"
    newList.innerText = ingredient.name
    ingredients.append(newList)
}

updateFrom.addEventListener('submit', (e) => {
    e.preventDefault()
    let newTitle =  e.target.title.value

    fetch(`http://localhost:3000/spiceblends`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: newTitle
        })
    })
    .then(res => res.json())
    .then(updateTile => {
        title.innerHTML = updateTile.title
    })
})


addIngredient.addEventListener('submit', (e) => {
    e.preventDefault()
    let newingredient = e.target.name.value
    fetch(`http://localhost:3000/ingredients`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: newingredient
        })
    })
    .then(res => res.json())
    .then(updateingredient => {
        ingredientsList(updateingredient)
    })
})

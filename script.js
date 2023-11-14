// DOM ELEMENTS 
let new_book_form = document.getElementById("new-book-form");
let books_container_ele = document.getElementById("book-section");
console.log(books_container_ele);


//GLOBAL VARIABLES
const Library = [{title:"Things Fall Apart", author:"James", pages:4, status:"Read"}];


// BOOK CONSTRUCTOR
function Book(title, author, pages, status ){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}


//EVENT LISTENERS
new_book_form.addEventListener("submit", (e)=>{
    e.preventDefault();
    getNewBookData();
    createBook();
});

window.addEventListener("load", ()=>{
    displayBooks(Library);
})


// extracts new book details from NEW BOOK form 
function getNewBookData(){
    // form fields
    let title_field_ele = new_book_form.elements[0];
    let author_field_ele = new_book_form.elements[1];
    let pages_field_ele = new_book_form.elements[2];
    let book_status_radio_btns = [new_book_form.elements[3], new_book_form.elements[4]];

    // data from form fields 
    let new_book_details = {
        title: title_field_ele.value,
        author: author_field_ele.value,
        pages: pages_field_ele.value,
        status: getCheckedElementValue(book_status_radio_btns)
    }

    return {book_data:new_book_details}; 
}


// extracts the text of the selected radio button 
function getCheckedElementValue(radio_buttons){
    let checked_ele_text = "";

    radio_buttons.forEach((ele)=>{
        
        if(ele.checked === true){
            console.log("ele", ele);
            checked_ele_text = ele.value;
        }
    });

    return checked_ele_text;
}


function createBook(){
    let {book_data} = getNewBookData();
    Library.push(new Book(book_data.title, book_data.author,book_data.pages, book_data.status));

    displayBooks(Library);
}


function displayBooks(books){

    while(books_container_ele.children.length !== 0){
        books_container_ele.firstChild.remove();
        console.log("remove first child")
    }
    console.log("tt", );

    let book_html_layout = `
        <div class="card shadow-sm " style="width: 18rem;">
            <div class="h-50">
                <img src="./assets/images/placeholder2.jpg" class="card-img-top h-100 w-100" alt="...">
            </div>
            <div class="card-body">
            <h5 class="card-title m-0">Book Title</h5>
            <p class="card-text m-0">Author's Name</p>
            <p class="card-text m-0">Number of pages</p>
            <button type="button" class="btn btn-success w-100 mt-4 mb-2">Read</button>
            <button type="button" class="btn btn-secondary w-100  mb-2">Remove</button>

            </div>
        </div>
    `

    books.forEach((book)=>{
        console.log(book);
        let book_card_template = `
            <div class="card shadow-sm " style="width: 18rem;">
                <div class="h-50">
                    <img src="./assets/images/placeholder2.jpg" class="card-img-top h-100 w-100" alt="...">
                </div>
                <div class="card-body">
                <h5 class="card-title m-0">${book.title}</h5>
                <p class="card-text m-0">${book.author}</p>
                <p class="card-text m-0">${book.pages} Pages</p>
                <button type="button" class="btn btn-success w-100 mt-4 mb-2">${book.status}</button>
                <button type="button" class="btn btn-secondary w-100  mb-2">Remove</button>

                </div>
            </div>
        `;

        books_container_ele.insertAdjacentHTML("beforeend", book_card_template);
    })
}
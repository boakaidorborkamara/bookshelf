// DOM ELEMENTS///////////////////////////////////////////////////
let new_book_form = document.getElementById("new-book-form");
let books_container_ele = document.getElementById("book-section");


// BOOK CONSTRUCTORS///////////////////////////////////////////////////

// Create book constructor 
function Book(title, author, pages, status ){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}


// Library Constructor 
function Library(){

    // db arrary
    this.library = [{title:"Resisting Happiness: A True Story about Why We Sabotage Ourselves", author:"James", pages:4, status:"Read"}, {title:"This is a test book", author:"James", pages:4, status:"Read"}];


    // extracts new book details from form  element
    this.getNewBookData = (book_form)=>{
        // form fields
        title_field_ele = book_form.elements[0];
        author_field_ele = book_form.elements[1];
        pages_field_ele = book_form.elements[2];
        book_status_radio_btns = [book_form.elements[3], book_form.elements[4]];
    
        // data from form fields 
        let new_book_details = {
            title: title_field_ele.value,
            author: author_field_ele.value,
            pages: pages_field_ele.value,
            status: this.getCheckedElementValue(book_status_radio_btns)
        }

        return new_book_details; 
    };


    // add new book details to the database array 
    this.addBook = (book_details)=>{
        this.library.push(new Book(book_details.title, book_details.author,book_details.pages, book_details.status));
    }


    // displays available books in library database array to the DOM 
    this.displayBooks = ()=>{
        this.clearCards();

        this.library.forEach((book)=>{
            let book_card_template = `
                <div class="card shadow-sm " style="width: 18rem;">
                    <div >
                        <img src="./assets/images/cover.jpg" class="card-img-top h-100 w-100" alt="...">
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


     // extracts the text of the selected radio button 
     this.getCheckedElementValue = (radio_buttons)=>{
        let checked_ele_text = "";

        radio_buttons.forEach((ele)=>{
            
            if(ele.checked === true){
                console.log("ele", ele);
                checked_ele_text = ele.value;
            }
        });

        return checked_ele_text;
    }


    // remove book cards that were displayed previously from the DOM 
    this.clearCards = ()=>{
        while(books_container_ele.children.length !== 0){
           books_container_ele.firstChild.remove();
       }
    }

}


//create object from Library constructor
let bookShelf = new Library();



//EVENT LISTENERS///////////////////////////////////////////////////
window.addEventListener("load", ()=>{
    bookShelf.displayBooks();
});


new_book_form.addEventListener("submit", (e)=>{
    e.preventDefault();
    let book_details = bookShelf.getNewBookData(new_book_form);
    bookShelf.addBook(book_details);
    bookShelf.displayBooks();
});


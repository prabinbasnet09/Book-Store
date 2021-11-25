function Book(title, author, isbn, price){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.price = price;
}

function UI(){}

//add book to list
UI.prototype.addBookToList = function(book){
    //create a new row for the list
    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td>${book.price}</td>
    <td><a href = "#" class = "delete">X<a></td>
    `;

    //add the row element as a child 
    document.getElementById('book-list').appendChild(row);

}

UI.prototype.showMessage = function(msg, errorClass){
    
    //Create div element
    const errorDiv = document.createElement('div');
    //Add class name
    errorDiv.className = `alert ${errorClass}`;
    //Add error text
    errorDiv.appendChild(document.createTextNode(msg));

    const container = document.querySelector('.container');
    
    const form = document.querySelector('#book-form');

    //add div before form
    container.insertBefore(errorDiv, form)
   
    // setTimeout
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
    
}

UI.prototype.clearFields = function(){
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('isbn').value = "";
    document.getElementById('price').value = "";
}


//delete book from the list
UI.prototype.deleteBook = function(target, ui){
    
    if(target.className === 'delete') //this if condition acts as a event delegation
    {
        target.parentElement.parentElement.remove();
        ui.showMessage('Book removed.', 'success');
    }
}
//event listeners for adding a book
document.getElementById('book-form').addEventListener('submit', function(e){
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value,
        price = document.getElementById('price').value;

    //defining a book object
    const book = new Book(title, author, isbn, price);

    //defining a ui
    const ui = new UI();

    if(title === '' || author === '' || isbn === '' || price === 0)
    {
        ui.showMessage('Please fill up all the fields correctly.', 'error');
    }
    else{
        ui.addBookToList(book);
        ui.showMessage('Book Added for sale!', 'success');
        ui.clearFields(title,author,isbn,price);
    }
    e.preventDefault();
});

//event listeners for deleting a book
document.getElementById('book-list').addEventListener('click', function(e){
    const ui = new UI();

    ui.deleteBook(e.target, ui);
    e.preventDefault();
})

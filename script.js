// ==========================================
// LIBRARY MANAGEMENT SYSTEM
// ==========================================


// ==========================================
// GET SAVED BOOKS
// ==========================================

// Get books from Local Storage
// If there are no books, use an empty array

let books = JSON.parse(
    localStorage.getItem("libraryBooks")
) || [];


// ==========================================
// SAVE BOOKS
// ==========================================

function saveBooks() {

    localStorage.setItem(
        "libraryBooks",
        JSON.stringify(books)
    );

}


// ==========================================
// CHANGE SECTION
// ==========================================

function showSection(sectionId, button) {

    // Get all sections
    let sections =
        document.querySelectorAll(".content-section");


    // Hide all sections
    sections.forEach(function(section) {

        section.classList.remove("active-section");

    });


    // Get selected section
    let selectedSection =
        document.getElementById(sectionId);


    // Show selected section
    if (selectedSection) {

        selectedSection.classList.add("active-section");

    }


    // Get all navigation buttons
    let buttons =
        document.querySelectorAll(".nav-button");


    // Remove active from all buttons
    buttons.forEach(function(btn) {

        btn.classList.remove("active");

    });


    // Add active to clicked button
    if (button) {

        button.classList.add("active");

    }


    // Refresh required sections

    if (sectionId === "booksSection") {

        displayBooks();

    }


    if (sectionId === "searchSection") {

        displaySearchBooks();

    }


    if (sectionId === "availableSection") {

        showAvailableBooks();

    }


    // Update dashboard
    updateDashboard();

}


// ==========================================
// ADD NEW BOOK
// ==========================================

document
    .getElementById("bookForm")
    .addEventListener("submit", function(event) {

        // Stop page from refreshing
        event.preventDefault();


        // Get book title
        let title =
            document
                .getElementById("bookTitle")
                .value
                .trim();


        // Get quantity
        let quantity =
            Number(
                document
                    .getElementById("bookQuantity")
                    .value
            );


        // Check title
        if (title === "") {

            alert("Please enter the book title.");

            return;

        }


        // Check quantity
        if (quantity <= 0 || isNaN(quantity)) {

            alert("Please enter a valid quantity.");

            return;

        }


        // Check if book already exists
        let existingBook =
            books.find(function(book) {

                return book.title.toLowerCase()
                    === title.toLowerCase();

            });


        // If book already exists
        if (existingBook) {

            existingBook.quantity =
                existingBook.quantity + quantity;

            alert(
                "Book already exists. Quantity has been increased."
            );

        }

        // If book does not exist
        else {

            books.push({

                title: title,

                quantity: quantity

            });

            alert("Book added successfully!");

        }


        // Save books
        saveBooks();


        // Clear form
        document
            .getElementById("bookForm")
            .reset();


        // Update everything
        displayBooks();

        showAvailableBooks();

        updateDashboard();

    });


// ==========================================
// DISPLAY ALL BOOKS
// ==========================================

function displayBooks(bookList = books) {

    let tableBody =
        document.getElementById("bookTableBody");


    // Clear table
    tableBody.innerHTML = "";


    // If no books
    if (bookList.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td colspan="3" class="no-books">

                    No books available.

                </td>

            </tr>

        `;

        return;

    }


    // Display each book
    bookList.forEach(function(book) {

        // Find original index
        let index =
            books.indexOf(book);


        let row = `

            <tr>

                <td>
                    ${book.title}
                </td>

                <td>
                    ${book.quantity}
                </td>

                <td>

                    <button
                        class="update-button"
                        onclick="updateBook(${index})">

                        Update

                    </button>


                    <button
                        class="delete-button"
                        onclick="deleteBook(${index})">

                        Delete

                    </button>

                </td>

            </tr>

        `;


        tableBody.innerHTML += row;

    });

}


// ==========================================
// SEARCH BOOKS
// ==========================================

function searchBooks() {

    // Get search text
    let searchText =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    // Find matching books
    let filteredBooks =
        books.filter(function(book) {

            return book.title
                .toLowerCase()
                .includes(searchText);

        });


    // Display results
    displaySearchBooks(filteredBooks);

}


// ==========================================
// DISPLAY SEARCH RESULTS
// ==========================================

function displaySearchBooks(bookList = books) {

    let tableBody =
        document.getElementById("searchTableBody");


    // Clear table
    tableBody.innerHTML = "";


    // If no books
    if (bookList.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td colspan="2" class="no-books">

                    No books found.

                </td>

            </tr>

        `;

        return;

    }


    // Display books
    bookList.forEach(function(book) {

        let row = `

            <tr>

                <td>
                    ${book.title}
                </td>

                <td>
                    ${book.quantity}
                </td>

            </tr>

        `;


        tableBody.innerHTML += row;

    });

}


// ==========================================
// SHOW AVAILABLE BOOKS
// ==========================================

function showAvailableBooks() {

    let tableBody =
        document.getElementById("availableTableBody");


    // Clear table
    tableBody.innerHTML = "";


    // If there are no books
    if (books.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td colspan="2" class="no-books">

                    No books available.

                </td>

            </tr>

        `;

        return;

    }


    // Display all books
    books.forEach(function(book) {

        let row = `

            <tr>

                <td>
                    ${book.title}
                </td>

                <td class="available">
                    ${book.quantity}
                </td>

            </tr>

        `;


        tableBody.innerHTML += row;

    });

}


// ==========================================
// UPDATE BOOK
// ==========================================

function updateBook(index) {

    // Get selected book
    let book = books[index];


    // Check if book exists
    if (!book) {

        alert("Book not found.");

        return;

    }


    // Ask for new title
    let newTitle =
        prompt(
            "Enter the new book title:",
            book.title
        );


    // If Cancel is clicked
    if (newTitle === null) {

        return;

    }


    // Remove extra spaces
    newTitle = newTitle.trim();


    // Check title
    if (newTitle === "") {

        alert("Book title cannot be empty.");

        return;

    }


    // Ask for new quantity
    let newQuantity =
        prompt(
            "Enter the new quantity:",
            book.quantity
        );


    // If Cancel is clicked
    if (newQuantity === null) {

        return;

    }


    // Convert quantity to number
    newQuantity = Number(newQuantity);


    // Check quantity
    if (
        newQuantity <= 0 ||
        isNaN(newQuantity)
    ) {

        alert("Please enter a valid quantity.");

        return;

    }


    // Update book
    book.title = newTitle;

    book.quantity = newQuantity;


    // Save changes
    saveBooks();


    // Refresh tables
    displayBooks();

    showAvailableBooks();

    displaySearchBooks();

    updateDashboard();


    alert("Book updated successfully!");

}


// ==========================================
// DELETE BOOK
// ==========================================

function deleteBook(index) {

    // Get selected book
    let book = books[index];


    // Check if book exists
    if (!book) {

        alert("Book not found.");

        return;

    }


    // Ask confirmation
    let confirmation =
        confirm(
            `Are you sure you want to delete "${book.title}"?`
        );


    // Delete if confirmed
    if (confirmation) {

        books.splice(index, 1);


        // Save changes
        saveBooks();


        // Refresh everything
        displayBooks();

        showAvailableBooks();

        displaySearchBooks();

        updateDashboard();


        alert("Book deleted successfully!");

    }

}


// ==========================================
// UPDATE DASHBOARD
// ==========================================

function updateDashboard() {

    // Total number of book titles
    let totalTitles =
        books.length;


    // Calculate total quantity
    let totalBooks = 0;


    books.forEach(function(book) {

        totalBooks =
            totalBooks + book.quantity;

    });


    // Update dashboard
    document
        .getElementById("totalTitles")
        .textContent = totalTitles;


    document
        .getElementById("totalBooks")
        .textContent = totalBooks;


    // Available books
    document
        .getElementById("availableBooksCount")
        .textContent = totalBooks;

}


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        // Show books
        displayBooks();

        // Show search data
        displaySearchBooks();

        // Show available books
        showAvailableBooks();

        // Update dashboard
        updateDashboard();

    }
);
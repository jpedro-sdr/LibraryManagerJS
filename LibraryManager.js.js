class Book {
    constructor(title, description, author) {
        this.id = this.generateId();
        this.title = title;
        this.description = description;
        this.author = author;
    }

    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(bookInfo) {
        const book = new Book(bookInfo.title, bookInfo.description, bookInfo.author);
        this.books.push(book);
        return book;
    }

    getBooks() {
        return this.books;
    }

    removeBookById(id) {
        this.books = this.books.filter(book => book.id !== id);
    }

    getBookById(id) {
        return this.books.find(book => book.id === id);
    }

    updateBookById(id, info) {
        const book = this.getBookById(id);
        if (book) {
            if (info.title) book.title = info.title;
            if (info.description) book.description = info.description;
            if (info.author) book.author = info.author;
        }
        return book;
    }
}

// Exemplo de uso:
const myLibrary = new Library();

// Adicionando um livro
const newBook = myLibrary.addBook({ title: "Livro Exemplo", description: "Descrição do livro exemplo", author: "Autor Exemplo" });
console.log("Livro adicionado:", newBook);

// Listando todos os livros
console.log("Todos os livros:", myLibrary.getBooks());

// Obtendo um livro pelo ID
const book = myLibrary.getBookById(newBook.id);
console.log("Livro obtido pelo ID:", book);

// Atualizando um livro pelo ID
const updatedBook = myLibrary.updateBookById(newBook.id, { title: "Novo Título" });
console.log("Livro atualizado:", updatedBook);

// Removendo um livro pelo ID
myLibrary.removeBookById(newBook.id);
console.log("Todos os livros após remoção:", myLibrary.getBooks());

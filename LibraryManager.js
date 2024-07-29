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

// Função para criar e gerenciar a biblioteca
function manageLibrary() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const myLibrary = new Library();

    function displayMenu() {
        console.log(`
            Biblioteca - Menu de Opções:
            1. Adicionar Livro
            2. Listar Todos os Livros
            3. Remover Livro por ID
            4. Mostrar Livro por ID
            5. Editar Livro por ID
            6. Sair
        `);
    }

    function addBook() {
        readline.question('Título do livro: ', title => {
            readline.question('Descrição do livro: ', description => {
                readline.question('Autor do livro: ', author => {
                    const newBook = myLibrary.addBook({ title, description, author });
                    console.log('Livro adicionado:', newBook);
                    displayMenu();
                    manageMenu();
                });
            });
        });
    }

    function listBooks() {
        const books = myLibrary.getBooks();
        console.log('Todos os livros:');
        books.forEach(book => {
            console.log(`ID: ${book.id}, Título: ${book.title}, Autor: ${book.author}`);
        });
        displayMenu();
        manageMenu();
    }

    function removeBook() {
        readline.question('ID do livro a ser removido: ', id => {
            myLibrary.removeBookById(id);
            console.log(`Livro com ID ${id} removido.`);
            displayMenu();
            manageMenu();
        });
    }

    function showBook() {
        readline.question('ID do livro a ser mostrado: ', id => {
            const book = myLibrary.getBookById(id);
            if (book) {
                console.log('Livro encontrado:');
                console.log(`ID: ${book.id}, Título: ${book.title}, Autor: ${book.author}, Descrição: ${book.description}`);
            } else {
                console.log(`Livro com ID ${id} não encontrado.`);
            }
            displayMenu();
            manageMenu();
        });
    }

    function editBook() {
        readline.question('ID do livro a ser editado: ', id => {
            readline.question('Novo título (deixe em branco para manter o mesmo): ', title => {
                readline.question('Nova descrição (deixe em branco para manter a mesma): ', description => {
                    readline.question('Novo autor (deixe em branco para manter o mesmo): ', author => {
                        const updatedBook = myLibrary.updateBookById(id, { title, description, author });
                        if (updatedBook) {
                            console.log('Livro atualizado:');
                            console.log(`ID: ${updatedBook.id}, Título: ${updatedBook.title}, Autor: ${updatedBook.author}, Descrição: ${updatedBook.description}`);
                        } else {
                            console.log(`Livro com ID ${id} não encontrado.`);
                        }
                        displayMenu();
                        manageMenu();
                    });
                });
            });
        });
    }

    function manageMenu() {
        readline.question('Escolha uma opção: ', option => {
            switch (option) {
                case '1':
                    addBook();
                    break;
                case '2':
                    listBooks();
                    break;
                case '3':
                    removeBook();
                    break;
                case '4':
                    showBook();
                    break;
                case '5':
                    editBook();
                    break;
                case '6':
                    console.log('Encerrando o programa.');
                    readline.close();
                    break;
                default:
                    console.log('Opção inválida. Escolha um número de 1 a 6.');
                    displayMenu();
                    manageMenu();
                    break;
            }
        });
    }

    displayMenu();
    manageMenu();
}

manageLibrary();

async function fetchBooks() {
    try {
        console.log('Iniciando solicitud de libros...');
        const response = await fetch('/books');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const books = await response.json();
        console.log('Datos recibidos:', books);
        const resultDiv = document.getElementById('result');
        if (books.length > 0) {
            let table = `
                <table>
                    <tr>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Fecha de Publicación</th>
                    </tr>
            `;
            books.forEach(book => {
                table += `
                    <tr>
                        <td>${book.titulo}</td>
                        <td>${book.autor}</td>
                        <td>${book.fecha_publicacion}</td>
                    </tr>
                `;
            });
            table += '</table>';
            resultDiv.innerHTML = table;
        } else {
            resultDiv.innerHTML = '<p>No se encontraron libros.</p>';
        }
    } catch (err) {
        console.error('Error en fetchBooks:', err);
        document.getElementById('result').innerHTML = '<p>Error al consultar los libros: ' + err.message + '</p>';
    }
}
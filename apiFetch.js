// Función para mostrar usuarios
async function fetchUsers(page = 1) {
    const usersContainer = document.getElementById('users'); //id del html
    const placeholder = document.getElementById('placeholder');
    const mainTitle = document.getElementById('main-title');
    const pagination = document.querySelector('.pagination');

    // Muestra el gif que agregue como login
    usersContainer.innerHTML = '';
    placeholder.innerHTML = `
        <div class="text-center">
            <img src="https://cdn.dribbble.com/users/1319489/screenshots/2946353/media/13bafcaa8ad789d5bd0da9fc8da0ab25.gif" alt="Cargando..." style="width: 300px; height: 300px;" />
            <p style="font-size: 1.2em; margin-top: 10px;">Cargando...</p>
        </div>
    `;

    // Espera de un segundo de los placholders
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Muestra nuestras imagenes de los usuarios
    placeholder.innerHTML = generatePlaceholder();

    // realixo la solicitud a la API y esperamos tres segundos
    const response = await fetch(`https://reqres.in/api/users?delay=3&page=${page}`);
    const data = await response.json();

    // Despues de cargar los datos  limpiamos el placeholder.
    placeholder.innerHTML = '';

    // Uso boostrap para las cards de mis usuarios
    data.data.forEach(user => {
        usersContainer.innerHTML += `
            <div class="col-md-4 mb-3">
                <div class="card h-100">
                    <img src="${user.avatar}" class="card-img-top" alt="Avatar de ${user.first_name}">
                    <div class="card-body">
                        <h5 class="card-title">${user.first_name} ${user.last_name}</h5>
                        <p class="card-text">${user.email}</p>
                        <a href="#" class="btn btn-primary">Ver perfil</a>
                    </div>
                </div>
            </div>
        `;
    });

    // Muestra el ti´tulo de usuarios que coloque
    mainTitle.style.display = 'block';
    pagination.innerHTML = ''; 

    // Genero los botones solicitados
    for (let i = 1; i <= data.total_pages; i++) {
        pagination.innerHTML += `
            <li class="page-item ${i === page ? 'active' : ''}">
                <a class="page-link" href="#" onclick="fetchUsers(${i})">${i}</a>
            </li>
        `;
    }
}

// Función para generar el placeholder
function generatePlaceholder() {
    let placeholderHTML = '<div class="row">';
    for (let i = 0; i < 6; i++) {
        placeholderHTML += `
            <div class="col-md-4 mb-3">
                <div class="card h-100">
                    <div class="bg-secondary" style="height: 150px;"></div>
                    <div class="card-body">
                        <h5 class="card-title bg-secondary text-secondary" style="height: 20px;"></h5>
                        <p class="card-text bg-secondary text-secondary" style="height: 15px; margin-top: 5px;"></p>
                        <p class="card-text bg-secondary text-secondary" style="height: 15px; margin-top: 5px;"></p>
                    </div>
                </div>
            </div>
        `;
    }
    placeholderHTML += '</div>';
    return placeholderHTML;
}

// Cargar la primera página al iniciar
fetchUsers();

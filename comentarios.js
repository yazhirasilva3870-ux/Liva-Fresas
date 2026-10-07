// Cargar opiniones guardadas en LocalStorage
const URL_BASE_DATOS = "PEGA_AQUI_TU_URL_DE_GOOGLE";

function cargarOpiniones() {
    let contenedor = document.getElementById("contenedor-opiniones");
    
    contenedor.innerHTML = `
        <div class="tarjeta-vacia">
            <p>Cargando opiniones... 🍓</p>
        </div>
    `;

    fetch(URL_BASE_DATOS)
        .then(response => response.json())
        .then(respuestas => {
            contenedor.innerHTML = "";

            if (respuestas.length === 0) {
                contenedor.innerHTML = `
                    <div class="tarjeta-vacia">
                        <p id="texto-sin-opiniones">Aún no hay opiniones registradas. ¡Sé la primera persona en enviar una! 🍓</p>
                    </div>
                `;
                return;
            }

            function convertirEstrellas(valor) {
                let num = parseInt(valor) || 0;
                let estrellas = "";
                for (let i = 1; i <= 5; i++) {
                    estrellas += (i <= num) ? "★" : "☆";
                }
                return estrellas;
            }

            // Mostrar primero los más recientes
            respuestas.reverse().forEach(function(r) {
                let tarjeta = document.createElement("div");
                tarjeta.className = "tarjeta-opinion";

                tarjeta.innerHTML = `
                    <div class="header-tarjeta">
                        <span class="nombre-cliente">👤 ${r.nombre}</span>
                        <span class="fecha-visita">📅 Fecha de visita: ${r.fechaVisita}</span>
                    </div>

                    <div class="detalles-calificacion">
                        <p><strong>Comida:</strong> <span class="estrellas-doradas">${convertirEstrellas(r.comida)}</span></p>
                        <p><strong>Local:</strong> <span class="estrellas-doradas">${convertirEstrellas(r.local)}</span></p>
                        <p><strong>Atención:</strong> <span class="estrellas-doradas">${convertirEstrellas(r.atencion)}</span></p>
                        <p><strong>General:</strong> <span class="estrellas-doradas">${convertirEstrellas(r.general)}</span></p>
                        <p><strong>Recomendación:</strong> <span class="porcentaje-badge">${r.nps}</span></p>
                    </div>

                    <div class="comentario-cliente">
                        <p>"${r.comentario}"</p>
                    </div>

                    <div class="footer-tarjeta">
                        <span>Registrado el ${r.fechaRegistro}</span>
                    </div>
                `;

                contenedor.appendChild(tarjeta);
            });
        })
        .catch(error => {
            contenedor.innerHTML = `<div class="tarjeta-vacia"><p>No se pudieron cargar las opiniones en este momento.</p></div>`;
            console.error("Error al cargar opiniones:", error);
        });
}

cargarOpiniones();

    // Convertir números a estrellas (ejemplo: 4 -> "★★★★☆")
    function convertirEstrellas(valor) {
        let num = parseInt(valor) || 0;
        let estrellas = "";
        for (let i = 1; i <= 5; i++) {
            estrellas += (i <= num) ? "★" : "☆";
        }
        return estrellas;
    }

    // Mostrar las opiniones más recientes primero
    respuestas.slice().reverse().forEach(function(r) {
        let tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta-opinion";

        tarjeta.innerHTML = `
            <div class="header-tarjeta">
                <span class="nombre-cliente">👤 ${r.nombre}</span>
                <span class="fecha-visita">📅 Fecha de visita: ${r.fechaVisita}</span>
            </div>

            <div class="detalles-calificacion">
                <p><strong>Comida:</strong> <span class="estrellas-doradas">${convertirEstrellas(r.comida)}</span></p>
                <p><strong>Local:</strong> <span class="estrellas-doradas">${convertirEstrellas(r.local)}</span></p>
                <p><strong>Atención:</strong> <span class="estrellas-doradas">${convertirEstrellas(r.atencion)}</span></p>
                <p><strong>General:</strong> <span class="estrellas-doradas">${convertirEstrellas(r.general)}</span></p>
                <p><strong>Recomendación:</strong> <span class="porcentaje-badge">${r.nps}</span></p>
            </div>

            <div class="comentario-cliente">
                <p>"${r.comentario}"</p>
            </div>

            <div class="footer-tarjeta">
                <span>Registrado el ${r.fechaRegistro}</span>
            </div>
        `;

        contenedor.appendChild(tarjeta);
    });


// Ejecutar la función al abrir la página
cargarOpiniones();


// CAMBIO DE IDIOMA EN LA PÁGINA DE OPINIONES
let botonEspanol = document.getElementById("espanol");
let botonIngles = document.getElementById("ingles");

if (botonEspanol && botonIngles) {
    botonEspanol.onclick = function() {
        document.getElementById("titulo-opiniones-pagina").textContent = "Opiniones de nuestros clientes ";
        document.getElementById("subtitulo-opiniones-pagina").textContent = "Aquí puedes ver lo que las personas opinan sobre su experiencia en Liva Fresas.";
        document.getElementById("btn-comentarios").textContent = " Volver a la encuesta";
        let sinOpiniones = document.getElementById("texto-sin-opiniones");
        if (sinOpiniones) {
            sinOpiniones.textContent = "Aún no hay opiniones registradas. ¡Sé la primera persona en enviar una! ";
        }
    };

    botonIngles.onclick = function() {
        document.getElementById("titulo-opiniones-pagina").textContent = "Customer Feedback ";
        document.getElementById("subtitulo-opiniones-pagina").textContent = "Here you can see what people think about their experience at Liva Fresas.";
        document.getElementById("btn-comentarios").textContent = " Back to survey";
        let sinOpiniones = document.getElementById("texto-sin-opiniones");
        if (sinOpiniones) {
            sinOpiniones.textContent = "No opinions registered yet. Be the first one to leave feedback! ";
        }
    };
}
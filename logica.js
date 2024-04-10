const pokeURL = 'https://pokeapi.co/api/v2/pokemon/';

const imagen = document.getElementById('imagen');
const nombre = document.getElementById('nombre');
const tipo = document.getElementById('tipo');
const habilidad = document.getElementById('habilidad');
const peso = document.getElementById('peso');
const altura = document.getElementById('altura');

const searchButton = document.getElementById('buscar');

searchButton.addEventListener('click', () => {
  const nombreInput = document.getElementById('nombrePokemon').value;
  const url = `${pokeURL}${nombreInput.toLowerCase()}`; //Literal de plantilla para una construcción de cadenas más limpia

  fetch(url)
    .then(response => response.json())
    .then(datos => {
      if (!datos) {
        // manejo de datos faltantes
        console.error("Error: Faltan datos.");
        imagen.src = ""; 
        nombre.textContent = "Pokemon no encontrado.";
        tipo.textContent = "";
        habilidad.textContent = "";
        peso.textContent = "";
        altura.textContent = "";
        return; 
      }

      imagen.src = datos.sprites.front_default;
      nombre.textContent = datos.name;
      tipo.textContent = datos.types[0].type.name; 
      habilidad.textContent = datos.abilities[0].ability.name; // asuminedo la habilidad primaria
      peso.textContent = `${datos.weight} kg`; // agregamos unidad
      altura.textContent = `${datos.height} cm`; 
    })
    .catch(error => {
      console.error("Error:", error); //manejo de errores
      imagen.src = ""; 
      nombre.textContent = "Error al obtener datos.";
      tipo.textContent = "";
      habilidad.textContent = "";
      peso.textContent = "";
      altura.textContent = "";
    });
});

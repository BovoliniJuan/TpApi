function crearTarjeta(personaje) {
  var card = document.createElement("div");
  card.className = "card";
  card.innerHTML =
    "<h3>" + personaje.name + "</h3>" +
    "<img src='" + personaje.image + "' alt='" + personaje.name + "' width='100%' />" +
    "<p><strong>Status:</strong> " + personaje.status + "</p>" +
    "<p><strong>Species:</strong> " + personaje.species + "</p>" +
    "<p><strong>Gender:</strong> " + personaje.gender + "</p>";
  return card;
}

function mostrarPersonajes(lista) {
  var contenedor = document.getElementById("resultado");
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron personajes.</p>";
    return;
  }

  for (var i = 0; i < lista.length; i++) {
    contenedor.appendChild(crearTarjeta(lista[i]));
  }
}

function mostrarError(mensaje) {
  var contenedor = document.getElementById("resultado");
  contenedor.innerHTML = "<p style='color:red;'>" + mensaje + "</p>";
}

function obtenerPersonajes(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var respuesta = JSON.parse(xhr.responseText);
        mostrarPersonajes(respuesta.results);
      } else {
        mostrarError("Ocurrió un error al obtener los personajes.");
      }
    }
  };
  xhr.send();
}

function construirURLConFiltros() {
  var baseUrl = "https://rickandmortyapi.com/api/character/?";
  var filtros = [];

  var campos = ["name", "status", "species", "type", "gender"];
  for (var i = 0; i < campos.length; i++) {
    var valor = document.getElementById(campos[i]).value.trim();
    if (valor !== "") {
      filtros.push(campos[i] + "=" + encodeURIComponent(valor));
    }
  }

  return baseUrl + filtros.join("&");
}

document.getElementById("btnTodos").onclick = function () {
  obtenerPersonajes("https://rickandmortyapi.com/api/character");
};

document.getElementById("btnFiltrar").onclick = function () {
  var url = construirURLConFiltros();
  obtenerPersonajes(url);
};

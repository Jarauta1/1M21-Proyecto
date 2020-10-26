let playerId = localStorage.getItem("jugadorSeleccionado")
let arrayCompleto = JSON.parse(localStorage.getItem("arrayJugadoresFavoritos"))

let objetBusqueda

for (let i = 0; i < arrayCompleto.length; i++) {
  if (playerId == arrayCompleto[i].PlayerId) {
    objetBusqueda = arrayCompleto[i]
  }
}



let posicion

if (objetBusqueda.Position == "A") {
  posicion = "Delantero"
}
else if (objetBusqueda.Position == "M") {
  posicion = "Medio"
}
else if (objetBusqueda.Position == "D") {
  posicion = "Defensa"
}
else if (objetBusqueda.Position == "GK") {
  posicion = "Portero"
}

let dia = objetBusqueda.BirthDate.substring(8, 10)
let mes = objetBusqueda.BirthDate.substring(5, 7)
let anyo = objetBusqueda.BirthDate.substring(0, 4)

document.getElementById("mainContainer").innerHTML = `
<div class="content">
    <div class="header">
      <div class="logoHolder center">
        <img src="${objetBusqueda.PhotoUrl}" alt="" border="0" />
      </div>
      <h1 class="title"><strong>${objetBusqueda.ShortName}</strong></h1>
    </div>
    <div class="bio center">
      ${objetBusqueda.FirstName} ${objetBusqueda.LastName} es un futbolista profesional nacido en
      ${objetBusqueda.BirthCountry}.
    </div>
    <div class="position">
      <div class="common">
        <div>
          <div class="header">DORSAL NO.</div>
        </div>
        <div>
          <div class="header">POSICION</div>
        </div>
      </div>
      <div class="common down">
        <div>${objetBusqueda.Jersey}</div>
        <div>${posicion}</div>
      </div>
    </div>
    <div class="informacion">
      <div class="header center">
        INFORMACION
      </div>
      <div class="info">
        <div class="left">
          <div>Nombre</div>
          <div>Apellidos</div>
          <div>Fecha nacimiento</div>
          <div>Ciudad nacimiento</div>
          <div>Nacionalidad</div>
          <div>Altura</div>
          <div>Peso</div>
        </div>
        <div class="right">
          <div>${objetBusqueda.FirstName}</div>
          <div>${objetBusqueda.LastName}</div>
          <div>${dia} de ${mes} de ${anyo}</div>
          <div>${objetBusqueda.BirthCity}</div>
          <div>${objetBusqueda.Nationality}</div>
          <div>${objetBusqueda.Height} cm</div>
          <div>${objetBusqueda.Weight} kg</div>
        </div>
      </div>
      <div class="botonFav center">
        <a id="botonFav" class="botonQuitar" href="#" onclick="quitarFav()">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Quitar de mi equipo
        </a>
        <a class="volverFav" href="./league.html" onclick="">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Volver
        </a>
      </div>
    </div>
  </div>
`

function quitarFav() {
  let arrayCompletoFav = JSON.parse(localStorage.getItem("arrayJugadoresFavoritos"))
  for (let i = 0; i < arrayCompletoFav.length; i++) {
    if (arrayCompletoFav[i].PlayerId == objetBusqueda.PlayerId) {
      window.alert(`Has quitado de tu equipo a ${arrayCompletoFav[i].CommonName}`)
      arrayCompletoFav.splice(i, 1)
    }
  }
  localStorage.setItem("arrayJugadoresFavoritos", JSON.stringify(arrayCompletoFav))
  location.href = './league.html' //Página a la que nos lleva la función
}
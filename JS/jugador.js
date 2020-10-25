let objectBusqueda = JSON.parse(localStorage.getItem("jugadorSeleccionado"))
console.log(objectBusqueda)

let posicion

if (objectBusqueda.Position == "A") {
    posicion = "Delantero"
}
else if (objectBusqueda.Position == "M") {
    posicion = "Medio"
}
else if (objectBusqueda.Position == "D") {
    posicion = "Defensa"
}
else if (objectBusqueda.Position == "GK") {
    posicion = "Portero"
}

let dia = objectBusqueda.BirthDate.substring(8,10)
let mes = objectBusqueda.BirthDate.substring(5,7)
let anyo = objectBusqueda.BirthDate.substring(0,4)

document.getElementById("mainContainer").innerHTML = `
<div class="content">
          <div class="header">
            <div class="logoHolder center">
              <img src="${objectBusqueda.PhotoUrl}" alt="" border="0" />
            </div>
            <h1 class="title"><strong>${objectBusqueda.ShortName}</strong></h1>
          </div>
          <div class="bio center">
          ${objectBusqueda.FirstName} ${objectBusqueda.LastName} es un futbolista profesional nacido en ${objectBusqueda.BirthCountry}.
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
              <div>${objectBusqueda.Jersey}</div>
              <div>${posicion}</div>
            </div>
          </div>
          <div class="details">
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
                <div>${objectBusqueda.FirstName}</div>
                <div>${objectBusqueda.LastName}</div>
                <div>${dia} de ${mes} de ${anyo}</div>
                <div>${objectBusqueda.BirthCity}</div>
                <div>${objectBusqueda.Nationality}</div>
                <div>${objectBusqueda.Height} cm</div>
                <div>${objectBusqueda.Weight} kg</div>
              </div>
            </div>
          </div>
        </div>
        <div class="imgHolder center">
         <img src="" alt="" border="0" />
        </div>
        <div class="leftFooter">
          <div class="icons">
          <section class="buttons">
          <div class="container">
            <a href="" class="btn btn-1">
              <svg>
                <rect x="0" y="0" fill="none" width="100%" height="100%"/>
              </svg>
             Hover
            </a>   
          </div>
        </section>
          </div>
          <div class="adi center">
            <img src="" alt="" border="0" />
          </div>
        </div>
      </div>
`
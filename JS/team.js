/* Key API */
let keyAPI = `a4b5874dd1a64312a327ffc71e8ec755`

//Declarando variables
let teamId = localStorage.getItem("teamId")
let competitionId = localStorage.getItem("CompetitionId")
let roundId = localStorage.getItem("roundId")
let url = `https://api.sportsdata.io/v3/soccer/scores/json/CompetitionDetails/${competitionId}?key=${keyAPI}` //Obtener url's para adquirir la info
let urlEstadio = `https://api.sportsdata.io/v3/soccer/scores/json/Venues?key=${keyAPI}` //Obtener url's para adquirir la info
let urlEstadisticas = `https://api.sportsdata.io/v3/soccer/scores/json/TeamSeasonStats/${roundId}?key=${keyAPI}` //Obtener url's para adquirir la info

let mensajeFicha
let mensajePlantilla
let mensaje = ""
let mensajePortero = ""
let portero
let defensa
let medio
let delanero
let jugadorId = ""
let arrayIndices = []

/* Header de la página */
fetch(url).then(function (respuesta) {
    return respuesta.json();
}).then(function (datos) {
    if (datos.statusCode) {
        window.alert(datos.message)
    } else {
        for (let i = 0; i < datos.Teams.length; i++) {
            if (datos.Teams[i].TeamId == teamId) {

                /* let icon = `<link rel="icon" type="image/png" href="${datos.Teams[i].WikipediaLogoUrl}" onerror ="href="./Imagenes/escudo.png""/>`
                let name = `<title>${datos.Teams[i].Key}</title>`
                document.getElementById("head").innerHTML = icon + name */
                document.getElementById("escudoTeam").innerHTML = `<img id ="teamShield" src="${datos.Teams[i].WikipediaLogoUrl}" title="${datos.Teams[i].Name}" value="${datos.Teams[i].TeamId}" onerror ="this.onerror=null;this.src='./Imagenes/escudo.png'" width="" height ="">`
                document.getElementById("nombreTeam").innerHTML = `<div><h1>${datos.Teams[i].FullName}</h1></div><h3>${datos.Teams[i].AreaName}</h3><div></div>`
                let estadioId = datos.Teams[i].VenueId
                let paisClub = datos.Teams[i].AreaName
                let fundadoClub = datos.Teams[i].Founded
                let direccionClub = datos.Teams[i].Address
                let ciudadClub = datos.Teams[i].City
                let zipClub = datos.Teams[i].Zip
                let telefonoClub = datos.Teams[i].Phone
                let faxClub = datos.Teams[i].Fax
                let webClub = datos.Teams[i].Website
                let emailClub = datos.Teams[i].Email
                let nickClub = datos.Teams[i].Nickname1

                fetch(urlEstadio).then(function (respuesta) {
                    return respuesta.json();
                }).then(function (datos) {
                    if (datos.statusCode) {
                        window.alert(datos.message)
                    } else {
                        for (let i = 0; i < datos.length; i++) {
                            if (estadioId == datos[i].VenueId) {

                                let paisEstadio = datos[i].Name
                                let direccionEstadio = datos[i].Address
                                let ciudadEstadio = datos[i].City
                                let capacidadEstadio = datos[i].Capacity
                                let geoLatEstadio = datos[i].GeoLat
                                let geoLongEstadio = datos[i].GeoLong

                                fetch(urlEstadisticas).then(function (respuesta) {
                                    return respuesta.json();
                                }).then(function (datos) {
                                    if (datos.statusCode) {
                                        window.alert(datos.message)
                                    } else {
                                        for (let i = 0; i < datos.length; i++) {
                                            if (datos[i].TeamId == teamId) {

                                                let partidosEstadisticas = datos[i].Games
                                                let minutosEstadisticas = datos[i].Minutes
                                                let golesEstadisticas = datos[i].Goals
                                                let asistenciasEstadisticas = datos[i].Assists
                                                let tirosEstadisticas = datos[i].Shots
                                                let tirosPuertaEstadisticas = datos[i].ShotsOnGoal
                                                let amarillasEstadisticas = datos[i].YellowCards
                                                let rojasEstadisticas = datos[i].RedCards
                                                let faltasRecibidasEstadisticas = datos[i].Fouls
                                                let faltasCometidasEstadisticas = datos[i].Fouled
                                                let fueroJuegoEstadisticas = datos[i].Offsides
                                                let pasesEstadisticas = datos[i].Passes
                                                let pasesCompletadosEstadisticas = datos[i].PassesCompleted
                                                let cornersEstadisticas = datos[i].CornersWon
                                                let disparosBloqueadosEstadisticas = datos[i].BlockedShots
                                                let penaltiesFavorEstadisticas = datos[i].PenaltiesWon
                                                let penaltiesContraEstadisticas = datos[i].PenaltiesConceded

                                                fetch(url).then(function (respuesta) {
                                                    return respuesta.json();
                                                }).then(function (datos) {
                                                    if (datos.statusCode) {
                                                        window.alert(datos.message)
                                                    } else {


                                                        for (let i = 0; i < datos.Teams.length; i++) {
                                                            if (teamId == datos.Teams[i].TeamId) {
                                                                for (let j = 0; j < datos.Teams[i].Players.length; j++) {
                                                                    mensaje = `<div class="wrapper">
                                                                    <!-- *** fut-player-card ***-->
                                                                    <div class="fut-player-card">
                                                                      <!-- Player Card Top-->
                                                                      <div class="player-card-top">
                                                                        <div class="player-master-info">
                                                                          <div class="player-rating"><span>${datos.Teams[i].Players[j].Jersey}</span></div>
                                                                          <div class="player-position"><span>${datos.Teams[i].Players[j].Position}</span></div>
                                                                          <div class="player-nation"><img src="" alt="Argentina" draggable="false"/></div>
                                                                          <div class="player-club"><img src="https://selimdoyranli.com/cdn/fut-player-card/img/barcelona.svg" alt="Barcelona" draggable="false"/></div>
                                                                        </div>
                                                                        <div class="player-picture"><img src="${datos.Teams[i].Players[j].PhotoUrl}" alt="Messi" draggable="false"/>
                                                                          
                                                                        </div>
                                                                      </div>
                                                                      <!-- Player Card Bottom-->
                                                                      <div class="player-card-bottom">
                                                                        <div class="player-info">
                                                                          <!-- Player Name-->
                                                                          <div class="player-name"><span>${datos.Teams[i].Players[j].ShortName}</span></div>
                                                                          <!-- Player Features-->
                                                                          <div class="player-features">
                                                                            <div class="player-features-col"><span>
                                                                                <div class="player-feature-value">${datos.Teams[i].Players[j].Height}</div>
                                                                                <div class="player-feature-title">CM</div></span><span>
                                                                                <div class="player-feature-value">${datos.Teams[i].Players[j].Weight}</div>
                                                                                <div class="player-feature-title">KG</div></span><span>
                                                                                <div class="player-feature-value">94</div>
                                                                                <div class="player-feature-title">PAS</div></span></div>
                                                                            <div class="player-features-col"><span>
                                                                                <div class="player-feature-value">99</div>
                                                                                <div class="player-feature-title">DRI</div></span><span>
                                                                                <div class="player-feature-value">35</div>
                                                                                <div class="player-feature-title">DEF</div></span><span>
                                                                                <div class="player-feature-value">68</div>
                                                                                <div class="player-feature-title">PHY</div></span></div>
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                      <button id="porteroId" type="button" value="" onclick="addPortero(${j})">Añadir a mi equipo</button>
                                                                      </div>`

                                                                    if (datos.Teams[i].Players[j].Position == "GK") {
                                                                        arrayIndices.push(datos.Teams[i].Players[j])
                                                                        mensajePortero += mensaje
                                                                    } else if (datos.Teams[i].Players[j].Position == "D") {
                                                                        arrayIndices.push(datos.Teams[i].Players[j])
                                                                        defensa = document.getElementById("cuadroDefensas")
                                                                    } else if (datos.Teams[i].Players[j].Position == "M") {
                                                                        arrayIndices.push(datos.Teams[i].Players[j])
                                                                        medio = document.getElementById("cuadroMedios")
                                                                    } else if (datos.Teams[i].Players[j].Position == "A") {
                                                                        arrayIndices.push(datos.Teams[i].Players[j])
                                                                        delantero = document.getElementById("cuadroDelanteros")

                                                                    }
                                                                }


                                                                mensajeFicha = `
                                                                <div id="fichaGeneral" style="background-color:">
                                                        <div id="club">
                                                        <div class="flex">
                                                            <div class="div5"></div>
                                                            <div class="div90">
                                                                <h3>Club ·</h3>
                                                                <div>
                                                                    <hr class="corto">
                                                                    <hr class="largo">
                                                                </div>
                                                            </div>
                                                            <div class="div5"></div>
                                                        </div>
                                                        <div class="flex">
                                                        <div class="div5"></div>
                                                        <div class="div90" id="clubTeam">
                                                            <ul>
                                                                <li>Pais: <i>${paisClub}</i></li>
                                                                <li>Fundado: <i>${fundadoClub}</i></li>
                                                                <li>Dirección: <i>${direccionClub}, ${zipClub}, ${ciudadClub}</i></li>
                                                                <li>Teléfono: <i>${telefonoClub}</i></li>
                                                                <li>Fax: <i>${faxClub}</i></li>
                                                                <li>Web: <i><a href="${webClub}" target="_blank">${webClub}</a></i></li>
                                                                <li>Contacto: <i>${emailClub}</i></li>
                                                                <li>Denominación: <i>${nickClub}</i></li>
                                                            </ul>
                                                        </div>
                                                        <div class="div5"></div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div id="estadio">
                                                        <div class="flex">
                                                            <div class="div5"></div>
                                                            <div class="div90">
                                                                <h3>Estadio ·</h3>
                                                                <div>
                                                                    <hr class="corto">
                                                                    <hr class="largo">
                                                                </div>
                                                            </div>
                                                            <div class="div5"></div>
                                                        </div>
                                                        <div class="flex">
                                                        <div class="div5"></div>
                                                        <div class="div90" id="estadioTeam">
                                                            <ul>
                                                                <li>Sede: <i>${paisEstadio}</i></li>
                                                                <li>Dirección: <i>${direccionEstadio}, ${ciudadEstadio}</i></li>
                                                                <li>Capacidad: <i>${capacidadEstadio}</i></li>
                                                                <li><a href="https://www.google.es/maps?q=(${geoLatEstadio},%20${geoLongEstadio})" target="_blank">Ver localización</a></li>
                                                            </ul>
                                                        </div>
                                                        <div class="div5"></div>
                                                        </div>
                                                    </div>
                                                    </div>
                                
                                                    <div id="estadisticas">
                                                        <div class="flex">
                                                            <div class="div5"></div>
                                                            <div class="div90">
                                                                <h3>Estadísticas ·</h3>
                                                                <div>
                                                                    <hr class="corto">
                                                                    <hr class="largo">
                                                                </div>
                                                            </div>
                                                            <div class="div5"></div>
                                                        </div>
                                                        <div class="flex">
                                                        <div class="div10"></div>
                                                        <div class="div50" id="estadisticasTeam">
                                                        <div> <ul>
                                                             <li>Partidos jugados: <i>${partidosEstadisticas}</i></li>
                                                             <li>Minutos disputados: <i>${parseInt(minutosEstadisticas)}</i></li>
                                                             <li>Goles: <i>${parseInt(golesEstadisticas)}</i></li>
                                                             <li>Asistencias: <i>${parseInt(asistenciasEstadisticas)}</i></li>
                                                             <li>Disparos: <i>${parseInt(tirosEstadisticas)}</i></li>
                                                             <li>Disparos a puerta: <i>${parseInt(tirosPuertaEstadisticas)}</i></li>
                                                             <li>Tarjetas amarillas: <i>${parseInt(amarillasEstadisticas)}</i></li>
                                                             <li>Tarjetas rojas: <i>${parseInt(rojasEstadisticas)}</i></li>                             
                                                         </ul> </div>
                                                        <div> <ul>
                                                             <li>Faltas recibidas: <i>${parseInt(faltasRecibidasEstadisticas)}</i></li>
                                                             <li>Faltas cometidas: <i>${parseInt(faltasCometidasEstadisticas)}</i></li>
                                                             <li>Fueras de juego: <i>${parseInt(fueroJuegoEstadisticas)}</i></li>
                                                             <li>Pases realizados: <i>${parseInt(pasesEstadisticas)}</i></li>
                                                             <li>Pases completados: <i>${parseInt(pasesCompletadosEstadisticas)}</i></li>
                                                             <li>Corners ganados: <i>${parseInt(cornersEstadisticas)}</i></li>
                                                             <li>Disparos bloqueados: <i>${parseInt(disparosBloqueadosEstadisticas)}</i></li>
                                                             <li>Penaltis a favor: <i>${parseInt(penaltiesFavorEstadisticas)}</i></li>
                                                             <li>Penaltis en contra: <i>${parseInt(penaltiesContraEstadisticas)}</i></li>                               
                                                         </ul> </div>
                                                        </div>
                                                        <div class="div40"></div>
                                                        </div>
                                                    </div>
                                                        `


                                                                mensajePlantilla = `
                                                            <div id="plantilla">
                                                                <div class="flex">
                                                                    <div class="div5"></div>
                                                                    <div class="div90">
                                                                        <h3>Porteros ·</h3>
                                                                        <div>
                                                                            <hr class="corto">
                                                                            <hr class="largo">
                                                                        </div>
                                                                    </div>
                                                                    <div class="div5"></div>
                                                                </div>
                                                                <div id="cuadroPorteros"></div>
                                                            </div>
                                                    
                                                            <div id="plantilla">
                                                                <div class="flex">
                                                                    <div class="div5"></div>
                                                                    <div class="div90">
                                                                        <h3>Defensas ·</h3>
                                                                        <div>
                                                                            <hr class="corto">
                                                                            <hr class="largo">
                                                                        </div>
                                                                    </div>
                                                                    <div class="div5"></div>
                                                                </div>
                                                                <div id="cuadroDefensas"></div>
                                                            </div>
                                                    
                                                            <div id="plantilla">
                                                                <div class="flex">
                                                                    <div class="div5"></div>
                                                                    <div class="div90">
                                                                        <h3>Medios ·</h3>
                                                                        <div>
                                                                            <hr class="corto">
                                                                            <hr class="largo">
                                                                        </div>
                                                                    </div>
                                                                    <div class="div5"></div>
                                                                </div>
                                                                <div id="cuadroMedios"></div>
                                                            </div>
                                                    
                                                            <div id="plantilla">
                                                                <div class="flex">
                                                                    <div class="div5"></div>
                                                                    <div class="div90">
                                                                        <h3>Delanteros ·</h3>
                                                                        <div>
                                                                            <hr class="corto">
                                                                            <hr class="largo">
                                                                        </div>
                                                                    </div>
                                                                    <div class="div5"></div>
                                                                </div>
                                                                <div id="cuadroDelanteros"></div>
                                                            </div>`


                                                            }
                                                        }


                                                    }
                                                })

                                            }
                                        }
                                    }
                                })

                            }
                        }
                    }

                })




            }


        }
    }




})

function ficha() {
    document.getElementById("mostrarOpcion").innerHTML = mensajeFicha
}

function plantilla() {
    document.getElementById("mostrarOpcion").innerHTML = mensajePlantilla
    document.getElementById("cuadroPorteros").innerHTML = mensajePortero
    defensa.innerHTML = mensaje
    medio.innerHTML = mensaje
    delantero.innerHTML = mensaje
}

let arrayJugadoresFavoritos = []
let p = 1
let d = 1
let m = 1
let a = 1

function addPortero(jugadorPortero) {
    if (p < 4) {
        arrayJugadoresFavoritos.push(arrayIndices[jugadorPortero])
        p++;
        window.alert("Seleccionado")
        /* window.alert(`Has añadido a ${arrayJugadoresFavoritos[jugadorPortero].ShortName} a tu equipo. 
        Porteros seleccionados: ${p}/3`) */
        localStorage.setItem("eleccionFavoritos", JSON.stringify(arrayJugadoresFavoritos))
    } else {
        window.alert("Ya tienes los tres porteros seleccionados")
    }
}

function addDefensa(jugadorDefensa) {
    if (d < 8) {
        arrayJugadoresFavoritos.push(arrayIndices[jugadorDefensa])
        d++;
        window.alert("Seleccionado")
        /* window.alert(`Has añadido a ${arrayJugadoresFavoritos[jugadorDefensa].ShortName} a tu equipo. 
        Porteros seleccionados: ${d}/7`) */
        localStorage.setItem("eleccionFavoritos", JSON.stringify(arrayJugadoresFavoritos))
    } else {
        window.alert("Ya tienes los siete defensas seleccionados")
    }
}

function addMedio(jugadorMedio) {
    if (m < 10) {
        arrayJugadoresFavoritos.push(arrayIndices[jugadorMedio])
        m++;
        window.alert("Seleccionado")
        /* window.alert(`Has añadido a ${arrayJugadoresFavoritos[jugadorMedio].ShortName} a tu equipo. 
        Porteros seleccionados: ${m}/9`) */
        localStorage.setItem("eleccionFavoritos", JSON.stringify(arrayJugadoresFavoritos))
    } else {
        window.alert("Ya tienes los nueve medios seleccionados")
    }
}

function addDelantero(jugadorDelantero) {
    if (a < 5) {
        arrayJugadoresFavoritos.push(arrayIndices[jugadorDelantero])
        d++;
        window.alert("Seleccionado")
        /* window.alert(`Has añadido a ${arrayJugadoresDelantero[jugadorPortero].ShortName} a tu equipo. 
        Porteros seleccionados: ${a}/4`) */
        localStorage.setItem("eleccionFavoritos", JSON.stringify(arrayJugadoresFavoritos))
    } else {
        window.alert("Ya tienes los cindo delanteros seleccionados")
    }
}




/* Footer */
/* let porterosFavoritos = 0
let jugador1 = localStorage.getItem("porteroId1")
let jugador2 = localStorage.getItem("porteroId2")
let jugador3 = localStorage.getItem("porteroId3")

if (jugador1 == null && jugador2 == null && jugador3 == null) {
    document.getElementById("totalPorteros").innerHTML = "No hay porteros seleccionados"
} else {
    porterosFavoritos += 1
    document.getElementById("totalPorteros").innerHTML = `Hay seleccionados ${porterosFavoritos} de 3 porteros`
}

let defensasFavoritos = 0
let jugador4 = localStorage.getItem("defensaId1")
let jugador5 = localStorage.getItem("defensaId2")
let jugador6 = localStorage.getItem("defensaId3")
let jugador7 = localStorage.getItem("defensaId4")
let jugador8 = localStorage.getItem("defensaId5")
let jugador9 = localStorage.getItem("defensaId6")
let jugador10 = localStorage.getItem("defensaId7")

if (jugador4 == null && jugador5 == null && jugador6 == null && jugador7 == null && jugador8 == null && jugador9 == null && jugador10 == null) {
    document.getElementById("totalDefensas").innerHTML = "No hay defensas seleccionados"
} else {
    defensasFavoritos += 1
    document.getElementById("totalDefensas").innerHTML = `Hay seleccionados ${defensasFavoritos} de 7 defensas`
}

let mediosFavoritos = 0
let jugador11 = localStorage.getItem("medioId1")
let jugador12 = localStorage.getItem("medioId2")
let jugador13 = localStorage.getItem("medioId3")
let jugador14 = localStorage.getItem("medioId4")
let jugador15 = localStorage.getItem("medioId5")
let jugador16 = localStorage.getItem("medioId6")
let jugador17 = localStorage.getItem("medioId7")
let jugador18 = localStorage.getItem("medioId8")
let jugador19 = localStorage.getItem("medioId9")

if (jugador11 == null && jugador12 == null && jugador13 == null && jugador14 == null && jugador15 == null && jugador16 == null && jugador17 == null && jugador18 == null && jugador19 == null) {
    document.getElementById("totalMedios").innerHTML = "No hay medios seleccionados"
} else {
    mediosFavoritos += 1
    document.getElementById("totalMedios").innerHTML = `Hay seleccionados ${mediosFavoritos} de 9 medios`
}

let delanterosFavoritos = 0
let jugador20 = localStorage.getItem("delanteroId1")
let jugador21 = localStorage.getItem("delanteroId2")
let jugador22 = localStorage.getItem("delanteroId3")
let jugador23 = localStorage.getItem("delanteroId4")

if (jugador20 == null && jugador21 == null && jugador22 == null && jugador23 == null) {
    document.getElementById("totalDelanteros").innerHTML = "No hay delanteros seleccionados"
} else {
    delanterosFavoritos += 1
    document.getElementById("totalDelanteros").innerHTML = `Hay seleccionados ${delanterosFavoritos} de 4 delanteros`
}


let arrayFavoritos = []
let objetFavoritos = {}

for (let i = 0; i < 3; i++) {
    objetFavoritos.id = `localStorage.getItem(porteroId${i + 1})`
    objetFavoritos.nombre = `localStorage.getItem(porteroId${i + 1})`
    arrayFavoritos[i] = objetFavoritos
}
for (let i = 0; i < 7; i++) {
    objetFavoritos.id = `localStorage.getItem(defensaId${i + 1})`
    objetFavoritos.nombre = `localStorage.getItem(defensaId${i + 1})`
    arrayFavoritos[i + 3] = objetFavoritos
}
for (let i = 0; i < 9; i++) {
    objetFavoritos.id = `localStorage.getItem(medioId${i + 1})`
    objetFavoritos.nombre = `localStorage.getItem(medioId${i + 1})`
    arrayFavoritos[i + 10] = objetFavoritos
}
for (let i = 0; i < 4; i++) {
    objetFavoritos.id = `localStorage.getItem(delanteroId${i + 1})`
    objetFavoritos.nombre = `localStorage.getItem(delanteroId${i + 1})`
    arrayFavoritos[i + 19] = objetFavoritos
} */

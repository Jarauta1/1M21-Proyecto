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
let mensajePortero = "" //String para meter las "cartas FIFA" de los porteros
let mensajeDefensa = "" //String para meter las "cartas FIFA" de los defensas
let mensajeMedio = "" //String para meter las "cartas FIFA" de los medios
let mensajeDelantero = "" //String para meter las "cartas FIFA" de los delanteros

let jugadorId = ""
let arrayIndices = [] //Array donde guardamos los jugadores favoritos y su información

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
                let escudo = datos.Teams[i].WikipediaLogoUrl
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
                                                                    let posicion
                                                                    //Declaro variable "posicion" para traducir las posiciones al "español"
                                                                    let functionAdd
                                                                    //Declaro variable "functionAdd" para nombrar la función que debe realizar (según la posicion del jugador)
                                                                    if (datos.Teams[i].Players[j].Position == "GK") {
                                                                        posicion = "PT"
                                                                        functionAdd = "Portero"
                                                                    } else if (datos.Teams[i].Players[j].Position == "D") {
                                                                        posicion = "DF"
                                                                        functionAdd = "Defensa"
                                                                    } else if (datos.Teams[i].Players[j].Position == "M") {
                                                                        posicion = "MD"
                                                                        functionAdd = "Medio"
                                                                    } else if (datos.Teams[i].Players[j].Position == "A") {
                                                                        posicion = "DL"
                                                                        functionAdd = "Delantero"
                                                                    }
                                                                    let pie
                                                                    //Declaro variable "pie" para traducir si un jugador es diestro o zurdo
                                                                    if (datos.Teams[i].Players[j].Foot == "Left") {
                                                                        pie = "IZ"
                                                                    } else if (datos.Teams[i].Players[j].Foot == "Right") {
                                                                        pie = "DR"
                                                                    }
                                                                    let dia
                                                                    let mes
                                                                    let anyo
                                                                    //Declaro las tres variables para poner fecha de nacimiento
                                                                    let fecha = datos.Teams[i].Players[j].BirthDate
                                                                    dia = fecha.substring(8,10)
                                                                    mes = fecha.substring(5,7)
                                                                    anyo = fecha.substring(2,4)
                                                                    //Relleno de carta "FIFA" y guardar para luego mostrar
                                                                    mensaje = `<div class="cartaFIFA">
                                                                    <br>
                                                                    <div class="fut-player-card">
                                                                      <!-- Parte arriba de la tarjeta -->
                                                                      <div class="player-card-top">
                                                                        <div class="player-master-info">
                                                                          <div class="player-rating"><span>${datos.Teams[i].Players[j].Jersey}</span></div>
                                                                          <div class="player-position"><span>${posicion}</span></div>
                                                                          <!-- Imagen del pais y escudo del jugador -->
                                                                          <!-- En la imagen del pais, estan en una carpeta con el proyecto, en caso de no coincidir el nombre con un archivo, pone una bandera generica (tambien ubicada en la carpeta) -->
                                                                          <!-- En la imagen del equipo, si la url no carga pone una imagen genérica (escudo en la carpeta de imagenes) -->
                                                                          <div class="player-nation"><img src="./Imagenes/Paises/${datos.Teams[i].Players[j].Nationality}.png" onerror ="this.onerror=null;this.src='./Imagenes/Paises/generico.png'" alt="" draggable="false"/></div>
                                                                          <div class="player-club"><img src="${escudo}" alt="" onerror ="this.onerror=null;this.src='./Imagenes/escudo.png'" draggable="false"/></div>
                                                                        </div> 
                                                                        <div class="player-picture"><img src="${datos.Teams[i].Players[j].PhotoUrl}" alt="${datos.Teams[i].Players[j].ShortName}" draggable="false"/>
                                                                          
                                                                        </div>
                                                                      </div>
                                                                      <!-- Parte abajo de la tarjeta-->
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
                                                                                <div class="player-feature-value">${pie}</div>
                                                                                <div class="player-feature-title">PIE</div></span></div>
                                                                            <div class="player-features-col"><span>
                                                                                <div class="player-feature-value">${dia}</div>
                                                                                <div class="player-feature-title">DIA</div></span><span>
                                                                                <div class="player-feature-value">${mes}</div>
                                                                                <div class="player-feature-title">MES</div></span><span>
                                                                                <div class="player-feature-value">${anyo}</div>
                                                                                <div class="player-feature-title">AÑO</div></span></div>
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                      </div>
                                                                      <br>
                                                                      <a id="porteroId" class="botonAdd" href="#" onclick="add${functionAdd}(${j})">
                                                                      <span></span>
                                                                      <span></span>
                                                                      <span></span>
                                                                      <span></span>
                                                                      Añadir a mi equipo
                                                                  </a>
                                                                          </div>
                                                                          
                                                                          </div>`

                                                                    //Depende de la posición de cada jugador, lo metemos en un cuadro u otro
                                                                    //También almacenamos en un array toda la información de ese jugador
                                                                    if (datos.Teams[i].Players[j].Position == "GK") {
                                                                        arrayIndices.push(datos.Teams[i].Players[j])
                                                                        mensajePortero += mensaje
                                                                    } else if (datos.Teams[i].Players[j].Position == "D") {
                                                                        arrayIndices.push(datos.Teams[i].Players[j])
                                                                        mensajeDefensa += mensaje
                                                                    } else if (datos.Teams[i].Players[j].Position == "M") {
                                                                        arrayIndices.push(datos.Teams[i].Players[j])
                                                                        mensajeMedio += mensaje
                                                                    } else if (datos.Teams[i].Players[j].Position == "A") {
                                                                        arrayIndices.push(datos.Teams[i].Players[j])
                                                                        mensajeDelantero += mensaje

                                                                    }
                                                                }


                                                                mensajeFicha = `
                                                                <div id="fichaGeneral">
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
    document.getElementById("cuadroDefensas").innerHTML = mensajeDefensa
    document.getElementById("cuadroMedios").innerHTML = mensajeMedio
    document.getElementById("cuadroDelanteros").innerHTML = mensajeDelantero
}

let arrayJugadoresFavoritos = []
let p = 0
let d = 0
let m = 0
let a =0
localStorage.setItem("porterosFavoritos",p) //error cada vez me hace un reset, lo mismo pasa con la tabla de favoritos
function addPortero(jugadorPortero) {
    console.log(jugadorPortero)
    console.log(arrayIndices[jugadorPortero])
    p = localStorage.getItem("porterosFavoritos")
    if (p < 3) {
        arrayJugadoresFavoritos.push(arrayIndices[jugadorPortero]) //De la tabla con todos los jugadores que creamos al generar su ficha, cojo los datos y los paso a otra tabla, la de favoritos
        p++;
        console.log(arrayJugadoresFavoritos)
        window.alert("Seleccionado")
        /* window.alert(`Has añadido a ${arrayJugadoresFavoritos[jugadorPortero].ShortName} a tu equipo. 
        Porteros seleccionados: ${p}/3`) */
        localStorage.setItem("porterosFavoritos", p)
        localStorage.setItem("eleccionFavoritos", JSON.stringify(arrayJugadoresFavoritos))
    } else {
        window.alert("Ya tienes los tres porteros seleccionados")
    }
}

function addDefensa(jugadorDefensa) {
    d = localStorage.getItem("defensasFavoritos")
    if (d < 7) {
        arrayJugadoresFavoritos.push(arrayIndices[jugadorDefensa])
        d++;
        window.alert("Seleccionado")
        /* window.alert(`Has añadido a ${arrayJugadoresFavoritos[jugadorDefensa].ShortName} a tu equipo. 
        Porteros seleccionados: ${d}/7`) */
        localStorage.setItem("defensasFavoritos", d)
        localStorage.setItem("eleccionFavoritos", JSON.stringify(arrayJugadoresFavoritos))
    } else {
        window.alert("Ya tienes los siete defensas seleccionados")
    }
}

function addMedio(jugadorMedio) {
    m = localStorage.getItem("mediosFavoritos")
    if (m < 9) {
        arrayJugadoresFavoritos.push(arrayIndices[jugadorMedio])
        m++;
        window.alert("Seleccionado")
        /* window.alert(`Has añadido a ${arrayJugadoresFavoritos[jugadorMedio].ShortName} a tu equipo. 
        Porteros seleccionados: ${m}/9`) */
        localStorage.setItem("mediosFavoritos", m)
        localStorage.setItem("eleccionFavoritos", JSON.stringify(arrayJugadoresFavoritos))
    } else {
        window.alert("Ya tienes los nueve medios seleccionados")
    }
}

function addDelantero(jugadorDelantero) {
    a = localStorage.getItem("delanterosFavoritos")
    if (a < 4) {
        arrayJugadoresFavoritos.push(arrayIndices[jugadorDelantero])
        d++;
        window.alert("Seleccionado")
        /* window.alert(`Has añadido a ${arrayJugadoresDelantero[jugadorPortero].ShortName} a tu equipo. 
        Porteros seleccionados: ${a}/4`) */
        localStorage.setItem("delanterosFavoritos", d)
        localStorage.setItem("eleccionFavoritos", JSON.stringify(arrayJugadoresFavoritos))
    } else {
        window.alert("Ya tienes los cinco delanteros seleccionados")
    }
}




/* Footer */
//Saco del almacenamiento local cuantos jugadores por posicion hemos seleccionado y los muestro en el footer
let footerPortero = localStorage.getItem("porterosFavoritos")

if (footerPortero == 0 || footerPortero == null) {
    document.getElementById("totalPorteros").innerHTML = "No hay porteros seleccionados"
} else if (footerPortero > 0) {
    document.getElementById("totalPorteros").innerHTML = `Hay seleccionados ${footerPortero} de 3 porteros`
}

let footerDefensa = localStorage.getItem("defensasFavoritos")

if (footerDefensa == 0 || footerDefensa == null) {
    document.getElementById("totalDefensas").innerHTML = "No hay defensas seleccionados"
} else if (footerDefensa > 0) {
    document.getElementById("totalDefensas").innerHTML = `Hay seleccionados ${footerDefensa} de 7 defensas`
}

let footerMedio = localStorage.getItem("mediosFavoritos")

if (footerMedio == 0 || footerMedio == null) {
    document.getElementById("totalMedios").innerHTML = "No hay medios seleccionados"
} else if (footerMedio > 0) {
    document.getElementById("totalMedios").innerHTML = `Hay seleccionados ${footerMedio} de 9 medios`
}

let footerDelantero = localStorage.getItem("delanterosFavoritos")

if (footerDelantero == 0 || footerDelantero == null) {
    document.getElementById("totalDelanteros").innerHTML = "No hay delanteros seleccionados"
} else if (footerDelantero > 0) {
    document.getElementById("totalDelanteros").innerHTML = `Hay seleccionados ${footerDelantero} de 4 delanteros`
}




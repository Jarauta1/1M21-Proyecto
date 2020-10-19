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
let porterosCard = ""
let defensasCard = ""
let mediosCard = ""
let delanterosCard = ""
let jugadorId = ""

/* Header de la página */
fetch(url).then(function (respuesta) {
    return respuesta.json();
}).then(function (datos) {
    if (datos.statusCode) {
        window.alert(datos.message)
    } else {
        for (let i = 0; i < datos.Teams.length; i++) {
            if (datos.Teams[i].TeamId == teamId) {

                let icon = `<link rel="icon" type="image/png" href="${datos.Teams[i].WikipediaLogoUrl}" onerror ="href="./Imagenes/escudo.png""/>`
                let name = `<title>${datos.Teams[i].Key}</title>`
                document.getElementById("head").innerHTML = icon + name
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
                                                                    if (datos.Teams[i].Players[j].Position == "GK") {

                                                                        porterosCard += `<div class="cardPlayer" style="background-color:${datos.Teams[i].ClubColor1}">
                                                                        <div class ="fotoCard"><img src="${datos.Teams[i].Players[j].PhotoUrl}" alt="Avatar" onerror ="this.onerror=null;this.src='../Imagenes/persona.jpg'" width="" height=""></div>
                                                                        <div class="containerCardPlayer">
                                                                          <div class="nombreCard"><h4><b><strong>${datos.Teams[i].Players[j].FirstName} ${datos.Teams[i].Players[j].LastName}</strong></b></h4> <h3 style="color: ${datos.Teams[i].ClubColor2}"><strong>${datos.Teams[i].Players[j].Jersey}</strong></h3></div>
                                                                          <p>Altura: ${datos.Teams[i].Players[j].Height}</p>
                                                                          <p>Peso: ${datos.Teams[i].Players[j].Weight}</p>
                                                                          <p>Ciudad nacimiento: ${datos.Teams[i].Players[j].BirthCity}</p>
                                                                          <p>Pais origen: ${datos.Teams[i].Players[j].BirthCountry}</p>
                                                                          <p>Nacionalidad: ${datos.Teams[i].Players[j].Nationality}</p>
                                                                          </div>
                                                                          <button id="porteroId" type="button" value="" onclick="addPortero(${datos.Teams[i].Players[j].CommonName},${datos.Teams[i].Players[j].PhotoUrl},${datos.Teams[i].Players[j].PlayerId})">Añadir a mi equipo</button>
                                                                          </div>`


                                                                    } else if (datos.Teams[i].Players[j].Position == "D") {

                                                                        defensasCard += `<div class="cardPlayer" style="background-color:${datos.Teams[i].ClubColor1}">
                                                                        <div class ="fotoCard"><img src="${datos.Teams[i].Players[j].PhotoUrl}" alt="Avatar" onerror ="this.onerror=null;this.src='../Imagenes/persona.jpg'" width="" height=""></div>
                                                                        <div class="containerCardPlayer">
                                                                          <div class="nombreCard"><h4><b><strong>${datos.Teams[i].Players[j].FirstName} ${datos.Teams[i].Players[j].LastName}</strong></b></h4> <h3 style="color: ${datos.Teams[i].ClubColor2}"><strong>${datos.Teams[i].Players[j].Jersey}</strong></h3></div>
                                                                          <p>Altura: ${datos.Teams[i].Players[j].Height}</p>
                                                                          <p>Peso: ${datos.Teams[i].Players[j].Weight}</p>
                                                                          <p>Ciudad nacimiento: ${datos.Teams[i].Players[j].BirthCity}</p>
                                                                          <p>Pais origen: ${datos.Teams[i].Players[j].BirthCountry}</p>
                                                                          <p>Nacionalidad: ${datos.Teams[i].Players[j].Nationality}</p>
                                                                          </div>
                                                                          <button id = "defensaId" type="button" value="" onclick=addDefensa(${datos.Teams[i].Players[j].CommonName},${datos.Teams[i].Players[j].PhotoUrl},${datos.Teams[i].Players[j].PlayerId})>Añadir a mi equipo</button>
                                                                        </div>`


                                                                    } else if (datos.Teams[i].Players[j].Position == "M") {

                                                                        mediosCard += `<div class="cardPlayer" style="background-color:${datos.Teams[i].ClubColor1}">
                                                                        <div class ="fotoCard"><img src="${datos.Teams[i].Players[j].PhotoUrl}" alt="Avatar" onerror ="this.onerror=null;this.src='../Imagenes/persona.jpg'" width="" height=""></div>
                                                                        <div class="containerCardPlayer">
                                                                          <div class="nombreCard"><h4><b><strong>${datos.Teams[i].Players[j].FirstName} ${datos.Teams[i].Players[j].LastName}</strong></b></h4> <h3 style="color: ${datos.Teams[i].ClubColor2}"><strong>${datos.Teams[i].Players[j].Jersey}</strong></h3></div>
                                                                          <p>Altura: ${datos.Teams[i].Players[j].Height}</p>
                                                                          <p>Peso: ${datos.Teams[i].Players[j].Weight}</p>
                                                                          <p>Ciudad nacimiento: ${datos.Teams[i].Players[j].BirthCity}</p>
                                                                          <p>Pais origen: ${datos.Teams[i].Players[j].BirthCountry}</p>
                                                                          <p>Nacionalidad: ${datos.Teams[i].Players[j].Nationality}</p>
                                                                          </div>
                                                                          <button id = "medioId" type="button" value="" onclick=addMedio(${datos.Teams[i].Players[j].CommonName},${datos.Teams[i].Players[j].PhotoUrl},${datos.Teams[i].Players[j].PlayerId})>Añadir a mi equipo</button>
                                                                        </div>`

                                                                    } else if (datos.Teams[i].Players[j].Position == "A") {

                                                                        delanterosCard += `<div class="cardPlayer" style="background-color:${datos.Teams[i].ClubColor1}">
                                                                        <div class ="fotoCard"><img src="${datos.Teams[i].Players[j].PhotoUrl}" alt="Avatar" onerror ="this.onerror=null;this.src='../Imagenes/persona.jpg'" width="" height=""></div>
                                                                        <div class="containerCardPlayer">
                                                                          <div class="nombreCard"><h4><b><strong>${datos.Teams[i].Players[j].FirstName} ${datos.Teams[i].Players[j].LastName}</strong></b></h4> <h3 style="color: ${datos.Teams[i].ClubColor2}"><strong>${datos.Teams[i].Players[j].Jersey}</strong></h3></div>
                                                                          <p>Altura: ${datos.Teams[i].Players[j].Height}</p>
                                                                          <p>Peso: ${datos.Teams[i].Players[j].Weight}</p>
                                                                          <p>Ciudad nacimiento: ${datos.Teams[i].Players[j].BirthCity}</p>
                                                                          <p>Pais origen: ${datos.Teams[i].Players[j].BirthCountry}</p>
                                                                          <p>Nacionalidad: ${datos.Teams[i].Players[j].Nationality}</p>
                                                                        </div>
                                                                        <button id = "delanteroId" type="button" value="" onclick=addDelantero(${datos.Teams[i].Players[j].CommonName},${datos.Teams[i].Players[j].PhotoUrl},${datos.Teams[i].Players[j].PlayerId})>Añadir a mi equipo</button>
                                                                      </div>`

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
                                                        <div class="div90" id="estadisticasTeam">
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
                                                        <div class="div5"></div>
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
    document.getElementById("cuadroPorteros").innerHTML = porterosCard
    document.getElementById("cuadroDefensas").innerHTML = defensasCard
    document.getElementById("cuadroMedios").innerHTML = mediosCard
    document.getElementById("cuadroDelanteros").innerHTML = delanterosCard
}

let porteroFav
let defensaFav
let medioFav
let delanteroFav
let p = 1
let d = 1
let m = 1
let a = 1

function addPortero(nombre, foto, id) {
    if (p < 4) {
        porteroFavN = `porteroNombre${p}`
        porteroFavF = `porteroFoto${p}`
        porteroFavI = `porteroId${p}`
        localStorage.setItem("porteroFavN", nombre)
        localStorage.setItem("porteroFavF", foto)
        localStorage.setItem("porteroFavI", id)
        p++;
    } else {
        window.alert("Ya tienes los tres porteros seleccionados")
    }
}

function addDefensa(nombre, foto, id) {
    if (d < 8) {
        defensaFavN = `defensaNombre${d}`
        defensaFavF = `defensaFoto${d}`
        defensaFavI = `defensaId${d}`
        localStorage.setItem("defensaFavN", nombre)
        localStorage.setItem("defensaFavF", foto)
        localStorage.setItem("defensaFavI", id)
        d++;
    } else {
        window.alert("Ya tienes los siete defensas seleccionados")
    }
}

function addMedio(nombre, foto, id) {
    if (m < 10) {
        medioFavN = `medioNombre${m}`
        medioFavF = `medioFoto${m}`
        medioFavI = `medioId${m}`
        localStorage.setItem("medioFavN", nombre)
        localStorage.setItem("medioFavF", foto)
        localStorage.setItem("medioFavI", id)
        m++;
    } else {
        window.alert("Ya tienes los nueve medios seleccionados")
    }
}

function addDelantero(nombre, foto, id) {
    if (a < 5) {
        delanteroFavN = `delanteroNombre${a}`
        delanteroFavF = `delanteroFoto${a}`
        delanteroFavI = `delanteroId${a}`
        localStorage.setItem("delanteroFavN", nombre)
        localStorage.setItem("delanteroFavF", foto)
        localStorage.setItem("delanteroFavI", id)
        d++;
    } else {
        window.alert("Ya tienes los cindo delanteros seleccionados")
    }
}

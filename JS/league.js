/* Key API */
let keyAPI = `80b2c3e7fd3e416d8693d50f7f4ebd21`

/* Header de la página */

//Declarando variables
let country = localStorage.getItem("country") //Obtener datos pagina index (país)
let league = localStorage.getItem("league") //Obtener datos pagina index (liga)
let competitionId = localStorage.getItem("CompetitionId") //Obtener datos pagina index (competición)
let icon = `<link rel="icon" type="image/png" href="./Imagenes/logo ${country}.png"/>` //Link para icono de la página
let name = `<title>${league}</title>` //Título de la página
let image = `<a href="./league.html"><img  src="./Imagenes/logo ${country}.png" alt="" width = "50" height = "50"></a>` //Con el dato "competición" obtenido arriba, se carga la imagen de la liga en el cabecero
let url = `https://api.sportsdata.io/v3/soccer/scores/json/CompetitionDetails/${competitionId}?key=${keyAPI}` //Obtener url para adquirir la info
let mensaje = "" //String para publicar escudos en el header
let lista = "" //String para publicar nombres jugadores en la búsqueda

//Poner titulo e icono de la página
document.getElementById("head").innerHTML = icon + name
document.getElementById("imagen").innerHTML = image

//Funcion para guardar la ID del equipo seleccionado
function team(teamId) {
    localStorage.setItem("teamId", teamId)
}

//Llamada a API para guardar los escudos
fetch(url).then(function (respuesta) {
    return respuesta.json();
}).then(function (datos) {
    if (datos.statusCode) {
        window.alert(datos.message)
    } else {
        for (let i = 0; i < datos.Teams.length; i++) {
            mensaje += `<a href="./team.html" onclick=team("${datos.Teams[i].TeamId}")><img id ="teamShield" src="${datos.Teams[i].WikipediaLogoUrl}" title="${datos.Teams[i].Name}" value="${datos.Teams[i].TeamId}" onerror ="this.onerror=null;this.src='./Imagenes/escudo.png'" width="" height =""></a>`
        }
        document.getElementById("shields").innerHTML = mensaje
    }
    localStorage.setItem("roundId", datos.Games[0].RoundId)
})

/* Buscador de contenido */

//Ejecutando funciones
document.getElementById("iconSearch").addEventListener("click", mostrar_buscador);
document.getElementById("contenedorPaginaSearch").addEventListener("click", ocultar_buscador);

//Declarando variables
bars_search = document.getElementById("contenedorBarraSearch");
cover_ctn_search = document.getElementById("contenedorPaginaSearch");
inputSearch = document.getElementById("inputSearch");
box_search = document.getElementById("boxSearch");


//Funcion para mostrar el buscador
function mostrar_buscador() {
    bars_search.style.right = "-10px";
    cover_ctn_search.style.display = "block";
    inputSearch.focus();
    if (inputSearch.value === "") {
        box_search.style.display = "none";
    }
}

//Funcion para ocultar el buscador
function ocultar_buscador() {
    bars_search.style.right = "-100000px";
    cover_ctn_search.style.display = "none";
    inputSearch.value = "";
    box_search.style.display = "none";
}

//Lista donde buscar (jugadores favoritos)
let arrayBusqueda = []
arrayBusqueda = JSON.parse(localStorage.getItem("arrayJugadoresFavoritos"))
listaBusqueda = ""
console.log(arrayBusqueda)
if (arrayBusqueda != null) {
    for (let k = 0; k < arrayBusqueda.length; k++) {
        listaBusqueda += `<li><a href="./jugador.html" onclick=entrarJugador("${arrayBusqueda[k].PlayerId}")><img src="./Imagenes/lupa.png" height="10">${arrayBusqueda[k].CommonName}</a></li>`
    }
}
document.getElementById("boxSearch").innerHTML = listaBusqueda

//Funcion ir a página de jugador

function entrarJugador(playerId) {
    console.log(playerId)
    /* for (let i = 0; i < arrayBusqueda.length; i++) {
        if (playerId == arrayBusqueda[i].PlayerId) { */
    localStorage.setItem("jugadorSeleccionado", playerId)
    /*      location.href = './jugador.html' //Página a la que nos lleva la función
     }
 } */
}


//Creando filtrado de busqueda
document.getElementById("inputSearch").addEventListener("keyup", buscador_interno);

function buscador_interno() {
    filter = inputSearch.value.toUpperCase();
    li = box_search.getElementsByTagName("li");
    //Recorriendo elementos a filtrar mediante los "li"
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        textValue = a.textContent || a.innerText;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
            box_search.style.display = "block";
            if (inputSearch.value === "") {
                box_search.style.display = "none";
            }
        } else {
            li[i].style.display = "none";
        }
    }
}

/* Select de jornada */

let hola = localStorage.getItem("eleccionFavoritos")
let aver = JSON.parse(hola)
let opcionJornada = "<option selected disabled>Jornada</option>"
for (let i = 1; i < 39; i++) {
    opcionJornada += `<option value=${i}>${i}</option>`
    document.getElementById("select").innerHTML = `
        <select id = "jornada" name = "select" onchange="seleccion()">${opcionJornada}</select>`
}

let eleccionJornada = 1

function seleccion() {
    eleccionJornada = parseInt(document.getElementById("jornada").value)

    /* Tabla de resultados y clasificación */
    //Poner los resultados
    let resultados = ""
    let escudoLocal
    let escudoVisitante
    let estadio

    fetch(url).then(function (respuesta) {
        return respuesta.json();
    }).then(function (datos) {
        if (datos.statusCode) {
            window.alert(datos.message)
        } else {
            //Primero se mira la jornada que quiere ver el usuario y se buscan los escudos (local y visitante) y el estadio
            for (let i = 0; i < datos.Games.length; i++) {
                if (datos.Games[i].Week == eleccionJornada) {
                    escudoLocal = datos.Games[i].HomeTeamId
                    escudoVisitante = datos.Games[i].AwayTeamId
                    estadio = datos.Games[i].VenueId
                    for (let j = 0; j < datos.Teams.length; j++) {
                        if (escudoLocal == datos.Teams[j].TeamId) {
                            escudoLocal = datos.Teams[j].WikipediaLogoUrl
                        }
                        if (escudoVisitante == datos.Teams[j].TeamId) {
                            escudoVisitante = datos.Teams[j].WikipediaLogoUrl
                        }
                        if (estadio == datos.Teams[j].VenueId) {
                            estadio = datos.Teams[j].VenueName
                        } else if (estadio == 95) {  //Esta condicion es debida a que actualmente el Real Madrid esta jugando en el estadio Di Stefano y no tiene Id en la API ese estadio
                            estadio = "Estadio Santiago Bernabeu"
                        }
                    }
                    let fecha = datos.Games[i].DateTime
                    let dia
                    let mes
                    let anyo
                    let hora
                    let scoreHome
                    let scoreAway
                    if (fecha != null) {
                        dia = fecha.substring(8, 10)
                        mes = fecha.substring(5, 7)
                        anyo = fecha.substring(0, 4)
                        hora = fecha.substring(11, 16)
                        scoreHome = parseInt(datos.Games[i].HomeTeamScore / 3)
                        scoreAway = parseInt(datos.Games[i].AwayTeamScore / 3)
                        scoreHome1 = parseInt(datos.Games[i].HomeTeamScorePeriod1 / 3)
                        scoreAway1 = parseInt(datos.Games[i].AwayTeamScorePeriod1 / 3)
                        scoreHome2 = parseInt(datos.Games[i].HomeTeamScorePeriod2 / 3)
                        scoreAway2 = parseInt(datos.Games[i].AwayTeamScorePeriod2 / 3)
                    } else {
                        dia = "??"
                        mes = "??"
                        anyo = "????"
                        hora = "??:??"
                        scoreHome = "-"
                        scoreAway = "-"
                        scoreHome1 = "-"
                        scoreAway1 = "-"
                        scoreHome2 = "-"
                        scoreAway2 = "-"
                    }
                    let fondo
                    if (i % 2 != 0) {
                        fondo = `style="background: white"`
                    } else {
                        fondo = `style="background: rgb(170,170,170,0.2)"`
                    }
                    resultados += `<tr>
                        <td ${fondo} id="centrado">${estadio}</td>
                        <td ${fondo} id="centrado">${dia}-${mes}-${anyo}   ${hora}</td>
                        <td ${fondo} id="centrado"><img src="${escudoLocal}" alt="" onerror ="this.onerror=null;this.src='./Imagenes/escudo.png'" width="" height="20"></td>  
                        <td ${fondo} id="izquierda" style="color: blue;">${datos.Games[i].HomeTeamName}</td>
                        <td ${fondo} id="centrado">${scoreHome} : ${scoreAway}</td>
                        <td ${fondo} id="derecha" style="color: blue;">${datos.Games[i].AwayTeamName}</td>   
                        <td ${fondo} id="centrado"><img src="${escudoVisitante}" alt="" onerror ="this.onerror=null;this.src='./Imagenes/escudo.png'" width="" height="20"></td>
                        <td ${fondo} id="centrado">${datos.Games[i].Status}</td>
                        <td ${fondo} id="centrado">${scoreHome1} : ${scoreAway1}</td>
                        <td ${fondo} id="centrado">${scoreHome2} : ${scoreAway2}</td>
                        </tr>`
                }

                document.getElementById("datos").innerHTML = resultados
            }

            let tablaEscudosClasificacion = [] //Tabla para almacenar objeto con id y url de escudo
            let objetoEscudosClasificacion = {} //Objeto para almacenar id y url de escudo
            let roundId = datos.CurrentSeason.Rounds[0].RoundId
            let urlTable = `https://api.sportsdata.io/v3/soccer/scores/json/Standings/${roundId}?key=${keyAPI}`
            let mensajeClasificacion = ""
            let arrayClasificacion = []
            let objetoClasificacion

            //Crear tabla con el nombre de equipo y su url de escudo asociado para la clasificación
            for (let i = 0; i < datos.Teams.length; i++) {
                objetoEscudosClasificacion = {}
                objetoEscudosClasificacion.id = datos.Teams[i].TeamId
                objetoEscudosClasificacion.url = datos.Teams[i].WikipediaLogoUrl
                tablaEscudosClasificacion[i] = objetoEscudosClasificacion
            }

            fetch(urlTable).then(function (respuesta) {
                return respuesta.json();
            }).then(function (datos) {
                if (datos.statusCode) {
                    window.alert(datos.message)
                } else {
                    //Como en la API vienen desordenados los equipos respecto a su clasificación, creo un array donde los voy colocando usando su posición como indice que ocupara en el array
                    for (let i = 0; i < 20; i++) {
                        objetoClasificacion = {}
                        objetoClasificacion.url = datos[i].TeamId
                        objetoClasificacion.posicion = datos[i].Order
                        objetoClasificacion.nombre = datos[i].ShortName
                        objetoClasificacion.jugados = datos[i].Games
                        objetoClasificacion.ganados = datos[i].Wins
                        objetoClasificacion.empatados = datos[i].Draws
                        objetoClasificacion.perdidos = datos[i].Losses
                        objetoClasificacion.golesMarcados = datos[i].GoalsScored
                        objetoClasificacion.golesEncajados = datos[i].GoalsAgainst
                        objetoClasificacion.diferencia = datos[i].GoalsDifferential
                        objetoClasificacion.puntos = datos[i].Points
                        arrayClasificacion[(datos[i].Order - 1)] = objetoClasificacion
                    }

                    //Busqueda del escudo de cada equipo
                    for (let i = 0; i < arrayClasificacion.length; i++) {
                        for (let j = 0; j < tablaEscudosClasificacion.length; j++) {
                            if (arrayClasificacion[i].url == tablaEscudosClasificacion[j].id) {
                                arrayClasificacion[i].url = tablaEscudosClasificacion[j].url
                            }
                        }
                    }
                    //Con el array ya relleno y ordenado, se van sacando por posicion para rellenar la tabla de clasificación
                    for (let i = 0; i < arrayClasificacion.length; i++) {
                        let color
                        if (i % 2 != 0) {
                            color = `style="background: white"`
                        } else {
                            color = `style="background: rgb(170,170,170,0.2)"`
                        }
                        if (i < 4) {
                            mensajeClasificacion += `<tr>
                                <th style="background: rgba(0, 128, 0, 0.651);" id="colorClasificacion"></th>
                                <td ${color} id="centrado">${arrayClasificacion[i].posicion}</td>
                                <td ${color} id="centrado"><img src="${arrayClasificacion[i].url}" alt="" onerror ="this.onerror=null;this.src='./Imagenes/escudo.png'" width="" height="20"></td>
                                <td ${color} id="izquierda">${arrayClasificacion[i].nombre}</td>
                                <td ${color} id="centrado">${arrayClasificacion[i].jugados}</td>
                                <td ${color} id="centrado">${arrayClasificacion[i].ganados}</td>
                                <td ${color} id="centrado">${arrayClasificacion[i].empatados}</td>
                                <td ${color} id="centrado">${arrayClasificacion[i].perdidos}</td>
                                <td ${color} id="centrado">${arrayClasificacion[i].golesMarcados}</td>
                                <td ${color} id="centrado">${arrayClasificacion[i].golesEncajados}</td>
                                <td ${color} id="centrado">${arrayClasificacion[i].diferencia}</td>
                                <td ${color} id="centrado"><strong>${arrayClasificacion[i].puntos}</strong></td>
                                </tr>`
                        }
                        else if (i >= 4 && i < 7) {
                            mensajeClasificacion += `<tr>
                                <th style="background:  rgba(255, 255, 0, 0.61);" id="colorClasificacion"></th>
                                <td ${color} id="centrado">${arrayClasificacion[i].posicion}</td>
                                <td ${color} id="centrado"><img src="${arrayClasificacion[i].url}" alt="" onerror ="this.onerror=null;this.src='./Imagenes/escudo.png'" width="" height="20"></td>
                                <td ${color} id="izquierda">${arrayClasificacion[i].nombre}</td>
                                <td ${color} id="centrado">${arrayClasificacion[i].jugados}</td>
                                <td ${color} id="centrado">${arrayClasificacion[i].ganados}</td>
                                <td ${color} id="centrado">${arrayClasificacion[i].empatados}</td>
                                <td ${color} id="centrado">${arrayClasificacion[i].perdidos}</td>
                                <td ${color} id="centrado">${arrayClasificacion[i].golesMarcados}</td>
                                <td ${color} id="centrado">${arrayClasificacion[i].golesEncajados}</td>
                                <td ${color} id="centrado">${arrayClasificacion[i].diferencia}</td>
                                <td ${color} id="centrado"><strong>${arrayClasificacion[i].puntos}</strong></td>
                                </tr>`
                        }
                        else if (i >= 7 && i < 17) {
                            mensajeClasificacion += `<tr>
                                <th style="background: white;" id="colorClasificacion"></th>
                                <td ${color} id="centrado">${arrayClasificacion[i].posicion}</td>
                                <td ${color} id="centrado"><img src="${arrayClasificacion[i].url}" alt="" onerror ="this.onerror=null;this.src='./Imagenes/escudo.png'" width="" height="20"></td>
                                <td ${color} id="izquierda">${arrayClasificacion[i].nombre}</td>
                                <td ${color} id="centrado">${arrayClasificacion[i].jugados}</td>
                                <td ${color} id="centrado">${arrayClasificacion[i].ganados}</td>
                                <td ${color} id="centrado">${arrayClasificacion[i].empatados}</td>
                                <td ${color} id="centrado">${arrayClasificacion[i].perdidos}</td>
                                <td ${color} id="centrado">${arrayClasificacion[i].golesMarcados}</td>
                                <td ${color} id="centrado">${arrayClasificacion[i].golesEncajados}</td>
                                <td ${color} id="centrado">${arrayClasificacion[i].diferencia}</td>
                                <td ${color} id="centrado"><strong>${arrayClasificacion[i].puntos}</strong></td>
                                </tr>`
                        }
                        else if (i >= 17 && i < 20) {
                            mensajeClasificacion += `<tr>
                                <th style="background: rgba(255, 0, 0, 0.575);" id="colorClasificacion"></th>
                                <td ${color} id="centrado">${arrayClasificacion[i].posicion}</td>
                                <td ${color} id="centrado"><img src="${arrayClasificacion[i].url}" alt="" onerror ="this.onerror=null;this.src='./Imagenes/escudo.png'" width="" height="20"></td>
                                <td ${color} id="izquierda">${arrayClasificacion[i].nombre}</td>
                                <td ${color} id="centrado">${arrayClasificacion[i].jugados}</td>
                                <td ${color} id="centrado">${arrayClasificacion[i].ganados}</td>
                                <td ${color} id="centrado">${arrayClasificacion[i].empatados}</td>
                                <td ${color} id="centrado">${arrayClasificacion[i].perdidos}</td>
                                <td ${color} id="centrado">${arrayClasificacion[i].golesMarcados}</td>
                                <td ${color} id="centrado">${arrayClasificacion[i].golesEncajados}</td>
                                <td ${color} id="centrado">${arrayClasificacion[i].diferencia}</td>
                                <td ${color} id="centrado"><strong>${arrayClasificacion[i].puntos}</strong></td>
                                </tr>`
                        }
                    }
                    document.getElementById("datosClasificacion").innerHTML = mensajeClasificacion
                }
            })
        }
    })
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


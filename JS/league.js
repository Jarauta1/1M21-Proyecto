/* Key API */
let keyAPI = `ca8085723da84292925bffc2a1ffb106`

/* Header de la página */

//Declarando variables
let country = localStorage.getItem("country") //Obtener datos pagina index (país, liga y competición)
let league = localStorage.getItem("league")
let competitionId = localStorage.getItem("CompetitionId")
let icon = `<link rel="icon" type="image/png" href="./Imagenes/logo ${country}.png"/>` //Obtener datos para icono y título de la página
let name = `<title>${league}</title>`
let image = `<a href="./league.html"><img  src="./Imagenes/logo ${country}.png" alt="" width = "50" height = "50"></a>`
let url = `https://api.sportsdata.io/v3/soccer/scores/json/CompetitionDetails/${competitionId}?key=${keyAPI}` //Obtener url's para adquirir la info
let urlSearch = `https://api.sportsdata.io/v3/soccer/scores/json/MembershipsByCompetition/${competitionId}?key=${keyAPI}`
let urlScorers = `https://api.sportsdata.io/v3/soccer/scores/json/CompetitionDetails/${competitionId}?key=${keyAPI}`
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
    for (let i = 0; i < datos.Teams.length; i++) {
        mensaje += `<a href="./team.html" onclick=team("${datos.Teams[i].TeamId}")><img id ="teamShield" src="${datos.Teams[i].WikipediaLogoUrl}" title="${datos.Teams[i].Name}" value="${datos.Teams[i].TeamId}" onerror ="this.onerror=null;this.src='./Imagenes/escudo.png'" width="" height =""></a>`
    }
    document.getElementById("shields").innerHTML = mensaje

})

//Llamada a API para guardar los nombres de los jugadores
/* fetch(urlSearch).then(function (respuesta) {
   return respuesta.json();
}).then(function (datos) {
   for (let i = 0; i < datos.length; i++) {
      lista += `
      <li><a href="#"><img src="./Imagenes/lupa.png" height = "10">${datos[i].PlayerName}</a></li>
      `
      document.getElementById("box-search").innerHTML = lista
      
   }
   
}) */


/* Buscador de contenido */

//Ejecutando funciones
document.getElementById("icon-search").addEventListener("click", mostrar_buscador);
document.getElementById("cover-ctn-search").addEventListener("click", ocultar_buscador);

//Declarando variables
bars_search = document.getElementById("ctn-bars-search");
cover_ctn_search = document.getElementById("cover-ctn-search");
inputSearch = document.getElementById("inputSearch");
box_search = document.getElementById("box-search");


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
let opcionJornada
for (let i = 1; i < 39; i++) {
    opcionJornada += `<option value=${i}>${i}</option> `
    document.getElementById("select").innerHTML = `
        <select id = "jornada" name = "select" onchange="seleccion()">
        ${opcionJornada}
        </select>`
}

let eleccionJornada

function seleccion() {
    eleccionJornada = parseInt(document.getElementById("jornada").value)

    /* Tabla de resultados y clasificación */
    //Poner los resultados
    let resultados = ""
    let escudoLocal
    let escudoVisitante
    let estadio
    let tablaEscudosClasificacion = []
    let objetoEscudosClasificacion = {}
    
    fetch(urlScorers).then(function (respuesta) {
        return respuesta.json();
    }).then(function (datos) {
        //Primero se mira la jornada que quiere ver el usuario y se buscan los escudos (local y visitante) y el estadio
        for (let i = 0; i < datos.Games.length; i++) {
            if (datos.Games[i].Week == eleccionJornada) {
                escudoLocal = datos.Games[i].HomeTeamId
                escudoVisitante = datos.Games[i].AwayTeamId
                estadio = datos.Games[i].VenueId
                for (let j = 0; j < datos.Teams.length; j++) {
                    if (escudoLocal == datos.Teams[j].TeamId) {
                        objetoEscudosClasificacion.id = escudoLocal //Cogemos la ID antes de chafarla con la url del escudo
                        escudoLocal = datos.Teams[j].WikipediaLogoUrl
                        //Almacenamos en un array el ID de equipo y su escudo correspondiente para despues poder ponerlo en la clasificacion
                        objetoEscudosClasificacion = {}
                        //ID cogida cuatro lineas arriba
                        objetoEscudosClasificacion.escudo = escudoLocal
                        tablaEscudosClasificacion[j] = objetoEscudosClasificacion
                    }
                    if (escudoVisitante == datos.Teams[j].TeamId) {
                        objetoEscudosClasificacion.id = escudoVisitante //Cogemos la ID antes de chafarla con la url del escudo
                        escudoVisitante = datos.Teams[j].WikipediaLogoUrl
                        //Almacenamos en un array el ID de equipo y su escudo correspondiente para despues poder ponerlo en la clasificacion
                        objetoEscudosClasificacion = {}
                        //ID cogida cuatro lineas arriba
                        objetoEscudosClasificacion.escudo = escudoLocal
                        tablaEscudosClasificacion[j] = objetoEscudosClasificacion
                        localStorage.setItem("ClasificacionEscudos",tablaEscudosClasificacion)
                    }
                    if (estadio == datos.Teams[j].VenueId) {
                        estadio = datos.Teams[j].VenueName
                    } else if (estadio == 95) {
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
                resultados += `<tr>
                <td id="centrado">${estadio}</td>
                <td id="centrado">${dia}-${mes}-${anyo}   ${hora}</td>
                <td id="centrado"><img src="${escudoLocal}" alt="" onerror ="this.onerror=null;this.src='./Imagenes/escudo.png'" width="" height="20"></td>  
                <td id="izquierda" style="color: blue;">${datos.Games[i].HomeTeamName}</td>
                <td id="centrado">${scoreHome} : ${scoreAway}</td>
                <td id="derecha" style="color: blue;">${datos.Games[i].AwayTeamName}</td>   
                <td id="centrado"><img src="${escudoVisitante}" alt="" onerror ="this.onerror=null;this.src='./Imagenes/escudo.png'" width="" height="20"></td>
                <td id="centrado">${datos.Games[i].Status}</td>
                <td id="centrado">${scoreHome1} : ${scoreAway1}</td>
                <td id="centrado">${scoreHome2} : ${scoreAway2}</td>
                </tr>`
            }

            document.getElementById("datos").innerHTML = resultados


        }
        let roundId = datos.CurrentSeason.Rounds[0].RoundId
        let urlTable = `https://api.sportsdata.io/v3/soccer/scores/json/Standings/${roundId}?key=${keyAPI}`
        let mensajeClasificacion = ""
        let arrayClasificacion = []
        let objetoClasificacion
        fetch(urlTable).then(function (respuesta) {
            return respuesta.json();
        }).then(function (datos) {
            //Como en la API vienen desordenados los equipos respecto a su clasificación, creo un array donde los voy colocando usando su posición como indice que ocupara en el array
            for (let i = 0; i < 20; i++) {
                objetoClasificacion = {}
                objetoClasificacion.escudo = datos[i].TeamId
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
            let tablaEscudosClasificacion = localStorage.getItem("ClasificacionEscudos")
            for (let i = 0; i < arrayClasificacion.length; i++) {
                for (let j = 0; j < tablaEscudosClasificacion.length; j++) {
                    if (arrayClasificacion[i].escudo == tablaEscudosClasificacion[j].id) {
                        arrayClasificacion[i].escudo = tablaEscudosClasificacion[j].escudo
                    }
                }
            }
            //Con el array ya relleno y ordenado, se van sacando por posicion para rellenar la tabla de clasificación
            for (let i = 0; i < arrayClasificacion.length; i++) {
                if (i < 4) {
                    mensajeClasificacion += `<tr>
                <td style="background: rgba(0, 128, 0, 0.651);" id="centrado"></td>
                <td id="centrado">${arrayClasificacion[i].posicion}</td>
                <td id="centrado"><img src="${arrayClasificacion[i].escudo}" alt="" onerror ="this.onerror=null;this.src='./Imagenes/escudo.png'" width="" height="20">  ${arrayClasificacion[i].nombre}</td>
                <td id="centrado">${arrayClasificacion[i].jugados}</td>
                <td id="centrado">${arrayClasificacion[i].ganados}</td>
                <td id="centrado">${arrayClasificacion[i].empatados}</td>
                <td id="centrado">${arrayClasificacion[i].perdidos}</td>
                <td id="centrado">${arrayClasificacion[i].golesMarcados}</td>
                <td id="centrado">${arrayClasificacion[i].golesEncajados}</td>
                <td id="centrado">${arrayClasificacion[i].diferencia}</td>
                <td id="centrado">${arrayClasificacion[i].puntos}</td>
            </tr>`
                }
                else if (i >= 4 && i < 7) {
                    mensajeClasificacion += `<tr>
                    <td style="background:  rgba(255, 255, 0, 0.61);" id="centrado"></td>
                    <td id="centrado">${arrayClasificacion[i].posicion}</td>
                    <td id="centrado">${arrayClasificacion[i].nombre}</td>
                    <td id="centrado">${arrayClasificacion[i].jugados}</td>
                    <td id="centrado">${arrayClasificacion[i].ganados}</td>
                    <td id="centrado">${arrayClasificacion[i].empatados}</td>
                    <td id="centrado">${arrayClasificacion[i].perdidos}</td>
                    <td id="centrado">${arrayClasificacion[i].golesMarcados}</td>
                    <td id="centrado">${arrayClasificacion[i].golesEncajados}</td>
                    <td id="centrado">${arrayClasificacion[i].diferencia}</td>
                    <td id="centrado">${arrayClasificacion[i].puntos}</td>
                </tr>`
                }
                else if (i >= 7 && i < 17) {
                    mensajeClasificacion += `<tr>
                    <td style="background: white;" id="centrado"></td>
                    <td id="centrado">${arrayClasificacion[i].posicion}</td>
                    <td id="centrado">${arrayClasificacion[i].nombre}</td>
                    <td id="centrado">${arrayClasificacion[i].jugados}</td>
                    <td id="centrado">${arrayClasificacion[i].ganados}</td>
                    <td id="centrado">${arrayClasificacion[i].empatados}</td>
                    <td id="centrado">${arrayClasificacion[i].perdidos}</td>
                    <td id="centrado">${arrayClasificacion[i].golesMarcados}</td>
                    <td id="centrado">${arrayClasificacion[i].golesEncajados}</td>
                    <td id="centrado">${arrayClasificacion[i].diferencia}</td>
                    <td id="centrado">${arrayClasificacion[i].puntos}</td>
                </tr>`
                }

                else {
                    mensajeClasificacion += `<tr>
                    <td style="background: rgba(255, 0, 0, 0.575);" id="centrado"></td>
                    <td id="centrado">${arrayClasificacion[i].posicion}</td>
                    <td id="centrado">${arrayClasificacion[i].nombre}</td>
                    <td id="centrado">${arrayClasificacion[i].jugados}</td>
                    <td id="centrado">${arrayClasificacion[i].ganados}</td>
                    <td id="centrado">${arrayClasificacion[i].empatados}</td>
                    <td id="centrado">${arrayClasificacion[i].perdidos}</td>
                    <td id="centrado">${arrayClasificacion[i].golesMarcados}</td>
                    <td id="centrado">${arrayClasificacion[i].golesEncajados}</td>
                    <td id="centrado">${arrayClasificacion[i].diferencia}</td>
                    <td id="centrado">${arrayClasificacion[i].puntos}</td>
                </tr>`
                }
            }
            document.getElementById("clasificacion").innerHTML = mensajeClasificacion
        })

    })
}

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
    let resultados = ""
    let escudoLocal
    let escudoVisitante
    let estadio
    fetch(urlScorers).then(function (respuesta) {
        return respuesta.json();
    }).then(function (datos) {

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
                } else {
                    dia = "??"
                    mes = "??"
                    anyo = "????"
                    hora = "??:??"
                    scoreHome = "-"
                    scoreAway = "-"
                }
                resultados += `<tr>
                <td id= "centrado">${estadio}</td>
                <td id="centrado">${dia}-${mes}-${anyo}   ${hora}</td>
                <td id="izquierda"><img src="${escudoLocal}" alt="" onerror ="this.onerror=null;this.src='./Imagenes/escudo.png'" width="" height="20">   ${datos.Games[i].HomeTeamName}</td>
                <td id="centrado">${datos.Games[i].HomeTeamScore / 3} : ${datos.Games[i].AwayTeamScore / 3}</td>
                <td id="derecha">${datos.Games[i].AwayTeamName}   <img src="${escudoVisitante}" alt="" onerror ="this.onerror=null;this.src='./Imagenes/escudo.png'" width="" height="20"></td>
                <td id="centrado">${datos.Games[i].Status}</td>
                <td id="centrado">${datos.Games[i].HomeTeamScorePeriod1 / 3} : ${datos.Games[i].AwayTeamScorePeriod1 / 3}</td>
                <td id="centrado">${datos.Games[i].HomeTeamScorePeriod2 / 3} : ${datos.Games[i].AwayTeamScorePeriod2 / 3}</td>
                </tr>`
            }

            document.getElementById("datos").innerHTML = resultados
        }

    })
}



/* datos.Games[i].AwayTeamId  datos.Teams[i].TeamId
datos.Games[i].HomeTeamId  datos.Teams[i],VenueId
datos.Games[i].VenueId     datos.Teams[i].VenueName */

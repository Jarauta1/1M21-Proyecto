/* Key API */
let keyAPI = `ca8085723da84292925bffc2a1ffb106`

//Declarando variables
let teamId = localStorage.getItem("teamId")
let competitionId = localStorage.getItem("CompetitionId")
let url = `https://api.sportsdata.io/v3/soccer/scores/json/CompetitionDetails/${competitionId}?key=${keyAPI}` //Obtener url's para adquirir la info

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
            } else {
                
            }
        }
    }
})

//Declarando variables


let urlSearch = `https://api.sportsdata.io/v3/soccer/scores/json/MembershipsByCompetition/${competitionId}?key=${keyAPI}`
let urlScorers = `https://api.sportsdata.io/v3/soccer/scores/json/CompetitionDetails/${competitionId}?key=${keyAPI}`
let mensaje = "" //String para publicar escudos en el header
let lista = "" //String para publicar nombres jugadores en la búsqueda





//Venues: util
//Team seasons Stats: util para usar en pagina de equipo (estadisticas, etc)
//Box score: util, estadisticas por partido (goleadores, amarillas, titulares, etc)


//Box scores by date by competition: ¿util? estadisticas de los partidos de un dia en concreto
//Player game stats by player: util, estadisticas jugardor en el partido del dia

//Player: mismos datos que en Competition Fixtures (league details), donde estan todos los jugadores por competicion (mejor)
//Player by team: igual que arriba
//Teams: mismos datos que en competition fixtures
//Games by date: mismo que en competition fixtures pero con mejor ajuste en los resultados
//Schedule: calendario, partidos




//Player season stats: util, estadisticas de todos los jugadores por temporada
//Player season stats by player: util, como arriba pero solo del jugador indicado
//Player season stats by team: util, como arriba pero de todos los miembros de un equipo




//Pre-game odds line movement
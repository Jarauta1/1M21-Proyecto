let country = localStorage.getItem("country")
let league = localStorage.getItem("league")
let competitionId = localStorage.getItem("CompetitionId")
let icon = `<link rel="icon" type="image/png" href="./Imagenes/logo ${country}.png"/>`
let name = `<title>${league}</title>`
let image = `<img src="./Imagenes/logo ${country}.png" alt="" width = "50" height = "50">`
document.getElementById("head").innerHTML = icon + name
document.getElementById("imagen").innerHTML = image

let url = `https://api.sportsdata.io/v3/soccer/scores/json/CompetitionDetails/${competitionId}?key=97f0b074e3b6459480ee0008efaf6d37`

let mensaje = ""

fetch(url).then(function (respuesta) {
   return respuesta.json();
}).then(function (datos) {
   for (let i = 0; i < datos.Teams.length; i++) {
      mensaje += `<a href="./team.html" onclick=team("${datos.Teams[i].TeamId}")><img src="${datos.Teams[i].WikipediaLogoUrl}" title="${datos.Teams[i].Name}" value="${datos.Teams[i].TeamId}" onerror ="this.onerror=null;this.src='./Imagenes/escudo.png'" width="" height ="40"></a>`
   }
   document.getElementById("shields").innerHTML = mensaje

})

function team(teamId) {
   localStorage.setItem("teamId", teamId)
}
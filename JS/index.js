let seleccion = {}
let mensaje = ""
let i
let liga = "liga"
let x

document.getElementById("tarjeta1").innerHTML = `<div id="league">
<img id="logo" src="./Imagenes/logo Spain.png" width="" height="">
<hr>
<nav class="nav-bar"><div class="nav-item"><h1 class="text">LET'S PLAY</h1></div></nav>
</div>`
document.getElementById("tarjeta2").innerHTML = `<div id="league">
<div><img id="logo" src="./Imagenes/logo England.png" width="" height=""></div>
<hr>
<nav class="nav-bar"><div class="nav-item"><h1 class="text">LET'S PLAY</h1></div></nav>
</div>`
document.getElementById("tarjeta3").innerHTML = `<div id="league">
<div><img id="logo" src="./Imagenes/logo Germany.png" width="" height=""></div>
<hr>
<nav class="nav-bar"><div class="nav-item"><h1 class="text">LET'S PLAY</h1></div></nav>
</div>`
document.getElementById("tarjeta4").innerHTML = `<div id="league">
<div><img id="logo" src="./Imagenes/logo Italy.png" width="" height="}"></div>
<hr>
<nav class="nav-bar"><div class="nav-item"><h1 class="text">LET'S PLAY</h1></div></nav>
</div>`
document.getElementById("tarjeta5").innerHTML = `<div id="league">
<div><img id="logo" src="./Imagenes/logo France.png" width="" height=""></div>
<hr>
<nav class="nav-bar"><div class="nav-item"><h1 class="text">LET'S PLAY</h1></div></nav>
</div>`
document.getElementById("tarjeta6").innerHTML = `<div id="league">
<div><img id="logo" src="./Imagenes/logo Netherland.png" width="" height=""></div>
<hr>
<nav class="nav-bar"><div class="nav-item"><h1 class="text">LET'S PLAY</h1></div></nav>
</div>`



function entrar(country) {
    fetch("https://api.sportsdata.io/v3/soccer/scores/json/Areas?key=97f0b074e3b6459480ee0008efaf6d37").then(function (respuesta) {
        return respuesta.json();
    }).then(function (datos) {
        if (country == "Spain") {
            location.href = './league.html'
            localStorage.setItem("country", country)
            localStorage.setItem("league", datos[17].Competitions[0].Name)
            localStorage.setItem("CompetitionId", datos[17].Competitions[0].CompetitionId)
        }
        else if (country == "England") {
            location.href = './league.html'
            localStorage.setItem("country", country)
            localStorage.setItem("league", datos[9].Competitions[0].Name)
            localStorage.setItem("CompetitionId", datos[9].Competitions[0].CompetitionId)
        }
        else if (country == "France") {
            location.href = './league.html'
            localStorage.setItem("country", country)
            localStorage.setItem("league", datos[10].Competitions[0].Name)
            localStorage.setItem("CompetitionId", datos[10].Competitions[0].CompetitionId)
        }
        else if (country == "Italy") {
            location.href = './league.html'
            localStorage.setItem("country", country)
            localStorage.setItem("league", datos[13].Competitions[0].Name)
            localStorage.setItem("CompetitionId", datos[13].Competitions[0].CompetitionId)
        }
        else if (country == "Germany") {
            location.href = './league.html'
            localStorage.setItem("country", country)
            localStorage.setItem("league", datos[11].Competitions[0].Name)
            localStorage.setItem("CompetitionId", datos[11].Competitions[0].CompetitionId)
        }
        else if (country == "Netherland") {
            location.href = './league.html'
            localStorage.setItem("country", country)
            localStorage.setItem("league", datos[15].Competitions[0].Name)
            localStorage.setItem("CompetitionId", datos[15].Competitions[0].CompetitionId)
        }
    })
}
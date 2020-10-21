/* Key API */
let keyAPI = `a4b5874dd1a64312a327ffc71e8ec755`

//Funcion para ir a la liga seleccionada
function entrar(country) { //El string recibido se almacena en la variable "country"
    //Llamada a la API, enlace "Áreas" para obtener nombre e ID de cada liga
    fetch(`https://api.sportsdata.io/v3/soccer/scores/json/Areas?key=${keyAPI}`).then(function (respuesta) {
        return respuesta.json();
    }).then(function (datos) {
        //Condicional para comprobar que la llamada se ha ejecutado correctamente, en caso de fallo muestra el mensaje que nos trasmite la API
        if (datos.statusCode) {
            window.alert(datos.message)
        } else {
            //Condicional para comparar la variable de la función
            if (country == "Spain") {
                location.href = './league.html' //Página a la que nos lleva la función
                localStorage.setItem("country", country) //Se guarda en local el nombre del país para posterior utilización
                localStorage.setItem("league", datos[17].Competitions[0].Name) //Se guarda en local el nombre de la liga (dado por la API) para posterior utilización
                localStorage.setItem("CompetitionId", datos[17].Competitions[0].CompetitionId) //Se guarda en local la ID de la liga (dado por la API) para poder incluirlo posteriormente en enlaces para llamadas a la API
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
        }
    })
}
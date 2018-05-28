const https = require('https');
let eventos;
let i = 0;
let t;

https.get('https://gist.githubusercontent.com/sunmedia-tv/60036547f107d748386d46f7afb498c0/raw/c6e8582246bfce8a93f4626bc952aedafdd624a7/test.json', (resp) => {
    let data = '';
    let EventosFiltrados;
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        eventos = Eventos(JSON.parse(data));
        newTimer()
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});
function Eventos(data) {
    let events = data.events;
    let types = data.types;
    let nuevoEventos = []
    nuevoEventos = events.filter((e) => {

        if (types.indexOf(e.type) >= 0) {
            return true
        } else {
            return false
        }
    });
    return nuevoEventos;
}

function newTimer() {
    eventos.forEach((e,index,eventos) => {
        if(e.second == i){
            console.log(`At second ${e.second}: {type: "${e.type}", message: "${e.message}"}`)
            eventos.splice(index,1);
        }
    });
    i++;
    t = setTimeout(newTimer, 1000);
    if (eventos.length == 0) {
        clearTimeout(t);
    } 

}

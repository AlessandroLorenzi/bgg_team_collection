var games = []
var players = []

function fetch_games (){
    $.getJSON( "games.json", function( data ) {
        games = data['games'];
        players = data['players'];
        sort_games_by_rate()
        reload_games();
    });
}

function reload_games(){
    document.getElementById("games").innerHTML= "";

    var e = document.getElementById("owner");
    var owner = e.options[e.selectedIndex].value;


    var e = document.getElementById("players");
    var players = parseInt(e.value);
    for (var i in games){
        game = games[i];
        if
        ( (game['owner'] == owner || owner == '') &&
          (!(players >0) || (parseInt(game['stats']['minplayers'])<= players && players <= parseInt(game['stats']['maxplayers'])) )
        ){
            put_games(game);
        }
    }

}


function put_games(game){
    var div_game = document.createElement("div");
    div_game.setAttribute('class', 'game')
    div_game.innerHTML += "<h2>"+game['name']+"</h2>";
    div_game.innerHTML += "<img src=\""+ game['thumbnail']+"\"/>";
    div_game.innerHTML += "<p>";
    div_game.innerHTML += "Proprietario: "+ game['owner'] +"</br>";
    div_game.innerHTML += "Rating: "+ game['rating'] +"</br>";
    div_game.innerHTML += "</p>";
    document.getElementById("games").appendChild(div_game);  
}

function sort_games_by_rate(){
    sorted_games = [];
    while (games.length != 0) {
        alpha = games.pop();
        for(var i=0; i < games.length; i++){
            beta = games[i]
            if(parseFloat(alpha.rating) < parseFloat(beta.rating)){
                alpha = [games[i], games[i]=alpha][0]; 
            }
        }
        sorted_games.push(alpha);
    }
    games = sorted_games;
}

fetch_games()
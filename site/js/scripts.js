var games = []
var selected_games = []
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

    var e = document.getElementById("players");
    var players = parseInt(e.value);
    for (var i in games){
        game = games[i];
        if
        ( check_owner(game) && check_number_gamers(game)
        ){
            put_games(game);
        }
    }

}

function check_owner(game){
    var e = document.getElementById("owner");
    if (e.selectedOptions.length == 0){
        return true
    }
    for(var i=0; i < e.selectedOptions.length; i++){
        owner = e.selectedOptions[i].value;
        if (game['owner'] == owner) {
            return true;
        }
    }
    

    return false;
}

function check_number_gamers(game){
    var e = document.getElementById("players");
    var players = e.value;

    return  (!(players >0) || (parseInt(game['stats']['minplayers'])<= players && players <= parseInt(game['stats']['maxplayers'])) )
          
}

function check_number_gamers(game){
    var e = document.getElementById("gamename");
    var gamename = e.value;

    if (gamename.length < 3){ return true; }
    if (game.name.toUpperCase().indexOf(gamename.toUpperCase()) == -1 ){
        return false
    }

    return  true
}

function put_games(game){
    var div_game = document.createElement("div");
    div_game.setAttribute('class', 'game')
    div_game.innerHTML += "<h2>"+game['name']+"</h2>";
    div_game.innerHTML += "<img src=\""+ game['thumbnail']+"\"/>";
    div_game.innerHTML += "<p>";
    div_game.innerHTML += "Proprietario: "+ game['owner'] +"</br>";
    div_game.innerHTML += "Rating: "+ game['rating'] +"</br>";

    for (var i = 0; i < game.family.length; i++ ){
        div_game.innerHTML += "Tipologia: "+ game.family[i]+ "</br>";    
    } 
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


$(document).ready(function() {
    fetch_games()
    $('#owner').multiselect({onChange:  function(element, checked) {
            reload_games()
    }} );
});
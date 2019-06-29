function reload_games(){
    document.getElementById("games").innerHTML= "";

    var e = document.getElementById("owner");
    var owner = e.options[e.selectedIndex].value;


    var e = document.getElementById("players");
    var players = parseInt(e.value);


    $.getJSON( "games.json", function( data ) {
        data['games'].forEach(function(game){
            if
            ( (game['owner'] == owner || owner == '') &&
              (!(players >0) || (parseInt(game['stats']['minplayers'])<= players && players <= parseInt(game['stats']['maxplayers'])) )
            ){
                put_games(game);
            }
        });
    });
}


function put_games(game){
    var div_game = document.createElement("div");
    div_game.setAttribute('class', 'game')
    div_game.innerHTML += "<h2>"+game['name']+"</h2>";
    div_game.innerHTML += "<img src=\""+ game['thumbnail']+"\"/>";
    div_game.innerHTML += "<p>";
    div_game.innerHTML += "Proprietario: "+ game['owner'] +"</br>";
    div_game.innerHTML += "</p>";
    document.getElementById("games").appendChild(div_game);  
}


reload_games()
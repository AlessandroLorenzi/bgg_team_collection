var games = []
var selected_games = []
var players = []
var counter = 0

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
    counter = 0

    var e = document.getElementById("players");
    var players = parseInt(e.value);
    for (var i in games){
        game = games[i];
        if
        ( check_owner(game) && check_number_gamers(game) && check_gamename(game)
        ){
            counter +=1;
            put_games(game);
        }
    }
    console.log(counter)
    document.getElementById('counter').innerHTML = counter;

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

function check_gamename(game){
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
    div_game.setAttribute('class', 'game row')

    content = ""
    content += "<div class=\"col-lg-2 gamethumb\" >"
    content += "<img src=\""+ game['thumbnail']+"\"/>";
    content += "</div>"
    content += "<div class=\"col-lg-1 block\">"
    content += "<div class=\"circle rating"+ rating_color(game['rating']) +"\" \">"
    content += "<p>" +Number(parseFloat(game['rating']).toFixed(2)) + "</p>"
    content += "</div>"
    content += "</div>"
    content += "<div class=\"col\">"
    content += "<strong><a target=\"_new\" href=\"https://boardgamegeek.com/boardgame/"+game['id']+"\">"+game['name']+"</a></strong><br />";
    content += "Proprietario: "+ game['owner'] +"</br>";

    for (var i = 0; i < game.family.length; i++ ){
        content += "Tipologia: "+ game.family[i]+ "</br>";    
    } 
    content += "</div>"
    div_game.innerHTML = content

    document.getElementById("games").appendChild(div_game); 

    function rating_color(rating){
        var frating = parseFloat(rating)
        if (frating > 7.0) {
            return "high"
        } else if (frating > 6.0) {
            return "medium"
        }
        return "low";
    }
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
deploy:
	git pull;  ./src/bgg_team_collection.py > site/games.json;  sudo rsync -av ./site/ /srv/cccplayers/team_collection/ ;

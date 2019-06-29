#!/usr/bin/env python3.7
from bggcollection import BGGCollection
from pprint import pprint
import json


def join_games(games):
    team_games=[]
    for user in games.keys():
        for game in games[user]['items']['item']:

            pretty_game = {
                'owner': user,
                'id': game['@collid'],
                'thumbnail': game['thumbnail'],
                'name': game['name']['#text'],
                'yearpublished': game.get('yearpublished'),
                'stats': {
                    'minplayers':  game['stats'].get('@minplayers'),
                    'maxplayers':  game['stats'].get('@maxplayers'),
                    'minplaytime': game['stats'].get('@minplaytime'),
                    'maxplaytime': game['stats'].get('@maxplaytime'),
                    'playingtime': game['stats'].get('@playingtime')
                },
                'rating': game['stats']['rating']['usersrated'],
                'family': []
            }
            try:
                for rank in game['stats']['rating']['ranks']['rank'][1:]:
                    pretty_game['family'].append( rank['@name'])
            except:
                pass

            team_games.append(pretty_game)
    return team_games
        


if __name__ == '__main__':
    team = ['alorenzi', 's2488', 'iltommy', 'deferu', 'Ruzzante']
    games = {}
    for person in team:
        bggc = BGGCollection(person)
        bggc.retrive_collection()
        games[person] = bggc.games

    team_games = json.dumps({'team': team, 'games': join_games(games)})
    print(team_games)
    
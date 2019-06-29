
import requests
import xmltodict
import time

class BGGCollection():
    # Retrive user collection
    ready = False
    games = {}

    def __init__(self, user):
        # initialize variables
        url = "https://api.geekdo.com/xmlapi2/collection?username=%s&own=1&subtype=boardgame&stats=1"
        # url = "https://cccplayers.club/%s.xml"
        self.url = url % user
        pass
    
    def retrive_collection(self):
        # Get the collection
        while self.ready == False:
            res = requests.get(self.url)
            if res.status_code == 200:
                self.games = xmltodict.parse(res.text)
                self.ready = True
                break
            time.sleep(1)

    
        
        
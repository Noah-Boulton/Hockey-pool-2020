# Script to get all current NHL player data
import requests
import json
import csv
import gspread
from oauth2client.service_account import ServiceAccountCredentials

player_ids = []

scope = ['https://spreadsheets.google.com/feeds',
         'https://www.googleapis.com/auth/drive']

credentials = ServiceAccountCredentials.from_json_keyfile_name('Mo\'s Hockey Hos-c2a22ebeb71a.json', scope)
gc = gspread.authorize(credentials)
wks = gc.open("master").sheet1
cell_list = wks.range('F1:F425')

player_ids = wks.col_values(2)
print(len(player_ids))
for i in range(1, len(player_ids)):
    p_id = player_ids[i]
    player = requests.get('https://statsapi.web.nhl.com/api/v1/people/'+ str(p_id))
    player = player.json()
    pos = "F"
    pv = 1
    if(player['people'][0]['primaryPosition']['type'] == 'Defenseman'):
        pos = "D"
    if(player['people'][0]['primaryPosition']['type'] == 'Goalie'):
        pos = "G"

    stats = requests.get('https://statsapi.web.nhl.com/api/v1/people/' + str(p_id) + '/stats?stats=statsSingleSeason&season=20182019')
    stats = stats.json()
    if(stats['stats'][0]['splits']):
        stats = stats['stats'][0]['splits'][0]['stat']
        if(pos == "F"):
            pv = round(((2*stats['goals'] + stats['assists'])/stats['games']+1)*0.9)
        elif(pos == "D"):
            pv = round(((2*stats['goals'] + stats['assists'])/stats['games']+1)*0.95)
        elif(pos == "G"):
            pv = round(((2*stats['shutouts'] + stats['wins'])/stats['games']+1)*1.75)
    if(pv > 4):
        pv = 4
    if(pv < 1):
        pv = 1
    cell_list[i].value = pv
wks.update_cells(cell_list)
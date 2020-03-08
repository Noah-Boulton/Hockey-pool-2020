# Mo's Top Hoser's 2020 Hockey Pool
> SPA built using MVEN stack
## Quick Start

```bash
# Install Server Dependencies
npm install

# Start Express Server: http://localhost:5000
npm run dev

# Install Frontend Dependencies
cd client
npm install 

# Start Vue DevServer: http://localhost:8080
npm run serve
```

## TODO
- [ ] Make moshockeyhos.ca redirect to moshockyhosers.ca - ESIZ
- [ ] Use Player Values from Sportsnet - NORO
- [ ] Fix colouring on Standings page & try having logo to the left of team names and bolded  - ESIZ
- [ ] Fix broken easter eggs - NORO/MO
- [ ] Test out whole site - WHOLE TEAM
- [ ] Rework written content - MO
- [ ] Make the text larger on standings page and move it beside the image
- [ ] Display player name selected in the "search" bar when making a team- ESIZ
- [ ] Add "Top Ho's" hockey card display  where top 3 scorers are displayed as hockey cards - ESIZ/NORO
- [ ] Make site more mobile friendly - ESRAH
- [ ] Get Jay Baruchel/other celesbians - MO
- [ ] GTA Wasted "Hosed" Graphic (For team/player being eliminated) - MO
- [ ] Make podcast player that is similar to a Spotify type player that stays at the bottom of the page and scrolls with you as you navigate - WHOLE TEAM
- [ ] Add eliminated tag to each player on a team so the player image can be updated with "Hosed" stamp
- [ ] Style soundcloud page
- [ ] Add new display for each team 
- [ ] Figure out a way to add chirps and chatter (Maybe comments on teams page)
- [ ] Make hockey card layout
- [ ] Clean up code - NORO
- [x] Change logo selection to drop down - ESIZ/NORO 
- [x] Hide Standings & Teams pages before we go live
- [x] Add a hyperlink to The Ho's page at the end of rule 1 where it says "here" 
- [x] Change tie breaker to fights
- [x] Podcast turned to extras page
- [x] Make "The Ho's Page" paged- Change list of players to loading 25 names per page
- [x] Make a "Your Team Has Been Submitted" throwaway page that you are redirected to when submit a team successfully 
- [x] Figure out how to track goalie goals and assists
- [x] Fix player and team update errors to reduce database calls
- [x] Add team dropdown on click for each team on the standings page
- [x] Toggle `data-sort` between `asc` and `desc` (or remove) on `<th>` w/ class `sortable`
- [x] Style error p element on team submission page
- [x] Make team points div sticky
- [x] Add heading highlight on sort for players page
- [x] Add penalty box to standings page
- [x] Add images to errors div on team submission page
- [x] Add winning team from previous years top ho's and record books
- [x] Automatically send email after team submission
- [x] Add email to team submission page
- [x] Add equal rank to tied teams on standings page
- [x] Move menu to beside the logo and shrink logo size to gain vertical space
- [x] Add a point total on upper card for team page
- [x] Merge "The Record Books" and "Mo's Top Ho's" into a single page
- [x] Add more records
- [x] Prevent form from reloading page when there are errors
- [x] Sort player stats based on header click

## Database Setup
Create a .env file in the root directory and add your mongoDB connection string.
```
DATABASE_CONNECTION_STRING = 'your_connection_string'
```

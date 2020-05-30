import axios from 'axios';

const url = 'api/teams/';

class TeamsService {
    // Get Teams
    static getTeams() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;

                resolve(
                    data.map(team => ({
                        ...team,
                        createdAt: new Date(team.createdAt)
                    }))
                );
            } catch(err) {
                reject(err);
            }
        });
    }

    // Create Team
    static insertTeam(team) {
        return axios.post(url, {team});
    }

    static getStandings() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                var standings = [];

                data.forEach(team => {
                    standings.push({name:team.name, points:team.points, sid:team.sid, team:team.team});
                });

                standings = standings.sort((a,b) => {
                    if(b.points > a.points) return 1
                    if(b.points < a.points) return -1
                    if(b.tie_breaker > a.tie_breaker) return 1
                    if(b.tie_breaker < a.tie_breaker) return -1
                });
                
                resolve(standings);
            } catch(err) {
                reject(err);
            }
        });
    }
}

export default TeamsService;
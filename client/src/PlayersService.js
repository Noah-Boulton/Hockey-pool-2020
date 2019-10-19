import axios from 'axios';

const url = 'api/players/';

class PlayersService {
    // Get Teams
    static getPlayers() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                resolve(res.data);
            } catch(err) {
                reject(err);
            }
        });
    }

    static getPlayersArrays() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const forwards = res.data.filter(player => player.pos == "F");
                const defensemen = res.data.filter(player => player.pos == "D");
                const goalies = res.data.filter(player => player.pos == "G");
                resolve(
                    [forwards, defensemen, goalies]
                );
            } catch(err) {
                reject(err);
            }
        })
    }
}

export default PlayersService;
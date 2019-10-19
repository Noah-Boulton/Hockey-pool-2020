import axios from 'axios';

const url = 'api/players/';

class PlayersService {
    // Get Teams
    static getPlayers() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                resolve(res.data);
                //     data
                //     // data.map(player => ({
                //     //     ...player,
                //     // }))
                // );
            } catch(err) {
                reject(err);
            }
        });
    }

    static getPlayersByType(pos) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                resolve(
                    res.data.filter(player => player.pos == pos)
                );
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
                    {forwards:forwards, defensemen: defensemen, goalies:goalies}
                );
            } catch(err) {
                reject(err);
            }
        })
    }
}

export default PlayersService;
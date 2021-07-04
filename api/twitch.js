const axios = require("axios");
const secrets = require("./secrets.json");

async function getTwitchAccessToken() {
    req = await axios.post("https://id.twitch.tv/oauth2/token?client_id="+secrets.twitch_client_id+"&client_secret="+secrets.twitch_client_secret+"&grant_type=client_credentials");
    res = req.data;
    console.log(res);
}

getTwitchAccessToken()

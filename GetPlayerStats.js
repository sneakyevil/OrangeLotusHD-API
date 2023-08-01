const HTTPS = require("https");

const m_PlayerStatsID = "76561198003513882"; // SteamID to get stats of
const m_AuthTicketData = ""; // SteamUser->GetEncryptedAppTicket & Base64Encode
const m_AuthTicketID = ""; // SteamID of EncryptedAppTicket

const m_ReqOptions = {
    hostname: "orangelotushd.os.eidos.com",
    port: 443,
    path: "/game/GetPlayerStats?s_Pid='" + m_PlayerStatsID + "'&i32_LB=0&i32_Tail=0&s_Receiver=0",
    method: "GET",
    headers: {
        "Accept": "application/json",
        "Accept-Encoding": "identity;q=1.0, deflate;q=0",
        "OS-BuildID": "492282",
        "OS-Game": "orangelotushd",
        "OS-GameVersion": "1.0.0.492282",
        "OS-Platform": "Steam",
        "OS-AuthProvider": 6,
        "OS-AuthTicketSize": m_AuthTicketData.length,
        "OS-AuthTicketData": m_AuthTicketData,
        "DataServiceVersion": "2.0",
        "MaxDataServiceVersion": "2.0",
        "OS-UID": m_AuthTicketID,
    }
}

const m_Req = HTTPS.request(m_ReqOptions, p_Res => 
{
    var g_Body = "";
    p_Res.on("data", (chunk) => {
        g_Body += chunk;
    });

    p_Res.on("end", () => {
        console.log(g_Body);
    });
});

m_Req.on("error", (err) => {
  console.log("[ ! ] Received Error: " + err);
})

m_Req.end();

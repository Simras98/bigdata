const express = require("express");
const axios = require("axios");
const redis = require("redis");
const app = express();

let client = redis.createClient(6379);

function toggleClient(c) {
    if(c.connection_options.port === 6379) {
        client = redis.createClient(6380);
        console.log("Node server switched");
        console.log("Node server : client6380");
    }
    else {
        client = redis.createClient(6379);
        console.log("Node server switched");
        console.log("Node server : client6379");
    }
    client.on("error", () => {
        client.quit();
        toggleClient(client);
    })
}

client.on("error", () => {
    client.quit();
    toggleClient(client);
})

app.get("/company", (req, res) => {
    const searchTerm = req.query.city;
    try {
        client.get(searchTerm, async (err, jobs) => {
            if (err) throw err;

            if (jobs) {
                res.status(200).send({
                    jobs: JSON.parse(jobs),
                    message: "data retrieved from the cache"
                });
            } else {
                const result = await axios.get(`https://entreprise.data.gouv.fr/api/sirene/v1/full_text/${searchTerm}`);
                client.setex(searchTerm, 600, JSON.stringify(result.data));
                res.status(200).send({
                    jobs: result.data,
                    message: "cache miss"
                });
            }
        });
    } catch (err) {
        res.status(500).send({message: err.message});
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Node server started");
});

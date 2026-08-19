
import https from "https";
import fs from "fs";
import selfsigned from "selfsigned";


async function startServer() {

    const attrs = [
        {
            name: "commonName",
            value: "localhost"
        }
    ];

    const pems = await selfsigned.generate(attrs, {
        keyType: "rsa",
        keySize: 2048,
        algorithm: "sha256",
        notAfterDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
    });

    const options = {
        key: pems.private,
        cert: pems.cert
    };

    const server = https.createServer(options, (req, res) => {

        if (req.method === "GET" && req.url === "/") {

            const page = fs.readFileSync("index.html");

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end(page);
            return;
        }

        if (req.method === "POST" && req.url === "/login") {

            let body = "";

            req.on("data", chunk => {
                body += chunk.toString();
            });

            req.on("end", () => {

                console.log("HTTPS login received.");

                res.writeHead(200, {
                    "Content-Type": "text/html"
                });

                res.end(`
                    <h2>Login Submitted</h2>
                    <p>Dummy credentials received over HTTPS.</p>
                    <a href="/">Go Back</a>
                `);
            });

            return;
        }

        res.writeHead(404);
        res.end("Not Found");
    });

    server.listen(8443, "127.0.0.1", () => {
        console.log("HTTPS server running at:");
        console.log("https://127.0.0.1:8443");
    });
}

startServer().catch(error => {
    console.error("Failed to start HTTPS server:");
    console.error(error);
});
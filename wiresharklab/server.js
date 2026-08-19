import http from "http";
import fs from "fs";

const PORT = 8000;

const server = http.createServer((req, res) => {

    // Display login page
    if (req.method === "GET" && req.url === "/") {
        const page = fs.readFileSync("index.html");

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(page);
        return;
    }

    // Receive dummy login
    if (req.method === "POST" && req.url === "/login") {

        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {

            console.log("Received login data:");
            console.log(body);

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end(`
                <h2>Login Submitted</h2>
                <p>Dummy credentials received.</p>
                <p>Check Wireshark to analyze the HTTP POST request.</p>
                <a href="/">Go Back</a>
            `);
        });

        return;
    }

    res.writeHead(404);
    res.end("Not Found");
});

server.listen(PORT, "127.0.0.1", () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
});
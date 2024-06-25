import https from "https";

const url = `/bot${process.env.TOKEN}/sendMessage`;
const payload = JSON.stringify({
  chat_id: process.env.TO,
  text: "Hello world",
  parse_mode: "HTML",
});

const options = {
  hostname: "api.telegram.org",
  port: 443,
  path: url,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(payload),
  },
};

console.log("Posting message to Telegram channel...");

const req = https.request(options, (res) => {
  let data = "";

  // Collect response data
  res.on("data", (chunk) => {
    data += chunk;
  });

  // Handle end of response
  res.on("end", () => {
    const response = JSON.parse(data);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log("Successfully posted message to Telegram channel");
    } else {
      console.log("Error:", response.description);
    }
  });
});

// Handle request errors
req.on("error", (error) => {
  console.error("Error sending request:", error);
});

// Write data to request body
req.write(payload);
req.end();
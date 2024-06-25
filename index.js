import fetch from "node-fetch";

const url = `https://api.telegram.org/bot${process.env.TOKEN}/sendMessage`;
const payload = {
  chat_id: process.env.TO,
  text: "Hello world",
};
console.log("Posting message to Telegram channel...");
fetch(url, {
  method: "POST",
  body: JSON.stringify(payload),
  headers: {
    "content-type": "application/json",
  },
}).then(async (res) => {
  const data = await res.json();
  if (!res.ok) {
    console.log("Error: %s", data.description);
    return;
  }
  console.log("Successfully");
});

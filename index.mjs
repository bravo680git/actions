import https from "https";

const generateMsg = ({
  status,
  repo,
  wfName,
  jobName,
  runId,
  branch,
}) => {
  const icon = status === "success" ? "🎉🎉🎉" : "❌❌❌";
  const url = `https://github.com/${repo}/actions/runs/${runId}`;
  return `
  ${icon} ${wfName} ${icon}
  <b>Repository: </b>${repo}
  <b>Branch: </b>${branch}
  <b>Job: </b>${jobName}
  <b>Status: </b>${status}
  <a href="${url}">${url}</a>
  `;
};

const url = `/bot${process.env.TOKEN}/sendMessage`;
const payload = JSON.stringify({
  chat_id: process.env.TO,
  text: generateMsg({
    branch: process.env.BRANCH,
    jobName: process.env.JOB_NAME,
    repo: process.env.REPO,
    runId: process.env.RUN_ID,
    status: process.env.STATUS,
    wfName: process.env.WF_NAME,
  }),
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

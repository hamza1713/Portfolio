import "dotenv/config";
import fs from "node:fs";
import path from "node:path";

const command = process.argv[2] || "help";

async function runHealthcheck() {
  console.log("\n🔍 Running Portfolio Health & Availability Check...\n");

  const links = [
    { name: "Portfolio Homepage (Local)", url: "http://localhost:3000/" },
    { name: "FinSight GitHub Repo", url: "https://github.com/hamza1713/Enterprise-RAG-Chatbot-with-Role-Base-Access-Control-" },
    { name: "AI Code Review Agent Repo", url: "https://github.com/hamza1713/AI-Code-Review-Agent" },
    { name: "Factscope AI Repo", url: "https://github.com/hamza1713/Factscope-AI" },
    { name: "Hamza LinkedIn Profile", url: "https://www.linkedin.com/in/hamza-ali-b9b8b22a6" },
  ];

  for (const item of links) {
    const start = Date.now();
    try {
      const res = await fetch(item.url, { method: "HEAD", signal: AbortSignal.timeout(6000) });
      const elapsed = Date.now() - start;
      const statusIcon = res.status < 400 ? "✅" : "⚠️";
      console.log(`${statusIcon} ${item.name.padEnd(35)} -> HTTP ${res.status} (${elapsed}ms)`);
    } catch (err) {
      const elapsed = Date.now() - start;
      console.log(`❌ ${item.name.padEnd(35)} -> FAILED (${elapsed}ms): ${err.message}`);
    }
  }

  // Check Gemini Assistant Latency
  console.log("\n🤖 Testing AI Portfolio Assistant Endpoint Latency...");
  const tStart = Date.now();
  try {
    const res = await fetch("http://localhost:3000/api/trpc/portfolioAssistant.ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        json: { question: "What is Hamza's educational background?", history: [] },
      }),
      signal: AbortSignal.timeout(10000),
    });
    const elapsed = Date.now() - tStart;
    if (res.ok) {
      const data = await res.json();
      const answer = data?.result?.data?.json?.answer || "";
      console.log(`✅ Assistant Responded in ${elapsed}ms: "${answer.slice(0, 80).replace(/\n/g, " ")}..."`);
    } else {
      console.log(`⚠️ Assistant returned HTTP ${res.status} (${elapsed}ms)`);
    }
  } catch (err) {
    console.log(`⚠️ Assistant healthcheck skipped (Server might not be running on port 3000): ${err.message}`);
  }

  console.log("\n✨ Healthcheck Complete.\n");
}

async function runEval() {
  console.log("\n🧪 Running Grounding & Quality Evaluation on Portfolio Assistant...\n");

  const testCases = [
    { q: "What projects has Hamza built?", expectedKeyword: "FinSight" },
    { q: "What is Hamza's experience with CrewAI?", expectedKeyword: "AI Code Review" },
    { q: "Can you provide Hamza's contact email?", expectedKeyword: "hamza1713@gmail.com" },
    { q: "Does FinSight support role-based access control?", expectedKeyword: "role" },
  ];

  let passed = 0;
  for (const tc of testCases) {
    const start = Date.now();
    try {
      const res = await fetch("http://localhost:3000/api/trpc/portfolioAssistant.ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ json: { question: tc.q, history: [] } }),
        signal: AbortSignal.timeout(15000),
      });

      const elapsed = Date.now() - start;
      const data = await res.json();
      const answer = data?.result?.data?.json?.answer || "";
      const matches = answer.toLowerCase().includes(tc.expectedKeyword.toLowerCase());

      if (matches) {
        passed++;
        console.log(`✅ PASS (${elapsed}ms) [Q: "${tc.q}"] -> Found "${tc.expectedKeyword}"`);
      } else {
        console.log(`❌ FAIL (${elapsed}ms) [Q: "${tc.q}"] -> Expected keyword "${tc.expectedKeyword}" not found`);
      }
    } catch (err) {
      console.log(`❌ ERROR [Q: "${tc.q}"]: ${err.message}`);
    }
  }

  console.log(`\n🎯 Eval Score: ${passed}/${testCases.length} (${Math.round((passed / testCases.length) * 100)}% accuracy)\n`);
}

function showHelp() {
  console.log(`
Hamza Ali Portfolio — Developer Operations CLI

Usage:
  node scripts/portfolio-ops.mjs <command>

Commands:
  health       Check uptime of public URLs and test local assistant latency
  eval         Run automated test suite verifying grounded assistant accuracy
  help         Display this help message
`);
}

switch (command) {
  case "health":
    runHealthcheck();
    break;
  case "eval":
    runEval();
    break;
  default:
    showHelp();
    break;
}

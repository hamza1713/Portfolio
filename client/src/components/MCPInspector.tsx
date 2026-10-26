import { useState } from "react";
import { Check, Code2, Copy, Play, Server, Terminal } from "lucide-react";

type MCPTool = {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  sampleRequest: Record<string, unknown>;
  sampleResponse: Record<string, unknown>;
};

const MCP_TOOLS: Record<string, MCPTool> = {
  review_diff: {
    name: "review_diff",
    description: "Executes 6-pillar zero-trust review with AST taint analysis, consensus, and SARIF export.",
    parameters: {
      type: "object",
      properties: {
        diff: { type: "string", description: "Unified pull request diff hunk" },
        repo_path: { type: "string", description: "Root workspace directory" },
        model_family: { type: "string", enum: ["gemini-pro", "claude-sonnet", "ensemble"] },
      },
      required: ["diff"],
    },
    sampleRequest: {
      jsonrpc: "2.0",
      id: "call_01",
      method: "tools/call",
      params: {
        name: "review_diff",
        arguments: {
          diff: "- @app.post('/login')\n- async def login(req: Request):\n-     if verify_creds(req):\n+ @app.post('/login')\n+ async def login(req: Request):\n+     if check_creds_async(req):\n+         return {'status': 'ok'}",
          model_family: "ensemble",
        },
      },
    },
    sampleResponse: {
      jsonrpc: "2.0",
      id: "call_01",
      result: {
        verdict: "BLOCKING",
        findings: [
          {
            rule_id: "AI-ASYNC-001",
            severity: "CRITICAL",
            title: "Unawaited async coroutine in conditional check",
            description: "check_creds_async is an unawaited coroutine object that always evaluates to True in Python boolean contexts, creating a silent authentication bypass.",
            cwe: "CWE-287",
            taint_path: "routes/auth.py:42 -> services/auth.py:118",
            remediation: "if await check_creds_async(req):",
          },
        ],
        receipt: {
          sha256: "e8f3a9d21c45...",
          sarif_export: "sarif/review-run-01.sarif",
        },
      },
    },
  },
  scan_sast_patterns: {
    name: "scan_sast_patterns",
    description: "Executes Tree-Sitter polyglot AST queries and deterministic SAST rules across hunks.",
    parameters: {
      type: "object",
      properties: {
        git_diff: { type: "string", description: "Unified diff chunk to analyze" },
        languages: { type: "array", items: { type: "string", enum: ["python", "typescript", "go", "java", "rust"] } },
      },
      required: ["git_diff"],
    },
    sampleRequest: {
      jsonrpc: "2.0",
      id: "call_02",
      method: "tools/call",
      params: {
        name: "scan_sast_patterns",
        arguments: {
          git_diff: "+ import flask_auth_helpers\n+ result = subprocess.run(f'nslookup {user_domain}', shell=True)",
          languages: ["python"],
        },
      },
    },
    sampleResponse: {
      jsonrpc: "2.0",
      id: "call_02",
      result: {
        findings: [
          {
            rule_id: "SEC-SLOPSQUAT-001",
            severity: "CRITICAL",
            badge: "SLOPSQUATTING_DETECTED",
            message: "Package 'flask_auth_helpers' does not exist in PyPI or OSV database. Hallucinated dependency import blocked.",
          },
          {
            rule_id: "SEC-003",
            severity: "HIGH",
            badge: "COMMAND_INJECTION",
            message: "subprocess.run with shell=True receiving unsanitized variable user_domain.",
          },
        ],
        total_issues: 2,
      },
    },
  },
  find_impacted_callers: {
    name: "find_impacted_callers",
    description: "Traverses inter-procedural AST callgraphs to identify multi-hop downstream callers.",
    parameters: {
      type: "object",
      properties: {
        symbol: { type: "string", description: "Function, class, or method signature modified" },
        file_path: { type: "string", description: "Origin file path" },
        max_depth: { type: "number", default: 3 },
      },
      required: ["symbol", "file_path"],
    },
    sampleRequest: {
      jsonrpc: "2.0",
      id: "call_03",
      method: "tools/call",
      params: {
        name: "find_impacted_callers",
        arguments: {
          symbol: "execute_sandboxed_query",
          file_path: "services/analytics.py",
          max_depth: 3,
        },
      },
    },
    sampleResponse: {
      jsonrpc: "2.0",
      id: "call_03",
      result: {
        target: "services.analytics.execute_sandboxed_query",
        callers: [
          { caller: "api.routes.query_endpoint", hop: 1, file: "api/routes.py:84" },
          { caller: "jobs.periodic_evaluator.run_cycle", hop: 2, file: "jobs/worker.py:120" },
        ],
        contract_drift_detected: false,
        total_references: 6,
      },
    },
  },
  check_governance_rules: {
    name: "check_governance_rules",
    description: "Evaluates repository .code-review.yaml constraints, banned dependencies, and required approvals.",
    parameters: {
      type: "object",
      properties: {
        config_path: { type: "string", default: ".code-review.yaml" },
        pr_author: { type: "string" },
        changed_files: { type: "array", items: { type: "string" } },
      },
      required: ["changed_files"],
    },
    sampleRequest: {
      jsonrpc: "2.0",
      id: "call_04",
      method: "tools/call",
      params: {
        name: "check_governance_rules",
        arguments: {
          config_path: ".code-review.yaml",
          pr_author: "contractor_dev",
          changed_files: ["services/auth.py", "requirements.txt"],
        },
      },
    },
    sampleResponse: {
      jsonrpc: "2.0",
      id: "call_04",
      result: {
        compliant: false,
        violations: [
          {
            policy: "GOV-AUTH-001",
            level: "BLOCKING",
            message: "Changes to services/auth.py require sign-off from @security-leads.",
          },
        ],
        required_approvals: ["@security-leads"],
      },
    },
  },
  generate_unit_tests: {
    name: "generate_unit_tests",
    description: "Generates assertion-locked pytest reproduction suites and verifies failure in isolated Docker containers.",
    parameters: {
      type: "object",
      properties: {
        vulnerability_id: { type: "string" },
        target_file: { type: "string" },
        reproduction_vector: { type: "string" },
      },
      required: ["vulnerability_id", "target_file"],
    },
    sampleRequest: {
      jsonrpc: "2.0",
      id: "call_05",
      method: "tools/call",
      params: {
        name: "generate_unit_tests",
        arguments: {
          vulnerability_id: "AI-ASYNC-001",
          target_file: "services/auth.py",
          reproduction_vector: "mock_coroutine_returning_false",
        },
      },
    },
    sampleResponse: {
      jsonrpc: "2.0",
      id: "call_05",
      result: {
        test_file: "tests/repro_ai_async_001.py",
        docker_exit_code: 1,
        status: "REPRODUCED",
        ast_assertions_locked: true,
        summary: "Reproduction test failed as expected on vulnerable commit (exit code 1). Ready for patch validation.",
      },
    },
  },
};

export function MCPInspector() {
  const [activeTool, setActiveTool] = useState<string>("review_diff");
  const [viewMode, setViewMode] = useState<"payload" | "schema">("payload");
  const [simulated, setSimulated] = useState(false);
  const [copied, setCopied] = useState(false);

  const tool = MCP_TOOLS[activeTool];

  const handleCopy = () => {
    const textToCopy = JSON.stringify(
      viewMode === "payload" ? (simulated ? tool.sampleResponse : tool.sampleRequest) : tool.parameters,
      null,
      2
    );
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mcp-inspector" id="mcp-lab">
      <div className="mcp-header">
        <div className="mcp-title-wrap">
          <span className="status-tag">
            <Server size={14} className="text-[#64D8C3]" />
            <span>Model Context Protocol (MCP)</span>
          </span>
          <h3>Interactive Agent Tool & JSON-RPC Protocol Explorer</h3>
          <p className="mcp-subtitle">
            Inspect the live tool schemas, JSON-RPC 2.0 messages, and execution traces that connect Hamza’s AI review agents directly to IDEs (Claude Code, Cursor) and CI/CD pipelines.
          </p>
        </div>
      </div>

      <div className="mcp-grid">
        {/* Tool Selector Nav */}
        <div className="mcp-sidebar">
          <p className="mcp-nav-label">Registered MCP Server Tools</p>
          <div className="mcp-tools-list">
            {Object.keys(MCP_TOOLS).map((key) => {
              const item = MCP_TOOLS[key];
              const isSelected = activeTool === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setActiveTool(key);
                    setSimulated(false);
                  }}
                  className={`mcp-tool-btn ${isSelected ? "mcp-tool-btn--active" : ""}`}
                >
                  <Code2 size={15} />
                  <div className="mcp-tool-info">
                    <span className="mcp-tool-name">{item.name}</span>
                    <span className="mcp-tool-desc">{item.description}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mcp-spec-badge">
            <span>JSON-RPC 2.0 Spec Compatible</span>
            <p>Runs within Claude Code, Cursor & MCP Server harnesses.</p>
          </div>
        </div>

        {/* Protocol Console Display */}
        <div className="mcp-terminal">
          <div className="mcp-terminal-bar">
            <div className="mcp-terminal-tabs">
              <button
                type="button"
                onClick={() => setViewMode("payload")}
                className={`terminal-tab ${viewMode === "payload" ? "terminal-tab--active" : ""}`}
              >
                <Terminal size={14} />
                <span>JSON-RPC Message Flow</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("schema")}
                className={`terminal-tab ${viewMode === "schema" ? "terminal-tab--active" : ""}`}
              >
                <Code2 size={14} />
                <span>Input Schema (OpenAPI)</span>
              </button>
            </div>

            <div className="terminal-actions">
              {viewMode === "payload" && (
                <button
                  type="button"
                  onClick={() => setSimulated(!simulated)}
                  className="terminal-btn terminal-btn--run"
                >
                  <Play size={13} />
                  <span>{simulated ? "View Request Call" : "Simulate Response"}</span>
                </button>
              )}
              <button
                type="button"
                onClick={handleCopy}
                className="terminal-btn"
                title="Copy JSON"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          <div className="mcp-terminal-body">
            <div className="mcp-message-meta">
              <span className="meta-tag">
                {viewMode === "schema"
                  ? "tools/list schema definition"
                  : simulated
                    ? "HTTP 200 / JSON-RPC 2.0 Response"
                    : "tools/call Inbound Request Payload"}
              </span>
              <span className="meta-tool">tool: {tool.name}</span>
            </div>

            <pre className="mcp-code-block">
              <code>
                {JSON.stringify(
                  viewMode === "payload"
                    ? simulated
                      ? tool.sampleResponse
                      : tool.sampleRequest
                    : tool.parameters,
                  null,
                  2
                )}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  semgrep_scan_diff: {
    name: "semgrep_scan_diff",
    description: "Executes deterministic security and AST rules against unified pull request diffs.",
    parameters: {
      type: "object",
      properties: {
        git_diff: { type: "string", description: "Unified diff chunk to analyze" },
        ruleset: { type: "string", enum: ["security-audit", "correctness", "performance"] },
      },
      required: ["git_diff"],
    },
    sampleRequest: {
      jsonrpc: "2.0",
      id: "call_01",
      method: "tools/call",
      params: {
        name: "semgrep_scan_diff",
        arguments: {
          git_diff: "- os.system('echo ' + user_input)\n+ subprocess.run(['echo', user_input], check=True)",
          ruleset: "security-audit",
        },
      },
    },
    sampleResponse: {
      jsonrpc: "2.0",
      id: "call_01",
      result: {
        content: [
          {
            type: "text",
            text: "Deterministic AST scanner: 0 high-severity vulnerabilities in revised chunk. Deprecated unsanitized shell concatenation resolved.",
          },
        ],
        structured_findings: [
          {
            rule_id: "python.lang.security.audit.dangerous-system-call",
            status: "RESOLVED",
            severity: "HIGH",
            badge: "REPRODUCED",
          },
        ],
      },
    },
  },
  generate_regression_test: {
    name: "generate_regression_test",
    description: "Synthesizes an isolated test harness in a sandbox to verify whether a candidate defect reproduces.",
    parameters: {
      type: "object",
      properties: {
        vulnerability_type: { type: "string" },
        target_function: { type: "string" },
        context: { type: "string" },
      },
      required: ["vulnerability_type", "target_function"],
    },
    sampleRequest: {
      jsonrpc: "2.0",
      id: "call_02",
      method: "tools/call",
      params: {
        name: "generate_regression_test",
        arguments: {
          vulnerability_type: "command-injection",
          target_function: "execute_cli_query",
          context: "Parameter user_input contains semicolon delimiter",
        },
      },
    },
    sampleResponse: {
      jsonrpc: "2.0",
      id: "call_02",
      result: {
        test_code: "def test_command_injection_reproduction():\n    with pytest.raises(SecurityException):\n        execute_cli_query('test; rm -rf /')\n",
        execution_status: "VERIFIED_FAILING_ON_OLD_CODE",
        evidence_badge: "REPRODUCED",
        sandbox_exit_code: 1,
      },
    },
  },
  ast_callgraph_impact: {
    name: "ast_callgraph_impact",
    description: "Traverses the abstract syntax tree to identify downstream callers affected by a signature change.",
    parameters: {
      type: "object",
      properties: {
        modified_symbol: { type: "string" },
        depth: { type: "number", default: 2 },
      },
      required: ["modified_symbol"],
    },
    sampleRequest: {
      jsonrpc: "2.0",
      id: "call_03",
      method: "tools/call",
      params: {
        name: "ast_callgraph_impact",
        arguments: {
          modified_symbol: "createProjectInquiry",
          depth: 2,
        },
      },
    },
    sampleResponse: {
      jsonrpc: "2.0",
      id: "call_03",
      result: {
        symbol: "createProjectInquiry",
        impacted_nodes: [
          "server.routers.projectInquiry.submit",
          "server.adminLeads.listProjectInquiries",
        ],
        breaking_changes_detected: false,
        total_references: 4,
      },
    },
  },
};

export function MCPInspector() {
  const [activeTool, setActiveTool] = useState<string>("semgrep_scan_diff");
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
            <Server size={14} className="text-primary" />
            <span>Model Context Protocol (MCP)</span>
          </span>
          <h3>Interactive Agent Tool & JSON-RPC Protocol Explorer</h3>
          <p className="mcp-subtitle">
            Inspect the live tool schemas, JSON-RPC 2.0 messages, and execution traces that connect Hamza’s AI review agents to editor and repository workflows.
          </p>
        </div>
      </div>

      <div className="mcp-grid">
        {/* Tool Selector Nav */}
        <div className="mcp-sidebar">
          <p className="mcp-nav-label">Registered MCP Server Tools</p>
          <div className="mcp-tools-list">
            {Object.keys(MCP_TOOLS).map(key => {
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
            <p>Runs within CrewAI & MCP Server harnesses.</p>
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

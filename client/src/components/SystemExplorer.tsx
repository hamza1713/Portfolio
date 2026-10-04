import { useId, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import {
  getScenario,
  moveStep,
  projects,
  type Project,
} from "@shared/portfolio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
function ScenarioExplorer({ project }: { project: Project }) {
  const [scenarioId, setScenarioId] = useState(project.scenarios[0].id);
  const [index, setIndex] = useState(0);
  const id = useId();
  const scenario = getScenario(project, scenarioId);
  const step = scenario.steps[index];
  const final = index === scenario.steps.length - 1;
  return (
    <div className={`scenario-explorer accent-${project.accent}`}>
      <div className="explorer-toolbar">
        <label htmlFor={id}>Choose a scenario</label>
        <select
          id={id}
          value={scenarioId}
          onChange={e => {
            setScenarioId(e.target.value);
            setIndex(0);
          }}
        >
          {project.scenarios.map(item => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
        <span className="example-label">Illustrative example</span>
      </div>
      <div className="explorer-input">
        <Workflow size={17} />
        <p>{scenario.input}</p>
      </div>
      <div className="explorer-layout">
        <ol className="explorer-steps" aria-label="Workflow steps">
          {scenario.steps.map((item, i) => (
            <li key={item.title}>
              <button
                aria-current={i === index ? "step" : undefined}
                aria-controls={`${id}-detail`}
                onClick={() => setIndex(i)}
              >
                <span className="step-number">
                  {i < index ? (
                    <Check size={15} />
                  ) : (
                    String(i + 1).padStart(2, "0")
                  )}
                </span>
                <span>{item.title}</span>
                <ArrowRight size={15} />
              </button>
            </li>
          ))}
        </ol>
        <div
          id={`${id}-detail`}
          className="explorer-detail"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="eyebrow">
            Step {index + 1} / {scenario.steps.length}
          </p>
          <div className="explorer-symbol">
            {scenario.status === "blocked" ? (
              <ShieldCheck size={29} />
            ) : (
              <Workflow size={29} />
            )}
          </div>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
          <div className="code-line">{step.detail}</div>
          {final && (
            <div
              className={`explorer-outcome explorer-outcome--${scenario.status}`}
            >
              <strong>Example outcome</strong>
              <p>{scenario.outcome}</p>
            </div>
          )}
        </div>
      </div>
      <div className="explorer-footer">
        <p>Sample data · no live model execution</p>
        <div>
          <button
            className="icon-button"
            aria-label="Previous workflow step"
            disabled={index === 0}
            onClick={() => setIndex(moveStep(index, -1, scenario.steps.length))}
          >
            <ArrowLeft size={17} />
          </button>
          <button
            className="button button--small button--outline"
            disabled={final}
            onClick={() => setIndex(moveStep(index, 1, scenario.steps.length))}
          >
            Next step <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
export function SystemExplorer({ project }: { project?: Project }) {
  const [slug, setSlug] = useState(projects[0].slug);
  return (
    <div className="system-explorer">
      {project ? (
        <ScenarioExplorer project={project} />
      ) : (
        <Tabs value={slug} onValueChange={setSlug}>
          <TabsList
            className="project-tabs"
            aria-label="Select a project to explore"
          >
            {projects.map(item => (
              <TabsTrigger key={item.slug} value={item.slug}>
                {item.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {projects.map(item => (
            <TabsContent key={item.slug} value={item.slug}>
              <ScenarioExplorer project={item} />
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}

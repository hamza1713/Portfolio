import { Link } from "wouter";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { getProject } from "@shared/portfolio";
import { PortfolioShell } from "@/components/PortfolioShell";
import { SystemExplorer } from "@/components/SystemExplorer";
import { ProjectVideoEmbed } from "@/components/ProjectVideoEmbed";
import NotFound from "./NotFound";
export default function CaseStudy({ slug }: { slug: string }) {
  const project = getProject(slug);
  if (!project) return <NotFound />;
  const sections = [
    ["problem", "The problem"],
    ["contribution", "The contribution"],
    ["workflow", "Explore the workflow"],
    ["decisions", "Engineering decisions"],
    ["verification", "Verification"],
    ["limitations", "Limits & lessons"],
  ];
  return (
    <PortfolioShell>
      <div className={`case-page accent-${project.accent}`}>
        <section id="top" className="case-hero section-wrap">
          <Link href="/#work" className="text-link case-back">
            <ArrowLeft size={16} /> Selected work
          </Link>
          <div className="case-heading">
            <div>
              <p className="eyebrow">Case study / {project.category}</p>
              <h1>{project.title}</h1>
              <p className="case-summary">{project.summary}</p>
              <p>{project.description}</p>
              <div className="tag-row">
                {project.stack.map(tag => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="hero-actions">
                <a
                  className="button button--outline"
                  href={project.repository}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={17} /> Explore the source{" "}
                  <ArrowUpRight size={15} />
                </a>
                <a className="text-link" href="#workflow">
                  Explore the workflow <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
            <figure>
              <img
                className="case-cover"
                src={`${project.image}-800.webp`}
                srcSet={`${project.image}-480.webp 480w, ${project.image}-800.webp 800w, ${project.image}-1280.webp 1280w`}
                sizes="(min-width: 800px) 45vw, 100vw"
                alt={`${project.title} frame from the supplied walkthrough`}
                width={1280}
                height={720}
                fetchPriority="high"
              />
              <figcaption className="case-cover-caption">
                Frame from the supplied walkthrough. Presentation visuals are
                illustrative; the repository provides implementation evidence.
              </figcaption>
            </figure>
          </div>
        </section>
        <div className="case-evidence section-wrap">
          {project.evidence.map(item => (
            <article className="evidence-card" key={item.label}>
              <strong>{item.value}</strong>
              <h2>{item.label}</h2>
              <p>{item.scope}</p>
              <a href={item.source} target="_blank" rel="noreferrer">
                Inspect the source <ArrowUpRight size={14} />
              </a>
            </article>
          ))}
        </div>
        <div className="case-body section-wrap">
          <nav className="case-index" aria-label="Case study sections">
            {sections.map(([id, label]) => (
              <a href={`#${id}`} key={id}>
                {label}
              </a>
            ))}
          </nav>
          <div className="case-content">
            <section id="problem">
              <h2>The problem</h2>
              <p>{project.problem}</p>
            </section>
            <section id="contribution">
              <h2>The contribution</h2>
              <p>{project.contribution}</p>
            </section>
            <section id="workflow">
              <h2>Explore the workflow</h2>
              <p>
                Choose a scenario and inspect each decision. The examples
                explain the architecture; they do not run the product backend.
              </p>
              <SystemExplorer project={project} />
            </section>
            <section id="decisions">
              <h2>Engineering decisions</h2>
              {project.decisions.map(item => (
                <article className="decision-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </section>
            <section id="verification">
              <h2>See the implementation</h2>
              <p>
                The recording presents the project workflow. The repository
                provides the implementation, architecture notes, and documented
                evaluation scope.
              </p>
              <ProjectVideoEmbed
                title={project.title}
                videoUrl={project.video}
                poster={`${project.image}-1280.webp`}
              />
              <a
                className="text-link"
                href={project.repository}
                target="_blank"
                rel="noreferrer"
              >
                Read the technical documentation <ArrowUpRight size={15} />
              </a>
            </section>
            <section id="limitations">
              <h2>Limits and lessons</h2>
              <ul>
                {project.limitations.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <article className="decision-card">
                <h3>What this project makes clear</h3>
                <p>{project.lessons}</p>
              </article>
            </section>
            <div className="case-cta">
              <p className="eyebrow">Make it useful for your team</p>
              <h2>Working on a similar challenge?</h2>
              <p>
                Let’s discuss the data, users, constraints, and what success
                would look like.
              </p>
              <Link
                href={`/?service=${project.slug}#contact`}
                className="button button--primary"
              >
                Discuss a similar project <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PortfolioShell>
  );
}

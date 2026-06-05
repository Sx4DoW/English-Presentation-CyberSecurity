import { useEffect, useMemo, useState } from "react";
import { Illustration } from "./components/Illustration.jsx";
import { glossary, rootTopicId, topics } from "./data/slides.js";

function readTopicId() {
  const id = window.location.hash.replace("#", "");
  return topics[id] ? id : rootTopicId;
}

function buildPath(topic) {
  const path = [];
  let current = topic;
  while (current) {
    path.unshift(current);
    current = current.parent ? topics[current.parent] : null;
  }
  return path;
}

function renderText(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default function App() {
  const [topicId, setTopicId] = useState(readTopicId);
  const [term, setTerm] = useState(null);
  const topic = topics[topicId] ?? topics[rootTopicId];
  const children = topic.children.map((id) => topics[id]);
  const siblings = topic.parent ? topics[topic.parent].children.map((id) => topics[id]) : [];
  const path = useMemo(() => buildPath(topic), [topic]);
  const depth = path.length - 1;
  const termEntry = term ? { name: term, definition: glossary[term] } : null;
  const topicGlossaryTerms = topic.focus.map((item) => item.toLowerCase()).filter((name) => glossary[name]);
  const pathLabel = path.map((item) => item.title).join(" / ");

  useEffect(() => {
    const onHashChange = () => setTopicId(readTopicId());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setTerm(null);
      if (event.key === "Backspace" && topic.parent) {
        event.preventDefault();
        goTo(topic.parent);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [topic.parent]);

  function goTo(id) {
    window.location.hash = id;
    setTopicId(id);
    setTerm(null);
  }

  function openTopicGlossary() {
    setTerm(topicGlossaryTerms[0] ?? "malware");
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="brand-button" type="button" onClick={() => goTo(rootTopicId)}>
          Cybersecurity Map
        </button>
        <nav className="breadcrumb" aria-label="Current path">
          {path.map((item, index) => (
            <button
              className={item.id === topic.id ? "active" : ""}
              type="button"
              onClick={() => goTo(item.id)}
              key={item.id}
            >
              {item.title}
              {index < path.length - 1 && <span>/</span>}
            </button>
          ))}
        </nav>
        <button className="glossary-inline" type="button" onClick={openTopicGlossary}>
          Glossary
        </button>
      </header>

      <section className="drill-layout">
        <aside className="map-panel" aria-label="Topic map">
          <span className="map-section-title">Root</span>
          <div className="map-root">
            <button
              className={topic.id === rootTopicId ? "map-node root active" : "map-node root"}
              type="button"
              onClick={() => goTo(rootTopicId)}
            >
              Cybersecurity
            </button>
          </div>
          <span className="map-section-title">Main categories</span>
          <div className="map-branches">
            {topics[rootTopicId].children.map((id) => {
              const item = topics[id];
              const active = path.some((entry) => entry.id === id);
              return (
                <button className={active ? "map-node branch active" : "map-node branch"} type="button" onClick={() => goTo(id)} key={id}>
                  {item.title}
                </button>
              );
            })}
          </div>
          {topic.parent && (
            <>
              <span className="map-section-title">{topic.children.length ? "Drill level" : "Sibling topics"}</span>
              <div className="map-children">
                {(topic.children.length ? children : siblings).map((item) => (
                  <button className={item.id === topic.id ? "map-node leaf active" : "map-node leaf"} type="button" onClick={() => goTo(item.id)} key={item.id}>
                    <span>{item.title}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </aside>

        <section className="topic-stage" aria-labelledby="topic-title">
          <div className="topic-copy">
            <div className="topic-path">
              <span>Reading</span>
              <strong>{pathLabel}</strong>
            </div>
            <p className="kicker">{topic.kicker} · depth {depth}</p>
            <h1 id="topic-title">{topic.title}</h1>
            <p className="summary">{renderText(topic.summary)}</p>

            <div className="focus-row">
              {topic.focus.map((item) => {
                const termName = item.toLowerCase();
                const hasDefinition = Boolean(glossary[termName]);
                return (
                  <button
                    className={hasDefinition ? "" : "static"}
                    type="button"
                    onClick={() => hasDefinition && setTerm(termName)}
                    aria-disabled={!hasDefinition}
                    key={item}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            <ul className="points">
              {topic.points.map((point) => (
                <li key={point}>{renderText(point)}</li>
              ))}
            </ul>
          </div>

          <aside className="visual-panel">
            <Illustration type={topic.visual} />
          </aside>
        </section>

        <section className="interaction-panel" aria-label="Drill down options">
          <div className="panel-head">
            <strong>{children.length ? "Drill down" : "Topic reached"}</strong>
            {topic.parent && (
              <button type="button" onClick={() => goTo(topic.parent)}>
                Back up
              </button>
            )}
          </div>
          <div className="panel-context">
            <span>Current category</span>
            <strong>{pathLabel}</strong>
          </div>

          {children.length ? (
            <div className="topic-grid">
              {children.map((item) => (
                <button className="topic-card" type="button" onClick={() => goTo(item.id)} key={item.id}>
                  <span>{item.kicker} · inside {topic.title}</span>
                  <strong>{item.title}</strong>
                  <small>{renderText(item.summary)}</small>
                </button>
              ))}
            </div>
          ) : (
            <div className="end-panel">
              <p>Same-level tabs inside <strong>{topics[topic.parent].title}</strong></p>
              <div>
                {siblings.map((item) => (
                  <button className={item.id === topic.id ? "active" : ""} type="button" onClick={() => goTo(item.id)} key={item.id}>
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>
      </section>

      {termEntry && (
        <div className="term-overlay" role="presentation" onClick={() => setTerm(null)}>
          <section className="term-popup" role="dialog" aria-modal="true" aria-labelledby="term-title" onClick={(event) => event.stopPropagation()}>
            <div className="drawer-head">
              <strong>Glossary</strong>
              <button type="button" onClick={() => setTerm(null)} aria-label="Close glossary">×</button>
            </div>
            <h2 id="term-title">{termEntry.name}</h2>
            <p>{renderText(termEntry.definition)}</p>
          </section>
        </div>
      )}
    </main>
  );
}

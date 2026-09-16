import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "loose",
  themeVariables: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: "13px",
  },
});

const cleanMermaidChart = (diagram) => {
  if (!diagram) return "";

  let clean = diagram
    .replace(/\r\n/g, "\n")
    .trim();

  if (!clean.startsWith("graph")) {
    clean = `graph TD\n${clean}`;
  }

  return clean;
};

const autoFixBadNodes = (diagram) => {
  let index = 0;

  return diagram.replace(/\[(.*?)\]/g, (_, label) => {
    index++;
    return `N${index}[${label}]`;
  });
};

function MermaidSetup({ diagram }) {
  const containerRef = useRef(null);
  const [renderError, setRenderError] = useState(false);

  useEffect(() => {
    if (!diagram || !containerRef.current) return;

    const renderDiagram = async () => {
      try {
        setRenderError(false);
        containerRef.current.innerHTML = "";

        const uniqueId = `mermaid-${Math.random()
          .toString(36)
          .substring(2, 9)}`;

        // sanitize before render
        const safeChart = autoFixBadNodes(cleanMermaidChart(diagram));

        const { svg } = await mermaid.render(uniqueId, safeChart);

        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (error) {
        console.error("Mermaid render failed:", error);
        setRenderError(true);
      }
    };

    renderDiagram();
  }, [diagram]);

  if (renderError) {
    return (
      <div className="py-8 px-4 text-center">
        <p className="text-xs text-neutral-400 font-mono">
          Unable to render graphical preview for this diagram structure.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full flex justify-center py-2 overflow-x-auto [&>svg]:max-w-full [&>svg]:h-auto [&>svg]:mx-auto transition-all"
    />
  );
}

export default MermaidSetup;
// third party
import * as d3 from "d3";

/**
 * Creates a tooltip for expression charts.
 *
 * Appends a div to the container and provides methods to show, hide, and remove it.
 * Displays transcript ID, condition, and value on hover.
 *
 * @param {React.RefObject<HTMLElement>} containerRef Container where the tooltip will be appended.
 *
 * @returns {{
 *   show: (event: MouseEvent, d: { transcriptId: string, condition: string, value: number }) => void,
 *   hide: () => void,
 *   remove: () => void
 * }}
 */

export function createTooltip(containerRef) {
  // Create tooltip only if container exists
  if (!containerRef.current) return { show: () => {}, hide: () => {} };

  const tooltip = d3
    .select(containerRef.current)
    .append("div")
    .attr("class", "expression-tooltip") // opcional para estilo
    .style("position", "absolute")
    .style("pointer-events", "none")
    .style("background", "white")
    .style("border", "1px solid #ccc")
    .style("padding", "6px 8px")
    .style("font-size", "12px")
    .style("border-radius", "4px")
    .style("opacity", 0)
    .style("z-index", 10);

  // Function to display the information tooltip
  function show(event, d) {
    const rect = containerRef.current.getBoundingClientRect();
    tooltip
      .html(
        `<b>ID:</b> ${d.transcriptId}<br/>
         <b>Condition:</b> ${d.condition}<br/>
         <b>Value:</b> ${d.value}`
      )
      .style("left", `${event.clientX - rect.left + 10}px`)
      .style("top", `${event.clientY - rect.top - 10}px`)
      .style("opacity", 1);
  }

  // Function to hide the tooltip
  function hide() {
    tooltip.style("opacity", 0);
  }

  // Function to remove the tooltip from the DOM
  function remove() {
    tooltip.remove();
  }

  return { show, hide, remove };
}

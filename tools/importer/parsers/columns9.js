/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing columns
  const grid = element.querySelector('.w-layout-grid, .grid-layout');
  if (!grid) return;

  // Get all direct children (columns)
  const columns = Array.from(grid.children);

  // Header row: Must be a single cell with the exact block name
  const cells = [['Columns (columns9)']];

  // Second row: as many cells as columns, each with all its content
  const row = columns.map((col) => {
    // If only one child, return it, else group all children (including text nodes)
    const fragment = document.createDocumentFragment();
    Array.from(col.childNodes).forEach((child) => {
      fragment.appendChild(child);
    });
    return fragment;
  });
  cells.push(row);

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

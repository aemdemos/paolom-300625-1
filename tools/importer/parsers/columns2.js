/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (!columns.length) return;
  // Header row should be a single cell, as per the example
  const headerRow = ['Columns (columns2)'];
  // Content row: one cell per column
  const contentRow = columns;
  const cells = [
    headerRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all tab links from the element
  const tabLinks = Array.from(element.querySelectorAll(':scope > a'));
  // Header row as per spec: exactly one column, the block name
  const headerRow = ['Tabs'];
  // Each row: [Tab Label (element or string), Tab Content (empty string)]
  const rows = tabLinks.map(link => {
    // Tab label: use the child div if exists for original styling, else the link text
    const labelDiv = link.querySelector('div');
    let labelCell;
    if (labelDiv) {
      labelCell = labelDiv;
    } else {
      // fallback to text content as a string
      labelCell = link.textContent.trim();
    }
    return [labelCell, ''];
  });
  // Compose the table rows: header (1 col) then each tab (2 cols)
  // This is the expected structure per the example: header row has one column, body rows two columns
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

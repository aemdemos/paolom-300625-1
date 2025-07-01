/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Hero (hero8)'];

  // Background image row (not present in example HTML)
  const bgRow = [''];

  // Content row: gather heading(s), subheading(s), and CTA(s)
  // Source HTML: section > div.container > div.w-layout-grid > (text div + button group div)
  const grid = element.querySelector('.w-layout-grid');
  let contentCell = document.createElement('div');

  if (grid) {
    const children = Array.from(grid.children);
    // First child: text (contains heading and subheading)
    if (children[0]) {
      const textDiv = children[0];
      // Append headings
      textDiv.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(el => contentCell.appendChild(el));
      // Append paragraphs
      textDiv.querySelectorAll('p').forEach(el => contentCell.appendChild(el));
    }
    // Second child: button group (contains CTAs)
    if (children[1]) {
      const buttonDiv = children[1];
      buttonDiv.querySelectorAll('a').forEach(el => contentCell.appendChild(el));
    }
  }
  
  const contentRow = [contentCell];

  const cells = [
    headerRow,
    bgRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

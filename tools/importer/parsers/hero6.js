/* global WebImporter */
export default function parse(element, { document }) {
  // Find the first .w-tab-pane (the active one)
  const tabPane = element.querySelector('.w-tab-pane');
  let image = null;
  let contentElements = [];

  if (tabPane) {
    // The grid contains both heading and image
    const grid = tabPane.querySelector('.w-layout-grid');
    if (grid) {
      // Find the first image in the grid
      image = grid.querySelector('img');
      // Collect all non-image child elements and non-empty text nodes in grid
      contentElements = Array.from(grid.childNodes).filter((node) => {
        if (node.nodeType === 1 && node.tagName.toLowerCase() !== 'img') {
          return true;
        } else if (node.nodeType === 3 && node.textContent.trim()) {
          // Keep non-empty text nodes
          // Convert to <p> for semantic structure
          const p = document.createElement('p');
          p.textContent = node.textContent.trim();
          contentElements.push(p);
          return false;
        }
        return false;
      });
    }
  }

  // If <p> wrappers were created for text nodes, they've already been added to contentElements

  const rows = [
    ['Hero (hero6)'],
    [image ? image : ''],
    [contentElements.length ? contentElements : '']
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

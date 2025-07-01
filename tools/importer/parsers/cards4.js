/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards4) header row
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // Select all immediate <a> elements representing cards
  const cards = element.querySelectorAll(':scope > a.utility-link-content-block');

  cards.forEach(card => {
    // First cell: the image element (first <img> descendant)
    const img = card.querySelector('img');

    // Second cell: the text content block
    // - This is the div that contains tag, time, h3, p, and "Read"
    // - It is usually the second div inside the inner grid (after img)
    
    // There is an inner grid div as direct child of <a>
    const innerGrid = card.querySelector(':scope > div');
    let textDiv;
    if (innerGrid) {
      // Get all top-level children of the inner grid
      const children = Array.from(innerGrid.children);
      // Find the <img> index, then take the next <div>
      const imgIdx = children.findIndex(c => c.tagName === 'IMG');
      if (imgIdx > -1 && children[imgIdx+1]) {
        textDiv = children[imgIdx+1];
      } else {
        // fallback: just use the last <div> if not found
        textDiv = children.filter(c => c.tagName === 'DIV').pop();
      }
    }
    // Defensive fallback to card if none found
    if (!textDiv) textDiv = card;

    rows.push([img, textDiv]);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // The header row - must match example exactly
  const headerRow = ['Cards (cards3)'];

  // Get all card elements: each direct child div of the grid is a card
  const cardEls = Array.from(element.querySelectorAll(':scope > div'));

  const rows = cardEls.map(cardEl => {
    // First cell: the icon element
    let icon = null;
    // Find the first child with class 'icon' (which contains the SVG)
    const iconWrapper = cardEl.querySelector(':scope > div .icon');
    if (iconWrapper) {
      icon = iconWrapper;
    }
    // Second cell: the card's text content (the <p> element)
    const textEl = cardEl.querySelector('p');
    // Fallback if not found (shouldn't happen, but for robustness)
    const textCell = textEl ? textEl : document.createTextNode('');
    return [icon, textCell];
  });

  // Build the table
  const table = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const rows = [['Accordion']];

  // Find all direct accordion items
  const accordionItems = element.querySelectorAll(':scope > .accordion');

  accordionItems.forEach((item) => {
    // Title: look for .w-dropdown-toggle > .paragraph-lg
    let titleCell = '';
    const toggle = item.querySelector('.w-dropdown-toggle');
    if (toggle) {
      const titleEl = toggle.querySelector('.paragraph-lg');
      titleCell = titleEl ? titleEl : toggle;
    }

    // Content: look for nav.w-dropdown-list .utility-padding-all-1rem or direct .rich-text
    let contentCell = '';
    const nav = item.querySelector('nav.w-dropdown-list');
    if (nav) {
      // Find the deepest .utility-padding-all-1rem or .rich-text
      let contentWrapper = nav.querySelector('.utility-padding-all-1rem, .utility-padding-horizontal-0');
      if (contentWrapper) {
        // If .rich-text inside, use it directly
        const richText = contentWrapper.querySelector('.rich-text');
        if (richText) {
          contentCell = richText;
        } else {
          contentCell = contentWrapper;
        }
      } else {
        contentCell = nav;
      }
    }
    rows.push([titleCell, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

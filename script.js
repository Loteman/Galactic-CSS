
/* ---------------- Level configuration ---------------- */

const PROPERTY_META = {
  flexDirection: {
    label: 'Flex Direction',
    cssProp: 'flex-direction',
    options: ['row', 'row-reverse', 'column', 'column-reverse']
  },
  justifyContent: {
    label: 'Justify Content',
    cssProp: 'justify-content',
    options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']
  },
  alignItems: {
    label: 'Align Items',
    cssProp: 'align-items',
    options: ['flex-start', 'flex-end', 'center', 'stretch']
  },
  flexWrap: {
    label: 'Flex Wrap',
    cssProp: 'flex-wrap',
    options: ['nowrap', 'wrap', 'wrap-reverse']
  }
};

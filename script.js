
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


const LEVELS = [
  {
    id: 1,
    title: 'Right Alignment',
    itemCount: 5,
    base: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'nowrap' },
    controls: ['justifyContent'],
    target: { justifyContent: 'flex-end' },
    instruction: 'Mission Control needs the rocket squadron pushed to the far RIGHT (end) of the docking bay, lined up in a single row.',
    hint: 'You need the property that positions items along the main axis. Try the value that means "end".'
  },
  {
    id: 2,
    title: 'Touch Down',
    itemCount: 5,
    base: { flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'nowrap' },
    controls: ['alignItems'],
    target: { alignItems: 'flex-end' },
    instruction: 'The rockets are floating too high! Align the whole squadron to the BOTTOM of the docking bay.',
    hint: 'This time you need to control the cross axis, not the main axis.'
  },
  {
    id: 3,
    title: 'Vertical Launch',
    itemCount: 4,
    base: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'nowrap' },
    controls: ['flexDirection'],
    target: { flexDirection: 'column' },
    instruction: 'Time for a vertical launch sequence — stack the rockets in a single column, from TOP to BOTTOM.',
    hint: 'Change the direction of the main axis itself.'
  },
  {
    id: 4,
    title: 'Even Spacing',
    itemCount: 6,
    base: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'nowrap' },
    controls: ['justifyContent'],
    target: { justifyContent: 'space-between' },
    instruction: 'Reinforcements arrived! Spread all rockets evenly across the bay so there is equal space BETWEEN each rocket, with no gap before the first or after the last.',
    hint: 'One justify-content value places space only between items, none at the edges.'
  },
  {
    id: 5,
    title: 'Grounded Column',
    itemCount: 5,
    base: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'nowrap' },
    controls: ['flexDirection', 'justifyContent', 'alignItems'],
    target: { flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' },
    instruction: 'Complex maneuver: stack the rockets in a COLUMN, keep the formation horizontally CENTERED, and push the whole group to the BOTTOM of the bay.',
    hint: 'Set the direction to a column first — that changes which property controls "bottom" and which controls "centered".'
  },
  {
    id: 6,
    title: 'Fleet Overflow',
    itemCount: 10,
    base: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'nowrap' },
    controls: ['flexWrap', 'justifyContent'],
    target: { flexWrap: 'wrap', justifyContent: 'center' },
    instruction: 'Too many rockets for one row! Enable wrapping so the fleet flows onto multiple rows, and CENTER the rockets horizontally within the bay.',
    hint: 'By default flex items refuse to wrap onto new lines — there is a property that turns that on.'
  },
  {
    id: 7,
    title: 'Dead Center',
    itemCount: 5,
    base: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'nowrap' },
    controls: ['justifyContent', 'alignItems'],
    target: { justifyContent: 'center', alignItems: 'center' },
    instruction: 'Perfect symmetry required — center the fleet both HORIZONTALLY and VERTICALLY in the middle of the bay.',
    hint: 'You will need both the main-axis and the cross-axis centering properties together.'
  },
  {
    id: 8,
    title: 'Final Countdown (Bonus)',
    itemCount: 9,
    base: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'nowrap' },
    controls: ['flexDirection', 'flexWrap', 'justifyContent'],
    target: { flexDirection: 'column-reverse', flexWrap: 'wrap', justifyContent: 'space-evenly' },
    instruction: 'BONUS — Final Countdown: launch in REVERSE column order, WRAP the overflowing columns, and spread those columns EVENLY across the bay.',
    hint: 'Reverse column direction, allow wrapping, then pick the justify-content value that evenly spaces columns including the outer edges.'
  }
];

const STORAGE_KEY = 'galacticDockingBay.progress.v1';

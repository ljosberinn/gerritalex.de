// needed to map token to tailwind classes

const teal = 'text-code-teal';
const green = 'text-code-green';
const red = 'text-code-red';
const blue = 'text-code-blue';

const tokenClassNames = {
  'attr-name': 'text-code-yellow',
  'attr-value': green,
  boolean: red,
  class: 'text-code-yellow',
  color: 'text-code-purple',
  comment: 'text-gray-400 italic',
  deleted: red,
  dom: blue,
  function: blue,
  'function-variable': blue,
  inserted: green,
  interpolation: red,
  'interpolation-punctuation': teal,
  keyword: 'text-code-purple',
  method: teal,
  property: teal,
  'property-access': teal,
  punctuation: 'text-code-white',
  string: green,
  tag: red,
  'template-punctuation': green,
  'template-string': green,
  variable: blue,
};

module.exports = tokenClassNames;

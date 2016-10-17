/**
 * Expose `JSON.parse` method or fallback if not
 * exists on `window`
 */

export default 'undefined' === typeof JSON
  ? require('json-fallback').parse
  : JSON.parse;

/**
 * React compatibility shim for React Three Fiber
 * 
 * This shim adds the missing unstable_act export that React Three Fiber expects
 * but was removed from React 18.3+. This provides backward compatibility without
 * modifying the core React Three Fiber library.
 */

const React = require('react');

// Ensure act is available (it exists in React 18.3+)
const { act } = React;

// Add unstable_act as an alias to act for compatibility with React Three Fiber
if (act && !React.unstable_act) {
  React.unstable_act = act;
}

module.exports = React;
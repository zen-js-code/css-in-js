# CSS-in-JS

A set of examples and experiments for CSS-in-JS Web4WD talk.

## Purpose

The idea is to try out different CSS-in-JS solutions on the same sample application and analyze them.

For that purpose a schematic, sample React application is created. Application contains a couple of pages that share several elements, like buttons or header.

Pages are intended to be different in design, while sharing visual implementation of some elements (header) and redefining, sometimes drastically, others (buttons).

This should help stretching the limits of CSS-in-JS solutions and analyze how well they fit to several development scenarios.

## Scenarios

Within differently styled pages:

1. Share visual implementation of an element between the pages
2. Redefine visual implementation of an element within a page
3. ...

Within these scenarios the "usual suspects" are evaluated as well:

1. code minification (JS and CSS)
2. code extraction (where possible/relevant)
3. source maps and debugging
4. chunking and hashing of artifacts
4. WDS + HMR
5. ...

## Setup

`master` branch contains the sample application, fully functional but __un-styled__.

Each of the other branches contains a styling implementation using different CSS-in-JS solution.

 
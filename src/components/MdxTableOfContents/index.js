import React from 'react'
import styles from './style.module.scss';

const MdxTableOfContents = ({ headings }) => {
	const map = headings
		.filter(heading => heading.value)
		.map((heading, index) => {
			heading.parent = null;
			heading.id = index;

			if (index === 0) {
				return heading;
			}

			// Turn the stupid list into a list with parents
			for (let i = (index - 1); i >= 0; i--) {
				if (heading.depth <= headings[i].depth) {
					continue;
				} else if (heading.depth > headings[i].depth) {
					heading.parent = headings[i].id;
					return heading;
				}
			}
			return heading;
		})

	// Turn the list with parents into a tree
	// https://stackoverflow.com/a/57313017
	const tree = [];
	const lookup = [];

	// Initialize lookup table with each array item's id as key and 
  // its children initialized to an empty array 
	map.forEach((heading) => {
		lookup[heading.id] = heading;
		lookup[heading.id].children = [];
	});

	map.forEach((heading) => {
		// If the item has a parent we do following:
    // 1. access it in constant time now that we have a lookup table
    // 2. since children is preconfigured, we simply push the item
    if (heading.parent !== null) {
      lookup[heading.parent].children.push(heading);
    } else {
      // no o.parent so this is a "root at the top level of our tree
      tree.push(heading);
    }
	});

	// Iterate over the top level headings and create a list element for each.
	// Add children to their own ordered list
	const makeToc = (headings) => {
		return headings.map(heading =>
			<li key={heading.id}>
				<a href={`#${encodeURIComponent(heading.value)}`}>{heading.value}</a>
				<ol>
					{makeToc(heading.children)}
				</ol>
			</li>	
		)
	}

	return (
		<div className={styles.container}>
			<p><b>Table of Contents</b></p>
			<ol>
				{makeToc(tree)}
			</ol>
		</div>
	)
}

export default MdxTableOfContents;

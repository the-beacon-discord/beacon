import React from 'react';

// Create a function to create more functions! Yay
const Heading = (level) => {
	if (![1, 2, 3, 4, 5, 6].includes(level)) throw new Error(('Cannot create heading element of this depth'));
	return ({ children, ...props }) => React.createElement(
		`h${level}`,
		Object.assign({
			id: encodeURIComponent(children.toString())
		}, props),
		children
	)
};

const Heading1 = Heading(1);
const Heading2 = Heading(2);
const Heading3 = Heading(3);
const Heading4 = Heading(4);
const Heading5 = Heading(5);
const Heading6 = Heading(6);

export {
	Heading1,
	Heading2,
	Heading3,
	Heading4,
	Heading5,
	Heading6
}
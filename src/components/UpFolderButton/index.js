import React from 'react';
import { Link } from 'gatsby';
import { Location } from '@reach/router';

const UpFolderButton = () => {
	return (
		<p>
			<Location>
				{locationProps => {
					const parts = locationProps.location.pathname.replace(/\/$/g, '').split('/')
					parts.pop();
					const link = parts.join('/') + '/'
					return <Link to={link}>Up</Link>
				}}
			</Location>
		</p>
	)
}

export default UpFolderButton

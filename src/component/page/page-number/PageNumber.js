import React from 'react'

export default function PageNumber({ onChange, page, lastPage, children }) {
	async function handlePageFlip(direction) {
		const newPage = direction === 'forward' ? page + 1 : page - 1
		onChange(newPage)
	}

	return (
		<React.Fragment>
			<button
				onClick={() => handlePageFlip('backward')}
				disabled={page === 1}
				style={page === 1 ? { pointerEvents: 'none', opacity: '0.5' } : {}}
			>
				&lt;
			</button>
			{children}
			<button
				onClick={() => handlePageFlip('forward')}
				disabled={page === lastPage}
				style={
					page === lastPage ? { pointerEvents: 'none', opacity: '0.5' } : {}
				}
			>
				&gt;
			</button>
		</React.Fragment>
	)
}

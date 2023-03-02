import React from 'react'

function Pagination({ pagesNumbers, currentPage, onClickPrev, onClickNext, nextButtonDisabled, prevButtonDisabled, currentPageActive, currentPageNumber }) {


	return (
		<nav aria-label="...">
			<ul className="pagination">
				<li className={`page-item ${prevButtonDisabled}`}>
					<a className="page-link" href="#" onClick={() => { onClickPrev() }}>Предыдущая</a>
				</li>
				{
					pagesNumbers.map(p => {
						return (
							<li key={p} className={currentPageNumber === p ? `page-item ${currentPageActive}` : 'page-item'}>
								<a className="page-link" onClick={() => { currentPage(p) }} >{p}</a>
							</li>
						)
					})
				}
				<li className={`page-item ${nextButtonDisabled}`}>
					<a className="page-link" href="#" onClick={() => { onClickNext() }}>Следующая</a>
				</li>
			</ul>
		</nav>
	)
}

export default Pagination

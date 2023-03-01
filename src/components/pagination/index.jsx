import React from 'react'

function Pagination() {
	return (
		<nav aria-label="...">
			<ul className="pagination">
				<li className="page-item disabled">
					<a className="page-link">Предыдущая</a>
				</li>
				<li className="page-item"><a className="page-link" href="/">1</a></li>
				<li className="page-item active" aria-current="page">
					<a className="page-link" href="/">2</a>
				</li>
				<li className="page-item"><a className="page-link" href="/">3</a></li>
				<li className="page-item">
					<a className="page-link" href="/">Следующая</a>
				</li>
			</ul>
		</nav>
	)
}

export default Pagination

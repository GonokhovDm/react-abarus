import React, { useState } from 'react';

import arrowUpSvg from "../../icons/arrow-up.svg";
import arrowDownSvg from "../../icons/arrow-down.svg";

function Table({ filteredData, onClickSort, directionSort }) {

	const [fieldData, setFieldData] = useState('');

	const Arrow = () => {
		return (
			directionSort ? <img src={arrowDownSvg} alt="" /> : <img src={arrowUpSvg} alt="" />
		)
	}

	const fieldSortData = (field) => {
		onClickSort(field);
		setFieldData(field);
	}

	return (
		<table className="table">
			<thead className="table-dark">
				<tr>
					<th onClick={() => fieldSortData('id')}>ID {fieldData === 'id' ? <Arrow /> : <img src={arrowDownSvg} alt="" style={{ opacity: .4 }} />}</th>
					<th onClick={() => fieldSortData('title')}>Заголовок {fieldData === 'title' ? <Arrow /> : <img src={arrowDownSvg} alt="" style={{ opacity: .4 }} />}</th>
					<th onClick={() => fieldSortData('body')}>Описание {fieldData === 'body' ? <Arrow /> : <img src={arrowDownSvg} alt="" style={{ opacity: .4 }} />}</th>
				</tr>
			</thead>
			<tbody>
				{filteredData.map(
					(item => (
						<tr key={item.id}>
							<td>{item.id}</td>
							<td>{item.title}</td>
							<td>{item.body}</td>
						</tr>
					))
				)}
			</tbody>
		</table>
	)
}

export default Table

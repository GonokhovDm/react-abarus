import React, { useState, useEffect } from "react";
import axios from 'axios';

import Table from "./components/table";
import Loader from "./components/loader";
import Pagination from "./components/pagination";

function App() {

	const jsonUrl = 'https://jsonplaceholder.typicode.com/posts';

	const [isLoading, setIsLoading] = useState(true);
	const [value, setValue] = useState('');
	const [data, setData] = useState([]);
	const [directionSort, setDirectionSort] = useState(false);

	useEffect(() => {
		axios(jsonUrl).then((res) => {
			setData(res.data);
			setIsLoading(false);
		})
	}, []);

	const onClickSort = (field) => {
		const copyData = data.concat();

		let sortData;

		if (directionSort) {
			sortData = copyData.sort(
				(a, b) => { return a[field] > b[field] ? 1 : -1 }
			)
		} else {
			sortData = copyData.reverse(
				(a, b) => { return a[field] > b[field] ? 1 : -1 }
			)
		}
		setData(sortData);
		setDirectionSort(!directionSort);
	}


	return (
		<div className="test-app">
			<div className="container">
				<div className="search">
					<input
						type="text"
						placeholder="Поиск"
						className="search__input"
						onChange={(event) => setValue(event.target.value)}
					/>
				</div>

				{isLoading ? <Loader /> :
					<Table data={data}
						onClickSort={onClickSort}
						directionSort={directionSort}
					/>
				}

				<Pagination />

			</div>
		</div>
	);
}

export default App;

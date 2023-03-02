import React, { useState, useEffect } from "react";
import axios from 'axios';

import Table from "./components/table";
import Loader from "./components/loader";
import Pagination from "./components/pagination";

function App() {

	const jsonUrl = 'https://jsonplaceholder.typicode.com/posts';
	const limitPages = 10;

	const [isLoading, setIsLoading] = useState(true);
	const [value, setValue] = useState('');
	const [data, setData] = useState([]);
	const [directionSort, setDirectionSort] = useState(true);
	const [countPages, setCountPages] = useState(0);
	const [currentPageNumber = 1, setCurrentPageNumber] = useState(1);
	const [nextButtonDisabled, setNextButtonDisabled] = useState('');
	const [prevButtonDisabled, setPrevButtonDisabled] = useState('disabled');
	const [currentPageActive, setCurrentPageActive] = useState('');

	useEffect(() => {
		axios.get(jsonUrl).then((res) => {
			setData(res.data);
			setIsLoading(false);
		})
	}, []);

	const filteredData = data.filter(search => {
		return (
			search.title.toLowerCase().includes(value.toLowerCase())
		)
	})

	const lastBlockNum = currentPageNumber * limitPages;
	const firstBlockNum = lastBlockNum - limitPages + 1;
	const currentBlock = filteredData.slice(firstBlockNum - 1, lastBlockNum);

	const currentPage = (pg) => {
		setCurrentPageNumber(pg);
		if (pg > 1) {
			setPrevButtonDisabled('');
		}
		if (pg < countPages) {
			setNextButtonDisabled('');
		}
		setCurrentPageActive('active');
	}

	const onClickNext = () => {
		if (currentPageNumber >= countPages) {
			setNextButtonDisabled('disabled');
			return
		} else {
			setCurrentPageNumber(currentPageNumber + 1);
			setPrevButtonDisabled('');
		}
	}

	const onClickPrev = () => {
		if (currentPageNumber <= 1) {
			setPrevButtonDisabled('disabled');
			return
		} else {
			setCurrentPageNumber(currentPageNumber - 1);
			setNextButtonDisabled('');
		}

	}
	useEffect(() => {
		if (filteredData.length > 0) {
			const getCountPages = filteredData.length / limitPages;
			setCountPages(getCountPages);
			currentPage();
		}
	}, [isLoading, filteredData.length])

	let pagesNumbers = [];
	for (let i = 1; i <= countPages; i++) {
		pagesNumbers.push(i);
	}

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

				{(isLoading === true) && (data.length > 0) ? <Loader /> :
					<Table
						data={currentBlock}
						filteredData={currentBlock}
						onClickSort={onClickSort}
						directionSort={directionSort}
					/>
				}

				<Pagination
					pagesNumbers={pagesNumbers}
					currentPage={currentPage}
					onClickNext={onClickNext}
					onClickPrev={onClickPrev}
					nextButtonDisabled={nextButtonDisabled}
					prevButtonDisabled={prevButtonDisabled}
					currentPageActive={currentPageActive}
					currentPageNumber={currentPageNumber}
				/>

			</div>
		</div>
	);
}

export default App;

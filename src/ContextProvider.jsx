import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
const Base_URL = 'https://opentdb.com/api.php?';
const AppContext = createContext();

export const useGlobalContext = () => {
	return useContext(AppContext);
};

const ContextProvider = ({ children }) => {
	const [showModal, setShowModal] = useState(false);
	const [isWaiting, setIsWaiting] = useState(true);
	const [loading, setLoading] = useState(false);
	const [quiz, setQuiz] = useState([]);
	const [error, setError] = useState(false);
	const [correctAns, setCorrectAns] = useState(0);
	const [numberOfQuiz, setNumberOfQuiz] = useState(10);
	const [quizCategory, setQuizCategory] = useState(0); // api provide with number
	const [quizDifficulty, setQuizDifficulty] = useState('');
	const [quizType, setQuizType] = useState('');
	const [page, setPage] = useState(0);

	const amountParam = `amount=${Number(numberOfQuiz)}`;
	const cateParam = `&category=${Number(quizCategory)}`;

	let diffParam;
	let typeParam;

	if (quizDifficulty === 'Any Difficulty') {
		diffParam = ``;
	} else {
		diffParam = `&difficulty=${quizDifficulty.toLowerCase()}`;
	}

	if (quizType === 'Multiple Choice') {
		typeParam = `&type=multiple`;
	} else if (quizType === 'True / False') {
		typeParam = `&type=boolean`;
	} else {
		typeParam = '';
	}

	let url = `${Base_URL}${amountParam}${cateParam}${diffParam}${typeParam}`;

	const getQuiz = useCallback(async () => {
		setLoading(true);
		try {
			const res = await fetch(url);
			const data = await res.json();
			if (data.results.length > 0 && numberOfQuiz < '50') {
				setQuiz(data.results);
				setLoading(false);
				setError(false);
				setIsWaiting(false);
			} else {
				setError(true);
				setLoading(false);
				setIsWaiting(true);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}, [url, numberOfQuiz]);

	useEffect(() => {
		if (isWaiting) return;
		getQuiz();
	}, [isWaiting, getQuiz]);

	return (
		<AppContext.Provider
			value={{
				showModal,
				setShowModal,
				isWaiting,
				loading,
				quiz,
				quizType,
				setQuizType,
				quizDifficulty,
				setQuizDifficulty,
				quizCategory,
				setQuizCategory,
				numberOfQuiz,
				setNumberOfQuiz,
				setIsWaiting,
				page,
				setPage,
				error,
				setError,
				correctAns,
				setCorrectAns,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default ContextProvider;

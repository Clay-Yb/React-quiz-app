import React from 'react';
import { QuizCategories, QuizDifficulties, QuizType } from '../assets/QuizCategories';
import { useGlobalContext } from '../ContextProvider';

import './SetupForm.scss';

const SetupForm = () => {
	const {
		quizType,
		setQuizType,
		quizDifficulty,
		setQuizDifficulty,
		quizCategory,
		setQuizCategory,
		numberOfQuiz,
		setNumberOfQuiz,
		setIsWaiting,
		error,
	} = useGlobalContext();

	const handleClick = () => {
		setIsWaiting(false);
	};

	return (
		<div className="setup_form">
			<div className="setup_form-container">
				<h1>React Quiz</h1>

				<div className="input-control">
					<label htmlFor="num">Number Of Questions</label>
					<input
						type="number"
						name="num"
						id="num"
						min={0}
						value={numberOfQuiz}
						onChange={(e) => setNumberOfQuiz(e.target.value)}
					/>
				</div>

				<div className="input-control">
					<label htmlFor="cate">Category</label>
					<select
						name="cate"
						id="cate"
						value={quizCategory}
						onChange={(e) => setQuizCategory(e.target.value)}
					>
						{QuizCategories.map((item) => (
							<option key={item.id} value={item.id}>
								{item.category}
							</option>
						))}
					</select>
				</div>

				<div className="input-control">
					<label htmlFor="difficulty">Select Difficulty</label>
					<select
						name="difficulty"
						id="difficulty"
						value={quizDifficulty}
						onChange={(e) => setQuizDifficulty(e.target.value)}
					>
						{QuizDifficulties.map((item) => (
							<option key={item.id}>{item.type}</option>
						))}
					</select>
				</div>

				<div className="input-control">
					<label htmlFor="cate">Select Type</label>
					<select
						name="cate"
						id="cate"
						value={quizType}
						onChange={(e) => setQuizType(e.target.value)}
					>
						{QuizType.map((item) => (
							<option key={item.id}>{item.type}</option>
						))}
					</select>
				</div>
				{error ? (
					<span className="error">Can't Generate Quiz more than 50 and less than 1!</span>
				) : null}

				<button onClick={() => handleClick()}>Start</button>
			</div>
		</div>
	);
};

export default SetupForm;

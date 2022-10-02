import React, { useEffect } from 'react';
import { useGlobalContext } from '../ContextProvider';
import './Quiz.scss';
import QuizModal from './QuizModal';
const Quiz = ({ data }) => {
	const { quiz, setPage, setCorrectAns, setShowModal, page } = useGlobalContext();

	let answers;

	if (data) {
		data.incorrect_answers.splice(
			Math.floor(Math.random() * data.incorrect_answers.length),
			0,
			data.correct_answer
		);
		answers = [...new Set(data.incorrect_answers)];
	}

	useEffect(() => {
		if (quiz.length > 0 && quiz.length === page) {
			setShowModal(true);
			setPage(0);
		}
	}, [page, quiz.length, setShowModal, setPage]);

	const handleClick = (item) => {
		if (item === data.correct_answer) {
			setCorrectAns((prev) => prev + 1);
		}
		setPage((prev) => prev + 1);
	};

	return (
		<div className="quiz">
			<QuizModal />
			<div className="quiz_header">
				<span>{data?.category}</span>
				<span>{data?.difficulty}</span>
				<p>
					Questions: {page} / {quiz.length}
				</p>
			</div>
			<div className="quiz_body">
				<h3 dangerouslySetInnerHTML={{ __html: data?.question }} />
				<ul>
					{answers?.map((item, index) => (
						<li key={index} onClick={() => handleClick(item)}>
							{item}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Quiz;

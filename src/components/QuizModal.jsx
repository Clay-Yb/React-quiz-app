import React from 'react';
import { useGlobalContext } from '../ContextProvider';
import './QuizModal.scss';
const QuizModal = () => {
	const { correctAns, setCorrectAns, quiz, setIsWaiting, setShowModal, showModal } =
		useGlobalContext();
	const handleClick = () => {
		setCorrectAns(0);
		setIsWaiting(true);
		setShowModal(false);
	};

	return (
		<div className={`quiz_modal ${showModal && 'active'}`}>
			<div className="quiz_modal-container">
				<h1>Congratz</h1>
				<p>
					You answered {correctAns} out {quiz.length} questions correctly
				</p>
				<button onClick={handleClick}>Play Again</button>
			</div>
		</div>
	);
};

export default QuizModal;

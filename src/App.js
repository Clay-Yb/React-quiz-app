import './App.scss';
import Quiz from './components/Quiz';
import SetupForm from './components/SetupForm';
import { useGlobalContext } from './ContextProvider';

function App() {
	const { isWaiting, loading, quiz, page, setPage, correctAns } = useGlobalContext();

	if (isWaiting) {
		return <SetupForm />;
	}

	if (loading) {
		return (
			<div className="App">
				<div className="quiz_container">
					<h3 className="loading">Loading...</h3>
				</div>
			</div>
		);
	}

	const handleClick = () => {
		setPage((prev) => prev + 1);
	};

	return (
		<div className="App">
			<div className="quiz_container">
				<Quiz data={quiz[page]} />
				<div className="btn">
					<span>Correct Answer: {correctAns}</span>
					<button className="next" onClick={handleClick}>
						Next Question
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;

$(document).ready(function() 
{
	// create an array of question objects
	var questionArray = 
	[
		{"question" : "first question1", "choices" : ["one", "two", "three", "four"], "correctIndex" : 0},
		{"question" : "second question2", "choices" : ["one", "two", "three", "four"], "correctIndex": 1},
		{"question" : "third question3", "choices"  : ["one", "two", "three", "four"], "correctindex": 2}
	];

	// var for time remaining
	var timeRemaining = 60;

	// show quest and answers
	showQuestions();

	// start timer
	var timer = setInterval(function() 
	{
		// deduct 1 from var of timeRemaining every second
		timeRemaining = timeRemaining - 1;
		$("#timeRemainingSpan").text(timeRemaining);

			// if timer == 0
			if (timeRemaining === 0)
			{
				clearInterval(timer);
				// endQuiz
				endQuiz();
			}
			
					
	}, 1000);
	
	//submit button clicked
	$("#submit").on("click", function() 
	{
		clearInterval(timer);
		// endQuiz
		endQuiz();
	});

	// functions
	function showQuestions()
	{
		// loop through array of question objects
		for (var i = 0; i < questionArray.length; i++) 
		{
			// add question to corrisponding html elemt 
			var questionListItem = $('*[data-questionsIndex="' + i + '"]');
			var questionTag = $(questionListItem).find("p").text(questionArray[i].question);
					
			// loop through question object choices array
			for (var j = 0; j < questionArray[i].choices.length; j++)
			{
				// add choice to corrisponding html ellement
				var questionLabel = $('*[data-choicesIndex="' + j + '"]').text(questionArray[i].choices[j]);
			}	
		}
	}

	function endQuiz()
	{
		// get array of guesses
		var guessesArray = getArrayOfGuesses();

		// get correcrAnswers
		var numberOfCorrectAns = getNumCorrectAns(guessesArray);

		// show correct answers
		$("#correct").text(numberOfCorrectAns);

		// get incorrect answers
		var numberOfIncorrectAns = getNumIncorrectAns(guessesArray);

		// show incorrect answers
		$("#incorrect").text(numberOfIncorrectAns);
		// get unanswered question
		var unansweredQuest = guessesArray.length - (numberOfCorrectAns + numberOfIncorrectAns)

		//show unanswered questions
		$("#unanswered").text(unansweredQuest);
	}

	function getArrayOfGuesses()
	{
		var guessesArray = [];

		var questionList = $(".questionList").children();

		// loop through question list items 
		for (var i = 0; i < questionList.length; i++) 
		{
			var questionInputs = $(questionList[i]).children("input");
			
			// loop through each radio button
			for (var j = 0; j < questionInputs.length; j++) 
			{
				// var is answeres = false
				var isAnswered = false;

				// if radio button is checked
				if (questionInputs[j].checked === true)
				{
					// push data attribute to guesses array
					guessesArray.push($(questionInputs[j]).data("choicesIndex"));
					isAnswered = true;
					console.log(isAnswered);

					break; 
				} 
			}
			
			//if isAnswered = false
			if (isAnswered === false)
			{
				// push -1 to guessesarray		
				guessesArray.push(-1)
			}				
		}
		console.log(guessesArray);
		return guessesArray;
	}

	function getNumCorrectAns(arrayOfGuesses)
	{
		var correctAnswers = 0;

		// loop through array of guesses
		for (var i = 0; i < arrayOfGuesses.length; i++) {
			// if question is answered
			if (arrayOfGuesses[i] !== -1)
			{
				// if guess is correct answer
				// if (arrayOfGuesses[i] === questionArray[i].correctIndex)
				// {
				// // incrament correctAns	
				// 	correctAnswers += 1; 
				// }
				if (isAnswerCorrect(arrayOfGuesses[i], questionArray[i].correctIndex)) 
				{
					correctAnswers += 1;
				}
			}	
		}
		
		return correctAnswers;

	}

	function getNumIncorrectAns(arrayOfGuesses)
	{
		var incorrectAnswers = 0;

		// loop through array of guesses
		for (var i = 0; i < arrayOfGuesses.length; i++) {
			// if question is answered
			if (arrayOfGuesses[i] !== -1)
			{
				// if guess is not correct answer
				// if (arrayOfGuesses[i] !== questionArray[i].correctIndex)
				// {
				// // incrament incorrectAns	
				// 	incorrectAnswers += 1; 
				// }

				if (!isAnswerCorrect(arrayOfGuesses[i], questionArray[i].correctIndex)) 
				{
					incorrectAnswers += 1;
				}
			}	
		}

		return incorrectAnswers;
	}



	function isAnswerCorrect(guessIndex, correctIndex)
	{
		if (guessIndex === correctIndex)
		{
			return true;
		}

		return false;
	}


});



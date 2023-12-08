$(document).ready(transcript);

function transcript()
{
	let englishWords = [
	["table", "street", "airport", "office", "bag", "tea", "usually", "true", "room", "apple"],
	["escape", "delegate", "catch", "estimate", "duration", "win-win", "humbleness", "quickly", "quietly", "clearly"],
	["bureaucracy", "generation", "implication", "biomarker", "correlation", "inefficient", "apparent", "subsequent", "unremittingly", "honestly"]
	];
	
	let translateWords = [
	["стіл", "вулиця", "аеропорт", "офіс", "валіза", "чай", "звичайно", "правда", "кімната", "яблуко"],
	["відкрити", "делегувати", "зловити", "оцінювати", "тривалість", "перемога", "скромність", "швидко", "тихо", "очевидно"],
	["бюрократія", "покоління", "наслідок", "біомаркер", "порівняння", "неефективний", "очевидно", "наступний", "неослабно", "чесно"]
	];
	
	let rigthCounter = 0;
	let wrongCounter = 0;
	let steps = 0; 
	let index = 0;
	let again = 0;
	let prevIndex = 0;
	
	let prev = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
	
	$(".cardDiv").bind("click", translate);
	
	function statisticsLabel(rigthCount, wrongCount)
	{
		$("#rigthCheck").text("Вірно: " + rigthCounter);
		$("#wrongCheck").text("Невірно: " + wrongCounter);
	}
	
	let wordTry = $(".inputWord").val();
	
	function caseCheck(testWord)
	{
		testWord.split("");
		let lowerCount = 0;
		let upperCount = 0;
		for(let i = 0; i < testWord.length; ++i)
		{
			if(testWord[i] === testWord[i].toLowerCase())
			{
				++lowerCount;
			}
			else
			{
				++upperCount;
			}
		}
		if(upperCount > 2 && lowerCount > 2)
		{
			return true;
		}
		else
		{
			return false;
		}
	} 
	
	function translate()
	{
		wordTry = $(".inputWord").val();
		
		if((wordTry.trim() == "" || !isNaN(wordTry) || caseCheck(wordTry)) && steps > 0 && again == 0)
		{
			$(".levelEnglish").text("Будь ласка, введіть слово, де не більше 2 великих літер");
		}
		else
		{
		if(again == 1)
		{
			steps = 0;
			prev = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
			index = 0;
			rigthCounter = 0;
			wrongCounter = 0;
			again = 0;
			
			statisticsLabel(rigthCounter, wrongCounter);	
			$(".cardDiv").text("Ще раз");
			$(".stepsDiv").text("Спроб" + steps + " / 10");
			$(".inputWord").attr("disabled", true);
			$("#mainSelect").attr("disabled", false);
			
		}
		function showWord(selectVal, repeatVal)
		{
			$(".cardDiv").text(englishWords[selectVal][repeatVal]);
			console.log(selectValue);
		}
		
		function checkRepeat(randomValue, prevValues)
		{
			while(true)
			{
				let check = 0;
				for(let i = 0; i < 10; ++i)
				{
					if(randomValue == prevValues[i])
					{
						++check;
						randomValue = Math.floor(Math.random() * 10);
					}
				}
				if(check == 0)
				{
					return randomValue;
					break;
				}
			}
		}
		
		function checkWord(prevInd, wordTried, selectVal, stepsVal)
		{
			if(steps != 1)
			{
			if(wordTried.toLowerCase() == translateWords[selectVal][prevInd])
			{
				console.log("Good");
			++rigthCounter;
			statisticsLabel(rigthCounter, wrongCounter);
			}
		
			else
			{
			++wrongCounter;
			statisticsLabel(rigthCounter, wrongCounter);
			}
			}
		}
		
		++steps;
		
		$(".inputWord").attr("disabled", false);
		$("#mainSelect").attr("disabled", true);
		
		let random = Math.floor(Math.random() * 10);
		
		let selectValue = $("#mainSelect option:selected").val();
		
		//console.log(random);
		
		let repeat;
		
		if(steps != 11)
		{
	 	repeat = checkRepeat(random, prev);
		console.log(repeat);
		
		showWord(selectValue, repeat);
		++index;
		prev[index] = repeat;
		}
		checkWord(prevIndex, wordTry, selectValue);
		prevIndex = repeat;
		
		
		$(".inputWord").val("");
		if(steps == 11)
		{
			again = 1;
		}
		if(steps != 11)
		{
		$(".stepsDiv").text("Спроб: " + steps);
		}
		$(".levelEnglish").text("");
		}
	}
}
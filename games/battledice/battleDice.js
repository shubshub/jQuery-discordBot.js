var diceRecords = []

function addDiceRecord(txt)
{
	diceRecords[diceRecords.length] = txt;
}

function showDiceRecords(nothing,chan)
{
	var txt = "```BattleDice Records!\n";
	for (var i = 0; i < diceRecords.length; i++)
	{
		txt = txt + (i+1) + ". " + diceRecords[i] + "\n";
	}
	txt = txt + "```";
	sendMessage(txt,chan);
}

addDiceRecord("Shubshub - 6 Wins in a Row: 9:56 PM (GMT+12) 25/04/2016");
addDiceRecord("Krons - 4 Wins in a Row: 12:46 PM (GMT+12) 26/04/2016");


function rulesDice(nothing,chan)
{
	sendMessage("```The rules of Battle Dice are Simple\nBoth players roll up to 6 10 Sided Die\nHowever a number of different battle styles may be used which may give an advantage\nThey will be balanced so that none are overpowered\n\n\nPick a Battle Style for the Dice Roll\n\nBattle Style 1: One of the Rolled Die is Guarenteed to be a 10\nBattle Style 2: 3 of the Die Rolled will be Rolled with the Same Value\nBattle Style 3: Roll 1 60 Sided Die\nBattle Style 4: Both Players Exchange their Strongest Rolled Number\n(If the Opponent uses Battle Style 3 then Players Exchange all their Die with each other)\nBattle Style 5: The rolled dice can not be lower than 3\n\nCommands:\n$bd rules - Displays these rules\n$bd play [number] - Play the game with the chosen battle style\n$bd records - Display the High Score records of this game```",chan)
}

/*
Potential Good Combo
Style 4 against Style 1, Player with Style 4 is guarenteed atleast 1 10, While Style 1 may not be left with a 10

Style 2 against Style 4, Player with Style 4 may be left with a relatively low number

Style 3 against Style 1, A Guarenteed 10 might not work well against a Roll out of 60

Style 1 Against Style 2, If Style 2 rolls low for one of the dice then they may have 3 Really low numbers against a Gaurenteed 10

Style 4 against Style 3, Style 3 Might be left with low Dice Rolls compared to what they could of had
*/

function playDice(txt,chan)
{
	var playerString = "";
	var aiString = "";
	var aiTotal = 0;
	var playerTotal = 0;
	var winner;
	var nums = txt.replace("$bd play ","");
	var playerTac = parseInt(nums);
	var aiTac;
	var playerRoll = [];
	var aiRoll = [];
	switch(playerTac)
	{
		case 1:
		{
			playerRoll = diceTactic1();
			var rand = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
			if(rand >= 6)
			{
				aiTac = 4;
			}
			else if (rand <=5)
			{
				aiTac = 3;
			}
			break;
		}
		case 2:
		{
			playerRoll = diceTactic2();
			var rand = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
			if(rand >= 6)
			{
				aiTac = 1;
			}
			else if (rand <=5)
			{
				aiTac = 5;
			}
			break;
		}
		case 3:
		{
			playerRoll = diceTactic3();
			aiTac = 4;
			break;
		}
		case 4:
		{
			playerRoll = diceTactic4();
			aiTac = 2;
			break;
		}
		case 5:
		{
			playerRoll = diceTactic5();
			var rand = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
			if(rand <= 3)
			{
				aiTac = 1;
			}
			else if (rand <=5 && rand >3)
			{
				aiTac = 3;
			}
			else if (rand <=7 && rand >5)
			{
				aiTac = 5;
			}
			else if (rand >7)
			{
				aiTac = 2;
			}
			break;
		}
	}
	switch(aiTac)
	{
		case 1:
		{
			aiRoll = diceTactic1();
			break;
		}
		case 2:
		{
			aiRoll = diceTactic2();
			break;
		}
		case 3:
		{
			aiRoll = diceTactic3();
			break;
		}
		case 4:
		{
			aiRoll = diceTactic4();
			break;
		}
		case 5:
		{
			aiRoll = diceTactic5();
			break;
		}
	}
	if (playerTac == 4 || aiTac == 4)
	{
		var maxPlayer = Math.max(...playerRoll);
		var maxAI = Math.max(...aiRoll);
		if (aiTac == 3 || playerTac == 3)
		{
			var tempHold = [];
			tempHold = playerRoll;
			playerRoll = aiRoll;
			aiRoll = tempHold;			
		}
		else
		{
			var strongPlayer = maxPlayer;
			var strongAI = maxAI;
			var AIindex = aiRoll.indexOf(strongAI);
			var playIndex = playerRoll.indexOf(strongPlayer);
			playerRoll[playIndex] = strongAI;
			aiRoll[AIindex] = strongPlayer;		
		}
	}
	for (var i = 0; i < playerRoll.length; i++)
	{
		playerString = playerString + ", " + playerRoll[i];
	}
	for (var i = 0; i < aiRoll.length; i++)
	{
		aiString = aiString + ", " + aiRoll[i];
	}
	for (var j = 0; j < playerRoll.length; j++)
	{
		playerTotal+=playerRoll[j];
	}
	for (var j = 0; j < aiRoll.length; j++)
	{
		aiTotal+=aiRoll[j];
	}
	if (playerTotal > aiTotal)
	{
		winner = "<@" + chat[0].author.id + ">";
	}
	if (aiTotal > playerTotal)
	{
		winner = "Mregal Bot!";
	}
	if (aiTotal == playerTotal)
	{
		winner = "Nobody!"
	}
	sendMessage("Player Rolled: "+playerString + "\nWith a grand total of "+playerTotal+" points with Battle Style "+playerTac+"\n\nAnd I rolled "+aiString+"\nWith a grand total of "+aiTotal+" points with Battle Style "+aiTac+"\nSo the winner is...  "+winner,chan);
}
function diceTactic1()
{
	var diceRoll = new Array(6);
	for (var i = 0; i < diceRoll.length; i++)
	{
		diceRoll[i] = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
	}
	diceRoll[0] = 10;
	return diceRoll;
}
function diceTactic2()
{
	var diceRoll = new Array(6);
	for (var i = 0; i < diceRoll.length; i++)
	{
		diceRoll[i] = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
	}
	var rand = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
	switch(rand)
	{
		case 1:
		{
			diceRoll[0] = diceRoll[0];
			diceRoll[1] = diceRoll[0];
			diceRoll[2] = diceRoll[0];
			break;
		}
		case 2:
		{
			diceRoll[1] = diceRoll[1];
			diceRoll[2] = diceRoll[1];
			diceRoll[3] = diceRoll[1];
			break;
		}
		case 3:
		{
			diceRoll[2] = diceRoll[2];
			diceRoll[3] = diceRoll[2];
			diceRoll[4] = diceRoll[2];
			break;
		}
		case 4:
		{
			diceRoll[3] = diceRoll[3];
			diceRoll[4] = diceRoll[3];
			diceRoll[5] = diceRoll[3];
			break;
		}
		case 5:
		{
			diceRoll[4] = diceRoll[4];
			diceRoll[5] = diceRoll[4];
			diceRoll[0] = diceRoll[4];
			break;
		}
		case 6:
		{
			diceRoll[5] = diceRoll[5];
			diceRoll[0] = diceRoll[5];
			diceRoll[1] = diceRoll[5];
			break;
		}
	}
	return diceRoll;
}
function diceTactic3()
{
	var diceRoll = new Array(1);
	diceRoll[0] = Math.floor(Math.random() * (60 - 1 + 1)) + 1;
	return diceRoll;
}
function diceTactic4()
{
	var diceRoll = new Array(6);
	for (var i = 0; i < diceRoll.length; i++)
	{
		diceRoll[i] = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
	}
	return diceRoll;
}
function diceTactic5()
{
	var diceRoll = new Array(6);
	for (var i = 0; i < diceRoll.length; i++)
	{
		diceRoll[i] = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
	}
	return diceRoll;
}
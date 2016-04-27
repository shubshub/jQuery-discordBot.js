var ninjaScorePlayer = new Array(3);
var ninjaScoreAI = new Array(3);
var playPrevMoves = [];
var aiPrevMoves = [];
var playChoice;
var aiMove;
var brain = [];
var count = 0;
var turnwin = "Nobody";
/*
0: High Attack Points
1: Mid Attack Points
2: Low Attack Points
*/
for (var i=0; i < ninjaScorePlayer.length; i++)
{
	ninjaScorePlayer[i] = 0;
	ninjaScoreAI[i] = 0;
}

function ninjaReset()
{
	for (var i=0; i < ninjaScorePlayer.length; i++)
	{
		ninjaScorePlayer[i] = 0;
		ninjaScoreAI[i] = 0;
	}
	sendMessage("Scoreboard Reset!");
}

function ninjaAddPlayerMove(move)
{
	playPrevMoves[playPrevMoves.length] = move;
}

function ninjaAddAIMove(move)
{
	aiPrevMoves[aiPrevMoves.length] = move;
}

function addPlayerWin(move)
{
	ninjaScorePlayer[move]+=1;
}

function addAIwin(move)
{
	ninjaScoreAI[move]+=1;
}

function pushToBrain(move)
{
	//Eventually old Moves will be pushed out of the Brain
	var tempHold = []
	for (var i = 0; i < brain.length; i++)
	{
		tempHold[i+1] = brain[i];
	}
	tempHold[0] = move
	for (var j = 0; j < brain.length; j++)
	{
		brain[j] = tempHold[j];
	}
}

function rulesNinja()
{
	sendMessage("```The rules of Text Ninja is Simple\n\nEach player Selects a Ninjitsu Attack Style\n\n- High Attack\n- Mid Attack\n- Low Attack\n\nSimilar to Rock Paper Scissors\nExcept that to win you must meet one of these conditions\n\nGet 3 Wins 1 for each type of attack\nGet 3 Wins in 1 Attack Type\n\n1. High Attack Jumps over a Low Attack and Dodges it Beating Low Attack\n2. Mid Attack intercepts the High Attack foiling the High Attack and beating it\n3. Low Attack Trips the Mid Attack and Beats it\n\nBe sharp though as the AI will Adapt based on the data it has access to\nEither player may look at the Scoreboard of the game at any point\nCommands: \n$tn rules - Shows these rules\n$tn scores - Shows the scoreboard\n$tn fight [number] - Fight Mregal Bot with a Specified Attack Style\n$tn reset - Reset the scoreboards```");
}

function ninjaScoreboard()
{
	sendMessage("```Player Scoreboard\nHigh Attack: "+ninjaScorePlayer[0]+"\nMid Attack: "+ninjaScorePlayer[1]+"\nLow Attack: "+ninjaScorePlayer[2]+"\n\nMregal Bot Scoreboard\nHigh Attack: "+ninjaScoreAI[0]+"\nMid Attack: "+ninjaScoreAI[1]+"\nLow Attack: "+ninjaScoreAI[2]+"```");
}

function ninjaFight(move)
{
	var nums = move.replace("$tn fight ","");
	move = parseInt(nums);
	if(move == 1 || move == 2 || move == 3)
	{
		playChoice = move;
		ninjaAddPlayerMove(move);
		aiChoice();
	}
}

function aiChoice()
{
	//Before it Attacks it has a Move Pool Choice of up to 15 With each Move Evenly placed in the Pool
	//It Evaluates previous Hits against Itself with the Move Log it keeps
	
	/*
	High Attack > Low Attack > Mid Attack
	If High Attack is at 2 then Prioritize a Mid Attack
	If Mid Attack is at 2 then Prioritize a Low Attack
	If Low Attack is at 2 then Prioritize a High Attack
	If 2 Attacks are Equal at 1 Point each then Prioritize to Block the Attack with No Points
	If that Fails then try to Priotize to Block the Attack with 1 Point still Equally with Blocking the Attack they just used
	
	*/
	
	//Player Scoreboard
	var hAttackP = ninjaScorePlayer[0];
	var mAttackP = ninjaScorePlayer[1];
	var lAttackP = ninjaScorePlayer[2];
	
	//AI Scoreboard
	var hAttackA = ninjaScoreAI[0];
	var mAttackA = ninjaScoreAI[1];
	var lAttackA = ninjaScoreAI[2];
	
	//This is the Brain of Mregal Bot, Whatever is left it will randomly select a move from the pool
	brain = [1,1,1,1,1,2,2,2,2,2,3,3,3,3,3];
	if (hAttackP >=1)
	{
		for (var i = 0; i < (5*hAttackP); i++)
		{
			pushToBrain(2);
		}
	}
	if (mAttackP >=1)
	{
		for (var i = 0; i < (5*mAttackP); i++)
		{
			pushToBrain(3);
		}
	}
	if (lAttackP >=1)
	{
		for (var i = 0; i < (5*lAttackP); i++)
		{
			pushToBrain(1);
		}
	}
	if ((hAttackP ==1) && (mAttackP ==1))
	{
		for (var i = 0; i < 7; i++)
		{
			pushToBrain(1);
		}
	}
	if ((hAttackP == 1) && (lAttackP == 1))
	{
		for (var i = 0; i < 7; i++)
		{
			pushToBrain(3);
		}
	}
	if ((lAttackP == 1) && (mAttackP == 1))
	{
		for (var i = 0; i < 7; i++)
		{
			pushToBrain(2);
		}
	}
	aiMove = brain[Math.floor(Math.random() * ((brain.length-1) - 0 + 1)) + 0];
	ninjaAddAIMove(aiMove);
	ninjaAttack();
}

function ninjaAttack()
{
	//Calculate the Wins!
	turnwin = "Nobody";
	if ((playChoice == 1) && (aiMove == 1))
	{
		//Tie - Nobody Wins
	}
	if ((playChoice == 2) && (aiMove == 1))
	{
		//Player Wins
		turnwin = "the player";
		addPlayerWin(1);
	}
	if ((playChoice == 3) && (aiMove == 1))
	{
		//Mregal Bot Wins
		turnwin = "Mregal Bot";
		addAIwin(0);
	}
	
	if ((playChoice == 1) && (aiMove == 2))
	{
		//Mregal Bot Wins
		turnwin = "Mregal Bot";
		addAIwin(1);
	}
	if ((playChoice == 2) && (aiMove == 2))
	{
		//Tie - Nobody Wins
	}
	if ((playChoice == 3) && (aiMove == 2))
	{
		//Player Wins
		turnwin = "the player";
		addPlayerWin(2);
	}
	
	if ((playChoice == 1) && (aiMove == 3))
	{
		//Player Wins
		turnwin = "the player";
		addPlayerWin(0);
	}
	if ((playChoice == 2) && (aiMove == 3))
	{
		//Mregal Bot Wins
		turnwin = "Mregal Bot";
		addAIwin(2);
	}
	if ((playChoice == 3) && (aiMove == 3))
	{
		//Tie - Nobody Wins
	}
	testNinjaWin();
}

function testNinjaWin()
{
	var playerString;
	var aiString;
	if (playChoice == 1)
	{
		playerString = "High Attack";
	}
	if (playChoice == 2)
	{
		playerString = "Middle Attack";
	}
	if (playChoice == 3)
	{
		playerString = "Lower Attack";
	}
	
	if (aiMove == 1)
	{
		aiString = "High Attack";
	}
	if (aiMove == 2)
	{
		aiString = "Middle Attack";
	}
	if (aiMove == 3)
	{
		aiString = "Lower Attack";
	}
	
	sendMessage("<@" + chat[0].author.id + "> Attacks with a "+playerString+" while Mregal Bot tries to block with a "+aiString+" and the outcome is that "+turnwin+" is the winner!");
	
	for (var i = 0; i < ninjaScorePlayer.length; i++)
	{
		if (ninjaScorePlayer[i] >=3)
		{
			playerWin();
		}
	}
	if ((ninjaScorePlayer[0] >= 1) && (ninjaScorePlayer[1] >=1) && (ninjaScorePlayer[2] >=1))
	{
		playerWin();
	}
	
	for (var i = 0; i < ninjaScoreAI.length; i++)
	{
		if (ninjaScoreAI[i] >=3)
		{
			aiWin();
		}
	}
	if ((ninjaScoreAI[0] >= 1) && (ninjaScoreAI[1] >=1) && (ninjaScoreAI[2] >=1))
	{
		aiWin();
	}
}

function playerWin()
{
	sendMessage("The player has successfully defeated Mregal Bot!");
}

function aiWin()
{
	sendMessage("Mregal Bot has successfully defeated the player!");
}
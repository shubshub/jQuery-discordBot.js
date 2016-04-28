var ninjaScorePlayer = new Array(3);
var ninjaScoreAI = new Array(3);
var playPrevMoves = [];
var aiPrevMoves = [];
var playChoice;
var aiMove;
var brain = [];
var count = 0;
var turnwin = "Nobody";
var moveStrings = ["High Attack", "Mid Attack", "Low Attack"]; // For easy conversion into string
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

function ninjaReset(nothing,chan)
{
	for (var i=0; i < ninjaScorePlayer.length; i++)
	{
		ninjaScorePlayer[i] = 0;
		ninjaScoreAI[i] = 0;
	}
	sendMessage("Scoreboard Reset!",chan);
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
	ninjaScorePlayer[move - 1] += 1;
	return "the player";
}

function addAIwin(move)
{
	ninjaScoreAI[move - 1] += 1;
	return "Mregal Bot";
}

// This does the same things as your previous code did, but I'm not sure what plans you had for it so idk
function pushToBrain(move)
{
	// Shifts all elements to the right and makes brain[0] = move
	brain.unshift(move);
	// Removes the last element of the array, in this case brain[15], so that the array is kept at a length of 15
	brain.pop();
}

function rulesNinja(nothing,chan)
{
	sendMessage("```The rules of Text Ninja is Simple\n\nEach player Selects a Ninjitsu Attack Style\n\n- High Attack\n- Mid Attack\n- Low Attack\n\nSimilar to Rock Paper Scissors\nExcept that to win you must meet one of these conditions\n\nGet 3 Wins 1 for each type of attack\nGet 3 Wins in 1 Attack Type\n\n1. High Attack Jumps over a Low Attack and Dodges it Beating Low Attack\n2. Mid Attack intercepts the High Attack foiling the High Attack and beating it\n3. Low Attack Trips the Mid Attack and Beats it\n\nBe sharp though as the AI will Adapt based on the data it has access to\nEither player may look at the Scoreboard of the game at any point\nCommands: \n$tn rules - Shows these rules\n$tn scores - Shows the scoreboard\n$tn fight [number] - Fight Mregal Bot with a Specified Attack Style\n$tn reset - Reset the scoreboards```",chan);
}

function ninjaScoreboard(nothing,chan)
{
	sendMessage("```Player Scoreboard\nHigh Attack: "+ninjaScorePlayer[0]+"\nMid Attack: "+ninjaScorePlayer[1]+"\nLow Attack: "+ninjaScorePlayer[2]+"\n\nMregal Bot Scoreboard\nHigh Attack: "+ninjaScoreAI[0]+"\nMid Attack: "+ninjaScoreAI[1]+"\nLow Attack: "+ninjaScoreAI[2]+"```",chan);
}

function ninjaFight(move,chan)
{
	var nums = move.replace("$tn fight ","");
	move = parseInt(nums);
	if(move == 1 || move == 2 || move == 3)
	{
		playChoice = move;
		ninjaAddPlayerMove(move);
		aiChoice(move,chan);
	}
}

function aiChoice(nothing,chan)
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

	// Refactored these into functions since they did the exact same thing with just 2 or 3 different values
	think(hAttackP, 2);
	think(mAttackP, 3);
	think(lAttackP, 1);

	thinkMore(hAttackP, mAttackP, 1);
	thinkMore(hAttackP, lAttackP, 3);
	thinkMore(lAttackP, mAttackP, 2);

	aiMove = brain[Math.floor(Math.random() * ((brain.length-1) - 0 + 1)) + 0];
	ninjaAddAIMove(aiMove);
	ninjaAttack(nothing,chan);
}

// Couldn't think of a better name
function think(attP, move)
{
	if(attP >= 1)
	{
		for(var i = 0; i < (5 * attP); i++)
		{
			pushToBrain(move);
		}
	}
}

// Same here
function thinkMore(attP1, attP2, move)
{
	if(attP1 == 1 && attP2 == 1)
	{
		for(var i = 0; i < 7; i++)
		{
			pushToBrain(move);
		}
	}
}

function ninjaAttack(nothing,chan)
{	
	var a = playChoice;
	var b = aiMove;
	turnwin = a == b ? "Nobody" : ((a == 1 && b == 3) || (a == 2 && b == 1) || (a == 3 && b == 2)) ? addPlayerWin(a) : addAIwin(b);
	testNinjaWin(chan);
}

function testNinjaWin(chan)
{
	var playerString = moveStrings[playChoice - 1];
	var aiString = moveStrings[aiMove - 1];
	
	sendMessage("<@" + globalUser + "> Attacks with a "+playerString+" while Mregal Bot tries to block with a "+aiString+" and the outcome is that "+turnwin+" is the winner!",chan);
	
	for(var score of ninjaScorePlayer)
	{
		if(score >= 3)
		{
			playerWin(chan);
		}
	}

	if(ninjaScorePlayer[0] >= 1 && ninjaScorePlayer[1] >= 1 && ninjaScorePlayer[2] >= 1)
    {
        playerWin(chan);
    }
    
    for(var score of ninjaScoreAI)
    {
        if(score >= 3)
        {
            aiWin(chan);
        }
    }

    if (ninjaScoreAI[0] >= 1 && ninjaScoreAI[1] >= 1 && ninjaScoreAI[2] >= 1)
    {
        aiWin(chan);
    }
}

function playerWin(chan)
{
	sendMessage("The player has successfully defeated Mregal Bot!",chan);
}

function aiWin(chan)
{
	sendMessage("Mregal Bot has successfully defeated the player!",chan);
}
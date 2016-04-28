var playerScoreBJK = 0; //If it goes over 42 then its Bust
var aiScoreBJK = 0; //If it goes over 42 then its Bust
var deck = [];
var drawnCards = [];
var effectDrawn;
var effects = []; //Same length as the Deck, 0: No effect, 1: First Effect, 2: Second Effect, 3: Third Effect
var effectsPlaced = 0; //If its at 24 then No more can be placed
var values = [1,2,3,4,5,6,7,8,9,10,10,10,10];
var count = 0;
var shuffleTime = Math.floor(Math.random() * (15 + 1));
for (var i = 0; i < 104; i++)
{
	deck[i] = values[i - count];
	if (effectsPlaced < 24)
	{
		var rand = Math.floor(Math.random() * (6 - 0 + 1)) + 0;
		if (rand !=0)
		{
			if (rand > 3)
			{
				rand-=3;
			}
			effects[i] = rand;
			effectsPlaced++;
		}
		else
		{
			effects[i] = 0;
		}
	}
	else
	{
		effects[i] = 0;
	}
	if ((i - count) == (values.length - 1))
	{
		count+=13;
	}
}

function shuffle () {
  var i = 0
    , j = 0
    , temp = null
	, effTemp = null

  for (i = deck.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = deck[i];
	effTemp = effects[i];
    deck[i] = deck[j];
    deck[j] = temp;
	effects[i] = effects[j];
	effects[j] = effTemp;
  }
}
for (var i = 0; i < shuffleTime; i++)
{
	shuffle();
}
function bMregalReset(nothing,chan)
{
	for (var i = 0; i < 104; i++)
	{
		deck[i] = values[i - count];
		if (effectsPlaced < 12)
		{
			var rand = Math.floor(Math.random() * (6 - 0 + 1)) + 0;
			if (rand !=0)
			{
				if (rand > 3)
				{
					rand-=3;
				}
				effects[i] = rand;
				effectsPlaced++;
			}
			else
			{
				effects[i] = 0;
			}
		}
		else
		{
			effects[i] = 0;
		}
		if ((i - count) == (values.length - 1))
		{
			count+=13;
		}
	}
	for (var i = 0; i < shuffleTime; i++)
	{
		shuffle();
	}
	sendMessage("BlackMregal Game Reset!",chan);
}

function getNext()
{
	
	var temp = deck[0];
	sendMessage("You drew "+temp);
	if (effectDrawn == 1)
	{
		temp = Math.floor(temp * 2);
	}
	else if (effectDrawn == 2)
	{
		temp = Math.floor(temp / 2);
	}
	var tempArr = [];
	var tempArr2 = [];
	effectDrawn = effects[0];
	for (var i = 1; i < deck.length; i++)
	{
		tempArr[i-1] = deck[i];
		tempArr2[i-1] = effects[i];
	}
	deck = tempArr;
	effects = tempArr2;
	return temp;
}

function rulesBMregal(nothing,chan)
{
	sendMessage("```The rules of Black Mregal are Simple.\n\nGet as close to the value of 42 as possible without going over\nThe Dealer (Mregal Bot) Will deal cards to you and itself when you tell it to\n\nA Deck of 104 Cards with some of the Cards have been randomly given special effects that when drawn\nThe player that drew the card will have that effect applied\n\nBelow are the Trap Effects\n1. If you draw a card next turn its value is now double (High Risk, High Reward)\n2. If you draw a card next turn its value halved in value (Low Risk, Low Reward)\n3. If this effect is drawn then the deck is reshuffled\n\nCards in the Deck\nValues: 1 -> 10 -> 10(J) -> 10(Q) -> 10(K)\n8 of Each Value\n\nAt the start of the game 24 Cards will be randomly selected and have the Special Effects applied to them```",chan);
}

/*
Commands
$bjk hit - Draw a card for the player
$bjk keep - The player stops drawing cards and the AI will draw until it has decided its gotten high enough
$bjk skip - Wait out a turn and Don't Draw anything You may only do this 3 Times per game

The AI will look at the Cards already drawn and deduct what cards could still be in the deck remaining
It will also look at what effect if any will be used the very next turn and determine if the card it might draw is more likely to raise its score closer but not over 42
The more higher value cards that are remaining decrease the likelyhood of the AI hitting
0: No Effect
1: The very next turn will have the value of its drawn card doubled for you
2: The very next turn will have its value of its drawn card halved for you
3: The deck is reshuffled
*/

function bjkHit(nothing,chan)
{
	//Player Decides Hit
	var temp = getNext();
	if (effectDrawn !=0)
	{
		sendMessage("You drew an effect!",chan);
		if (effectDrawn == 1)
		{
			sendMessage("If you draw a card on the next turn its value will be doubled!",chan);
		}
		else if (effectDrawn == 2)
		{
			sendMessage("If you draw a card on the next turn its value will be halved!",chan);
		}
		else if (effectDrawn == 3)
		{
			sendMessage("You drew a shuffle card! The deck will now be reshuffled!!",chan);
			shuffle();
		}
	}
	playerScoreBJK+=temp;
	if (playerScoreBJK > 42)
	{
		sendMessage("You went over the limit of 42! And have been thrown into the pit of tortue for all eternity, Mregal Bot is the winner!",chan);
	}
	else
	{
		sendMessage("Your total score is currently "+playerScoreBJK,chan);
	}
}
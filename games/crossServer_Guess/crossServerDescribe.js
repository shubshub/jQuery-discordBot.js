var challengeServer = 0;
var chlngServOne = "";
var chlngServTwo = "";
var chlngServTwoID = 0;
var chlngServOneID = 0;

function challengeDescribe(txt,chan,userId)
{
	txt = txt.replace(commandTag+"servChallenge ","");
	if (challengeServer == 0)
	{
		chlngServOneID = chan;
		chlngServTwoID = txt;
		for (var i = 0; i < guildChannels.length; i++)
		{	
			for (var j = 0; j < guildChannels[i].length; j++)
			{
				if (chlngServOneID == guildChannels[i][j].id)
				{
					for (var k = 0; k < guildServers.length; k++)
					{
						if (guildChannels[i][j].guild_id == guildServers[k].id)
						{
							chlngServOne = guildServers[k].name;
						}							
					}

				}
				if (chlngServTwoID == guildChannels[i][j].id)
				{
					for (var k = 0; k < guildServers.length; k++)
					{
						if (guildChannels[i][j].guild_id == guildServers[k].id)
						{
							chlngServTwo = guildServers[k].name;
						}							
					}
				}
				
			}
		}
		challengeServer = 1;
		sendMessage("Sending Challenge Request to "+chlngServTwo,chlngServOneID);
		sendMessage(chlngServOne+" is challenging you to a game of Guess! type ```<@169712284149481472> acceptChallenge``` to start!",chlngServTwoID);
		setTimeout(function(){if (challengeServer == 1)	{sendMessage("Challenge was dropped nobody picked up call them back later with ``"+commandTag+"servChallenge "+chlngServOneID+"``",chlngServTwoID);	chlngServTwoID = 0;	challengeServer = 0; sendMessage("Nobody answered the call...",chlngServOneID);	chlngServOneID = 0;	}},60000);
	}
	else
	{
		sendMessage("Challenge in Progress",chan);
	}
}

function challengeConnected(nothing,chan,nothingg)
{
	console.log(chan);
	if ((challengeServer == 1) && (chan == chlngServTwoID))
	{
		sendMessage("Challenge accepted starting game!",chlngServOneID);
		sendMessage("Challenge accepted starting game!",chlngServTwoID);
		startChallenge();
		challengeServer = 2;
	}

}

function challengeEnd(txt,chan)
{
	if (challengeServer >= 1)
	{
		sendMessage("Challenge Withdrawn",chlngServOneID);
		sendMessage("Challenge Withdrawn",chlngServTwoID);
		chlngServOneID = 0;
		chlngServTwoID = 0;
		challengeServer = 0;
	}
}

function challengeSpeak(txt,chan,userId)
{
	txt = txt.replace(commandTag+"describe ", "");
	txt = txt.replaceAll("@everyone","[everyone ping removed!]");
	txt = txt.replaceAll("@here","[here ping removed!]");
	if (challengeServer == 2)
	{
		if (chlngServOneID == chan)
		{
			sendMessage("*<@"+userId+"> says '"+txt+"' from Server: "+chlngServOne,chlngServTwoID);
		}
		else if (chlngServTwoID == chan)
		{
			sendMessage("*<@"+userId+"> says '"+txt+"' from Server: "+chlngServTwo,chlngServOneID);
		}
	}
}

function startChallenge()
{
	sendMessage("Picking a Topic... Please Wait",chlngServTwoID);
	sendMessage("Picking a Topic... Please Wait",chlngServOneID);
}


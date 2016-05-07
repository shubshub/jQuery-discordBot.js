var chatReady = 1;
var lastMessage;
var readyHandle = setTimeout(checkReady,1000);

//Auth Keys

var authToken; 
var lru;

var guildServers = [];
var guildChannels = [];
var channelID = [];
function checkReady()
{
	if (chatReady == 0)
	{
		if (msg != lastMessage)
		{
			chatReady = 1;
		}
	}
	readyHandle = setTimeout(checkReady,1000);
}
function sendMessage(msg,chan)
{
	//Sends a message to Discord
	$.ajax(
	{
		type: "POST",
		url: "https://discordapp.com/api/channels/"+chan+"/messages",
		headers: 
		{ 
			'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
			'Accept-Language': "en-US",
			'Content-Type': "application/json",
			'Authorization': authToken
		},
		beforeSend: function(xhr) 
		{
			xhr.setRequestHeader('X-Requested-With',{toString: function() { return ''; }}
        );
    },
	data:JSON.stringify({"content":msg})
});
}

function getGuildStuff()
{
	$.ajax(
	{
		type: "GET",
		url: "https://discordapp.com/api/users/@me/guilds",
		headers: 
		{ 
			'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
			'Accept-Language': "en-US",
			'Content-Type': "application/json",
			'Authorization': authToken
		},
		beforeSend: function(xhr) 
		{
			xhr.setRequestHeader('X-Requested-With',{toString: function() { return ''; }}
        );
    },
	success: function(e)
	{
		guildServers = e;
		getChannels(guildServers[0],0);
	}
});
}
var count = 0;
function getChannels(servers,i)
{
	$.ajax(
	{
		type: "GET",
		url: "https://discordapp.com/api/guilds/"+servers.id+"/channels",
		headers: 
		{ 
			'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
			'Accept-Language': "en-US",
			'Content-Type': "text/html; charset=utf-8",
			'Authorization': authToken
		},
		beforeSend: function(xhr) 
		{
			xhr.setRequestHeader('X-Requested-With',{toString: function() { return ''; }}
        );
    },
	success: function(e)
	{
		
		guildChannels[i] = e;
		
		if (servers != guildServers[guildServers.length-1])
		{
			getChannels(guildServers[i+1],i+1);
		}
		else
		{
			setChannelID();
		}
		
	}
});
}

function setChannelID()
{
	for (var i = 0; i < guildServers.length; i++)
	{
		for (var j = 0; j < guildChannels[i].length; j++)
		{
			if (guildChannels[i][j].type !="voice")
			{
				channelID = channelID.concat(guildChannels[i][j].id);		
			}

		}
		
	}
}
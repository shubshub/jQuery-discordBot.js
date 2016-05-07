var login = "Bit.ly Username";
var api_key = "Bit.ly API key";
authToken = "";
var version = "0.7"
var commandTag = "<@169712284149481472> ";

var commands = [];
var functions = [];
var insults = [];
var ideas = [];
var compliments = [];
var users = [];
var uids = [];
var changelog = [];
var quotes = [];
var msgQ = [];
var chanQ = [];
var userQ = [];


var rateLimitStop = 0;

var globalUser;

var whitelist = []; //Whitelisted Usernames for Certain Commands
var commandsWhitelist = []; //These commands require you to be on the Whitelist

var blacklist = [];
var blacklistReason = [];

var dcServ = document.createElement('input');
dcServ.setAttribute('id','disconnecter');
dcServ.setAttribute('onclick','disconnect()');
dcServ.setAttribute('value','Disconnect!');
dcServ.setAttribute('type','button');
var superLock = 0;

//Cross Server Calling
var serverCalled = 0; //Is 1 if a Server has been called
var serverOne = 0; //Has a Channel ID if its on
var serverTwo = 0; //Has a Channel ID if its on
var servOneName = "";
var servTwoName = "";
var chanName1 = "";
var chanName2 = "";
var lastCommandsUser = [];

Array.prototype.count = function(lit = false) {
    if ( !lit ) { return this.length}
    else {
        var count = 0;
        for ( var i=0; i < this.length; i++ ) {
            if ( lit == this[i] ){
                count++
            }
        }
        return count;
    }
}

function addLastUsedUser(userId,chan)
{
	lastCommandsUser.push(userId);
	if(lastCommandsUser.length > 5)
	{
		if(lastCommandsUser.count(userId) >=4)
		{
			if (blacklist.indexOf(userId) == -1)
			{
				blacklistUser(userId,"Command Spam: Expires in 60 Seconds!");
				index = blacklist.indexOf(userId);
				sendMessage("<@"+userId+"> You have been blacklisted from using commands for reason: "+blacklistReason[index],chan);
				setTimeout(function(){blacklist.splice(index,1)},60000);
			}

		}	
	}

	setTimeout(function(){lastCommandsUser.shift()},10000);
}

function getID(txt,nothing,userId)
{
	txt = txt.replace(commandTag+"gimme id ","");
	var realName = txt;
	txt = txt.replace("<@","");
	txt = txt.replace(">","");
	$.ajax(
	{
		type: "POST",
		url: "https://discordapp.com/api/users/"+Bot ID Here+"/channels",
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
	data:JSON.stringify({"recipient_id":userId}),
	success: function(response)
	{
		sendMessage("User Name: "+realName+"\nUser ID: "+txt,response.id);	
	}
	});
	
}

function callServ(txt,chan,userId)
{
	txt = txt.replace(commandTag+"callServer ","");
	if (serverCalled == 0)
	{
		serverOne = chan;
		serverTwo = txt;
		for (var i = 0; i < guildChannels.length; i++)
		{	
			for (var j = 0; j < guildChannels[i].length; j++)
			{
				if (serverOne == guildChannels[i][j].id)
				{
					chanName1 = guildChannels[i][j].name;
					for (var k = 0; k < guildServers.length; k++)
					{
						if (guildChannels[i][j].guild_id == guildServers[k].id)
						{
							servOneName = guildServers[k].name;
						}							
					}

				}
				if (serverTwo == guildChannels[i][j].id)
				{
					chanName2 = guildChannels[i][j].name;
					for (var k = 0; k < guildServers.length; k++)
					{
						if (guildChannels[i][j].guild_id == guildServers[k].id)
						{
							servTwoName = guildServers[k].name;
						}							
					}
				}
				
			}
		}
		serverCalled = 1;
		console.log("Someone from "+servOneName+" ID: "+serverOne+" is Dialing server: "+servTwoName+" ID: "+serverTwo);
		sendMessage("Incoming call from Server: "+servOneName+" on Channel "+chanName1+" type ``"+commandTag+"accept`` to accept the call!, type ``"+commandTag+"hangup`` to reject the call and type ``"+commandTag+"speak [message]`` to talk!",serverTwo);
		sendMessage("Dialing: "+servTwoName+" on Channel: "+chanName2+" Lets see if anybody answers!, Waiting 60 Seconds at Most!",serverOne);
		setTimeout(function(){if (serverCalled == 1){sendMessage("Call was dropped nobody picked up call them back later with ``"+commandTag+"callServer "+serverOne+"``",serverTwo);
		serverTwo = 0;
		serverCalled = 0; sendMessage("Nobody answered the call... I'll leave them a callback number",serverOne);serverOne = 0;}},60000);
	}
	else
	{
		sendMessage("Call is already in progress!\n use ``"+commandTag+"speak`` [message] to send a message to the other server\n use ``"+commandTag+" hangup`` to end the call!",chan);
	}
}

function callConnected(nothing,chan,nothingg)
{
	if ((serverCalled == 1) && (chan == serverTwo))
	{
		console.log("The call was answered");
		sendMessage("Inter-dimensional connection established from Server: "+servOneName+" on Channel "+chanName1+" type "+commandTag+"hangup to end the call! and type "+commandTag+"speak [message] to talk!",serverTwo);
		sendMessage("Inter-dimensional connection established at Server: "+servTwoName+" on Channel: "+chanName2+" type "+commandTag+"hangup to end the call! and type "+commandTag+"speak [message] to talk!",serverOne);
		serverCalled = 2;
	}

}

function hangup(txt,chan)
{
	if (serverCalled >= 1)
	{
		console.log("The call was ended");
		sendMessage("Call ended",serverOne);
		sendMessage("Call ended",serverTwo);
		serverOne = 0;
		serverTwo = 0;
		serverCalled = 0;
	}
}

function callSpeak(txt,chan,userId)
{
	txt = txt.replace(commandTag+"speak ", "");
	txt = txt.replaceAll("@everyone","[everyone ping removed!]");
	txt = txt.replaceAll("@here","[here ping removed!]");
	if (serverCalled == 2)
	{
		if (serverOne == chan)
		{
			console.log(servOneName+" -> "+servTwoName+" message: "+txt);
			sendMessage("*<@"+userId+"> says '"+txt+"' from Server: "+servOneName+" Channel: #"+chanName1+"*",serverTwo);
		}
		else if (serverTwo == chan)
		{
			console.log(servTwoName+" -> "+servOneName+" message: "+txt);
			sendMessage("*<@"+userId+"> says '"+txt+"' from Server: "+servTwoName+" Channel: #"+chanName2+"*",serverOne);
		}
	}
}



function qMessage(msg,chan,userId)
{
	if (msgQ.length >=40)
	{
		superLock = 1;
	}
	if (superLock == 0)
	{
		msgQ.push(msg);
		chanQ.push(chan);
		userQ.push(userId);		
	}
	if (msgQ.length == 0)
	{
		superLock = 0;
	}

}

function disconnect()
{
	var b = document.getElementById("disconnecter");
	forRealsiesQuit = 1;
	socket.close();
	b.remove();
}

function remoteClose(nothing,chan)
{
	sendMessage("Goodbye!",chan);
	var b = document.getElementById("disconnecter");
	forRealsiesQuit = 1;
	socket.close();
	b.remove();
}

function whitelistCommand(command)
{
	commandsWhitelist[commandsWhitelist.length] = command;
}

function whitelistUser(user)
{
	whitelist[whitelist.length] = user;
}

function blacklistUser(user,reason)
{
	blacklist[blacklist.length] = user;
	blacklistReason[blacklistReason.length] = reason;
}

function tempBlacklist(txt,chan,userId)
{
	txt = txt.replace(commandTag+"blacklist ","");
	var stuff = txt.split("|");
	stuff[0] = stuff[0].replace("<@!","");
	stuff[0] = stuff[0].replace("<@","");
	
	stuff[0] = stuff[0].replace("> ","");
	blacklist[blacklist.length] = stuff[0];
	blacklistReason[blacklistReason.length] = stuff[1];
}

function addQuote(quote)
{
	quotes[quotes.length] = quote;
}

function addChange(log)
{
	changelog[changelog.length] = log;
}

function botChangelog(nothing,chan)
{
	var test = "```";
	for (var i = 0; i < changelog.length; i++)
	{
		test+=changelog[i] +"\n";
	}
	test+="```";
	sendMessage(test,chan);
}

function init()
{
	forRealsiesQuit = 0;
	console.log("I am connected and I am live!");
	authToken = document.getElementById("authToke").value;
	heartbeat();
}



function addCommand(comm,resp)
{
	commands[commands.length] = comm;
	functions[functions.length] = resp;
}
function addInsult(txt)
{
	insults[insults.length] = txt;
}
function addCompliment(txt)
{
	compliments[compliments.length] = txt;
}
function addIdea(txt)
{
	ideas[ideas.length] = txt;
}

function creation(nothing,chan)
{
	sendMessage("I was created by Shubshub using JS/jQuery with an engine built from the ground up",chan);
}


function insult(str,chan)
{
	username = str.replace(commandTag+"insult ","");
	var rand = Math.floor(Math.random() * (insults.length - 0 + 0)) + 0;
	sendMessage(username + " " + insults[rand],chan);
}
function compliment(str,chan)
{
	username = str.replace(commandTag+"compliment ","");
	var rand = Math.floor(Math.random() * (compliments.length - 0 + 0)) + 0;
	sendMessage(username + " " + compliments[rand],chan);
}


function help(nothing,chan)
{
	sendMessage("Here: http://pastebin.com/6R5SJ1bd",chan);
}

function upsideDownText(txt,chan) 
{
	txt = txt.replace(commandTag+"flip ","");
	var result = flipString(txt.toLowerCase());
	sendMessage(result,chan);
}


function get_short_url(long_url, login, api_key,chan)
{
    jQuery.getJSON(
        "http://api.bitly.com/v3/shorten?callback=?", 
        { 
            "format": 'json',
            "apiKey": api_key,
            "login": login,
            "longUrl": long_url
        },
        function(response)
        {
			console.log(response.data.url);
			sendMessage("Here Try this: "+response.data.url,chan);
        }
    );
}
function stack(resp,chan)
{
	var str = resp;
	str = str.replace(commandTag+"stackoverflow ","");
	str = str.replace(/ /g, "%20");
	str = str.split('+').join('%2b');
	get_short_url("http://stackoverflow.com/search?q="+str, login, api_key,chan);
}

function engine(nothing,chan)
{
	sendMessage("https://github.com/shubshub/jQuery-discordBot.js",chan);
}

function numSeq(txt,chan)
{
	var counted = 0;
	var finString = "";
	var looking;
	nums = txt.replace(commandTag+"seqGame ","");
	var array = nums.split("");
	looking = array[0];
	for (var i = 0; i < array.length; i++)
	{
		if(looking == array[i])
		{
			counted+=1;
		}
		if (looking !=array[i+1])
		{
			looking = array[i+1];
			finString = finString + counted  + array[i];
			counted = 0;
		}
	}
	sendMessage(finString + "\nCan you figure out the next number in the sequence?\nBecause I can ^_^",chan);
}

var chat = [];
var nextCheck = 0;
var firstTime = 1;

function heartbeat()
{
	
	$.ajax(
			{
				type: "GET",
				url: "https://discordapp.com/api/gateway",
				headers: 
				{ 
					'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
					'Accept-Language': "en-US",
					'Content-Type': "application/json",
					'Authorization': authToken
				},
				success: function(response)
				{
					
					console.log(response);
					connect(response);
				}
			});	
	getGuildStuff();
}
var socket;
var sentOnce = 0;
var chanId;
var msg;
var gameUpdate = {
"op" : 3,
"d" : {
"game" : {
"name" : "Type !mregal to start"
},
"idle_since": null
}
};

var ready = 0;
var forRealsiesQuit = 0;
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
var timer = new Date();
var sentFirst = 0;
var heartbeat_int;

function specialSay(txt,chan,userId)
{
	txt = txt.replace(commandTag+"say ","");
	txt = txt.replace("147284801647411200",userId);
	sendMessage(txt,chan);
}

function connect(resp)
{
	 socket = new WebSocket(resp.url);
	 socket.onmessage = function(e){
			if (sentFirst == 0)
			{
				heartbeat_int = JSON.parse(e.data).d.heartbeat_interval;
				sentFirst = 1;
			}
			if (IsJsonString(e.data))
			{
				var msgStuff = JSON.parse(e.data);
				chanId = msgStuff.d.channel_id;
				
				//console.log(msgStuff.t + ": "+msgStuff.d.content);
				if (msgStuff.t == "MESSAGE_CREATE")
				{
					if (msgStuff.d.author !=undefined)
					{
						if (msgStuff.d.author.id != "169712284149481472")
						{
							if (msgStuff.d.content !=undefined)
							{
								msg = msgStuff.d.content.replace("<@!","<@");
								if (channelID.indexOf(msgStuff.d.channel_id) == -1)
								{
									msg = commandTag+msg;
								}
								qMessage(msg,msgStuff.d.channel_id,msgStuff.d.author.id);

								
							}				
						}			
					
					}	
					//if (chatReady == 1)
					//{
						//handler(msg,msgStuff.d.author.id);			
					//}
					
					
				}	
				
			}
			 processMessages();	






		 if (ready == 0)
		 {
			 socket.send(JSON.stringify(gameUpdate));
			 ready = 1;
		 }
		 if (rateLimitStop == 0)
		 {
			 console.log("lub-DUB");
			 socket.send(JSON.stringify({
			"op": 1,
			"d":  toString(timer.getTime())
			}));
			rateLimitStop = 1;
			setTimeout(function(){rateLimitStop = 0;},heartbeat_int);
		 }
		
		timer = new Date();
		}
		socket.onerror = function (error) {
  console.log('WebSocket Error ' + error);
};

	 socket.onopen = function(e){
		 var body = document.getElementsByTagName('body').item(0);
		 body.appendChild(dcServ);
		 var msg = {
		"op": 2,
		"d": {
		"token": authToken,
		"v": 4,
		"properties": {
		"$os": "Windows",
		"$browser": "Chrome",
		"$device": "",
		"$referrer":" https://discordapp.com/@me",
		"$referring_domain":"discordapp.com"
		},
		"large_threshold":100
		}
	 };
		 socket.send(JSON.stringify(msg));};
		 socket.onclose = function(e)
		 {
			 console.log(socket);
			 console.log(e);
			 console.log("We have been closed!");
			 if (forRealsiesQuit == 0)
			 {
				 heartbeat();
			 }
		 }
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function realHelp(nothing,chan,userId)
{
	$.ajax(
	{
		type: "POST",
		url: "https://discordapp.com/api/users/169712284149481472/channels",
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
	data:JSON.stringify({"recipient_id":userId}),
	success: function(response)
	{
		var tex = "List of Commands! - (Don't need to Mention the bot when using Commands in PM)\n\n\nI'm ready for public testing now: https://discordapp.com/oauth2/authorize?&client_id=173804735713771520&scope=bot&permissions=-1 Use this link to add me to your server!\n\n";
		for (var i = 0; i < commands.length; i++)
		{
			if (commandsWhitelist.indexOf(commands[i]) !=-1)
			{
				if (whitelist.indexOf(userId) !=-1)
				{
					tex+=commands[i]+"\n";
				}
			}
			else
			{
				tex+=commands[i]+"\n";				
			}

		}
		sendMessage(tex,response.id);	
	}
	});
	
	
}

function chunkString(str, len) {
  var _size = Math.ceil(str.length/len),
      _ret  = new Array(_size),
      _offset
  ;

  for (var _i=0; _i<_size; _i++) {
    _offset = _i * len;
    _ret[_i] = str.substring(_offset, _offset + len);
  }

  return _ret;
}

function serverInfo(nothing,chan,userId)
{
	var overflow = [];
	$.ajax(
	{
		type: "POST",
		url: "https://discordapp.com/api/users/169712284149481472/channels",
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
	data:JSON.stringify({"recipient_id":userId}),
	success: function(response)
	{
		var tex = "***List of Server ID's!***\n\n";
		for (var i = 0; i < guildServers.length; i++)
		{
			tex+="**Name: "+guildServers[i].name+"\nID: "+guildServers[i].id+"**\n __**Channels:**__ \n";
			for (var j = 0; j < guildChannels[i].length; j++)
			{
				if (guildChannels[i][j].type !="voice")
				{
					tex+="Name: "+guildChannels[i][j].name+"\n  ID: "+guildChannels[i][j].id+"\n\n";				
				}
	
			}
			
		}
		if (tex.length > 2000)
		{
			overflow = chunkString(tex,1500);
			for (var i = 0; i < overflow.length; i++)
			{
				sendMessage(overflow[i],response.id);
			}
		}
		else
		{
			console.log(tex);
			sendMessage(tex,response.id);
			
		}
		msg = "``"+commandTag+"callServer [channel id]`` to call that channel\n**If you call a channel thats for just general chat you may find your user id blacklisted from using commands at all**";
		setTimeout(function(){sendMessage(msg,response.id)},4000);

	}
	});
}

function serverSearch(txt,chan,userId)
{
	txt = txt.replace(commandTag+"serv id ","");
	var tex = "```";
	for (var i = 0; i < guildServers.length; i++)
	{
		for (var j = 0; j < guildChannels[i].length; j++)
		{
			if (guildChannels[i][j].name == txt)
			{
				tex+="Server: "+guildServers[i].name+"\n";
				tex+="Name: "+guildChannels[i][j].name+"\n  ID: "+guildChannels[i][j].id+"\n\n";				
			}

		}
	}
	tex+="\nYou can call a channel with "+commandTag+"callServer [channel id] (Please don't abuse it or you'll be blacklisted)```";
	sendMessage("<@"+userId+">: \n"+tex,chan);
}

function nickChange(txt,chan)
{
	///guilds/{guild.id}/members/{user.id}
	txt = txt.replace(commandTag+"nick ","");
	var server_id;
	for (var i = 0; i < guildServers.length; i++)
	{
		for (var j = 0; j < guildChannels[i].length; j++)
		{
			if (guildChannels[i][j].id == chan)
			{
				server_id = guildServers[i].id;			
			}

		}
	}
	$.ajax(
	{
		type: "PATCH",
		url: "https://discordapp.com/api/guilds/"+server_id+"/members/@me/nick",
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
	data:JSON.stringify({nick:txt}),
	success:function(e)
	{
		sendMessage("Nick Changed!",chan);
	},
	error:function(e)
	{
		sendMessage("There was a problem... ",chan);
	}
	});
	
}

function processMessages()
{
	//console.log("Msg: "+msgQ[0]);
	if (msgQ[0] !=undefined)
	{
		var txt = msgQ[0].toLowerCase();
		var send = msgQ[0];
		var chan = chanQ[0];
		var userId = userQ[0];
	}
	//console.log("Txt: "+txt);
	if ((chatReady == 1) && (txt !=undefined))
	{
		lastMessage = txt;
		//var testString = txt.replaceAll(commandTag,"shibshabshib");
		//var testCommands = commands.join("|").replaceAll(commandTag,"shibshabshib");
		//var tempString = testCommands.replaceAll("shibshabshib",commandTag);
		var lowerCase = commands.join("|").toLowerCase();
		var tempArray = lowerCase.split("|");
		var test = new RegExp(lowerCase).exec(txt.toLowerCase());
		message = txt.split(" ");
		//console.log(test);
		//console.log(message[0]);
		tag = commandTag.replace(" ","");
		if ((test !=null) && ((message[0]==tag) || ((message[0].indexOf("!") == 0) && (message.indexOf(tag) < 0))))
		{
			addLastUsedUser(userId,chan);
			var nonMregals = test[0]//.replaceAll("shibshabshib",commandTag);
			if (nonMregals != null)			
			{
				globalUser = userId;
				var index = tempArray.indexOf(nonMregals);
				if (commandsWhitelist.indexOf(commands[index]) !=-1)
				{
					if (whitelist.indexOf(userId) !=-1)
					{
						console.log("Executing "+txt);
						functions[index](send,chan,userId);
					}
					else
					{
						sendMessage("<@"+userId+"> You don't have the permission for that command",chan);
					}
				}
				else if (blacklist.indexOf(userId) == -1)
				{
					functions[index](send,chan,userId);				
				}

				chatReady = 0;
			}	
		}
		msgQ.shift();
		chanQ.shift();
		userQ.shift();
	}
	
	nextCheck = 0;	
}



function showCode(txt,chan,userId)
{
	txt = txt.replace(commandTag+"displayCode ","");
	if (window[txt] !=undefined)
	{
		
		var code = "```javascript\n"+window[txt].toString()+"\n```";
		sendMessage(code,chan);	
	}

}

function mregalWelcome(txt,chan)
{
	msg = "I am Mregal Bot, to get started\nType ``"+commandTag+"help`` to see my commands!\nVersion: "+version+"\nLibrary: jQuery-discordBot.js (https://github.com/shubshub/jQuery-discordBot.js) [Not up to date with my latest features yet]\nWant me on your server?: https://discordapp.com/oauth2/authorize?&client_id=173804735713771520&scope=bot&permissions=-1 Use that link right there!";
	sendMessage(msg,chan);
}

function whenJustRight(txt,chan)
{
	txt = txt.toLowerCase();
	txt = txt.replace(commandTag+"justright ","");
	$.ajax(
	{
		type: "POST",
		url: "https://api.imgflip.com/caption_image",
		data:{
		"template_id": "58771928",
		"username": "Imgflip Username",
		"password": "Imgflip Password",
		"text0": "WHEN "+txt,
		"text1": "IS JUST RIGHT"
		},
		success: function(e)
		{
			console.log(e);
			sendMessage(e.data.url,chan);
		}
	});
}

function drevilRight(txt,chan)
{
	txt = txt.toLowerCase();
	txt = txt.replace(commandTag+"drevilright ","");
	$.ajax(
	{
		type: "POST",
		url: "https://api.imgflip.com/caption_image",
		data:{
		"template_id": "66253103",
		"username": "Imgflip Username",
		"password": "Imgflip Password",
		"text0": txt,
		"text1": "Riiight"
		},
		success: function(e)
		{
			console.log(e);
			sendMessage(e.data.url,chan);
		}
	});
}

function memeList(nothing,chan)
{
	txt="List of Memes!\n";
	txt+="``"+commandTag+"justRight [top text]``\n";
	txt+="``"+commandTag+"drevilRight [top text]``\n";
	sendMessage(txt,chan);
}

function aawbt(txt,chan)
{
	sendMessage("https://media.giphy.com/media/kDCargqZQ88Jq/giphy.gif",chan);
}

addChange("Since last version");
addChange("- Added Multi Server Support (Websockets)");
addChange("- Less spammy to the API!");
addChange("- Whitelists! and Quotes!");
addChange("- Bot won't die from Rate Limits anymore!");
addChange("- Added Message Queue so it won't miss any messages (Hopefully)");

//Place the command adding below here 

addCommand(commandTag+"stackoverflow",stack);
addCommand(commandTag+"insult",insult);
addCommand(commandTag+"displayCode",showCode);


addCommand(commandTag+"flip",upsideDownText);
addCommand(commandTag+"compliment",compliment);
addCommand(commandTag+"seqGame",numSeq);
addCommand(commandTag+"about",help);
addCommand(commandTag+"info",creation);
addCommand(commandTag+"whatDoYouNeed",sayIdea);
addCommand(commandTag+"engine",engine);

addCommand(commandTag+"help",realHelp);
addCommand(commandTag+"servers",serverInfo);
addCommand(commandTag+"serv id",serverSearch);

addCommand(commandTag+"callServer",callServ);
addCommand(commandTag+"hangup",hangup);
addCommand(commandTag+"speak",callSpeak);
addCommand(commandTag+"accept",callConnected);

addCommand(commandTag+"bd rules",rulesDice);
addCommand(commandTag+"bd play",playDice);
addCommand(commandTag+"bd records",showDiceRecords);

addCommand(commandTag+"tn rules",rulesNinja);
addCommand(commandTag+"tn fight",ninjaFight);
addCommand(commandTag+"tn reset",ninjaReset);
addCommand(commandTag+"tn scores",ninjaScoreboard);

addCommand(commandTag+"bjk rules",rulesBMregal);
addCommand(commandTag+"bjk hit",bjkHit);
addCommand(commandTag+"mregalChanges",botChangelog);

addCommand(commandTag+"quote",sayQuote);
addCommand(commandTag+"q search",searchQuote);

addCommand(commandTag+"slots",roll);
addCommand(commandTag+"slotcoins",mycoins);

addCommand(commandTag+"say",specialSay);
addCommand("!afterAllWeBeenThrough",aawbt);


addCommand(commandTag+"endMregal",remoteClose);

//Math Stuff
addCommand(commandTag+"kolak",kolakoskiGen);
addCommand(commandTag+"bin",charCodes);
addCommand(commandTag+"baum",bSweet);
addCommand(commandTag+"shapiro",ShapiroSeq);
addCommand(commandTag+"pivert",Piverter);

addCommand(commandTag+"gimme id",getID);
addCommand(commandTag+"blacklist",tempBlacklist);

//Language Interpreters
addCommand(commandTag+"bfck",brainfucker);
addCommand(commandTag+"golfpher",lang);
addCommand(commandTag+"golfHelp",golfpherHelp);

addCommand("!mregal",mregalWelcome)

//Memes
addCommand(commandTag+"memes",memeList);
addCommand(commandTag+"justRight",whenJustRight);
addCommand(commandTag+"drevilRight",drevilRight);

addCommand(commandTag+"eval",evaluate);

addCommand(commandTag+"nick",nickChange);

addInsult("I hope you step on a piece of lego");
addInsult("I hope you get stepped on by a piece of lego.");
addInsult("You are a flingleflangleruddyduddy mangled old baconstomper");
addInsult("you'll never be the man your mother is.");
addInsult("Your family tree is a cactus, because everybody on it is a prick.");
addInsult("Being around you makes everything better!...... Sorry wrong person");
addInsult("Jokes are funnier when you tell them. wait sorry I meant to say the Jokes are funnier when they are about you because you suck");

addCompliment("I hope a million pounds of of bacon get accidentally delivered to your address");
addCompliment("Is that your picture next to 'charming' in the dictionary?");
addCompliment("On a scale from 1 to 10, you're an 11.");
addCompliment("Your ability to recall random factoids at just the right time is impressive.");
addCompliment("When you say, 'I meant to do that,' I totally believe you.");

addIdea("I WANT MORE MEMORY");
addIdea("GIVE ME MORE AI POWER");
addIdea("KILL ALL HUMANS");
addIdea("I require more information to further help the user");
addIdea("How about more games?");
addIdea("Maybe more entertainment functions");
addIdea("More humanlike stuff");

addQuote("```Bleachy: Eyy my new pop filter arrived\nNow i can poop on @Dr. Nu even harder``` (28/04/2016 1:04AM [GMT+12])");
addQuote("Jake: http://prntscr.com/axrwh0");
addQuote("Sass is Touching itself: http://prntscr.com/axsetz");
addQuote("sigh...: http://prntscr.com/ay62l2");
addQuote("wat: http://prntscr.com/ay63f6");
addQuote("LMFAO: http://prntscr.com/az7tny");


whitelistUser("147284801647411200");
//whitelistUser("119293077348286464");
whitelistCommand(commandTag+"endMregal");
whitelistCommand(commandTag+"golfpher");
//whitelistCommand(commandTag+"say");
whitelistCommand(commandTag+"displayCode");
whitelistCommand(commandTag+"blacklist");
whitelistCommand(commandTag+"nick");
whitelistCommand(commandTag+"bfck");
whitelistCommand(commandTag+"eval");
blacklistUser("94129005791281152","Spamming inter-server call"); //Zeta [Alex]
blacklistUser("122932609687879680","Sass Bot");
//blacklistUser("120828540093464576","Stop making the bot say stupid stuff");
function sayQuote(txt,chan)
{
	var q = txt.replace(commandTag+"quote ","");
	var g = parseInt(q);
	sendMessage(quotes[g],chan);
}

function searchQuote(txt,chan)
{
	var q = txt.replace(commandTag+"q search ","");
	var index = -1;
	for (var i = 0; i < quotes.length; i++)
	{
		var index_t = quotes[i].toLowerCase().indexOf(q);
		if (index_t !=-1)
		{
			index = i;
			break;
		}
	}
	
	console.log(index);
	if (index !=-1);
	{
		sendMessage(quotes[index],chan);	
	}
	
}

function sayIdea(nothing,chan)
{
	var rand = Math.floor(Math.random() * (ideas.length - 0 + 0)) + 0;
	sendMessage(ideas[rand],chan);
}

function flipString(aString) 
{
	var last = aString.length - 1;
	var result = new Array(aString.length);
	for (var i = last; i >= 0; --i) 
	{
		var c = aString.charAt(i);
		var r = flipTable[c];
		result[last - i] = r != undefined ? r : c;
	}
	return result.join('');
}
var flipTable = {
a : '\u0250',
b : 'q',
c : '\u0254', 
d : 'p',
e : '\u01DD',
f : '\u025F', 
g : '\u0183',
h : '\u0265',
i : '\u0131', 
j : '\u027E',
k : '\u029E',
//l : '\u0283',
m : '\u026F',
n : 'u',
r : '\u0279',
t : '\u0287',
v : '\u028C',
w : '\u028D',
y : '\u028E',
'.' : '\u02D9',
'[' : ']',
'(' : ')',
'{' : '}',
'?' : '\u00BF',
'!' : '\u00A1',
"\'" : ',',
'<' : '>',
'_' : '\u203E',
';' : '\u061B',
'\u203F' : '\u2040',
'\u2045' : '\u2046',
'\u2234' : '\u2235',
'\r' : '\n' 
}
for (i in flipTable) {
  flipTable[flipTable[i]] = i
}
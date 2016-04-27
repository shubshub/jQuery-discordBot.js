var login = "Bit.ly Username";
var api_key = "Bit.ly API Key";
authToken = "";

var commands = [];
var functions = [];
var insults = [];
var ideas = [];
var compliments = [];
var users = [];
var uids = [];
var changelog = [];
var quotes = [];

var whitelist = []; //Whitelisted Usernames for Certain Commands
var commandsWhitelist = []; //These commands require you to be on the Whitelist

var dcServ = document.createElement('input');
dcServ.setAttribute('id','disconnecter');
dcServ.setAttribute('onclick','disconnect()');
dcServ.setAttribute('value','Disconnect!');
dcServ.setAttribute('type','button');

function disconnect()
{
	var b = document.getElementById("disconnecter");
	socket.close();
	b.remove();
}

function remoteClose()
{
	sendMessage("Goodbye!");
	var b = document.getElementById("disconnecter");
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

function addQuote(quote)
{
	quotes[quotes.length] = quote;
}

function addChange(log)
{
	changelog[changelog.length] = log;
}

function botChangelog()
{
	var test = "```";
	for (var i = 0; i < changelog.length; i++)
	{
		test+=changelog[i] +"\n";
	}
	test+="```";
	sendMessage(test);
}

function init()
{
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

function creation()
{
	sendMessage("I was created by Shubshub using JS/jQuery with an engine built from the ground up");
}


function insult(str)
{
	username = str.replace("$insult ","");
	var rand = Math.floor(Math.random() * (insults.length - 0 + 0)) + 0;
	sendMessage(username + " " + insults[rand]);
}
function compliment(str)
{
	username = str.replace("$compliment ","");
	var rand = Math.floor(Math.random() * (compliments.length - 0 + 0)) + 0;
	sendMessage(username + " " + compliments[rand]);
}


function help()
{
	sendMessage("Here: http://pastebin.com/6R5SJ1bd");
}

function upsideDownText(txt) 
{
	txt = txt.replace("$flip ","");
	var result = flipString(txt.toLowerCase());
	sendMessage(result);
}


function get_short_url(long_url, login, api_key)
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
			sendMessage("Here Try this: "+response.data.url);
        }
    );
}
function stack(resp)
{
	var str = resp;
	str = str.replace("$stackoverflow ","");
	str = str.replace(/ /g, "%20");
	str = str.split('+').join('%2b');
	get_short_url("http://stackoverflow.com/search?q="+str, login, api_key);
}

function engine()
{
	sendMessage("https://github.com/shubshub/jQuery-discordBot.js");
}

function numSeq(txt)
{
	var counted = 0;
	var finString = "";
	var looking;
	nums = txt.replace("$seqGame ","");
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
	sendMessage(finString + "\nCan you figure out the next number in the sequence?\nBecause I can ^_^");
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
}
var socket;
var sentOnce = 0;
var chanId;
var msg;
var gameUpdate = {
"op" : 3,
"d" : {
"game" : {
"name" : "$about for commands"
},
"idle_since": null
}
};

var ready = 0;

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function connect(resp)
{
	 socket = new WebSocket(resp.url,["protocolOne", "protocolTwo"]);
	 socket.onmessage = function(e){
			if (IsJsonString(e.data))
			{
				var msgStuff = JSON.parse(e.data);
				chanId = msgStuff.d.channel_id;
				if (msgStuff.t == "MESSAGE_CREATE")
				{
					if (msgStuff.d.author !=undefined)
					{
						if (msgStuff.d.author.id != "169712284149481472")
						{
							if (msgStuff.d.content !=undefined)
							{
								msg = msgStuff.d.content;			
							}				
						}				
					}	
					handler(msg,msgStuff.d.author.id);				
				}	
			}
			 






		 if (ready == 0)
		 {
			 socket.send(JSON.stringify(gameUpdate));
			 ready = 1;
		 }
		socket.send(JSON.stringify({
		"op": 1,
		"d":  "1450996513618"
		}));
		
		}
		socket.onerror = function (error) {
  console.log('WebSocket Error ' + error);
};

	 socket.onopen = function(){
		 var body = document.getElementsByTagName('body').item(0);
		 body.appendChild(dcServ);
		 var msg = {
		"op": 2,
		"d": {
		"token": authToken,
		"v": 3,
		"properties": {
		"$os": "Windows",
		"$browser": "Chrome",
		"$device": "",
		"$referrer":" https://discordapp.com/@me",
		"$referring_domain":"discordapp.com"
		},
		"large_threshold":100,
		"compress":true
		}
	 };
		 socket.send(JSON.stringify(msg));};
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function handler(txt,userId)
{
	if (chatReady == 1)
	{
		lastMessage = txt;
		var testString = txt.replaceAll("$","shibshabshib");
		var testCommands = commands.join("|").replaceAll("$","shibshabshib");
		var test = new RegExp(testCommands).exec(testString);
		if (test !=null)
		{
			var nonMregals = test[0].replaceAll("shibshabshib","$");
			if (nonMregals != null)			
			{
				
				var index = commands.indexOf(nonMregals);
				if (commandsWhitelist.indexOf(commands[index]) !=-1)
				{
					if (whitelist.indexOf(userId) !=-1)
					{
						functions[index](txt);
					}
					else
					{
						sendMessage("You don't have the permission for that command");
					}
				}
				else
				{
					functions[index](txt);				
				}
				chatReady = 0;
			}	
		}
		
	}
	nextCheck = 0;	
}

addChange("Since last version");
addChange("- Added Multi Server Support (Websockets)");
addChange("- Less spammy to the API!");
addChange("- Whitelists! and Quotes!");

//Place the command adding below here 
addCommand("$stackoverflow",stack);
addCommand("$insult",insult);
addCommand("$flip",upsideDownText);
addCommand("$compliment",compliment);
addCommand("$seqGame",numSeq);
addCommand("$about",help);
addCommand("$info",creation);
addCommand("$whatDoYouNeed",sayIdea);
addCommand("$engine",engine);



addCommand("$bd rules",rulesDice);
addCommand("$bd play",playDice);
addCommand("$bd records",showDiceRecords);

addCommand("$tn rules",rulesNinja);
addCommand("$tn fight",ninjaFight);
addCommand("$tn reset",ninjaReset);
addCommand("$tn scores",ninjaScoreboard);

addCommand("$bjk rules",rulesBMregal);
addCommand("$bjk hit",bjkHit);
addCommand("$mregalChanges",botChangelog);

addCommand("$quote",sayQuote);

addCommand("$endMregal",remoteClose);


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

whitelistUser("147284801647411200");
whitelistCommand("$endMregal");

function sayQuote(txt)
{
	var q = txt.replace("$quote ","");
	var g = parseInt(q);
	sendMessage(quotes[g]);
}

function sayIdea()
{
	var rand = Math.floor(Math.random() * (ideas.length - 0 + 0)) + 0;
	sendMessage(ideas[rand]);
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
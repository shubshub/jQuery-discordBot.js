var login = "Bit.ly Username";
var api_key = "Bit.ly API Key";
function blah()
{
	importScripts("./fakeDOM.js");
	importScripts("https://code.jquery.com/jquery-2.2.3.min.js");
	importScripts("./discordPureJS.js");
	importScripts("./games/battledice/battleDice.js");
	importScripts("./games/textNinja/textNinja.js");
	importScripts("./games/blackMregal/blackMregal.js");
}
blah();

self.addEventListener("message", function(e) {
	if (e.data[0] == "init")
	{
		eval(e.data[0])(e.data[1],e.data[2]);		
	}
}, false);

var commands = [];
var functions = [];
var insults = [];
var ideas = [];
var compliments = [];
var users = [];
var uids = [];
var changelog = [];

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

function init(u,a)
{
	console.log("I am a new server! and I am live!");
	authToken = a;
	lru = u;
	var handle = setTimeout(returnChat,100);
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
function returnChat()
{
	if (nextCheck == 0)
	{
		nextCheck = 1;
		$.ajax(
			{
				type: "GET",
				url: lru,
				headers: 
				{ 
					'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
					'Accept-Language': "en-US",
					'Content-Type': "application/json",
					'Authorization': authToken
				},
				success: function(response)
				{
					
					//console.log(response);
					chat = response
					handler(chat[0].content);
				}
			});			
	}
}
function chatHandler()
{
	handler(chat[0].content);
}

function handler(txt)
{
	if (chatReady == 1)
	{
		lastMessage = txt;
		for (var i = 0; i < commands.length; i++)
		{
			if ((txt.indexOf(commands[i]) !=-1) && (chat[0].author.id != "169712284149481472"))
			{
				functions[i](txt);
				chatReady = 0;
			}				
		}
		
	}
	nextCheck = 0;
	returnChat();
	//domNewMessage[0].innerHTML= chat[0].content;
	
}

addChange("Since last version");
addChange("- Added Multi Server Support (Multithreading)");
addChange("- More Stability");
//Place the command adding below here 
addCommand("$stackoverflow",stack);
addCommand("$insult",insult);
addCommand("$flip",upsideDownText);
addCommand("$compliment",compliment);
addCommand("$seqGame",numSeq);
addCommand("$about",help);
addCommand("$info",creation);
addCommand("$whatDoYouNeed",sayIdea);

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


addInsult("I hope you step on a piece of lego");
addInsult("I hope you get stepped on by a piece of lego.");
addInsult("You are a flingleflangleruddyduddy mangled old baconstomper");
addInsult("you'll never be the man your mother is.");
addInsult("Your family tree is a cactus, because everybody on it is a prick.");

addCompliment("I hope a million pounds of of bacon get accidentally delivered to your address");

addIdea("I WANT MORE MEMORY");
addIdea("GIVE ME MORE AI POWER");
addIdea("KILL ALL HUMANS");
addIdea("I require more information to further help the user");
addIdea("How about more games?");
addIdea("Maybe more entertainment functions");
addIdea("More humanlike stuff");



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
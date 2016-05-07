//Dangerous EVAL command
function evaluate(txt,chan,userId)
{
	var evaluate = "Nope";
	var splitHold = String.prototype.split;
	var subHold = String.prototype.substring;
	txt = txt.replace(commandTag+"eval ","");
	txt = txt.replace(commandTag+"eval","");
	txt = txt.replace("userId","");
	txt = txt.replace("evaluate","");
	txt = txt.replace("whitelist","blacklist");
	if (userId != "147284801647411200")
	{
		txt = txt.replace("147284801647411200","[Can't do that with Shubshub]");
		txt = txt.replace("authToken","");
		txt = txt.replace("substring","[No SubStrings]");
		txt = txt.replace("window","");
		txt = txt.replace("this","");
		txt = txt.replace("login");
		txt = txt.replace("api_key","");
		txt = txt.replace("sendMessage","[No Sending Messages]");	
		String.prototype.split = 0;
		String.prototype.substring = 0;
	}
	try{
		output = eval(txt);
		String.prototype.split = splitHold;
		String.prototype.substring = subHold;
		output = output.toString();
		output = output.replace(authToken,"[Auth Token Redacted!]");
		output = output.replace(authToken.split(""),"[Auth Token Redacted!]");
		sendMessage(output,chan);
	} 
	catch(err)	{sendMessage("``Error with the code: "+err+"``",chan);}
	
	
}
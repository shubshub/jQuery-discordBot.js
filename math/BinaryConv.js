function dec2bin(dec){
    return (dec >>> 0).toString(2);
}

function charCodes(tex,chan)
{
	tex = tex.replace(commandTag+"bin ","");
	var arr = tex.split("");
	var codes = [];
	for (i = 0; i < arr.length; i++)
	{
		codes[i] = arr[i].charCodeAt(0);
	}
	var bin = [];
	for (j = 0; j < codes.length; j++)
	{
		var temp = dec2bin(codes[j]);
		while(temp.length !=8)
		{
			temp = "0" + temp;
		}
		bin[j] = temp;
	}
	var string = bin.join(" ");
	sendMessage("ASCII: "+tex+"\nBinary: "+string,chan);
}
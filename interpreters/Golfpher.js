//eval("(function(){return 'Hello'})(self)")
function getCloser(a, b, c) {
    b = b || c;
    return Math.round(a / b) * b;
}
function convert(txt){
var tex = "(function(){return 'Hello'})(self)";
tex = txt;
t=""
j = 0;
for (var i = 0;i<tex.length;i++)
{
	/*if (j!=0)
	{
		var z = getCloser(j,0,tex.charCodeAt(i));	
		if (z == 0)
		{
			j=0;
			t+="#";
		}
	}*/
	while(j!=tex.charCodeAt(i))
	{
		t+=(j>tex.charCodeAt(i))?"-":"+"
		if(j > tex.charCodeAt(i))
		{
			j--;
		}
		if (j < tex.charCodeAt(i))
		{
			j++;
		}
	}
	t+="<"
}
t+="=";
console.log(t)}
function golfpherHelp(nothing,chan)
{
	var msg="Golfpher is an Esoteric Language that works on a single Char Pointer\nThere are only 4 functions in Golfpher\n+ : Add one to the Char Pointer\n- : Remove one from the Char Pointer\n< : Push the character at the char pointers position onto the stack\n= : execute the code thats on the stack\nEach function must be seperated by a ;";
	sendMessage("Golfpher is an Esoteric Language that works on a single Char Pointer\nThere are only 4 functions in Golfpher\n```+ : Add one to the Char Pointer\n- : Remove one from the Char Pointer\n< : Push the character at the char pointers position onto the stack\n= : execute the code thats on the stack\n```\n\n"+commandTag+"golfpher [code] to execute a golfpher program",chan);
}
function lang(txt,chan)
{
	i=0;
	txt = txt.replace(commandTag+"golfpher ","");
	output = txt.split("");
	code="";
	data="";
	for(j = 0;j<output.length;j++)
	{
		if(output[j]=="=")
		{
			code=code.replaceAll("authToken","");
			data+=eval(code);
		}
		else if(output[j]=="<")
		{
			code+=String.fromCharCode(i);
		}
		else if(output[j]=="+")
		{
			i++;
		}
		else if (output[j]=="-")
		{
			i--;
		}
		else if (output[j]=="#")
		{
			i=0;
		}
	}
	sendMessage(data,chan);
}

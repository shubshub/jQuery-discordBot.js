var PI = 3.14159265359;
function Piverter(num,chan)
{
	num = num.replace(commandTag+"pivert ","");
	var output = num / PI;
	sendMessage("Divide **"+num+"** by **"+output+"** and you get **"+PI+"**",chan);
}
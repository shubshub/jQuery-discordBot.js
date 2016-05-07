/*
a[n] counts the number of 11 occurances
111 = 2 "11";

b[n] = -1 if a[n] is odd
b[n] = +1 if a[n] is even

*/
function shapiroBin(dec){
    return (dec >>> 0).toString(2);
}

function ShapiroIsOdd(n) {
   return Math.abs(n % 2) == 1;
}

function ShapiroIsEven(n) {
   return !ShapiroIsOdd(n);
}

function ShapiroSeq(times,chan)
{
	times = times.replace(commandTag+"shapiro","");
	var a = [];
	var b = [];
	for (var n = 0; n < times; n++)
	{
		a[n] = 0;
		var binary = shapiroBin(n);
		var binaryArr = binary.split("");
		for (var m = 0; m < binaryArr.length; m++)
		{
			if((binaryArr[m] == "1") && (binaryArr[m+1] == "1"))
			{
				a[n]+=1;
			}
		}
		if (ShapiroIsOdd(a[n]))
		{
			b[n] = ":heavy_minus_sign::one:";
		}
		else if(ShapiroIsEven(a[n]))
		{
			b[n] = ":heavy_plus_sign::one:";
		}
	}
	var outputA = a.join(" -> ");
	var outputB = b.join(" -> ");
	sendMessage("Rudin-Shapiro Sequence A: "+outputA+"\n\nRudin-Shapiro Sequence B: "+outputB,chan);
}


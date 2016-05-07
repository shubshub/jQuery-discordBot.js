/*
bn = 1 if the binary representation of n contains no block of consecutive 0s of odd length;
bn = 0 otherwise;
*/
function baumBin(dec){
    return (dec >>> 0).toString(2);
}

function isOdd(n) {
   return Math.abs(n % 2) == 1;
}

function isEven(n) {
   return !isOdd(n);
}
function bSweet(times,chan)
{
	console.log("Times "+times);
	times = times.replace(commandTag+"baum ","");
	var b = [];
	for (var n = 0; n < times; n++)
	{
		var setOdd = false;
		var binaryRep = baumBin(n);
		var arrTest = binaryRep.split("1");
		var testArray = []
		var count = 0;
		for (var i = 0; i < arrTest.length; i++)
		{
			if (arrTest[i] != "")
			{
				testArray[count++] = arrTest[i];
			}
		}
		for (var j = 0; j < testArray.length; j++)
		{
			if (isOdd(testArray[j].length))
			{
				setOdd = true;
			}
		}
		if (setOdd == true && (n!=0))
		{
			b[n] = 0
		}
		else if (setOdd == false && (n!=0))
		{
			b[n] = 1;
		}
		else if (n == 0)
		{
			b[n] = 1;
		}
	}
	console.log("b "+b);
	console.log("t "+t);
	var t = b.join(" ");
	sendMessage("Baum-Sweet sequence: "+t,chan);
}
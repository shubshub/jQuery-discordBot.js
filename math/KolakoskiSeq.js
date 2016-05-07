/*Read and Move Numbers sequentially
if x=odd the output is written 1 time
if x=even then the output is written 2 times

*/
function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
};

function kolakoskiGen(times,chan)
{
	times = times.replace(commandTag+"kolak ","");
	
	var x = [1,2,2];
	var n = parseInt(times);
	var rng = range(2,n);
	for (i in rng)
	{
		if (rng.indexOf(parseInt(i)) !=-1)
		{
			var t = [1 + i % 2];
			t.length = t.length * x[i];
			t[t.length-1] = t[0];
			if (t.length == 2)
			{
				x[x.length] = t[0];
				x[x.length] = t[1];
			}
			else
			{
				x[x.length] = t[0];
			}
		}
	}	
	var stringX = x.join(" ");
	sendMessage("Kolakoski Sequence: "+stringX,chan);
}

function randomString(length) {
	var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
function removeMe(id)
{
	var b = document.getElementsByClassName(id);
	b[2].remove();
	b[1].remove();
	b[0].remove();	

	window[id].terminate();
}
function newServer()
{
	var temp = randomString(30);
	var earl = document.getElementById("urlToke");
	var token = document.getElementById("authToke");
	window[temp] = new Worker("./jQuery.discordBot.js");
	window[temp].postMessage(["init",earl.value,token.value]);
	console.log("New Server Spawned");
	var body = document.getElementsByTagName('body').item(0);
	var servBut = document.createElement('input');
	servBut.setAttribute('class',temp);
	servBut.setAttribute('onclick','removeMe("'+temp+'")');
	servBut.setAttribute('value','Terminate Server');
	servBut.setAttribute('type','button');
	var servName = document.createElement('span');
	servName.setAttribute('class',temp);
	
	servName.innerHTML = "  "+earl.value;
	var br = document.createElement('br');
	br.setAttribute('class',temp);
	
	
	body.appendChild(servBut);
	body.appendChild(servName);
	body.appendChild(br);
}
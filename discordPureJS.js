var chatReady = 1;
var lastMessage;
var readyHandle = setTimeout(checkReady,1000);

//Auth Keys

var authToken; 
var lru;

function checkReady()
{
	if (chatReady == 0)
	{
		if (chat[0].content != lastMessage)
		{
			chatReady = 1;
		}
	}
	readyHandle = setTimeout(checkReady,1000);
}
function sendMessage(msg)
{
	//Sends a message to Discord
	$.ajax(
	{
		type: "POST",
		url: lru,
		headers: 
		{ 
			'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
			'Accept-Language': "en-US",
			'Content-Type': "application/json",
			'Authorization': authToken
		},
		beforeSend: function(xhr) 
		{
			xhr.setRequestHeader('X-Requested-With',{toString: function() { return ''; }}
        );
    },
	data:JSON.stringify({"content":msg,"nonce":"173327918934523904"})
});
}


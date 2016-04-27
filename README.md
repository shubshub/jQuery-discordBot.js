# jQuery-discordBot.js
Built off of jQuery and Javascript for any HTML Browser (Works best in Firefox with the CORS Plugin to allow it to send messages)
CORS everywhere: https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/

Feel free to modify the source You'll have to add your own Auth Tokens and Super Properties and Server URL's but it should work correctly
If not please open an issue


Usage:

Open up the remoteClient.html in a browser (Preferably Firefox with the CORS everywhere plugin enabled)

Put your bots Authentication token in the text area for the Auth Token

And supply the bot with a URL for the Server+Channel you wish to connect to in the URL box

To get this URL is easy Open Discord in your web browser and click on a channel

The last set of digits after the "/" is the channels ID and you supply the url like so

https://discordapp.com/api/channels/[channel id]/messages

Once you've done that hit New Server and it'll open a new thread which will watch that server for messages

Feel free to add new commands and then submit them to this git
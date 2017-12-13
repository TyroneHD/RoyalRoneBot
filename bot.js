var discord = require('discord.js');
var roblox = require('roblox-js');
var client = new discord.Client();

client.login(process.env.BOT_TOKEN)


client.on("ready", () => {
  client.user.setGame(`tyr_hd#9291`);
  console.log(`Ready to serve on ${client.guilds.size} servers, for ${client.users.size} users.`);
});

client.on('guildMemberAdd', member => {
  let guild = member.guild;
  let user = member.user
  console.log(`${user.tag} joined ${guild}`)
});

client.on('guildMemberRemove', member => {
  let guild = member.guild;
  let user = member.user
  console.log(`${user.tag} left ${guild}`)
});

var prefix = '!';

function isCommand(command, message){
	var command = command.toLowerCase();
	var content = message.content.toLowerCase();
	return content.startsWith(prefix + command);
}

function pluck(array){
    return array.map(function(item) { return item['name']; })
}

function hasRole(members, role){
    if(pluck(members.roles).includes(role)){
        return true;
    } else {
        return false;
    }
}

function isAdmin(message){
	if(
		hasRole(message.member,"Commander") || 
		hasRole(message.member,"Captain") ||  
		hasRole(message.member,"Council") ||
		hasRole(message.member,"testing")
		){

		return true;
	} else {
		return false;
	}
}
client.on('message', (message) => {

if (isAdmin(message)){
console.log('Is an admin!')
}

})

roblox.login({username: process.env.USERNAME, password: process.env.PASSWORD}).then((success) => {

}).catch(() => {console.log("Failed to login.");});

var groupId = 2720853;
var maximumRank = 202;
var minimumRank = 0;

function isCommand(command, message){
	var command = command.toLowerCase();
	var content = message.content.toLowerCase();
	return content.startsWith(prefix + command);
}

client.on('message', (message) => {
	if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
    
    if(isCommand('Promote', message)){
    	if (isAdmin(message)) {
    		var username = args[1]
    		if (username){
    			roblox.getIdFromUsername(username)
				.then(function(id){
					roblox.getRankInGroup(groupId, id)
					.then(function(rank){
						if(maximumRank <= rank){
							message.channel.send(`${message.author} | ${username} cannot be promoted.`)
						} else {
							roblox.promote(groupId, id)
							.then(function(roles){
								var embed = {
 								"title": "Promotion",
 								"description": `Make sure to update Discord roles.`,
  								"timestamp": new Date(),
  								"footer": {
    								"text": "Created by tyr_hd#9291"
  								},
  								"thumbnail": {
    								"url": "https://i.pinimg.com/originals/e5/47/a7/e547a79c6aff6bd9e0193535215e3a1e.jpg"
  								},
  								"author": {
    								"name": "The Royal Rone",
    								"icon_url": "https://i.pinimg.com/originals/e5/47/a7/e547a79c6aff6bd9e0193535215e3a1e.jpg"
  								},
  								"fields": [
    								{
      								"name": "Rank Updated",
      								"value": roles.newRole.Name
    								},
    								{
      								"name": "Player Updated",
      								"value": `[${username}](https://www.roblox.com/users/${id}/profile)`
    								}
  								]
								};
								message.channel.send(`${message.author} | User has been promoted.`, { embed });
							}).catch(function(err){
								message.channel.send(`${message.author} | Failed to promote.`)
							});
						}
					}).catch(function(err){
						message.channel.send(`${message.author} | Couldn't get him in the group.`)
					});
				}).catch(function(err){ 
					message.channel.send(`${message.author} | Sorry, but ${username} doesn't exist on ROBLOX.`)
				});
    		} else {
    			message.channel.send(`${message.author} | Please enter a username.`)
    		}
    		return;
    	}
    }
    if (isCommand("Demote", message)) {
    	if (isAdmin(message)) {
    		var username = args[1]
    		if (username){
    			roblox.getIdFromUsername(username)
				.then(function(id){
					roblox.getRankInGroup(groupId, id)
					.then(function(rank){
						if(minimumRank >= rank){
							message.channel.send(`${message.author} | ${username} is Council and cannot be demoted.`)
						} else {
							roblox.demote(groupId, id)
							.then(function(roles){
								var embed = {
 								"title": "Demotion",
 								"description": `Make sure to update Discord roles.`,
  								"timestamp": new Date(),
  								"footer": {
    								"text": "Created by tyr_hd#9291"
  								},
  								"thumbnail": {
    								"url": "https://i.pinimg.com/originals/e5/47/a7/e547a79c6aff6bd9e0193535215e3a1e.jpg"
  								},
  								"author": {
    								"name": "The Royal Rone",
    								"icon_url": "https://i.pinimg.com/originals/e5/47/a7/e547a79c6aff6bd9e0193535215e3a1e.jpg"
  								},
  								"fields": [
    								{
      								"name": "Rank Updated",
      								"value": roles.newRole.Name
    								},
    								{
      								"name": "Player Updated",
      								"value": `[${username}](https://www.roblox.com/users/${id}/profile)`
    								}
  								]
								};
								message.channel.send(`${message.author} | User has been demoted.`, { embed });
							}).catch(function(err){
								message.channel.send(`${message.author} | Failed to demote.`)
							});
						}
					}).catch(function(err){
						message.channel.send(`${message.author} | Couldn't get him in the group.`)
					});
				}).catch(function(err){ 
					message.channel.send(`${message.author} | Sorry, but ${username} doesn't exist on ROBLOX.`)
				});
    		} else {
    			message.channel.send(`${message.author} | Please enter a username.`)
    		}
    		return;
    	}
    }
    if(isCommand('Ping', message)){
    	message.channel.send(`:ok_hand: | **${message.author.username}**, thanks for pinging!`)
    }
    if(isCommand('Links', message)){
    	message.channel.send(`:ok_hand: | **${message.author.username}**, here are some important links! \n**[Group](https://www.roblox.com/My/Groups.aspx?gid=2720853)\n[Database](https://docs.google.com/spreadsheets/d/1W-7drPuCMIbTI_BIEM4RDd_a6u4MGp85c3K7xio7Ijs/edit?usp=sharing)\n[Twitter](https://twitter.com/yeetfleetrblx)**`)
    }
}); 

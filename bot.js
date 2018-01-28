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
  let channel = guild.channels.find('name','permissions_read_if_new')
  channel.send(`<@&269166567751811072> ${member} has joined the server!`)
});

client.on('guildMemberRemove', member => {
  let guild = member.guild;
  let channel = guild.channels.find('name','permissions_read_if_new')
  channel.send(`<@&269166567751811072> ${member} has left the server!`)
});

var prefix = '!';

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

function secCommand(command, message){
  var command = command.toLowerCase();
  var content = message.content.toLowerCase();
  return content.startsWith('>' + command);
}

function isntCommand(command, message){
  var command = command.toLowerCase();
  var content = message.content.toLowerCase();
  return content.startsWith(command);
}

client.on('message', (message) => {
  if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
    
    if(isCommand('Promote', message)){
        if(isAdmin(message)){
            var username = args[1]
            if (username){
                roblox.getIdFromUsername(username)
                .then(function(id){
                    roblox.getRankInGroup(groupId, id)
                    .then(function(rank){
                        if (maximumRank <= rank){
                            message.channel.send(`${message.author} | ${username} is Council and cannot be promoted.`)
                        } else {
                            roblox.promote(groupId, id)
                            .then(function(roles){
                                message.channel.send(`:ok_hand: | **${message.author.username}**, user has been promoted!\n \n       :file_folder: **${username} (${id})**\n       :file_folder: **${roles.newRole.Name}**\n       :link: **<https://www.roblox.com/users/${id}/profile>**`)
                            })
                        }
                    }).catch(function(error){
                        message.channel.send(`${message.author} | ${username} is not in the group.`)
                    })
                }).catch(function(error){
                    message.channel.send(`${message.author} | ${username} doesn't exist on ROBLOX.`)
                })
            } else {
                message.channel.send(`${message.author} | Please enter a username.`)
            }
            return;
        }
    }
    if(isCommand('Demote', message)){
        if(isAdmin(message)){
            var username = args[1]
            if (username){
                roblox.getIdFromUsername(username)
                .then(function(id){
                    roblox.getRankInGroup(groupId, id)
                    .then(function(rank){
                        if (minimumRank >= rank){
                            message.channel.send(`${message.author} | ${username} is Council and cannot be demoted.`)
                        } else {
                            roblox.demote(groupId, id)
                            .then(function(roles){
                                message.channel.send(`:ok_hand: | **${message.author.username}**, user has been demoted!\n \n       :file_folder: **${username} (${id})**\n       :file_folder: **${roles.newRole.Name}**\n       :link: **<https://www.roblox.com/users/${id}/profile>**`)
                            })
                        }
                    }).catch(function(error){
                        message.channel.send(`${message.author} | ${username} is not in the group.`)
                    })
                }).catch(function(error){
                    message.channel.send(`${message.author} | ${username} doesn't exist on ROBLOX.`)
                })
            } else {
                message.channel.send(`${message.author} | Please enter a username.`)
            }
            return;
        }
    }
    if(isCommand('User', message)){
        var username = args[1]
        if (username){
            roblox.getIdFromUsername(username)
            .then(function(id){
                message.channel.send(`:ok_hand: | **${message.author.username}**, here are their details!\n \n       :file_folder: **${username} (${id})**\n       :link: **<https://www.roblox.com/users/${id}/profile>**`)
            })
        } else {
            message.channel.send(`${message.author} | Please enter a username.`)
        }
        return;
    }
    if(isCommand('GetShout', message)){
        roblox.getShout(groupId)
        .then(function(shout){
            message.channel.send(`:ok_hand: | **${message.author.username}**, here is the current shout!\n \n       :file_folder: **${shout.author.name} (${shout.author.id})**\n       :page_facing_up: **${shout.message}**`)
        })
        return;
    }
    if(isCommand('Ping', message)){
      message.channel.send(`:ok_hand: | **${message.author.username}**, pong!`)
    }
    if(isCommand('Links', message)){
      message.channel.send(`:ok_hand: | **${message.author.username}**, here are some important links!\n \n       :link: **Group: <http://bit.ly/2z9fCKh>**\n       :link: **Database: <http://bit.ly/2z9RbfW>**\n       :link: **Twitter: <http://bit.ly/2nZ3Sqt>**\n       :link: **Dropbox: <http://bit.ly/2pXBbLn>**`)
    }
    if(isCommand('Cmds', message)){
      message.channel.send(`:ok_hand: | **${message.author.username}**, here are all the commands!\n \n       :file_folder: **Council Commands**\n       :page_facing_up: **!promote [string]**\n       :page_facing_up: **!demote [string]**\n       :page_facing_up: **!shout;[string]**\n \n       :file_folder: **Global Commands**\n       :page_facing_up: **!user [string]**\n       :page_facing_up: **!getshout**\n       :page_facing_up: **!links**\n       :page_facing_up: **!ping**`)
    }
}); 

client.on('message', (message) => {
    if (message.author.bot) return;
    var args = message.content.split(/[;]+/)

    if(isCommand('Shout', message)){
        if(isAdmin(message)){
            var status = args[1]
            var channel = guild.channels.find('name','bot-commands')
            roblox.shout(groupId, status)
            message.channel.send(`:ok_hand: | **${message.author.username}**, you have update the shout!\n \n       :file_folder: **${message.author.username}**\n       :page_facing_up: **${status}**`)
            channel.send(`${status}\n \nBy **${message.author.username}**`)
        }
        return;
    }
})

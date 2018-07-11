//@tyr_hd#9291

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

function isntCommand(command, message){
  var command = command.toLowerCase();
  var content = message.content.toLowerCase();
  return content.startsWith(command);
}

client.on('message', (message) => {
    var msgreplies = ["I know where you live.","Ping me again and I'm banning you.","I'm telling Tyrone.","I don't care.","Talk to my hand.","Want to get demoted?","You're not getting promoted.","Don't talk to me with that crusty hairline.","Your IQ is lower all of beastyboy1029's girlfriends standards.","Not even coolblaster is as stupid as you.","Did you fall from heaven? Because you're messed up.","You're about as funny as a stale ham sandwich.","I can't hear you over the squeaking of your crocs.","So does your mum.","Don't talk to me ODer.","Ping me when you can contest me.","You're bad kid.","Check #information topic you're going to need the invite link when I'm done with you."];
    var response = msgreplies[Math.floor(Math.random()*msgreplies.length)];
    var banmsgs = ["@Rone_Bot#6484 demote me","demote me @Rone_Bot#6484","demote @Rone_Bot#6484 me"];
    if (banmsgs, message){
        var username = message.author
        var muteRole = message.guild.roles.find('name', 'Verified');
        if (username){
            if (muteRole){
                message.channel.send("Re-verify incompetent scrub.")
                username.removeRole(muteRole)
            }
        } else (message.isMentioned(client.user)) {
            message.channel.send(response);
    }
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
                            message.channel.send(`${message.author} | ${username} cannot be promoted.`)
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
                            message.channel.send(`${message.author} | ${username} cannot be demoted.`)
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
    if(isCommand('Mute', message)){
        var username = message.mentions.members.first();
        var muteRole = message.guild.roles.find('name', 'Muted');
        if (username){
            if (muteRole){
                username.addRole(muteRole)
                message.channel.send(`:ok_hand: | ${username} has been muted.`)
            } else {
                message.channel.send(`${message.author} | There is no mute role.`)
            }
        } else {
            message.channel.send(`${message.author} | Please mention a user.`)
        }
    }
    if(isCommand('Unmute', message)){
        var username = message.mentions.members.first();
        var muteRole = message.guild.roles.find('name', 'Muted');
        if (username){
            if (muteRole){
                username.removeRole(muteRole)
                message.channel.send(`:ok_hand: | ${username} has been unmuted.`)
            } else {
                message.channel.send(`${message.author} | There is no mute role.`)
            }
        } else {
            message.channel.send(`${message.author} | Please mention a user.`)
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
    //if(isCommand('Ping', message)){
    //  message.channel.send(`:ok_hand: | **${message.author.username}**, ${message.author.ping}ms!`)
    //}
    if(isCommand('Links', message)){
      message.channel.send(`:ok_hand: | **${message.author.username}**, here are some important links!\n \n       :link: **Group: <http://bit.ly/2z9fCKh>**\n       :link: **Database: <http://bit.ly/2z9RbfW>**\n       :link: **Twitter: <http://bit.ly/2nZ3Sqt>**\n       :link: **Dropbox: <http://bit.ly/2pXBbLn>**\n       :link: **YF Pin: <http://bit.ly/2BUEbJ2>**\n       :link: **Council Application: <http://bit.ly/2p6yIdV>**`)
    }
    if(isCommand('Cmds', message)){
      message.channel.send(`:ok_hand: | **${message.author.username}**, here are all the commands!\n \n       :file_folder: **Council Commands**\n       :page_facing_up: **!promote [string]**\n       :page_facing_up: **!demote [string]**\n       :page_facing_up: **!shout;[string]**\n       :page_facing_up: **!mute [@user]**\n       :page_facing_up: **!unmute [@user]**\n \n       :file_folder: **Global Commands**\n       :page_facing_up: **!user [string]**\n       :page_facing_up: **!getshout**\n       :page_facing_up: **!cmds**\n       :page_facing_up: **!links**\n       :page_facing_up: **!ping**`)
    }
}); 

client.on('message', (message) => {
    if (message.author.bot) return;
    var args = message.content.split(/[;]+/)

    if(isCommand('Shout', message)){
        if(isAdmin(message)){
            var status = args[1]
            var guild = message.guild
            var channel = guild.channels.find('name','announcements')
            roblox.shout(groupId, status)
            message.channel.send(`:ok_hand: | **${message.author.username}**, you have update the shout!\n \n       :file_folder: **${message.author.username}**\n       :page_facing_up: **${status}**`)
            channel.send(`<@&315947358103928832> A new shout has been posted!\n \n       :file_folder: **${message.author.username}**\n       :page_facing_up: **${status}**`)
        }
        return;
    }
})

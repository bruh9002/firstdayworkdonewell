const Discord = require("discord.js")
const prefix = ";"
const client = new Discord.Client()
client.on("ready", () => {
    console.log(`${client.user.tag} sikeresen elindult.`)
    client.user.setActivity(`;help for a list of all my commands.`)
})
client.on("message",async  message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if(!message.content.startsWith(prefix)) return;
    if (command== `botinfo`) {
       
        const moment = require("moment")
        let embed = new Discord.MessageEmbed()
            .setTitle("BOT INFORMATION")
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter("Botinfo ", client.user.displayAvatarURL())
            .setTimestamp()
            .addField("Info", [
                `**❯ Username [${client.user.username}]**`,
                `**❯ ID [${client.user.id}]**`,
                `**❯ Got invited to this server at[${moment(client.user.joinedAt).format('LL LTS')} ${moment(client.user.joinedAt).fromNow()}]**`,
                `**❯ Bot made at[${moment(client.user.createdTimestamp).format('LL LT')}]**`,
                `**❯ Discriminator: #${client.user.discriminator}**`,
                `**❯ Guilds: ${client.guilds.cache.size}**`,
                `\u200b`
            ])


        return message.channel.send(embed)
    } else {
        if (command === `help`) {
            let helpEmbed = new Discord.MessageEmbed()
                .setTitle("Commands")
                .addField(`General`, '`;invite`', true)
                .addField(`Information:`, '`;botinfo` ', true)
                .addField(`Moderation`, '`;ban, ;kick`', true)
                .addField(`Fun`, '`;gay `', true)

            message.channel.send(helpEmbed)
        } else {
            if (command === "ban") {



                if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`You can\'t use that bro.`)
                if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('I do not have perm to ban someone you dummy.')

                const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

                if (!args[0]) return message.channel.send("Please mention someone.");

                if (!member) return message.channel.send("Seems like that member isn't even in the server.")

                let reason = args.slice(1).join(" ");
                if (member.id === message.author.id) return message.channel.send('Omg, u can\'t ban yourself you dummy.');
                if (!reason) reason = 'no reason';
                if (!member.bannable) return message.channel.send("Cannot ban mods bruhmoment lol, maybe that user isn't a mod but he has a higher role than my highest role.");
                let bannedembed = new Discord.MessageEmbed()
                    .setAuthor(`${member.user.username}`, member.user.displayAvatarURL())
                    .setDescription(`You got banned from **${message.guild.name}**!`)
                    .addField("Reason", reason)
                    .addField("Banned by:", message.author.username)
                    .setColor("RED")
                    .setTimestamp();
                await member.send(bannedembed)
                    .then(() => {
                        member.ban({
                            reason: reason
                        })
                    })




                    .catch(err => {
                        if (err) return message.channel.send('Something went wrong')
                    })
                let { guild } = message
                const banembed = new Discord.MessageEmbed()
                    .setTitle('Member banned 👑')
                    .setAuthor("Ban!", client.user.displayAvatarURL())
                    .setThumbnail(member.user.displayAvatarURL())
                    .addField('Member', member)
                    .addField('Banned by', message.author)
                    .addField('Reason', reason)
                    .setFooter('Time', client.user.displayAvatarURL())
                    .setColor(0xed1aaa)
                    .setTimestamp()

                message.channel.send(banembed)

            } else {
                if (command === `kick`) {
                    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`Hey ${message.author}, you don't have permission to use that command.`)
                    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("I don't have the right permissions.")

                    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

                    if (!args[0]) return message.channel.send("Please specify a user.");
                    if (!member) return message.channel.send("Couldn't find that member.")
                    if (!member.bannable) return message.channel.send("Cannot kick mods bruhmoment lol, maybe that user isn't a mod but he has a higher role than my highest role.");

                    if (member.id === message.author.id) return message.channel.send("You can't kick yourself.");

                    let reason = args.slice(1).join(" ");

                    if (reason === undefined) reason = "No reason given.";

                    member.kick(reason)
                        .catch(err => {
                            message.channel.send("Something went wrong.")
                        })
                    const embed = new Discord.MessageEmbed()
                        .setTitle("Member kicked 👑")
                        .addField("Member:", member)
                        .addField("kicked by:", message.author)
                        .addField("Reason:", reason)
                        .setFooter("Time kicked", client.user.displayAvatarURL())
                        .setTimestamp()

                    message.channel.send(embed)
                } else {
                    if(command === `gay`) {
                        let Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
 
                        if (!Member) return message.channel.send(`Kérlek említs meg valakit!`);
                
                        let Embed = new Discord.MessageEmbed()
                            .setColor("RANDOM")
                            .setImage(`https://some-random-api.ml/canvas/gay?avatar=${Member.user.displayAvatarURL({ format: "png" })}`)
                            .setTimestamp();
                
                        return message.channel.send(Embed);
                    } else {
                        if(command === `invite`) {
                            let embed = new Discord.MessageEmbed()
                            .setDescription(`click [here](https://discord.com/api/oauth2/authorize?client_id=794312326546194453&permissions=8&scope=bot) to invite me`)
                            message.channel.send(embed)
                        }
                    }
                }
            }
        }
        }
        client.on("guildCreate", guild => {
            let embed = new Discord.MessageEmbed()
            .setTitle("Someone just put me in a server.")
            .addField(`Server name:`, guild.name)
            .addField(`Server MemberCount`, guild.memberCount)
            .addField(`Server id`, guild.id)
            .setFooter(`Now i'm in ${client.guilds.cache.size} servers!`)
            client.channels.cache.get("794581074817712128").send(embed)
            
        })
        client.on("guildMemberAdd", async member => {
            let role = await member.guild.roles.cache.get("794500620446072833")
            if(!role) return;
            await member.roles.add(role)
            client.channels.cache.get("794603410426167327").send(`Hey ${member}, welcome to **${member.guild.name}**`)
        })
        client.on("guildMemberRemove", member => {
            client.channels.cache.get("794603505733337118").send(`**${member.user.tag}** just left the server :c `)
        })
    })
client.login("Nzk0MzEyMzI2NTQ2MTk0NDUz.X-4_AA.c4X2qhJ2EymRACw9PHFkD6_67zE")//Nzk0MzEyMzI2NTQ2MTk0NDUz.X-4_AA.c4X2qhJ2EymRACw9PHFkD6_67zE
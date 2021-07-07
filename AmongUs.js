const Discord = require("discord.js");
const ytdl = require("ytdl-core");

const Client = new Discord.Client;

const prefix = "?";

var list = [];

Client.on("ready", () => {
    console.log("bot opérationnel");
});

Client.on("guildMemberAdd", member => {
    console.log("Nouveau membre");
    member.guild.channels.cache.find(channel => channel.id === "851561546031038544").send(member.displayName + " viens jouer avec nous à Among Us ! :yum:");
    member.roles.add("834546342100467733").then(mbr => {
        console.log("Role attribué avec succès !")
    }).catch(() => {
        console.log("le role n'a pas pu etre attribué")
    });
});

Client.on("guildMemberRemove", member => {
    console.log("Un membre a quitté le serveur");
    member.guild.channels.cache.find(channel => channel.id === "847575039029411891").send(member.displayName + " a quitté le serveur");
});

Client.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    if(message.member.hasPermission("ADMINISTRATOR")){
        if(message.content.startsWith(prefix + "ban")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Aucun membre mentionné");
            }
            else {
                if(mention.bannable){
                    mention.ban();
                    message.channel.send(mention.displayName + " a été banni du serveur.")

                }
                else {
                    message.reply("Impossible de bannir ce membre.");
                }
            }
        }
        else if(message.content.startsWith(prefix + "kick")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Aucun membre mentionné");
            }
            else {
                if(mention.kickable){
                    mention.kick();
                    message.channel.send(mention.displayName + " a été kick du serveur");
                }
                else {
                    message.reply("Impossible de kick ce mambre.");
                }
            }
        }
        else if(message.content.startsWith(prefix + "mute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Aucun membre mentionné");
            }
            else{
                mention.roles.add("848663783437369344");
                message.channel.send(mention.displayName + " a été mute avec succès.");
            }
        }
        else if(message.content.startsWith(prefix + "unmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Aucun membre mentionné");
            }
            else{
                mention.roles.remove("848663783437369344");
                message.channel.send(mention.displayName + " a été unmute avec succès.");
            }
        }
        else if(message.content.startsWith(prefix + "tempmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Aucun membre mentionné.");
            }
            else{
                let args = message.content.split(" ");

                mention.roles.add("848663783437369344");
                setTimeout(function() {
                    mention.roles.remove("848663783437369344");
                    message.channel.send("<@" + mention.id + "> tu peux desormais reparler");
                },args[2] * 1000);
            }
        }
        
    
    }

    if(message.member.permissions.has("MANAGE_MESSAGES")){
        if(message.content.startsWith(prefix + "clear")){
            let args = message.content.split(" ");
            
            if(args[1] == undefined){
                message.reply("entre le nombre de message que tu veux supprimer");
            }
            else {
                let number = parseInt(args[1]);

                if(isNaN(number)){
                    message.reply("entre le nombre de message que tu veux supprimer");
                }
                else {
                    message.channel.bulkDelete(number).then(messages => {
                        console.log("Suppression de " + messages.size + " messages reussi !");
                    }).catch(err => {
                        console.log("Erreur de clear : " + err);
                    });
                }
            }
        }
    }

    if(message.content == prefix + "playlist"){
        let msg = "**FILE D'ATTENTE !**\n";
        for(var i = 0;i < list.length;i++){
            let name;
            await ytdl.getInfo(list[i], (err, info) => {
                if(err){
                    console.log("erreur de lien : " + err);
                    list.splice(i, 1);
                }
                else {
                    name = info.title;
                }
            });
            msg += "> " + i + " - " + name + "\n";
        }
        message.channel.send(msg);
    }
    
    if(message.content.startsWith(prefix + "play")){
        if(message.member.voice.channel){
            let args = message.content.split(" ");

            if(args[1] == undefined || !args[1].startsWith("https://")){
               message.reply("lien invalide") ;
            }
            else {
                if(list.length > 0){
                    list.push(args[1]);
                    message.channel.send("Musique ajoutée avec succès.");
                }
                else {
                    list.push(args[1]);
                    message.channel.send("Musique ajoutée avec succès.");

                    message.member.voice.channel.join().then(connection => {
                        playMusic(connection);

                        connection.on("disconnect", () => {
                            list = [];
                        });

                    }).catch(err => {
                        message.channel.send("Erreur lors de la connexion : " + err);
                    });
               }
            }
        }
    }



if(message.content == prefix + "bg"){
    message.channel.send("**" + message.author.username + "** est un bg");
};

if(message.content == prefix + "admin"){
    message.channel.send("C'est **Axel** l'admininistrateur du serveur");
};

if(message.content == prefix + "infos"){
    message.channel.send("Ceci est le serveur Among Us de 10 amis qui se reunissent tous les vendredi soir pour jouer et rigoler ensemble pendant 2 heures.");
};

if(message.content == prefix + "Axel's dick size"){
    message.channel.send("La bite d'**Axel** mesure **15,8 cm** !!! (des photos peuvent être demandé...) Bravo tu as reussi a resoudre ces énigmes assez simple... On ce retrouvera bientot...");
};

if(message.content == prefix + "sexe"){
    message.channel.send("**Axel** veut 8=====D~~{()}");
};

if(message.content == prefix + "indice 1"){
    message.channel.send("Gros calibre");
};

if(message.content == prefix + "gros calibre"){
    message.channel.send("Tu as déjà reussi l'énigme 1. Voici quelque chose qui pourrait t'aider **Among Us**, a toi de reflechir ");
};

if(message.content == prefix + "parmis nous"){
    message.channel.send("Bravo tu sais traduire (merci google traduction) bon je te donne autre chose **je m'appelle souvent azerty et mon frère qwerty qui suis-je?");
};

if(message.content == prefix + "clavier"){
    message.channel.send("Bon facile en même temps, mais les choses vont se compliquer et euresement car vu ce qu'il y a à la fin ça a le mérite d'être difficile. Prochaine indice **MP** ou **DM**");
};

if(message.content == prefix + "airbus"){
    message.channel.send("Alors, ça vol pas haut hein ??? Bref **la grosse pu....");
};

if(message.content == prefix + "lou"){
    message.channel.send("C'est une blague biensur !!! Bref **C'est chaud a l'intérieur, on s'y sent bien dedans, on a envie d'y rester pendant des heures, c'est relaxant, C'est souvent regler a 38°C**");
};

if(message.content == prefix + "chatte"){
    message.channel.send("C'est pas ça gros dégueulasse !!!");
};

if(message.content == prefix + "jacuzzi"){
    message.channel.send("Tu as vraiment envie de trouver ce secret... Protection très resistante qui a pour but d'éviter ça : **Ma mère va me défoncer**");
};

if(message.content == prefix + "capote"){
    message.channel.send("Quelle culture... et dans la capote on met quoi???");
};

if(message.content == prefix + "bite"){
    message.channel.send("Bite + la phrase préféré des profs d'anglais =....");
};

if(message.content == prefix + "dick"){
    message.channel.send("Tu as déjà une partie de la commande final... Maintenant il te faut plus que le nom de l'admin du serveur que tu peux voir grace a la commande **!admin**. Suite a ça, il te faudra une jolie phrase en anglais pour relier le nom de l'admin et le mot que tu as utiliser pour écrire cette commande. (si tu as besoin d'aide MP Axel)");
};

if(message.content == prefix + "Axel's dick"){
    message.channel.send("Maintenant tu a la bonne commande il ne te manque plus qu'un seul dernier mot!!!! Ce mot tu peux le retrouver sur des vetements, on l'appelle souvent S, M, L, XL, etc");
};

if(message.content == prefix + "Axel's dick taille"){
    message.channel.send("In english please");
};

});



 




function playMusic(connection){
    let dispatcher = connection.play(ytdl(list[0], { quality: "highestaudio"}));

    dispatcher.on("finish", () => {
        list.shift();
        dispatcher.destroy();

        if(list.length > 0){
            playMusic(connection);
        }
        else {
            connection.disconnect();
        }
    });

    dispatcher.on("error", err => {
        console.log("erreur de dispatcher : " + err);
        dispatcher.destroy();
        connection.disconnect();
    });
}

scripts : {
    start: "node AmongUs.js"
}


Client.login(process.env.TOKEN);
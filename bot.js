const discord = require('discord.js');
const bot = new discord.Client();
const guild = new discord.Guild();

var conf = require('./conf.json');
var auth = require('./auth.json');
var quotes = require('./quotes.json');

var quote_sets = ['jrrt'];

bot.login(auth.token);

bot.on('ready', () => {
    var channel = bot.channels.get('438110039568416810');
    channel.send('Hi, @everyone!');
});

bot.on('message', message => {

    var message_args = message.content.split(' ');
    if (message_args[0] =='watchtower') {

        switch (message_args[1]) {

            case 'quote':

                switch (message_args[2]) {

                    case 'jrrt':

                    if (message_args[3] <= quotes.jrrt.leaves && message_args[3] > 0) message.reply(quotes.jrrt.quotes[(message_args[3] - 1)]);
                        else message.reply('I can\'t seem to find that quote in my collections, please pick a number between one and ' + quotes.jrrt.leaves);


                        break;
                    case 'random':

                    var branch = Math.floor(Math.random() * Math.floor(quote_sets.length));
                    var leaf = Math.floor(Math.random() * Math.floor(branch.leaves));
                    message.reply('Here\'s a random quote => ' + quotes[quote_sets[branch]]['quotes'][leaf]);

                        break;

                    default:
                        message.reply('What type of quote? p.s you can use random if you can\'t think of anyone');
                        break;

                }

                break;
                default:
                    message.reply('Hi!');
                    break;

        }

    }

});

function reload () {

    bot.destroy();
    bot.login(auth.token);

}

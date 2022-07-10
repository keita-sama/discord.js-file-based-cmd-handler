module.exports = {
  name: 'say',
  run: (client, message, args) => message.reply(args.join(' ')),
};
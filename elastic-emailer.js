
const elastic = require('elasticemail')

function main(args) {
  if (!args.from) {
    return { error: 'Sender is required. Please set the "from" parameter' }
  } else if (!args.to) {
    return { error: 'Recipient is required. Please set the "to" parameter' }
  } else if (!args.subject || !args.body) {
    return { error: 'Both "subject" and "body" cannot be empty.' }
  }

  const client = elastic.createClient({
    apiKey: '44b6614c-5076-4447-8a1b-93bdbfb54895',
  })
  const msg = {
    from: args.from,
    from_name: args.from_name,
    to: args.to,
    subject: args.subject,
    body_text: args.body,
  }

  client.mailer.send(msg, (err, result) => {
    if (err) {
      return console.error(err)
    }
    return { result: `Mail sent succesfully with id: ${result}` }
  })
  return { error: 'Logically error. Email was not sent, error message uncaught.' }
}

exports.main = main

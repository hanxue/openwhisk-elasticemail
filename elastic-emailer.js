
const elastic = require('elasticemail')

function main(args) {
  if (!args.from) {
    return { error: 'Sender is required. Please set the "from" parameter' }
  } else if (!args.msgTo) {
    return { error: 'Recipient is required. Please set the "to" parameter' }
  } else if (!args.apikey) {
    return { error: 'API Key is required. Please set the "apikey" parameter' }
  } else if (!args.subject) {
    return { error: 'Subject is required. Please set the "subject" parameter' }
  } else if (!(args.bodyText || args.bodyHtml)) {
    return { error: 'Body is required. Please set the "bodyText" or "bodyHtml parameter' }
  }

  const client = elastic.createClient({
    apikey: '44b6614c-5076-4447-8a1b-93bdbfb54895',
  })
  const msg = {
    from: args.from,
    fromName: args.fromName,
    msgTo: args.msgTo,
    subject: args.subject,
    bodyText: args.bodyText,
    bodyHtml: args.bodyHtml,
    apikey: args.apikey,
  }

  client.mailer.send(msg, (err, result) => {
  client.mailer.send(msg, function (err, result) {
    console.error('DEBUG: Inside mailer.send, just before checking for err')
    if (err) {
      console.error('DEBUG: Just before error from sending email')
      return { error: `Some problem sending email: ${err}` }
    }
    console.error('DEBUG: Just before return email successful')
    return { result: `Mail sent succesfully with id: ${result}` }
  })
  return { error: 'Logic error! Email was not sent, error message uncaught.' }
}

exports.main = main


const request = require('request-promise')

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

  const msg = {
    from: args.from,
    fromName: args.fromName,
    msgTo: args.msgTo,
    subject: args.subject,
    bodyText: args.bodyText,
    bodyHtml: args.bodyHtml,
    apikey: args.apikey,
  }

  return request({
    url: 'https://api.elasticemail.com/v2/email/send',
    method: 'POST',
    qs: msg,
  })
    .then((response) => {
      return Promise.resolve({ message: response })
    })
    .catch((err) => {
      return Promise.reject(new Error(`ERROR: ${err.message}`))
    })
}

exports.main = main

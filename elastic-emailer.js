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
  const emailUrl = {
    uri: 'https://api.elasticemail.com/v2/email/send',
    qs: msg,
    json: true,
  }
  const accountUrl = {
    uri: `https://api.elasticemail.com/v2/account/overview?apikey=${args.apikey}`,
    json: true,
  }
  let result = {}

  return request(emailUrl)
    .then((response) => {
      if (!response.success) {
        return response
      }
      result = response
      return request(accountUrl)
    })
    .then((response) => {
      result.data.credit = response.data.credit
      result.data.emailsLeft = Math.floor(response.data.credit * (1000 / response.data.costperthousand))
      return Promise.resolve({ message: result })
    })
    .catch((err) => {
      return Promise.reject(`ERROR: ${err.message}`)
    })
}

exports.main = main

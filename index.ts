module.exports.handler = (event, context, callback) => {
  const isInvalid = event.pathParameters.isin;

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: isInvalid,
    }),
  });
};
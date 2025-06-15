const consoleLogger = (req, res, next) => {
  const start = Date.now();
  const requestBody = { ...req.body };

  const oldWrite = res.write;
  const oldEnd = res.end;

  const chunks = [];

  res.write = function (chunk, ...args) {
    chunks.push(Buffer.from(chunk));
    return oldWrite.apply(res, [chunk, ...args]);
  };

  res.end = function (chunk, ...args) {
    if (chunk) chunks.push(Buffer.from(chunk));
    const duration = Date.now() - start;

    const responseBody = Buffer.concat(chunks).toString("utf8");

    const clientIP = req.ip || req.connection.remoteAddress;
    const method = req.method;
    const uri = req.originalUrl;
    const httpCode = `${res.statusCode} ${res.statusMessage || ""}`.trim();
    const body = JSON.stringify(requestBody);
    const spendTime = `${duration} ms`;

    const logMessage = `clientIP: ${clientIP}, method: ${method}, URI: ${uri}, httpCode: ${httpCode}, requestBody: ${body}, spendTime: ${spendTime}`;

    console.log(logMessage);

    oldEnd.apply(res, [chunk, ...args]);
  };

  next();
};

module.exports = {
  consoleLogger,
};

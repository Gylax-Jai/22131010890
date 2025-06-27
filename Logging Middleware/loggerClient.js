const axios = require('axios');

async function Log(stack, level, pack, message) {
  try {
    await axios.post('http://20.244.56.144/evaluation-service/logs', {
      stack,
      level,
      package: pack,
      message
    });
  } catch (err) {
    // optional: log to console or ignore silently
  }
}

module.exports = Log;

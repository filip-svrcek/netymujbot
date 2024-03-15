const express = require('express')
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Facebook webhook endpoint
app.post('/webhook', (req, res) => {
  let body = req.body;

  if (body.object === 'page') {
    body.entry.forEach(entry => {
      let webhookEvent = entry.messaging[0];
      let senderId = webhookEvent.sender.id;
      if (webhookEvent.message && webhookEvent.message.text) {
        handleMessage(senderId, webhookEvent.message.text);
      }
    });

    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

function handleMessage(senderId, message) {
  if (message === 'Your message cue') {
    // Count emojis since last week logic here
    // You may need to fetch message history and process it
    // Calculate the count and send a response back
    // For simplicity, let's just send a dummy response
    sendMessage(senderId, 'Count of emojis since last week: 10');
  }
}

function sendMessage(senderId, message) {
  // Logic to send message back to user
  // Use Facebook Graph API or libraries like `request` to send messages
}

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

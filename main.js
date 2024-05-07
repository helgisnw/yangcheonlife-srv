const admin = require("firebase-admin");

const serviceAccount = require("./yangcheonlife-firebase-adminsdk-uu2g2-2c41d27ffc.json"); // Download this file from Firebase console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const message = {
  title: "Hello!",
  body: "설희 병신",
};

sendPushNotification("AIzaSyCvcTaGweEU0PLjhT_GwtkPclHOrD6ALiA", message);
function sendPushNotification(token, message) {
  const messagePayload = {
    notification: {
      title: message.title,
      body: message.body,
    },
    topic: "2-8",
  };

  admin
    .messaging()
    .send(messagePayload)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
}

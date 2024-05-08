const admin = require("firebase-admin");
const cron = require("node-cron");
const serviceAccount = require("./yangcheonlife-firebase-adminsdk-uu2g2-2c41d27ffc.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const message = "test";

function sendPushNotification(grade, classNumber, message) {
  const messagePayload = {
    notification: {
      title: message,
    },
    topic: `${grade}-${classNumber}`,
  };

  admin
    .messaging()
    .send(messagePayload)
    .then((response) => {
      console.log(`Successfully sent message:${grade}-${classNumber}`, response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
}

// Schedule notifications for all classes and grades
for (let grade = 1; grade <= 3; grade++) {
  for (let classNumber = 1; classNumber <= 11; classNumber++) {
    sendPushNotification(grade, classNumber, message);
  }
}

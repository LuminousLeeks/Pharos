// Archieve db data that is older then x hours.
// Use the below command to summon the archiever.
// npm run buildArchiever

const archieveDb = require('../../archieveDb/db');
const db = require('../../server/db/db');
const Notification = require('../../server/models/Notification.js');
const ArchiveNotification = require('../../archieveDb/models/Notification.js');

// Expire hot notifications after x hours:
const archieveAfterHours = 12;

archieveDb.authenticate().then(() =>
  db.authenticate()).then(() => {
    return Notification.findAll({
      where: {
        updatedAt: {
          $lte: new Date(Date.now() - (archieveAfterHours * 60 * 60 * 1000)),
        },
      },
    });
  }).then((notifications) => {
    if (notifications.length) {
      console.log(notifications);
      ArchiveNotification.bulkCreate(notifications);
      notifications.forEach(notification => notification.destroy());
      // log the operation resolution to the log file:
      console.log('Successful operation');
    } else {
      console.log('Nothing to delete');
    }
  });


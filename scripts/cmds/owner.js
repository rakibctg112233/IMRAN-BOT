const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports = {
  config: {
    name: "owner",
    version: "1.3.0",
    author: "Mᴏʜᴀᴍᴍᴀᴅ Aᴋᴀsʜ",
    role: 0,
    shortDescription: "Owner information with image",
    category: "Information",
    guide: {
      en: "owner"
    }
  },

  onStart: async function ({ api, event }) {
    const ownerText = 
`╭─ 👑 Oᴡɴᴇʀ Iɴғᴏ 👑 ─╮
│ 👤 Nᴀᴍᴇ       :Sɪʏᴀᴍ Aʜᴍᴇᴅ Rᴀғɪ
│ 🧸 Nɪᴄᴋ       :Rᴀғᴜ
│ 🎂 Aɢᴇ        : 17+
│ 💘 Rᴇʟᴀᴛɪᴏɴ : Sɪɴɢʟᴇ
│ 🎓 Pʀᴏғᴇssɪᴏɴ : Vᴏɴᴅᴀᴍɪ Uʟᴛʀᴀ Pʀᴏ Mᴀx
│ 📚 Eᴅᴜᴄᴀᴛɪᴏɴ : X 10
│ 🏡 Lᴏᴄᴀᴛɪᴏɴ :Kʜᴜʟɴᴀ - Sʜᴀᴛᴋʜɪʀᴀ
├─ 🔗 Cᴏɴᴛᴀᴄᴛ ─╮
│ 📘 Facebook  :https://www.facebook.com/profile.php?id=61585437908438
│ 💬 Messenger: https://www.facebook.com/profile.php?id=61585437908438
│ 📞 WhatsApp  : wa.me/01815843985
╰────────────────╯`;

    const cacheDir = path.join(__dirname, "cache");
    const imgPath = path.join(cacheDir, "owner.jpg");

    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

    const imgLink = "https://i.imgur.com/iy8Bk2Q.jpeg";

    const send = () => {
      api.sendMessage(
        {
          body: ownerText,
          attachment: fs.createReadStream(imgPath)
        },
        event.threadID,
        () => fs.unlinkSync(imgPath),
        event.messageID
      );
    };

    request(encodeURI(imgLink))
      .pipe(fs.createWriteStream(imgPath))
      .on("close", send);
  }
};

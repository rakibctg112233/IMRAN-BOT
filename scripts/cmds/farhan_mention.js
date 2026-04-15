const axios = require("axios");

let videoIndex = 0;

module.exports = {
  config: {
    name: "rakib",
    version: "20.0.0",
    author: "Farhan-Khan",
    countDown: 0,
    role: 0,
    shortDescription: "Fast caption + video reply",
    category: "system"
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {

    // 🔒 Author lock
    if (this.config.author !== "Farhan-Khan") return;

    const admins = [
      { uid: "61584866024929", names: ["Rakib Ctg","রাকিব","rakib","Rakib"] },
      { uid: "61583610247347", names: ["ヽ｟ᏟᎬϴ｠▁▁ዐዐዐ 🙁😚☺️👿"] }
    ];

    const senderID = String(event.senderID);
    if (admins.some(a => a.uid === senderID)) return;

    const text = (event.body || "").toLowerCase();
    const mentionedIDs = event.mentions ? Object.keys(event.mentions) : [];

    const isMentioning = admins.some(admin =>
      mentionedIDs.includes(admin.uid) ||
      admin.names.some(name => text.includes(name.toLowerCase()))
    );

    if (!isMentioning) return;

    const videos = [
      "https://i.imgur.com/ehDFpZp.mp4",
      "https://i.imgur.com/BAuoKdn.mp4"
    ];

    const videoUrl = videos[videoIndex];
    videoIndex = (videoIndex + 1) % videos.length;

    const captions = [
      "Mantion_দিস না _রাকিব বস এর মন ভালো নেই আজকে-!💔🥀",
      "- আমার বস রাকিব এর সাথে কেউ টেক্স করে না 🫂💔",
      "👉আমার বস রাকিব এখন বিজি আছে । ইনবক্সে মেসেজ দাও 🔰https://www.facebook.com/MR.FARHAN.420- ✅",
      "বস রাকিব কে এত মেনশন না দিয়ে একটু শান্তি দাও 🤷‍♂️",
      "বস রাকিব এখন অনেক বিজি আছে যা বলার আমাকে বলেন-😼🥰",
      "বাল পাকনা Mantion_দিস না বস রাকিব প্রচুর বিজি 🥵🥀🤐"
    ];

    const mentionNames = mentionedIDs.map(id => `@${id}`).join(", ");

    const caption = `
✿•≫───────────────≪•✿
${mentionNames ? `Reply to: ${mentionNames}\n` : ""}
『 ${captions[Math.floor(Math.random() * captions.length)]} 』
✿•≫───────────────≪•✿
`;

    try {
      const videoStream = await axios({
        url: videoUrl,
        method: "GET",
        responseType: "stream",
        timeout: 8000,
        headers: { "User-Agent": "Mozilla/5.0" }
      });

      await message.reply({
        body: caption,
        attachment: videoStream.data
      });

    } catch (err) {
      console.log("❌ Video error:", err.message);
      await message.reply("😢 ভিডিও দিতে পারলাম না");
    }
  }
};

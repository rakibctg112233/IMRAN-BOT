const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "hot",
    version: "2.0.0",
    author: "NAZRUL x MOHAMMAD AKASH",
    countDown: 5,
    role: 0,
    shortDescription: "Sad video sender 😢",
    longDescription: "Sends random sad video with emotional captions 💔",
    category: "media",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ api, event }) {
    // 💔 Random sad captions
    const captions = [
      "===「𝐏𝐑𝐄𝐅𝐈𝐗-𝐄𝐕𝐄𝐍𝐓」=== \n--❖(✷‿𝐒𝐈𝐙𝐔𝐊𝐀-𝐁𝐎𝐓‿✷)❖-- \n✢━━━━━━━━━━━━━━━✢        \n👅🫦♡-𝐒𝐄𝐗𝐘-𝐕𝐈𝐃𝐄𝐎-♡🫦👅 \n✢━━━━━━━━━━━━━━━✢\n(✷‿𝐎𝐖𝐍𝐄𝐑:-𝐑𝐉-𝐅𝐀𝐑𝐇𝐀𝐍‿✷)"
    ];

    const caption = captions[Math.floor(Math.random() * captions.length)];

    // 🎥 Sad videos list
    const links = ["https://drive.google.com/uc?id=1ta1ujBjmcvxSuYVwQ3oEXIJsnPCW2VZO",
                   "https://drive.google.com/uc?id=1b_evUu8zmfiPs-CeaZp1DkkArB5zl5x-",
                   "https://drive.google.com/uc?id=1_ysGMbGZQexheta6tuSBhJQDeAMioXr_",
                   "https://drive.google.com/uc?id=1tlon-avneE7lQF2rS13GOeiuLWIUEA7J",
                   "https://drive.google.com/uc?id=1aF6H24ILE6wIFGW3M3BGXg8l63ktP8B3",
                   "https://drive.google.com/uc?id=1c6SCqToTZamfuiiz5LrckOxDYT9gnJGu",
                   "https://drive.google.com/uc?id=1c5YXcgK3kOx6bTfVjxNGGMdDYbGmVInC",
                   "https://drive.google.com/uc?id=1a7XsNXizFTTlSD_gRQwK4bDA3HPam56W",
                   "https://drive.google.com/uc?id=1bv8GL0XDReocf1NfZBMCNoMAsBBwDE1i",
                   "https://drive.google.com/uc?id=1brkBa03NdRCx6lfrjopbWJUCoJupCRYg",
                   "https://drive.google.com/uc?id=1t2oFQmOtw-6V_ahWzYo08v1g2oGnkhPL",
                   "https://drive.google.com/uc?id=1c1OHfuq-YBOO-UwO5uybPqO7gOqTwInp",
                   "https://drive.google.com/uc?id=1svD1h3vEYbwxMeU5v4c2wQPBaU90fcEx",
                   "https://drive.google.com/uc?id=1bcIoyM9T_wQlaXxar4nVjCXsKHavRmnb",
                   "https://drive.google.com/uc?id=1bs5sI8NDRVK_omefR59how1UjZ6TEu91",
                   "https://drive.google.com/uc?id=1bPdkmq6lKm8BGwxkWaADHe0kutTtEujR",
                   "https://drive.google.com/uc?id=1bTwYfovA2YKCs_kskWyp2GHh7K9XHQN0",
                   "https://drive.google.com/uc?id=1jsoQ4wuRdN6EP6jOE3C0L6trLZmoPI0L",
                   "https://drive.google.com/uc?id=1boVaYpbxIH3RItPY6k0Ld2F98YasHVq9",
                   "https://drive.google.com/uc?id=1c01XFZFNYRi_harhEbPvf-i25QIo9c0V"
    ];

    const link = links[Math.floor(Math.random() * links.length)];
    const cachePath = path.join(__dirname, "cache", "sad.mp4");

    try {
      const response = await axios({
        url: encodeURI(link),
        method: "GET",
        responseType: "stream"
      });

      await fs.ensureDir(path.join(__dirname, "cache"));
      const writer = fs.createWriteStream(cachePath);

      response.data.pipe(writer);

      writer.on("finish", async () => {
        await api.sendMessage(
          {
            body: `「 ${caption} 」`,
            attachment: fs.createReadStream(cachePath)
          },
          event.threadID
        );
        fs.unlinkSync(cachePath);
      });

      writer.on("error", (err) => {
        console.error(err);
        api.sendMessage("❌ ভিডিও পাঠাতে সমস্যা হয়েছে!", event.threadID);
      });

    } catch (error) {
      console.error(error);
      api.sendMessage("❌ কিছু একটা সমস্যা হয়েছে ভিডিও আনতে।", event.threadID);
    }
  }
};

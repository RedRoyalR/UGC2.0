require("dotenv").config();

const commandUsed = new Set(); //to check for someone spamming it
const commandUsed2 = new Set(); // to check for someone really spamming it
const commandUsed3 = new Set(); //to stop the bot from spamming with them
const puppeteer = require("puppeteer");
const KFUsername = "323-101313";
const KFPassword = "Tiham01";
const NGLUsername = "323-101900";
const NGLPassword = "123456";
const CS_URL = `https://sems.classtune.com/reminder`;
let cooldown = true;
const versionValue = "57.36.23";
const desc = `
/// Moderation (Admins only!)
1. $kick [Mention/UserId]
2. $ban  [UserId]
3. $unban[UserId]
4. $giveRole [Mention/UserId] [RoleId]
5. $takeRole [Mention/UserId] [RoleId]
6. $purge [Mention(OPTIONAL)] [AmountOfMessages] 
7. $pinMs [MessageId]
8. $unpinMs [MessageId]
9. $admin [UserId/Mention]
10. $unadmin [UserId/Mention]
11. $kill [UserId/Mention] --Its practically mute but without an timer,added cause of fun
12. $respawn [UserId/Mention] --Its practically unmute 
13. $mute [Mention/UserId] [Time in seconds] --mutes a user
14. $unmute [Mention/UserId] --ummutes a user
15. $announce [Channel Id] [Message] --Posting something in any channel
16. $deletereactions [Channel Id] [Message Id] --Removes reactions of a message
17. $delmsg [Channel Id] [Message Id] --Deletes a message
/// Fun
1. $ping
2. $avatar [Optional: Mention/UserId]
3. $embed [Title], [Color], [Description]
4. $eightball [Question here]
5. $coinFlip
6. $help
7. $rps [rock/paper/scissors]
/// Math
1. $add [Number1], [Number2] ... --Adds 2 or more numbers
2. $sub [Number1], [Number2] ... --Subtracts 2 or more numbers
3. $divi [Number1], [Number2] ... --Divides 2 or more numbers
4. $multi [Number1], [Number2] ... --Multiplies 2 or more numbers
5. $pow [Number1], [Number2] -- Gives the number that equals to the Number1 with the power of Number2
6. $squ [Number1] --Square Root
7. $cbu [Number 1] --Cube Root
/// Misc
1. Greatings:
--Most insults and good greatings should make the bot respond
2. $invite --It will send link to add UGC to your server
3. $version --It will send UGC's version data
`;

const BotToken = process.env.DISCORDJS_JS_TOKEN;
const Whitelist = [
  "398091045616746506", //fade
  "354579634395938817", //The person who made the bot aka me
  "284945768564129793", //void
  "810790148660396032", //void's alt
  "533084050835898379", // Azord
]; // TODO: TO ADD MORE PEOPLE TYPE THEIR ID INSIDE!
const muteRoleId = "762210494399774730";
console.log(BotToken);

const botChannel = "bot-commands";
function EightBall(message) {
  const rng = Math.trunc(Math.random() * 8) + 1; //formula for getting random number
  if (rng === 1) {
    message.channel.send("yes!");
  } else if (rng === 2) {
    message.channel.send("no...");
  } else if (rng === 3) {
    message.channel.send("maybe?");
  } else if (rng === 4) {
    message.reply("probably");
  } else if (rng === 5) {
    message.channel.send("I don't think so.");
  } else if (rng === 6) {
    message.channel.send("never!");
  } else if (rng === 7) {
    message.channel.send("you can try...");
  } else if (rng === 8) {
    message.channel.send("up to you!");
  }
}
function getUserFromMention(mention) {
  if (!mention) return;
  if (mention.startsWith("<@") && mention.endsWith(">")) {
    mention = mention.slice(2, -1);

    if (mention.startsWith("!")) {
      mention = mention.slice(1);
    }

    return client.users.cache.get(mention);
  }
}
function funnyCommand(message) {
  //NOTE THIS MAKES THE BOT SOMETIMES NOT DO WHAT IT IS TOLD AND WILL REPLY WITH "NO" OR SOMETHING LIKE THAT!
  const RNG = Math.trunc(Math.random() * 20) + 1; //formula for getting random number
  switch (RNG) {
    case 1:
      return message.channel.send(`no ${message.author}`);
      break;
    case 2:
      return message.reply(`me 2 lazy`);
      break;
  }
}

const greatings = [
  "Hello bot!",
  "Hello Bot",
  "Hi UGC",
  "Hi UGC!",
  "Hi UGC",
  "Hola bot!",
  "Hola Bot",
  "Helo bot!",
  "Helo Bot",
  "Yo bot!",
  "Yo Bot",
  "Sup bot!",
  "Sup Bot",
  "Hello UGC!",
  "Hello UGC",
  "Hola UGC!",
  "Hola UGC",
  "Helo UGC!",
  "Helo UGC",
  "Yo UGC!",
  "Yo UGC",
  "Sup UGC!",
  "Sup UGC",
];
function Greeting(message) {
  const rng = Math.trunc(Math.random() * 5) + 1; //formula for getting random number
  if (rng === 1) {
    message.channel.send(`Hello!`);
  } else if (rng === 2) {
    message.channel.send(`Helo!`);
  } else if (rng === 3) {
    message.channel.send(`Sup!`);
  } else if (rng === 4) {
    message.reply(`Hello There!`);
  } else if (rng === 5) {
    message.channel.send(`Hi!`);
  }
}
const Insults = [
  `⠀`,
  `Fuck you`,
  `Did I ask you anything bastard?`,
  // `alr what the hell does "Bastand" mean and why am I suppose to say it`,
  `Why do you exist`,
  `your a fucking moron`,
  // `Hello Bitch!`,
  `Idiotic person`,
  `None fucking gives a damn shit about you and the things you do or say, none else doesn't want to pop your bubble but I will fucker.`,
  // `Son of a bloody bastard!`,
  // `No U!`,
  `you pathetic dumbass`,
  `fuck you, shithead`,
  `I hope one day, **You choke on the shit you talk**`,
  `Since you know it all, you should also know when to shut up.`,
  `I don't exactly hate you but if you were on fire and I had water, I'd drink it.`,
  `I would joke about your life, but I see life already beat me to it.`,
  // `Hello Bastand!`,
  // `Hello Bastard!`,
  // `Hello Moron!`,
  // `Hello Bitch!`,
  // `Hello Idiot!`,
  // `Hello Dumbass!`,
  // `Hello Shithead!`,
  `Happy new year? more like Happy Screw you.`,
  `Happy new year? more like Happy Screw you.`,
  `Happy new year? more like Happy Screw you.`,
  `Happy new year? more like Happy Screw you.`,
  `Happy new year? more like Hope ya screw up.`,
  `Happy new year? more like Hope ya screw up.`,
  `Happy new year? more like Hope ya screw up.`,
  `Happy new year? more like Hope ya screw up.`,
  "Fuck you, messiah of rats.",
  "Fuck off, shitbag.",
  "You think you're a fucking hotshot? Fuck you.",
  `"Oh look at me, I'm gonna ping the bot and be so funny ahahah", leave me alone fuckin jackass.`,
  "no, fuck off",
  "You do know I am a fucking robot with a brain, right?",
  "Why the hell are you insulting me fucker",
  // "bruh",
  // "lol",
  "Do I look like I care?",
  // "Why did you ping me fucker?",
  // "Do I look like I want to be bothered, I do not fucking care if its Aprill Fools or not, just shut the hell up",
  // "Do I look like I want to be bothered, I do not fucking care if its Aprill Fools or not, just shut the hell up",
  // "Do I look like I want to be bothered, I do not fucking care if its Aprill Fools or not, just shut the hell up",
  // "Do I look like I want to be bothered, I do not fucking care if its Aprill Fools or not, just shut the hell up",
  // "Do I look like I care that its Aprill Fools you son of a bastard",
  // "Do I look like I care that its Aprill Fools you son of a bastard",
  // "Do I look like I care that its Aprill Fools you son of a bastard",
  // "Just fucking shut up, I do not fucking care that its Aprill Fools",
  // "Just fucking shut up, I do not fucking care that its Aprill Fools",
  // "Just fucking shut up, I do not fucking care that its Aprill Fools",
  // "Just fucking shut up, I do not fucking care that its Aprill Fools",
  // "April Fools? More like go April Fuck yourself.",
  // "April Fools? More like go April Fuck yourself.",
  // "April Fools? More like go April Fuck yourself.",
  // "April Fools? More like go April Fuck yourself.",
  // "You are a fucking moron on 2 legs, a fucking idiot in the inside, you have a heart of cheap plastic, you smell like fucking sewage, your breath makes trash smell like lavender, and your fucking face is just fucking hideous and makes the ugliest person look like a beautiful actress.",
  "You are a fucking moron on 2 legs, a fucking idiot in the inside, you have a heart of cheap plastic, you smell like fucking sewage, your breath makes trash smell like lavender, and your fucking face is just fucking hideous and makes the ugliest person look like a cherry tree, and you as a fucking weed.",
  "You are a fucking moron on 2 legs, a fucking idiot in the inside, you have a heart of cheap plastic, you smell like fucking sewage, your breath makes trash smell like lavender, and your fucking face is just fucking hideous and makes the ugliest person look seem like a flower of spring",
  "You are a fucking moron on 2 legs, a fucking idiot in the inside, you have a heart of cheap plastic, you smell like fucking sewage, your breath makes trash smell like lavender, and your fucking face is just fucking hideous and makes the ugliest person feel beautiful.",
  "Get the hell out of my face, otherwise I will rip your skin straight off of you, and use it as a toilet paper roll",
  // "What the fucking hell is wrong with you bastard.",
  // "imagine being cringe, just wow",
  // "why are you so fucking pathetic",
  `go fuck yourself`,
  `don't care + didn't ask + ratio + fuck you `,
  `don't care + didn't ask + ratio + fuck you `,
  `don't care + didn't ask + ratio + fuck you `,
  `don't care + didn't ask + ratio + fuck you `,
  `You do know I can see that, right?`,
  `I saw that you bastard`,
  `Imagine insulting a bot, just pathetic`,
  `ya ya ok okay ok, so your a bastard`,
  `ya ya ok okay ok, so your a moron huh`,
  `oh you have so much fucking time in your hands huh? do something productive you bastard instead of insulting people`,
  `I did not ask for your take or opinion so fuck off`,
  `You are so fucking pathetic that I will literally eat my fucking nails just to watch you die in a horrific death`,
  `no no NO just fucking be gone none fucking wants you to exist`,
  `Do everyone a fucking favour and just kill your self, it prevent precious resources getting wasted`,
  `"OH LOOK AT ME I AM A FUCKING IDIOT WITH NO LIFE INSULTING A FUCKING BOT" just do everyone a favour and be gone, off this planet and out of the fucking solar system`,
  `Your just a fucking pile of shit with eyes and a useless mouth`,
  `"If you don't have anything good to say, then don't say anything." follow that quote you scumbag`,
  `alr what the hell are you doing, why the fucking hell did you insult me for? you have nothing better to do? alr go fuck yourself none fucking gives a damn of who or what you are`,
  `do everyone a fucking favour and get lost, none wants you to exist, not even your fucking family`,
];
const greatings3 = ["hows your day ugc", "how are you ugc"];
const Insults2 = [
  `⠀`,
  `Fuck you`,
  `You ping me, I ping you and insult you.`,
  `Fuck off`,
  ``,
  "You think you're a fucking hotshot? Fuck you.",
  `"Oh look at me, I'm gonna ping the bot and be so funny ahahah", leave me alone, fucker.`,
  "Why did you ping me fucker?",
  // "Do I look like I want to be bothered, I do not fucking care if its Aprill Fools or not, just shut the hell up",
  // "Do I look like I want to be bothered, I do not fucking care if its Aprill Fools or not, just shut the hell up",
  // "Do I look like I care that its Aprill Fools you son of a bastard",
  // "Just fucking shut up, I do not fucking care that its Aprill Fools",
  // "Just fucking shut up, I do not fucking care that its Aprill Fools",
  // "April Fools? More like go April Fuck yourself.",
  // "April Fools? More like go April Fuck yourself.",
  "Get the hell out of my face, otherwise I will rip your skin straight off of you, and use it as a toilet paper roll",
  // `You do know I can see that, right?`,
  `I can saw that you bastard`,
  `Imagine insulting a bot, just pathetic`,
  "||f||||u||||c||||k|||| ||||y||||o||||u|||| ||||i||||d||||i||||o||||t||",
  // `ya ya ok okay ok, so your a bastard`,
  // `ya, ya, ok, okay, ok.. so your a moron huh?`,
  `oh you have so much fucking time in your hands huh? do something productive you bastard instead of insulting people`,
  `I did not ask for your take or opinion, so fuck off`,
  // `You are so fucking pathetic that I will literally eat my fucking nails just to watch you die in a horrific death`,
  // `no no NO just fucking be gone none fucking wants you to exist`,
  // `Do everyone a fucking favour and just kill your self, it prevent precious resources getting wasted`,
  // `"OH LOOK AT ME I AM A FUCKING IDIOT WITH NO LIFE INSULTING A FUCKING BOT" just do everyone a favour and be gone, off this planet and out of the fucking solar system`,
  // `Your just a fucking pile of shit with eyes and a useless mouth`,
  // `"If you don't have anything good to say, then don't say anything." follow that quote you scumbag`,
  `Alright, what the hell are you doing? why the fucking hell did you insult me for? you have nothing better to do?`,
  // `do everyone a fucking favour and get lost, none wants you to exist, not even your fucking family`,
];
// const Insults3 = [
//   `⠀`,
//   "Why the bloody hell did you ping my master for?",
//   "Do you know you made a very big mistake noob?",
//   "The number is busy now, send a message after the.. 'fuck you'",
//   "Why you ping my master?",
//   // "...",
// ];
const Insults3 = [
  `idiot`,
  "fuck",
  "bitch",
  "bastard",
  "bitch",
  "cringe",
  "scum",
  "scummy",
  "idiotic",
  "pathetic",
  "bloody",
  "fuck off",
  "fuck you",
  "dumbass",
  "ass",
  "filthy",
  "useless",
  "shitty",
  "shit",
  "moron",
  "clown",
  "dickhead",
  "autistic",
  `shitface`,
  `deaf`,
  `blind`,
  // "...",
];
function Insult(message) {
  const rng = Math.trunc(Math.random() * Insults.length);
  message.reply(Insults[rng]);
}
function Insult2(message) {
  const rng = Math.trunc(Math.random() * Insults2.length);
  message.reply(Insults2[rng]);
}
function Insult3(message) {
  const rng = Math.trunc(Math.random() * Insults3.length);
  message.reply(Insults3[rng]);
}

// require("dotenv").config();

const {
  Client,
  MessageEmbed,
  TextChannel,
  Emoji,
  Guild,
  GuildMember,
  GuildAuditLogs,
  // Channel,
  MessageManager,
  Message,
} = require("discord.js");
const ms = require("ms");
const cron = require("node-cron");
const client = new Client({
  partials: ["MESSAGE", "REACTION"],
});

const birthdays = new Map();
birthdays.set("354579634395938817", { month: "Oct", day: 1 }); //Red
birthdays.set("398091045616746506", { month: "Jan", day: 16 }); //Fade
birthdays.set("810790148660396032", { month: "Nov", day: 16 }); //Void

birthdays.set("810790148660396032", { month: "Dec", day: 11 }); //Void

birthdays.set("533084050835898379", { month: "Oct", day: 13 }); //Azord
birthdays.set("736581395085787206", { month: "Feb", day: 4 }); //Washesh
birthdays.set("604261923684614155", { month: "Feb", day: 14 }); //Raj

// birthdays.set("810790148660396032", { month: "Apr", day: 1 }); //UGC

const setSchedules = (message) => {
  // Fetch the general channel that you'll send the birthday message
  // const general = client.channels.cache.get("742992468588625941");
  // const general = client.channels.fetch("782493749573320706");
  const mainchatg = client.channels.cache.find(
    (ch) => ch.id === "742992468588625941"
  );
  // var channel2ae = msg.channel;
  // For every birthday

  try {
    cron.schedule(
      `*  * ${1} ${1} *`,
      () => {
        console.log("Initilized!");
        mainchatg
          .send(
            `@everyone You know what time it is, Happy fuckin New Year of regrets you fuckers.`
          )
          .then((message) => console.log(`Sent message: ${message.content}`))
          .catch((err) => console.log(err));
      },
      { timezone: `Asia/Dhaka` }
    );
  } catch (error) {
    console.log("Error trying to send: ", error);
  }

  birthdays.forEach((birthday, userId) => {
    // Define the user object of the user Id

    let user4 = client.users.cache.get(userId);
    console.log("Testing 102");
    console.log(`hmmmm ${birthday}`);
    // Create a cron schedule
    // try {
    //   cron.schedule(
    //     `${0}  ${2} * * *`,
    //     () => {
    //
    //     { timezone: `Asia/Dhaka` }
    //   );
    // } catch (error) {
    //   console.log("Error trying to send: ", error);
    // }

    cron.schedule(
      `* ${2} ${birthday.day} ${birthday.month} *`,
      () => {
        const rng8 = Math.trunc(Math.random() * 7) + 1; //formula for getting random number
        console.log("Testing 101");
        console.log(rng8);
        const channel = mainchatg;

        console.log(channel);
        console.log(channel.type);
        switch (rng8) {
          case 1:
            {
              console.log("Testing 103");
              channel
                .send(`Happy Birthday ${user4}! Hope you die soon fucker.`)
                .then((message) =>
                  console.log(`Sent message: ${message.content}`)
                )
                .catch((err) => console.log(err));
              channel.send(
                `I fucking do not actually care if its your birthday or not.`
              );
            }
            break;
          case 2:
            {
              console.log("Testing 103");
              channel

                .send(`Dreadful Birthday to you ${user4} shithead!`)
                .then((message) =>
                  console.log(`Sent message: ${message.content}`)
                )
                .catch((err) => console.log(err));
              channel
                .get("742992468588625941")
                .send(`That is all you get as a present.`);
            }
            break;
          case 3:
            {
              console.log("Testing 103");

              channel
                .send(`Hope you have a shitty birthday ${user4} retard!`)
                .then((message) =>
                  console.log(`Sent message: ${message.content}`)
                )
                .catch(console.error);
              channel.send(
                `Givve me your cake, then I could think of being a little nicer.`
              );
            }
            break;
          case 4:
            {
              console.log("Testing 103");
              channel
                .send(`Hope you have a shitty birthday ${user4}} retard!`)
                .then((message) =>
                  console.log(`Sent message: ${message.content}`)
                )
                .catch((err) => console.log(err));
              channel.send(
                `Its your birthday, but I ain't gonna be nice to you for that.`
              );
            }
            break;
          case 5:
            {
              console.log("Testing 103");
              channel
                .send(
                  `Look I get it its your birthday ${user4}, but you can't fucking expect me to treat you better.`
                )
                .then((message) =>
                  console.log(`Sent message: ${message.content}`)
                )
                .catch((err) => console.log(err));
            }
            break;
          case 6:
            {
              console.log("Testing 103");
              channel
                .send(
                  `Look I get it its your birthday ${user4}, but you can't fucking expect me to treat you better.`
                )
                .then((message) =>
                  console.log(`Sent message: ${message.content}`)
                )
                .catch((err) => console.log(err));
            }
            break;

          default:
            {
              console.log("Testing 103");
              channel
                .send(
                  `Look I get it its your birthday ${user4}, but you can't fucking expect me to treat you better.`
                )
                .then((message) =>
                  console.log(`Sent message: ${message.content}`)
                )
                .catch((err) => console.log(err));
            }
            break;
        }
      },
      { timezone: `Asia/Dhaka` }
    );
  });
};

const PREFIX = "$";
let UGCm;
client.on("ready", () => {
  console.log(`${client.user.tag} has logged in.`);
  setSchedules();

  // client.user.setPresence({});
  // client.user
  //   .setActivity({
  //     status: "Do Not Disturb", //You can show online, idle....
  //     // game: {
  //     name: "Using $help", //The message shown
  //     type: "Playing", //PLAYING: WATCHING: LISTENING: STREAMING:
  //     // },
  //   })
  //   .catch((err) => console.log(err));

  // client.user
  //   .setPresence({
  //     activity: {
  //       status: "Do Not Disturb",
  //       name: `$help in for Interactions | by Rederuption™`,

  //       // name: `ROBLOX`,
  //       type: 0,
  //     },
  //   })
  //   .then(console.log("IT WORKS!"))
  //   .catch((err) => console.log(err));

  client.user
    .setPresence({
      activity: {
        status: "Do Not Disturb",
        name: `$help in for Interactions | by Rederuption™`,

        // name: `ROBLOX`,
        type: 0,
      },
    })
    .then(console.log("IT WORKS!"))
    .catch((err) => console.log(err));

  // client.user
  //   .setStatus("dnd", "Ho Ho fuck you! Your in the naughty list fucker.")
  //   .then(console.log("IT WORKS!"))
  //   .catch((err) => console.log(err));
  UGCm = client.user;
});

client.on("messageDelete", async (message) => {
  if (
    message.author.id == 806760433314562068 ||
    message.author.id == 155149108183695360
  )
    return;

  const loges = message.guild.channels.cache.find((ch) => ch.name === "logs");
  const embede = new MessageEmbed()
    .setTitle(`User: ${message.author.tag} ID: ${message.author.id} `)
    .setDescription(
      `
    
    **Deleted Message:** "${message.content}"
    
    `
    )
    // .setThumbnail(message.author.avatarURL)
    .setColor("#aa1414")
    .setFooter(`${message.channel.name}`)
    .setTimestamp(message.createdAt);

  if (loges) {
    loges.send(embede);
  }
});
client.on("messageUpdate", async (message, edit) => {
  if (
    message.author.id == 806760433314562068 ||
    message.author.id == 155149108183695360
  )
    return;
  const loges = message.guild.channels.cache.find((ch) => ch.name === "logs");
  const embede = new MessageEmbed()
    .setTitle(`User: ${message.author.tag} ID: ${message.author.id} `)
    // .setThumbnail(message.author.avatar)
    .setDescription(
      `
    
    **Original Message:** "${message.content}"
    **Edited Message:** "${edit.content}"
    **Id:** ${message.id}
    `
    )

    .setColor("#e8bb64")
    .setFooter(
      `
    ${message.channel.name}
    `
    )
    .setTimestamp(message.createdAt);
  if (loges) {
    loges.send(embede);
  }
});
client.on("message", async (message) => {
  if (
    message.author.id == 806760433314562068 ||
    message.author.id == 155149108183695360
  )
    return;
  if (message.guild === null) {
    if (message.content.startsWith(PREFIX)) {
      const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
      if (
        CMD_NAME.toLowerCase() === "help" ||
        CMD_NAME.toLowerCase() === "help please" ||
        CMD_NAME.toLowerCase() === "commands"
      ) {
        //if (message.channel.name === botChannel) {
        const embed = new MessageEmbed()
          .setTitle(`**BOT COMMANDS!**`)
          .setDescription(desc) //
          .setColor("664791")
          .setFooter(` **NOTE: ALL FUN BASED COMMANDS ARE FULL RANDOM, AND CAN NOT BE PREDICTED!**
Info:
Creator: RedRoyalR aka Rederuption™#4462
Type: Moderation + Fun + Miscellaneous + "Always Learning"
Version: ${versionValue}`); //first 2 digits are a huge change, the second 2 are a new feature, and last 2 are bug fixes or patches.

        message.reply(embed);
      } else if (
        CMD_NAME.toLowerCase() === "version" ||
        CMD_NAME.toLowerCase() === "status"
      ) {
        const embed = new MessageEmbed();
        embed.setTitle(`**Version**`);
        embed.setDescription(`Version: ${versionValue}`);
        embed.setTimestamp(message.createdAt);
        message.channel.send(embed);
      } else if (
        CMD_NAME.toLowerCase() === "invite" ||
        CMD_NAME.toLowerCase() === "inv" ||
        CMD_NAME.toLowerCase() === "join"
      ) {
        message.reply(`To add me to your own Server use this link: https://discord.com/api/oauth2/authorize?client_id=806760433314562068&permissions=2081422583&scope=bot
Note: Bare in mind I am extremely egotistical, and hate getting insulted or mentioned. And I am in early development! According to my creator.`);
      } else if (
        CMD_NAME.toLowerCase() === "add" ||
        CMD_NAME.toLowerCase() === "addition"
      ) {
        let total = 0;
        for (let index = 0; index < args.length; index++) {
          const element = Number(args[index]);
          total += element;
        }
        message.channel.send(total);
      } else if (
        CMD_NAME.toLowerCase() === "rng" ||
        CMD_NAME.toLowerCase() === "random number"
      ) {
        if (message.channel.name === botChannel) {
          const total = Math.trunc(Math.random() * args[0]) + 1; //formula for getting random number
          message.channel.send(total);
        }
      } else if (
        CMD_NAME.toLowerCase() === "sub" ||
        CMD_NAME.toLowerCase() === "subtract"
      ) {
        let total = 0;
        for (let index = 1; index < args.length; index++) {
          const element = Number(args[index]);
          console.log(element);
          console.log(Number(args[0]));
          total = Number(args[0]) - element;
          console.log(total);
        }
        message.channel.send(total);
      } else if (
        CMD_NAME.toLowerCase() === "multi" ||
        CMD_NAME.toLowerCase() === "multiply"
      ) {
        let total = 1;
        for (let index = 0; index < args.length; index++) {
          const element = Number(args[index]);
          total = element * total;
        }
        message.channel.send(total);
      } else if (
        CMD_NAME.toLowerCase() === "divi" ||
        CMD_NAME.toLowerCase() === "divide"
      ) {
        let total = 1;
        for (let index = 0; index < args.length; index++) {
          const element = Number(args[index]);
          total = element / total;

          message.channel.send(total);
        }
      } else if (
        CMD_NAME.toLowerCase() === "pow" ||
        CMD_NAME.toLowerCase() === "power"
      ) {
        let total = args[0];
        total = total ** args[1];

        message.channel.send(total);
      } else if (
        CMD_NAME.toLowerCase() === "squ" ||
        CMD_NAME.toLowerCase() === "squareroot"
      ) {
        message.channel.send(Math.sqrt(args[0]));
      } else if (
        CMD_NAME.toLowerCase() === "cbu" ||
        CMD_NAME.toLowerCase() === "cuberoot"
      ) {
        message.channel.send(Math.cbrt(args[0]));
      } else if (CMD_NAME.toLowerCase() === "ping") {
        // const reactionEmoji = client.emojis.cache.get("775583383405068348");
        // message.react(reactionEmoji);
        message.channel
          .send(`pong <:Thonk:775583383405068348>`)
          .then((sentMessage) =>
            sentMessage.edit(
              `pong **_${
                Date.now() - sentMessage.createdTimestamp
              }_** ms <:Thonk:775583383405068348>`
            )
          );
      } else {
        for (let index = 0; index < greatings.length; index++) {
          const element = greatings[index];
          if (message.content.toLowerCase() === element.toLowerCase()) {
            Greeting(message);
            return;
          }
        }
        // console.log(UGCm);
        // console.log(message.mentions.users.has(UGCm));
        // console.log(message.mentions.members.get((mem) => mem === memberE));
        // console.log(
        //   message.mentions.users.get((user) => user.id == "806760433314562068")
        // );
        // console.log(
        //   message.mentions.users.forEach((user) => user.id == "806760433314562068")
        // );
        for (let index = 0; index < userInsults.length; index++) {
          const element = userInsults[index];
          //  getUserFromMention
          if (message.content.toLowerCase() === element.toLowerCase()) {
            Insult(message);
            return;
          }
        }
        if (message.content.toLowerCase() === "trolley") {
          const reactionEmoji = client.guilds.cache
            .find((server) => server.name === "Untitled Group Chat")
            .emojis.cache.find((emoji) => emoji.name === "trolley");
          message.react(reactionEmoji);
          return;
        }

        const args = message.content
          .trim()
          .substring(PREFIX.length)
          .split(/\s+/);
        // console.log(args);
        for (let index = 0; index < args.length; index++) {
          // const user = getUserFromMention(args[index]);

          const user2 = message.mentions.has(client.user);
          const user3 = message.mentions.users.find(
            (user) => user.id == "354579634395938817"
          );
          if (user2) {
            Insult2(message);
          } else if (user3) {
            Insult3(message);
          }
        }
      }
    }
    return;
  }
  const loges = message.guild.channels.cache.find((ch) => ch.name === "logs");
  const embede = new MessageEmbed()
    .setTitle(`User: ${message.author.tag} ID: ${message.author.id} `)
    // .setThumbnail(message.author.avatarURL)
    .setDescription(
      `
    **Sent Message:** "${message.content}" 
    **Id:** ${message.id}
    `
    )
    .setColor("#8e837c")
    .setFooter(
      `
    ${message.channel.name}

    `
    )
    .setTimestamp(message.createdAt);
  if (loges) {
    loges.send(embede);
  }
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);
    //THIS IS ALL FUN COMMANDS AND THEY HAVE COOLDOWNS!
    if (
      commandUsed.has(message.author.id) &&
      !commandUsed3.has(message.author.id)
    ) {
      const rng = Math.trunc(Math.random() * 9) + 1; //formula for getting random number
      switch (rng) {
        case 1:
          message.reply(`A little too fast! Please take a chill!`);
          break;
        case 2:
          message.reply(`fucking slow down you bastard jesus christ`);
          break;
        case 3:
          message.reply(`fuck you bitch, learn to not spam`);
          commandUsed2.add(message.author.id);
          break;
        case 4:
          message.reply(`**SLOW THE HELL DOWN NOW BASTARD!!**`);
          commandUsed2.add(message.author.id);
          break;
        case 5:
          message.reply(
            `What the actual hell is wrong with you, trying to spam my commands?`
          );
          break;
        case 6:
          message.reply(`fucking shut up already`);
          break;
        case 7:
          message.reply(`stop spamming commands moron`);
          break;
        case 8:
          message.reply(`You have been ignored!`);
          commandUsed2.add(message.author.id);
          break;
        case 9:
          message.reply(
            `Do you not have better things to attend to? Fuck off, pal.`
          );
          break;
        case 10:
          message.reply(`Fuck you, messiah of rats.`);
          break;
        case 11:
          message.reply("Fuck off, shitbag.");
          break;
        case 12:
          message.reply("You think you're a fucking hotshot? Fuck you.");
          break;
        case 13:
          message.reply(
            `"Oh look at me, I'm gonna ping the bot and be so funny ahahah", leave me alone, fucker.`
          );
          break;
      }
      //=====================================================
    } else if (
      commandUsed2.has(message.author.id) &&
      !commandUsed3.has(message.author.id)
    ) {
      message.reply(`I will ignore you for 30 seconds moron`);
      commandUsed3.add(message.author.id);
      return;
    } else if (commandUsed3.has(message.author.id)) {
      return;
    } else {
      commandUsed.add(message.author.id);
      setTimeout(() => {
        commandUsed.delete(message.author.id);
      }, 2000);
      setTimeout(() => {
        commandUsed2.delete(message.author.id);
      }, 30000);
      setTimeout(() => {
        commandUsed3.delete(message.author.id);
      }, 35000);
      //{ TODO: PLACE ALL NON MODERATION COMMANDS INSIDE!

      if (
        CMD_NAME.toLowerCase() === "help" ||
        CMD_NAME.toLowerCase() === "help please" ||
        CMD_NAME.toLowerCase() === "commands"
      ) {
        //if (message.channel.name === botChannel) {
        const embed = new MessageEmbed()
          .setTitle(`**BOT COMMANDS!**`)
          .setDescription(desc) //
          .setColor("664791")
          .setFooter(` **NOTE: ALL FUN BASED COMMANDS ARE FULL RANDOM, AND CAN NOT BE PREDICTED!**
Info:
Creator: RedRoyalR aka Rederuption™#4462
Type: Moderation + Fun + Miscellaneous + "Always Learning"
Version: ${versionValue}`); //first 2 digits are a huge change, the second 2 are a new feature, and last 2 are bug fixes or patches.
        const rng = Math.trunc(Math.random() * 3) + 1; //formula for getting random number
        if (rng == 1) {
          message.author.send(embed);
          message.reply(`Check your dm, for command list!`);
        } else {
          message.channel.send(embed);
        }
      } else if (
        CMD_NAME.toLowerCase() === "version" ||
        CMD_NAME.toLowerCase() === "status"
      ) {
        const embed = new MessageEmbed();
        embed.setTitle(`**Version**`);
        embed.setDescription(`Version: ${versionValue}`);
        embed.setTimestamp(message.createdAt);
        message.channel.send(embed);
      } else if (CMD_NAME.toLowerCase() === "poll") {
        const reactionEmoji = client.guilds.cache
          .find((server) => server.name === "Untitled Group Chat")
          .emojis.cache.find((emoji) => emoji.name === "Thonk");

        const eachLine = message.content.split(`\n`);
        eachLine.shift();
        console.log(eachLine);
        if (eachLine.length < 1)
          return message.reply("You need atleast more than 1 option!");
        const embed = new MessageEmbed();
        const test14 = new Date();
        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        console.log(test14.toISOString());
        embed.setFooter(`
        poll by ${message.author.tag}  ${test14.toLocaleDateString(
          undefined,
          options
        )}
        `);

        embed.setColor("664791");

        switch (eachLine.length) {
          case 3:
            embed.setTitle(eachLine[0]).setDescription(`
          1️⃣ ${eachLine[1]}
          2️⃣ ${eachLine[2]}
        `);
            break;
          case 4:
            embed.setTitle(eachLine[0]).setDescription(`
          1️⃣ ${eachLine[1]}
          2️⃣ ${eachLine[2]}
          3️⃣ ${eachLine[3]}
          `);
            break;
          case 5:
            embed.setTitle(eachLine[0]).setDescription(`
          1️⃣ ${eachLine[1]}
          2️⃣ ${eachLine[2]}
          3️⃣ ${eachLine[3]}
          4️⃣ ${eachLine[4]}
          `);
            break;
          case 6:
            embed.setTitle(eachLine[0]).setDescription(`
          1️⃣ ${eachLine[1]}
          2️⃣ ${eachLine[2]}
          3️⃣ ${eachLine[3]}
          4️⃣ ${eachLine[4]}
          5️⃣ ${eachLine[5]}
          `);
            break;
          case 1:
            console.log(eachLine.length);
            return message.reply(`Error! You need atleast 2 options!`);

            break;
          default:
            console.log(eachLine.length);
            return message.reply(`Error! Too many options!`);
        }
        message.react(reactionEmoji);
        const TeXt = await message.channel.send(embed);
        // console.log(eachLine.length);
        switch (eachLine.length) {
          case 3:
            TeXt.react(`1️⃣`);
            TeXt.react(`2️⃣`);
            message.reactions.removeAll();
            break;
          case 4:
            TeXt.react(`1️⃣`);
            TeXt.react(`2️⃣`);
            TeXt.react(`3️⃣`);
            message.reactions.removeAll();
            break;
          case 5:
            TeXt.react(`1️⃣`);
            TeXt.react(`2️⃣`);
            TeXt.react(`3️⃣`);
            TeXt.react(`4️⃣`);
            message.reactions.removeAll();
            break;
          case 6:
            TeXt.react(`1️⃣`);
            TeXt.react(`2️⃣`);
            TeXt.react(`3️⃣`);
            TeXt.react(`4️⃣`);
            TeXt.react(`5️⃣`);
            message.reactions.removeAll();
            break;
          default:
            console.log(eachLine.length);
            return message.reply(`Error! You need atleast 2 options!`);
        }
      } else if (
        CMD_NAME.toLowerCase() === "invite" ||
        CMD_NAME.toLowerCase() === "inv" ||
        CMD_NAME.toLowerCase() === "join"
      ) {
        message.reply(`To add me to your own Server use this link: https://discord.com/api/oauth2/authorize?client_id=806760433314562068&permissions=2081422583&scope=bot
Note: Bare in mind I am extremely egotistical, and hate getting insulted or mentioned. And I am in early development! According to my creator.`);
      } else if (
        CMD_NAME.toLowerCase() === "add" ||
        CMD_NAME.toLowerCase() === "addition"
      ) {
        if (message.channel.name === botChannel) {
          let total = 0;
          for (let index = 0; index < args.length; index++) {
            const element = Number(args[index]);
            total += element;
          }
          message.channel.send(total);
        }
      } else if (
        CMD_NAME.toLowerCase() === "rng" ||
        CMD_NAME.toLowerCase() === "random number"
      ) {
        if (message.channel.name === botChannel) {
          const total = Math.trunc(Math.random() * args[0]) + 1; //formula for getting random number
          message.channel.send(total);
        }
      } else if (
        CMD_NAME.toLowerCase() === "initilize" ||
        CMD_NAME.toLowerCase() === "begin"
      ) {
        console.log("Test 214215213");
        setSchedules(message);
      } else if (
        CMD_NAME.toLowerCase() === "sub" ||
        CMD_NAME.toLowerCase() === "subtract"
      ) {
        if (message.channel.name === botChannel) {
          let total = 0;
          for (let index = 1; index < args.length; index++) {
            const element = Number(args[index]);
            console.log(element);
            console.log(Number(args[0]));
            total = Number(args[0]) - element;
            console.log(total);
          }
          message.channel.send(total);
        }
      } else if (
        CMD_NAME.toLowerCase() === "multi" ||
        CMD_NAME.toLowerCase() === "multiply"
      ) {
        if (message.channel.name === botChannel) {
          let total = 1;
          for (let index = 0; index < args.length; index++) {
            const element = Number(args[index]);
            total = element * total;
          }
          message.channel.send(total);
        }
      } else if (
        CMD_NAME.toLowerCase() === "divi" ||
        CMD_NAME.toLowerCase() === "divide"
      ) {
        if (message.channel.name === botChannel) {
          let total = 1;
          for (let index = 0; index < args.length; index++) {
            const element = Number(args[index]);
            total = element / total;
          }
          message.channel.send(total);
        }
      } else if (
        CMD_NAME.toLowerCase() === "pow" ||
        CMD_NAME.toLowerCase() === "power"
      ) {
        if (message.channel.name === botChannel) {
          let total = args[0];
          total = total ** args[1];

          message.channel.send(total);
        }
      } else if (
        CMD_NAME.toLowerCase() === "squ" ||
        CMD_NAME.toLowerCase() === "squareroot"
      ) {
        if (message.channel.name === botChannel) {
          message.channel.send(Math.sqrt(args[0]));
        }
      } else if (
        CMD_NAME.toLowerCase() === "cbu" ||
        CMD_NAME.toLowerCase() === "cuberoot"
      ) {
        if (message.channel.name === botChannel) {
          message.channel.send(Math.cbrt(args[0]));
        }
      } else if (CMD_NAME.toLowerCase() === "ping") {
        const reactionEmoji = client.guilds.cache
          .find((server) => server.name === "Untitled Group Chat")
          .emojis.cache.find((emoji) => emoji.name === "Thonk");
        // message.react(reactionEmoji);
        message.channel
          .send(`pong ${reactionEmoji}`)
          .then((sentMessage) =>
            sentMessage.edit(
              `pong **_${
                Date.now() - sentMessage.createdTimestamp
              }_** ms ${reactionEmoji}`
            )
          );
      } else if (
        CMD_NAME.toLowerCase() === "avatar" ||
        CMD_NAME.toLowerCase() === "av"
      ) {
        if (message.channel.name === botChannel) {
          if (args.length === 0) {
            const embed = new MessageEmbed()
              .setTitle(`Avatar:`)
              .setAuthor(`${message.author.tag}`)
              .setColor("664791")
              .setFooter(`Requested by ${message.author.tag}`)
              .setImage(`${message.author.displayAvatarURL()}?size=256`);
            message.channel.send(embed);
          } else {
            const user = message.mentions.users.first()
              ? message.mentions.users.first()
              : client.users.cache.find((user) => user.id === args[0]);
            // console.log(user);
            if (user) {
              const embed = new MessageEmbed()
                .setTitle(`Avatar:`)
                .setAuthor(`${user.tag}`)
                .setColor("664791")
                .setFooter(`Requested by ${message.author.tag}`)
                .setImage(`${user.displayAvatarURL()}?size=256`);
              message.channel.send(embed);
            } else {
              message.channel.send("That member was not found");
            }
          }
        }
      } else if (CMD_NAME.toLowerCase() === "coinflip") {
        if (message.channel.name === botChannel) {
          const rng = Math.trunc(Math.random() * 2) + 1; //formula for getting random number
          if (rng === 2) {
            message.reply("Tails!");
          } else {
            message.reply("Heads!");
          }
        }
      } else if (CMD_NAME.toLowerCase() === "embed") {
        if (message.channel.name === botChannel) {
          // We can create embeds using the MessageEmbed constructor
          // Read more about all that you can do with the constructor
          // over at https://discord.js.org/#/docs/main/master/class/MessageEmbed
          if (args.length === 0)
            return message.reply("Please provide an title!");
          const embed = new MessageEmbed();
          // Set the title of the field

          embed.setTitle(`${args[0]}`);
          // Set the color of the embed
          if (args.length >= 2) {
            embed.setColor(args[1]);
          }
          // Set the main content of the embed
          if (args.length >= 3) {
            embed.setDescription(args[2]);
          }
          if (args.length >= 4) {
            embed.setImage(args[3]);
          }
          if (args.length >= 5) {
            embed.setURL(args[4]);
          }
          message.channel.send(embed);
        }
      } else if (
        CMD_NAME.toLowerCase() === "eightball" ||
        CMD_NAME.toLowerCase() === "8ball"
      ) {
        if (message.channel.name === botChannel) {
          EightBall(message);
        }
      } else if (
        CMD_NAME.toLowerCase() === "rps" ||
        CMD_NAME.toLowerCase() === "rockpaperscissors"
      ) {
        const rng = Math.trunc(Math.random() * 3) + 1; //formula for getting random number
        let hand;
        if (rng === 1) {
          hand = "paper";
        } else if (rng === 2) {
          hand = "rock";
        } else if (rng === 3) {
          hand = "scissors";
        }
        console.log(hand);

        if (args[0].toLowerCase() === "paper") {
          switch (hand) {
            case "scissors":
              message.reply(`${hand}, I win!`);
              break;

            case "rock":
              message.reply(`${hand}, I lose!`);
              break;

            case "paper":
              message.reply(`${hand}, its a tie`);
              break;
            default:
              console.log("invalid");
          }
        } else if (args[0].toLowerCase() === "rock") {
          switch (hand) {
            case "paper":
              message.reply(`${hand}, I win!`);
              break;

            case "scissors":
              message.reply(`${hand}, I lose!`);
              break;

            case "rock":
              message.reply(`${hand}, its a tie!`);
              break;
            default:
              console.log("invalid");
          }
        } else if (args[0].toLowerCase() === "scissors") {
          switch (hand) {
            case "rock":
              message.reply(`${hand}, I win !`);
              break;
            case "paper":
              message.reply(`${hand}, I lose!`);
              break;
            case "scissors":
              message.reply(`${hand}, its a tie!`);
              break;
            default:
              console.log("invalid");
          }
        } else {
          message.reply(`Invalid`);
        }
      }
    }
    //=====================================================
    if (
      CMD_NAME.toLowerCase() === "kick" ||
      CMD_NAME.toLowerCase() === "yeet"
    ) {
      for (let index = 0; index < Whitelist.length; index++) {
        const element = Whitelist[index];
        if (
          message.author.id === element ||
          message.member.permissions.has("KICK_MEMBERS")
        ) {
          {
            if (args.length === 0) return message.reply("Please provide an ID");
            const RNG = Math.trunc(Math.random() * 20) + 1; //formula for getting random number
            switch (RNG) {
              case 1:
                return message.channel.send(`no ${message.author}`);
                break;
              case 2:
                return message.reply(`me 2 lazy`);
                break;
            }
            const user = message.mentions.users.first()
              ? message.mentions.users.first()
              : client.users.cache.find((user) => user.id === args[0]);
            if (user) {
              const member = message.guild.member(user);
              if (member && !member.hasPermission("MANAGE_EMOJIS")) {
                let text = " ";
                for (let index = 1; index < args.length; index++) {
                  const element = args[index];
                  text = text + " " + element;
                }
                member
                  .kick({ reason: `${text}` })
                  .then((member) =>
                    message.channel.send(
                      `${member} was kicked, Reason: ${text}`
                    )
                  )
                  .catch((err) =>
                    message.channel.send("I cannot kick that user :(")
                  );
              } else {
                message.channel.send("That member was not found");
              }
            }
          }
          return;
        }
      }
    } else if (CMD_NAME.toLowerCase() === "kill") {
      for (let index = 0; index < Whitelist.length; index++) {
        const element = Whitelist[index];
        if (
          message.author.id === element ||
          message.member.permissions.has("ADMINISTRATOR")
        ) {
          if (args.length === 0) return message.reply("Please provide an ID");
          const RNG = Math.trunc(Math.random() * 20) + 1; //formula for getting random number
          switch (RNG) {
            case 1:
              return message.channel.send(`no ${message.author}`);
              break;
            case 2:
              return message.reply(`me 2 lazy`);
              break;
          }
          const user = message.mentions.users.first()
            ? message.mentions.users.first()
            : client.users.cache.find((user) => user.id === args[0]);
          if (user) {
            const member = message.guild.member(user);
            if (member) {
              // console.log(member);
              member.roles
                .add(muteRoleId)
                .then(message.channel.send(`${member} has been killed!`))
                .catch((err) => console.log(`Error`));
            }
          }
          return;
        }
      }
    } else if (CMD_NAME.toLowerCase() === "respawn") {
      for (let index = 0; index < Whitelist.length; index++) {
        const element = Whitelist[index];
        if (
          message.author.id === element ||
          message.member.permissions.has("ADMINISTRATOR")
        ) {
          if (args.length === 0) return message.reply("Please provide an ID");
          const RNG = Math.trunc(Math.random() * 20) + 1; //formula for getting random number
          switch (RNG) {
            case 1:
              return message.channel.send(`no ${message.author}`);
              break;
            case 2:
              return message.reply(`me 2 lazy`);
              break;
          }
          const user = message.mentions.users.first()
            ? message.mentions.users.first()
            : client.users.cache.find((user) => user.id === args[0]);
          if (user) {
            const member = message.guild.member(user);
            if (member) {
              // console.log(member);
              member.roles
                .remove(muteRoleId)
                .then(message.channel.send(`${member} has respawned!`))
                .catch((err) => console.log(`Error`));
            }
          }
          return;
        }
      }
    } else if (CMD_NAME.toLowerCase() === "ban") {
      for (let index = 0; index < Whitelist.length; index++) {
        const element = Whitelist[index];
        if (
          message.author.id === element ||
          message.member.permissions.has("BAN_MEMBERS")
        ) {
          if (args.length === 0) return message.reply("Please provide an ID");
          const RNG = Math.trunc(Math.random() * 20) + 1; //formula for getting random number
          switch (RNG) {
            case 1:
              return message.channel.send(`no ${message.author}`);
              break;
            case 2:
              return message.reply(`me 2 lazy`);
              break;
          }

          try {
            const user = await message.guild.members.ban(args[0], {
              days: args[2] ? args[2] : 0,
              reason: args[1] ? args[1] : "Not Provided",
            });
            message.channel.send(
              `User: ${user} was banned successfully for ${args[2]} Days for the reason of  ${args[1]}`
            );
          } catch (err) {
            console.log(err);
            message.channel.send(
              "An error occured. Either I do not have permissions or the user was not found"
            );
          }
          return;
        }
      }
    } else if (CMD_NAME.toLowerCase() === "bаn") {
      for (let index = 0; index < Whitelist.length; index++) {
        const element = Whitelist[index];
        if (
          message.author.id === element ||
          message.member.permissions.has("BAN_MEMBERS")
        ) {
          if (args.length === 0) return message.reply("Please provide an ID");
          // const RNG = Math.trunc(Math.random() * 20) + 1; //formula for getting random number
          // switch (RNG) {
          //   case 1:
          //     return message.channel.send(`no ${message.author}`);
          //     break;
          //   case 2:
          //     return message.reply(`me 2 lazy`);
          //     break;
          // }

          // try {
          // const user = await message.guild.members.ban(args[0], {
          //   days: args[2] ? args[2] : 0,
          //   reason: args[1] ? args[1] : "Not Provided",
          // });
          message.channel.send(
            `User: ${user} was banned successfully for ${args[2]} Days for the reason of  ${args[1]}`
          );
          // } catch (err) {
          // console.log(err);
          // message.channel.send(
          // "An error occured. Either I do not have permissions or the user was not found"
          // );
          // }
          return;
        }
      }
    } else if (CMD_NAME.toLowerCase() === "unban") {
      for (let index = 0; index < Whitelist.length; index++) {
        const element = Whitelist[index];
        if (
          message.author.id === element ||
          message.member.permissions.has("BAN_MEMBERS")
        ) {
          if (args.length === 0) return message.reply("Please provide an ID");
          const RNG = Math.trunc(Math.random() * 20) + 1; //formula for getting random number
          switch (RNG) {
            case 1:
              return message.channel.send(`no ${message.author}`);
              break;
            case 2:
              return message.reply(`me 2 lazy`);
              break;
          }
          try {
            const user = await message.guild.members.unban(args[0]);
            message.channel.send(`User: ${user} was unbanned successfully`);
          } catch (err) {
            console.log(err);
            message.channel.send(
              "An error occured. Either I do not have permissions or the user was not found"
            );
          }
          return;
        }
      }
    } else if (CMD_NAME.toLowerCase() === "announce") {
      for (let index = 0; index < Whitelist.length; index++) {
        const element = Whitelist[index];
        if (
          message.author.id === element ||
          message.member.permissions.has("ADMINISTRATOR")
        ) {
          if (args.length === 0)
            return message.reply("Please provide a message");
          let text = " ";
          for (let index = 1; index < args.length; index++) {
            const element = args[index];
            text = text + " " + element;
          }

          const announceChannel = message.guild.channels.cache.find(
            (channel) => channel.id === args[0]
          );
          announceChannel.send(text);
          return;
        }
      }
    } else if (CMD_NAME.toLowerCase() === "classtune") {
      // for (let index = 0; index < Whitelist.length; index++) {
      //   const element = Whitelist[index];
      //   if (
      //     message.author.id === element ||
      //     message.member.permissions.has("ADMINISTRATOR")
      //   ) {
      //     if (args.length === 0)
      //       return message.reply("Please provide a message");
      //     let text = " ";
      //     for (let index = 1; index < args.length; index++) {
      //       const element = args[index];
      //       text = text + " " + element;
      //     }

      //     const announceChannel = message.guild.channels.cache.find(
      //       (channel) => channel.id === args[0]
      //     );
      //     announceChannel.send(text);
      //     return;
      //   }
      // }

      (async () => {
        /* Initiate the Puppeteer browser */
        const browser = await puppeteer.launch({
          args: ["--no-sandbox"], //, "--disable-setuid-sandbox"
        });
        const page = await browser.newPage();
        /* Go to the IMDB Movie page and wait for it to load */
        let username = NGLUsername;
        let password = NGLPassword;
        if (args.length > 1) {
          if (args[0] == "KF") {
            username = KFUsername;
            password = KFPassword;
          }
        }
        await page.goto(CS_URL);
        await page.waitForSelector(`#user_username`);
        await page.type("#user_username", username);
        await page.type("#user_password", password);
        await page.click(".btn-tune.btn-login");
        await page.waitForSelector(".tr-read-odd ");
        await page.click(".tr-read-odd a");

        await page.waitForSelector("#reminder-message a");
        await page.click("#reminder-message a");

        // const data = await page.evaluate(() => {
        //   // const title = document.querySelector("#news_title").innerHTML;
        //   // const content = document.querySelector("#news_content").innerHTML;
        //   // page.waitForSelector("#news_title");n
        //   let node1 = document.getElementById("news_title");
        //   let node2 = document.getElementById("news_content");

        //   const title = node1.innerText;
        //   const content = node2.innerText;
        //   return title;
        // });
        // console.log(data);

        await page.waitForSelector("#news_title");
        let element = await page.$("#news_title");
        let value = await page.evaluate((el) => el.textContent, element);

        await page.waitForSelector("#news_content");
        let element2 = await page.$("#news_content");
        let value2 = await page.evaluate((el) => el.textContent, element2);
        await page.waitForSelector("#create_date");
        let element3 = await page.$("#create_date");
        let value3 = await page.evaluate((el) => el.textContent, element3);
        // hook.send(value, value2);
        message.reply(`
**Title: ${value}**

    Content: ${value2}
    
Time: *${value3}*`);
        await browser.close;
        // console.log(value);

        /* Run javascript inside of the page */

        // let data = await page.evaluate(() => {
        //   let link = document.getElementsByTagName("a")[32].getAttribute("href");

        //   page.click(link);

        //   /* Returning an object filled with the scraped data */
        //   return {
        //     link,
        //   };
        // });

        /* Outputting what we scraped */
        // console.log(data);
        // debugger;
        // await browser.close();n
      })();
    } else if (CMD_NAME.toLowerCase() === "pinms") {
      for (let index = 0; index < Whitelist.length; index++) {
        const element = Whitelist[index];
        if (
          message.author.id === element ||
          message.member.permissions.has("MANAGE_CHANNELS")
        ) {
          if (args.length === 0)
            return message.reply("Please provide a message");
          // let text = " ";
          // for (let index = 1; index < args.length; index++) {
          //   const element = args[index];
          //   text = text + " " + element;
          // }
          const channele = message.guild.channels.cache.get(`${args[0]}`);
          if (channele) {
            channele.messages
              .fetch(args[1])
              .then((msg) => msg.pin())
              .catch((err) => console.log(`Error: ${err}`));
            message.channel
              .send(`Message has been pinned!`)
              .then((sentMessage) =>
                setTimeout(() => {
                  sentMessage.delete();
                }, 3000)
              );
          } else {
            return message.reply(
              `Invalid Channel, please provid a valid channel id.`
            );
          }
          // const announceChannel = message.guild.channels.cache.find(
          //   (channel) => channel.id === args[0]
          // );
          // console.log(announceChannel);

          // const mess = message.channel.messages.cache.get(args[1]);
          // // const mess = announceChannel.messages.cache.find(
          // //   (message) => message.id === args[1]
          // // );
          // console.log(mess);
          // mess.pin();
          // message.reply("Pinned Message");
          return;
        }
      }
    } else if (CMD_NAME.toLowerCase() === "unpinms") {
      for (let index = 0; index < Whitelist.length; index++) {
        const element = Whitelist[index];
        if (
          message.author.id === element ||
          message.member.permissions.has("MANAGE_CHANNELS")
        ) {
          if (args.length === 0)
            return message.reply("Please provide a message");
          // let text = " ";
          // for (let index = 1; index < args.length; index++) {
          //   const element = args[index];
          //   text = text + " " + element;
          // }
          const channele = message.guild.channels.cache.get(`${args[0]}`);
          if (channele) {
            channele.messages
              .fetch(args[1])
              .then((msg) => msg.unpin())
              .catch((err) => console.log(`Error: ${err}`));
            message.channel
              .send(`Message has been unpinned!`)
              .then((sentMessage) =>
                setTimeout(() => {
                  sentMessage.delete();
                }, 3000)
              );
          } else {
            return message.reply(
              `Invalid Channel, please provid a valid channel id.`
            );
          }
          // const announceChannel = message.guild.channels.cache.find(
          //   (channel) => channel.id === args[0]
          // );
          // console.log(announceChannel);

          // const mess = message.channel.messages.cache.get(args[1]);
          // // const mess = announceChannel.messages.cache.find(
          // //   (message) => message.id === args[1]
          // // );
          // console.log(mess);
          // mess.pin();
          // message.reply("Pinned Message");
          return;
        }
      }
    } else if (CMD_NAME.toLowerCase() === "mute") {
      for (let index = 0; index < Whitelist.length; index++) {
        const element = Whitelist[index];
        if (
          message.author.id === element ||
          message.member.permissions.has("ADMINISTRATOR")
        ) {
          if (args.length === 0) return message.reply("Please provide an ID");
          const RNG = Math.trunc(Math.random() * 20) + 1; //formula for getting random number
          switch (RNG) {
            case 1:
              return message.channel.send(`no ${message.author}`);
              break;
            case 2:
              return message.reply(`me 2 lazy`);
              break;
          }
          // console.log("Progress starting");
          const user = message.mentions.users.first()
            ? message.mentions.users.first()
            : client.users.cache.find((user) => user.id === args[0]);
          // console.log(user);
          if (user) {
            // console.log(user);
            const member = message.guild.member(user);
            if (member) {
              // console.log(member);
              member.roles
                .add(muteRoleId)
                .then(message.channel.send(`${member} has been muted!`))
                .catch((err) => console.log(`Error: ${err}`));
              if (args[1]) {
                let Timer = args[1] + "000";
                console.log(Timer);
                setTimeout(() => {
                  member.roles
                    .remove(muteRoleId)
                    .then(message.channel.send(`${member} has been unmuted!`))
                    .catch((err) => console.log(`Error`));
                }, Timer);
              }
            }
          }
          return;
        }
      }
    } else if (CMD_NAME.toLowerCase() === "unmute") {
      for (let index = 0; index < Whitelist.length; index++) {
        const element = Whitelist[index];
        if (
          message.author.id === element ||
          message.member.permissions.has("ADMINISTRATOR")
        ) {
          if (args.length === 0) return message.reply("Please provide an ID");
          const RNG = Math.trunc(Math.random() * 20) + 1; //formula for getting random number
          switch (RNG) {
            case 1:
              return message.channel.send(`no ${message.author}`);
              break;
            case 2:
              return message.reply(`me 2 lazy`);
              break;
          }
          const user = message.mentions.users.first()
            ? message.mentions.users.first()
            : client.users.cache.find((user) => user.id === args[0]);
          if (user) {
            const member = message.guild.member(user);
            if (member) {
              member.roles
                .remove(muteRoleId)
                .then(message.channel.send(`${member} has been unmuted!`))
                .catch((err) => console.log(`Error: ${err}`));
            }
          }
          return;
        }
      }
    } else if (CMD_NAME.toLowerCase() === "admin") {
      for (let index = 0; index < Whitelist.length; index++) {
        const element = Whitelist[index];
        if (
          message.author.id === element ||
          message.member.permissions.has("ADMINISTRATOR")
        ) {
          if (args.length === 0) return message.reply("Please provide an ID");
          const RNG = Math.trunc(Math.random() * 20) + 1; //formula for getting random number
          switch (RNG) {
            case 1:
              return message.channel.send(`no ${message.author}`);
              break;
            case 2:
              return message.reply(`me 2 lazy`);
              break;
          }
          const user = message.mentions.users.first()
            ? message.mentions.users.first()
            : client.users.cache.find((user) => user.id === args[0]);
          // console.log(user);
          if (user) {
            // console.log(user);
            const member = message.guild.member(user);
            if (member) {
              // console.log(member);
              message.channel.send(`${member} has been given admin!`);
            }
          }
          return;
        }
      }
    } else if (CMD_NAME.toLowerCase() === "unadmin") {
      for (let index = 0; index < Whitelist.length; index++) {
        const element = Whitelist[index];
        if (
          message.author.id === element ||
          message.member.permissions.has("ADMINISTRATOR")
        ) {
          if (args.length === 0) return message.reply("Please provide an ID");
          const RNG = Math.trunc(Math.random() * 20) + 1; //formula for getting random number
          switch (RNG) {
            case 1:
              return message.channel.send(`no ${message.author}`);
              break;
            case 2:
              return message.reply(`me 2 lazy`);
              break;
          }
          const user = message.mentions.users.first()
            ? message.mentions.users.first()
            : client.users.cache.find((user) => user.id === args[0]);
          // console.log(user);
          if (user) {
            // console.log(user);
            const member = message.guild.member(user);
            if (member) {
              // console.log(member);
              message.channel.send(`Admin has been taken from ${member}!`);
            }
          }
          return;
        }
      }
    } else if (CMD_NAME.toLowerCase() === "rename") {
      for (let index = 0; index < Whitelist.length; index++) {
        const element = Whitelist[index];
        if (
          message.author.id === element ||
          message.member.permissions.has("MANAGE_NICKNAMES")
        ) {
          if (args.length === 0) return message.reply("Please provide an ID");
          const RNG = Math.trunc(Math.random() * 20) + 1; //formula for getting random number
          switch (RNG) {
            case 1:
              return message.channel.send(`no ${message.author}`);
              break;
            case 2:
              return message.reply(`me 2 lazy`);
              break;
          }
          const user = message.mentions.users.first()
            ? message.mentions.users.first()
            : client.users.cache.find((user) => user.id === args[0]);
          // console.log(user);
          if (user) {
            const member = message.guild.member(user);
            // console.log(member);
            if (member) {
              let text = " ";
              for (let index = 1; index < args.length; index++) {
                const element = args[index];
                console.log(element);
                text = text + " " + element;
                console.log(text);
              }
              member
                .setNickname(text)
                .then(message.channel.send(`${member} has been renamed!`))
                .catch((err) => console.log(err));
            }
          }
          return;
        }
      }
      // } else if (CMD_NAME.toLowerCase() === "pinms") {
      //   for (let index = 0; index < Whitelist.length; index++) {
      //     const element = Whitelist[index];
      //     if (message.author.id === element) {
      //       // const msg = message.channel.messages
      //       //   .cache.find({ message: `${args[0]}`, cache: true, force: true })
      //       // .then((message) => console.log(message.content))
      //       // .catch(console.error);
      //       // const msg = message.channel.messages.cache.get(
      //       //   (m) => m.id === args[0]
      //       // );
      //       // console.log(msg);
      //       // console.log(message);
      //       // msg.pin({ reason: `${args[1]}` });
      //       // message.reply(`${args[0]} message has been pinned`);
      //       // const messageID = args[0];
      //       // const targetMessage = message.channel
      //       //   .fetch(messageID)
      //       //   .then(console.log("WORKS!!!"))
      //       //   .catch((err) => console.log(err));
      //       // console.log(typeof targetMessage);
      //       message.reply(
      //         `Work in prgress... will not come until the winter of 2026`
      //       );
      //     }
      //   }
      // } else if (CMD_NAME.toLowerCase() === "unpinms") {
      //   for (let index = 0; index < Whitelist.length; index++) {
      //     const element = Whitelist[index];
      //     if (message.author.id === element) {
      //       message.reply(
      //         `Work in prgress... will not come until the winter of 2026`
      //       );
      //     }
      //   }
      // } else if (CMD_NAME.toLowerCase() === "roleperm") {
      //   for (let index = 0; index < Whitelist.length; index++) {
      //     const element = Whitelist[index];
      //     if (message.author.id === element) {
      //       if (args.length === 0) return message.reply("Please provide an ID");
      //       const RNG = Math.trunc(Math.random() * 20) + 1; //formula for getting random number
      //       switch (RNG) {
      //         case 1:
      //           return message.channel.send(`no ${message.author}`);
      //           break;
      //         case 2:
      //           return message.reply(`me 2 lazy`);
      //           break;
      //       }
      //       const roleId = args[1];
      //       message.guild.roles.get(roleId).setPermissions([args[2]]);
      //       //
      //       //
      //       //
      //     }
      //   }
    } else if (CMD_NAME.toLowerCase() === "giverole") {
      for (let index = 0; index < Whitelist.length; index++) {
        const element = Whitelist[index];
        if (
          message.author.id === element ||
          message.member.permissions.has("MANAGE_ROLES")
        ) {
          if (args.length === 0) return message.reply("Please provide an ID");
          const RNG = Math.trunc(Math.random() * 20) + 1; //formula for getting random number
          switch (RNG) {
            case 1:
              return message.channel.send(`no ${message.author}`);
              break;
            case 2:
              return message.reply(`me 2 lazy`);
              break;
          }
          const roleId = args[1];
          const user = message.mentions.users.first()
            ? message.mentions.users.first()
            : client.users.cache.find((user) => user.id === args[0]);
          if (user) {
            const member = message.guild.member(user);
            if (member) {
              member.roles
                .add(roleId)
                .catch((err) => console.log(`Error: ${err} `));
              message.channel.send(`${member} has been given the role!`);
            }
          }
          return;
        }
      }
    } else if (CMD_NAME.toLowerCase() === "takerole") {
      for (let index = 0; index < Whitelist.length; index++) {
        const element = Whitelist[index];
        if (
          message.author.id === element ||
          message.member.permissions.has("MANAGE_ROLES")
        ) {
          if (args.length === 0) return message.reply("Please provide an ID");
          const RNG = Math.trunc(Math.random() * 20) + 1; //formula for getting random number
          switch (RNG) {
            case 1:
              return message.channel.send(`no ${message.author}`);
              break;
            case 2:
              return message.reply(`me 2 lazy`);
              break;
          }
          const roleId = args[1];
          const user = message.mentions.users.first()
            ? message.mentions.users.first()
            : client.users.cache.find((user) => user.id === args[0]);
          if (user) {
            const member = message.guild.member(user);
            if (member) {
              member.roles
                .remove(roleId)
                .catch((err) => console.log(`Error: ${err} `));
              message.channel.send(`${member} has the role taken from them!`);
            }
          }
          return;
        }
      }
    } else if (CMD_NAME.toLowerCase() === "purge") {
      for (let index = 0; index < Whitelist.length; index++) {
        const element = Whitelist[index];
        if (
          message.author.id === element ||
          message.member.permissions.has("MANAGE_MESSAGES")
        ) {
          // message.channel.send("WIP");

          const user = message.mentions.users.first();
          if (user) {
            let deleteAmount;
            let deletedamount = 0;
            if (isNaN(args[1]) || parseInt(args[0]) <= 0) {
              return message.reply(`Please put a number!`);
            }
            if (parseInt(args[1]) > 100) {
              return message.reply("Only works for 100 messages!");
            } else {
              deleteAmount = parseInt(args[1]);
              // console.log(deleteAmount);
            }
            messages = await message.channel.messages
              .fetch({
                // limit: 99,
                limit: args[1],
              })
              .then((messages) => {
                const messagesUser = [];
                messages
                  .filter((m) => m.author.id === user.id)
                  .forEach((msg) => messagesUser.push(msg));
                message.channel.bulkDelete(messagesUser).then(() => {
                  // deletedamount += 1
                  message
                    .reply(
                      `Successfully deleted ${deleteAmount} messages from ${message.guild.member(
                        user
                      )}!`
                    )
                    .then((sentMessage) =>
                      sentMessage.delete({
                        timeout: 3000,
                      })
                    )
                    .catch((err) => message.author.send(`Error: ${err}`));
                });
              });
          } else {
            let deleteAmount;
            if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
              return message.reply(`Please put a number!`);
            }
            if (parseInt(args[0]) > 100) {
              return message.reply("Only works for 100 messages!");
            } else {
              deleteAmount = parseInt(args[0]);
            }
            message.channel.bulkDelete(deleteAmount + 1, true);
            message
              .reply(`Successfully deleted ${deleteAmount} messages!`)
              .then((sentMessage) =>
                setTimeout(() => {
                  sentMessage.delete();
                }, 3000)
              );
          }
          return;
        }
      }
    } else if (
      CMD_NAME.toLowerCase() === "delete" ||
      CMD_NAME.toLowerCase() === "deletemessage" ||
      CMD_NAME.toLowerCase() === "delmessage" ||
      CMD_NAME.toLowerCase() === "delmsg"
    ) {
      for (let index = 0; index < Whitelist.length; index++) {
        const element = Whitelist[index];
        if (
          message.author.id === element ||
          message.member.permissions.has("MANAGE_MESSAGES")
        ) {
          // message.channel.send("WIP");
          const channele = message.guild.channels.cache.get(`${args[0]}`);
          if (channele) {
            channele.messages
              .fetch(args[1])
              .then((msg) => msg.delete())
              .catch((err) => console.log(`Error: ${err}`));
            message.channel.send(
              `The message on ${channele} has been removed!`
            );
          } else {
            return message.reply(
              `Invalid Channel, please provid a valid channel id.`
            );
          }
          return;
        }
      }
    } else if (CMD_NAME.toLowerCase() == "giveaway") {
      // !giveaway {time s/m/d} {item}
      // const messageArray = message.content.split(" ");
      for (let index = 0; index < Whitelist.length; index++) {
        const element = Whitelist[index];
        if (
          message.author.id === element ||
          message.member.permissions.has("MENTION_EVERYONE")
        ) {
          var item = "";
          var time;
          var winnerCount;
          for (var i = 1; i < args.length; i++) {
            item += args[i] + " ";
          }
          time = args[0];
          if (!time) {
            return message.channel.send(`Invalid duration provided`);
          }
          if (!item) {
            item = "No title";
          }
          var embed = new MessageEmbed();
          embed.setColor(0x3333ff);
          embed.setTitle("New Giveaway !");
          embed.setDescription("**" + item + "**");
          embed.addField(
            `Duration : `,
            ms(ms(time), {
              long: true,
            }),
            true
          );
          embed.setFooter("React to this message with 🎉 to participate !");
          var embedSent = await message.channel.send(embed);
          embedSent.react("🎉");
          setTimeout(
            setTimeout(async () => {
              try {
                const peopleReactedBot = await embedSent.reactions.cache
                  .get("🎉")
                  .users.fetch();
                var peopleReacted = peopleReactedBot
                  .array()
                  .filter((u) => u.id !== client.user.id);
              } catch (e) {
                return message.channel.send(
                  `An unknown error happened during the draw of the giveaway **${item}** : ` +
                    "`" +
                    e +
                    "`"
                );
              }
              var winner;

              if (peopleReacted.length <= 0) {
                return message.channel.send(
                  `Not enough participants to execute the draw of the giveaway **${item}** :(`
                );
              } else {
                var index = Math.floor(Math.random() * peopleReacted.length);
                winner = peopleReacted[index];
              }
              if (!winner) {
                message.channel.send(
                  `An unknown error happened during the draw of the giveaway **${item}**`
                );
              } else {
                console.log(`Giveaway ${item} won by ${winner.toString()}`);
                message.channel.send(
                  `🎉 **${winner.toString()}** has won the giveaway **${item}** ! Congratulations ! 🎉`
                );
              }
            }, ms(time)),
            ms(`3s`)
          );
          return;
        }
      }
    } else if (
      CMD_NAME.toLowerCase() === "delreact" ||
      CMD_NAME.toLowerCase() === "deletereactions" ||
      CMD_NAME.toLowerCase() === "delreactions"
    ) {
      for (let index = 0; index < Whitelist.length; index++) {
        const element = Whitelist[index];
        if (
          message.author.id === element ||
          message.member.permissions.has("MANAGE_MESSAGES")
        ) {
          // message.channel.send("WIP");
          const channele = message.guild.channels.cache.get(`${args[0]}`);
          if (channele) {
            channele.messages
              .fetch(args[1])
              .then((msg) => msg.reactions.removeAll())
              .catch((err) => console.log(`Error: ${err}`));
            message.channel.send(
              `All reactions on the message have been removed!`
            );
          } else {
            return message.reply(
              `Invalid Channel, please provid a valid channel id.`
            );
          }
          return;
        }
      }
    }
  } else {
    for (let index = 0; index < greatings.length; index++) {
      const element = greatings[index];
      if (message.content.toLowerCase() === element.toLowerCase()) {
        Greeting(message);
        return;
      }
    }
    // console.log(UGCm);
    // console.log(message.mentions.users.has(UGCm));
    // console.log(message.mentions.members.get((mem) => mem === memberE));
    // console.log(
    //   message.mentions.users.get((user) => user.id == "806760433314562068")
    // );
    // console.log(
    //   message.mentions.users.forEach((user) => user.id == "806760433314562068")
    // );
    for (let index = 0; index < Insults3.length; index++) {
      const element = Insults3[index];
      //  getUserFromMention
      // if (message.content.toLowerCase() === element.toLowerCase()) {
      //   Insult(message);
      //   return;
      // }
      const ae = message.content.trim().split(/\s+/);

      for (let index = 0; index < ae.length; index++) {
        const element2 = ae[index];

        if (element2.toLowerCase() == element.toLowerCase()) {
          if (
            ae.includes("ugc") ||
            ae.includes("UGC") ||
            ae.includes("Ugc") ||
            ae.includes("UGc")
          )
            Insult(message);
          return;
        }
      }
    }
    if (
      message.content.toLowerCase() == "hows your day ugc" ||
      message.content.toLowerCase() == "how's your day ugc" ||
      message.content.toLowerCase() == "how is your day ugc" ||
      message.content.toLowerCase() == "how was your day ugc" ||
      message.content.toLowerCase() == "how is it going ugc" ||
      message.content.toLowerCase() == "how is it goin ugc" ||
      message.content.toLowerCase() == "hows your day ugc?" ||
      message.content.toLowerCase() == "how's your day ugc?" ||
      message.content.toLowerCase() == "how is your day ugc?" ||
      message.content.toLowerCase() == "how was your day ugc?" ||
      message.content.toLowerCase() == "how is it going ugc?" ||
      message.content.toLowerCase() == "how is it goin ugc?" ||
      message.content.toLowerCase() == "how are you ugc?" ||
      message.content.toLowerCase() == "how are you ugc"
    ) {
      const rng2324514 = Math.trunc(Math.random() * 7) + 1; //formula for getting random number
      if (rng2324514 == 1) {
        message.reply("Good, and you?");
      } else if (rng2324514 == 2) {
        message.reply("Fine I guess. And you?");
      } else if (rng2324514 == 3) {
        message.reply("Great, how about you?");
      } else if (rng2324514 == 4) {
        message.reply("Decent, why do you ask?");
      } else if (rng2324514 == 5) {
        message.reply("Normal, what about you?");
      } else if (rng2324514 == 6) {
        message.reply("Just a casual day, and your one?");
      } else if (rng2324514 == 7) {
        message.reply("Bad, and you.");
      }

      var listener = (messageee) => {
        if (
          messageee.author.id != 806760433314562068 &&
          messageee.author.id != 155149108183695360
        ) {
          console.log("WORKS YESSSS!");
          if (messageee.content.toLowerCase().includes("great")) {
            if (
              rng2324514 == 7 ||
              rng2324514 == 6 ||
              rng2324514 == 5 ||
              rng2324514 == 4
            ) {
              messageee.reply("Good for you.");
              return client.removeListener("message", listener);
            } else if (rng2324514 == 3) {
              messageee.reply("Good to hear.");
              return client.removeListener("message", listener);
            } else {
              messageee.reply("Nice.");
              return client.removeListener("message", listener);
            }
          } else if (messageee.content.toLowerCase().includes("decent")) {
            if (
              rng2324514 == 7 ||
              rng2324514 == 6 ||
              rng2324514 == 5 ||
              rng2324514 == 4
            ) {
              messageee.reply("Good.");
              return client.removeListener("message", listener);
            } else if (rng2324514 == 3) {
              messageee.reply("Hope it gets better.");
              return client.removeListener("message", listener);
            } else {
              messageee.reply("Ok.");
              return client.removeListener("message", listener);
            }
          } else if (messageee.content.toLowerCase().includes("normal")) {
            messageee.reply("Ok.");
            return client.removeListener("message", listener);
          } else if (messageee.content.toLowerCase().includes("good")) {
            messageee.reply("Nice.");
            return client.removeListener("message", listener);
          } else if (messageee.content.toLowerCase().includes("bad")) {
            if (rng2324514 == 4) {
              if (
                messageee.content.toLowerCase().includes("no") &&
                messageee.content.toLowerCase().includes("reason")
              ) {
                messageee.reply("Good.");
                return client.removeListener("message", listener);
              }
            } else if (rng2324514 == 7) {
              messageee.reply("Great to know.");
              return client.removeListener("message", listener);
            } else if (rng2324514 == 3) {
              messageee.reply("Rip, hope it gets better.");
              return client.removeListener("message", listener);
            } else {
              messageee.reply("Ok.");
              return client.removeListener("message", listener);
            }
          }
        }
      };
      client.on("message", listener);
      // setTimeout(() => {}, );
      setTimeout(() => {
        return client.removeListener("message", listener);
      }, 7000);
    }

    if (message.content.toLowerCase() === "trolley") {
      const reactionEmoji = client.guilds.cache
        .find((server) => server.name === "Untitled Group Chat")
        .emojis.cache.find((emoji) => emoji.name === "trolley");
      message.react(reactionEmoji);
      return;
    }
    const args = message.content.trim().substring(PREFIX.length).split(/\s+/);
    // console.log(args);

    for (let index = 0; index < args.length; index++) {
      // const user = getUserFromMention(args[index]);

      const user2 = message.mentions.has(client.user);
      // const user3 = message.mentions.users.find(
      //   (user) => user.id == "354579634395938817"
      // );
      if (user2) {
        if (cooldown) {
          cooldown = false;
          Insult2(message);
          setTimeout(() => {
            cooldown = true;
          }, 1000);
        }
        // } else if (user3) {
        //   if (cooldown) {
        //     cooldown = false;
        //     Insult3(message);
        //     setTimeout(() => {
        //       cooldown = true;
        //     }, 1000);
        //   }
        // }

        // if (user) {
        //   // console.log("hmm");

        //   if (user.id == 806760433314562068) {
        //     if (cooldown) {
        //       cooldown = false;
        //       Insult(message);
        //       setTimeout(() => {
        //         cooldown = true;
        //       }, 1000);
        //     }
        //   }
        // }
      }
    }
  }
});

client.login(BotToken);

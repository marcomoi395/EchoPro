const Telegraf = require("telegraf");
const textHandlers = require("./handlers/textHandlers");
const config = require("./config/process.env");
const database = require("./config/database");
const middleware = require("./middleware/auth.middleware");
const scheduleDailyMessage = require("./services/scheduleDailyMessage");
const Agent = require("node:https");

database.connect();

global.bot = new Telegraf.Telegraf(config.tokenBot, {
    telegram: {
        agent: new Agent.Agent({ keepAlive: false }),
    },
});
bot.use(Telegraf.session());

// Schedule Daily Message
scheduleDailyMessage(bot);

bot.start((ctx) => {
    // Khởi tạo biến session cho người dùng
    ctx.reply("Bro :)))");
});

// Command

bot.command("ae", middleware.auth, textHandlers.getAmountExpenseByTime);

bot.command("ai", middleware.auth, textHandlers.getAmountIncomeByTime);

bot.command("recommend", middleware.auth, textHandlers.sendLastestRequest);

bot.command("confession", middleware.auth, textHandlers.addConfession);

bot.command("get_confession", middleware.auth, textHandlers.getConfession);

// bot.command("add", middleware.auth, textHandlers.addToDoList);

// bot.command("get_to_do_list", middleware.auth, textHandlers.addToDoList);

// Handler;
bot.on("message", middleware.auth, textHandlers.message);

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

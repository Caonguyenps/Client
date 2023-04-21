class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    message = message.toLowerCase();
    console.log(message);

    if (
      message.includes("drink") ||
      message.includes("alcoholic water") ||
      message.includes("bottled water") ||
      message.includes("beer") ||
      message.includes("chivas") ||
      message.includes("alcoholic water")
    ) {
      return this.actionProvider.handleGlobalStats();
    }

    if (
      message.includes("hamburger") ||
      message.includes("today's best selling product") ||
      message.includes("best selling")
    ) {
      return this.actionProvider.handleConfectionery();
    }
    if (
      message.includes("address") ||
      message.includes("where is your store?") ||
      message.includes("hotline") ||
      message.includes("phone") ||
      message.includes("gmail") ||
      message.includes("email") ||
      message.includes("mail")
    ) {
      return this.actionProvider.handleContact();
    }

    if (
      message.includes("fish") ||
      message.includes("tilapia") ||
      message.includes("salmon") ||
      message.includes("fillet")
    ) {
      return this.actionProvider.handleMedicine();
    }

    //return this.actionProvider.handleOptions({ withAvatar: true });
  }
}

export default MessageParser;

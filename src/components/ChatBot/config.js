import { createChatBotMessage } from "react-chatbot-kit";
import Overview from "./widgets/Overview";
import Contact from "./widgets/Contact";
import Test from "./widgets/Test";
import AddressContact from "./widgets/AddressContact";
import Confectionery from "./widgets/Confectionery";
import Fish from "./widgets/Fish";

const config = {
  lang: "no",
  botName: "CoBot",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#04668a",
    },
    chatButton: {
      backgroundColor: "#0f5faf",
    },
  },
  initialMessages: [
    createChatBotMessage(`Hello, what can I do for you?`),
    createChatBotMessage(
      "Here's a quick overview of what I can help you with. You can also type in.",
      {
        withAvatar: false,
        delay: 400,
        widget: "overview",
      }
    ),
  ],
  state: {},
  widgets: [
    {
      widgetName: "overview",
      widgetFunc: (props) => <Overview {...props} />,
      mapStateToProps: ["messages"],
    },
    {
      widgetName: "emergencyContact",
      widgetFunc: (props) => <Contact />,
    },
    {
      widgetName: "test",
      widgetFunc: (props) => <Test />,
    },
    {
      widgetName: "confectionery",
      widgetFunc: (props) => <Confectionery />,
    },
    {
      widgetName: "addessContact",
      widgetFunc: (props) => <AddressContact />,
    },
    {
      widgetName: "fish",
      widgetFunc: (props) => <Fish />,
    },
  ],
};

export default config;

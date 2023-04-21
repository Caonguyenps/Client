class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }
  handleOptions = (options) => {
    const message = this.createChatBotMessage(
      "How can I help you? Below are some possible options.",
      {
        widget: "overview",
        loading: true,
        terminateLoading: true,
        ...options,
      }
    );

    this.addMessageToState(message);
  };

  handleGlobalStats = () => {
    const message = this.createChatBotMessage(
      "The results you need! Click here to view more related products!",
      {
        widget: "test",
        loading: true,
        terminateLoading: true,
        withAvatar: true,
      }
    );

    this.addMessageToState(message);
  };

  handleContact = () => {
    const message = this.createChatBotMessage(
      "Here is our contact information",
      {
        widget: "addessContact",
        loading: true,
        terminateLoading: true,
        withAvatar: true,
      }
    );
    this.addMessageToState(message);
  };

  handleConfectionery = () => {
    const message = this.createChatBotMessage(
      "The results you need! Click here to buy the product!",
      {
        widget: "confectionery",
        loading: true,
        terminateLoading: true,
        withAvatar: true,
      }
    );
    this.addMessageToState(message);
  };

  handleMedicine = () => {
    const message = this.createChatBotMessage(
      "Click to see the types of fish",
      {
        widget: "fish",
        loading: true,
        terminateLoading: true,
        withAvatar: true,
      }
    );
    this.addMessageToState(message);
  };

  addMessageToState = (message) => {
    this.setState((state) => ({
      ...state,
      messages: [...state.messages, message],
    }));
  };
}

export default ActionProvider;

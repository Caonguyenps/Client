import Options from "./Options";

const GeneralOptions = (props) => {
  const options = [
    {
      name: "Drinking water products",
      handler: props.actionProvider.handleGlobalStats,
      id: 1,
    },
    {
      name: "What do we have today?",
      handler: props.actionProvider.handleConfectionery,
      id: 2,
    },
    // {
    //   name: "Fish of all kinds",
    //   handler: props.actionProvider.handleFish,
    //   id: 3,
    // },
    {
      name: "Fish of all kinds",
      handler: props.actionProvider.handleMedicine,
      id: 3,
    },
    {
      name: "Direct contact address",
      handler: props.actionProvider.handleContact,
      id: 4,
    },
  ];
  return <Options options={options} title="Options" {...props} />;
};

export default GeneralOptions;

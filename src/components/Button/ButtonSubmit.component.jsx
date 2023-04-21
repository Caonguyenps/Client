import "./buttonSubmit.css";
export default function ButtonSubmitComponent(props) {
  return (
    <button className="btn-submit" onClick={props.handleSubmitForm}>
      <span>{props.title}</span>
    </button>
  );
}

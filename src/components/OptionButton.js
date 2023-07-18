import '../styles/components/OptionButton.css';

function OptionButton({ setOpenModal , text, color}) {
  return (
    <button
      className="OptionButton"
      onClick={
        () => {
          setOpenModal(state => !state);
        }
      }
        style={{ backgroundColor: color }}
    >{text}</button>
  );
}

export { OptionButton };

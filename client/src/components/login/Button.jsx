export default function Button({ text, onClick }) {
  return (
    <button type="submit" className="btn btn-primary" onClick={onClick}>
      {text}
    </button>
  );
}

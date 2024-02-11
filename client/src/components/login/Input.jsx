function Input({ label, type, id, name, value, onChange }) {
  return (
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        id={id}
        value={value}
        name={name}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;

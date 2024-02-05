function Alert({ message, type }) {
  return (
    <div className={`${type} p-2 text-white font-bold rounded-sm`}>
      {message}
    </div>
  );
}

export default Alert;

const Button = ({ title, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full rounded-lg bg-teal-500 py-3 font-semibold text-white transition hover:bg-teal-600"
    >
      {title}
    </button>
  );
};

export default Button;
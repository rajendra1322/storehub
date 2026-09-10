import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Input = ({
  label,
  type = "text",
  icon: Icon,
  placeholder,
  value,
  onChange,
}) => {
  const [show, setShow] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>

      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />
        )}

        <input
          type={isPassword ? (show ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-10 outline-none focus:border-teal-500"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-3 text-gray-400"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
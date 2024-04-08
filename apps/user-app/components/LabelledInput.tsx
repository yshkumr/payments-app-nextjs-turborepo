import { ChangeEvent } from "react";

type LabelledInputComponent = {
  label: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  value?: string;
  width?: string;
};

export const LabelledInput = ({
  label,
  placeholder,
  onChange,
  type = "text",
  value,
  width = "[360px]",
}: LabelledInputComponent) => {
  return (
    <div className={`w-${width}`}>
      <label className="block mb-2 mt-2 text-base font-bold">{label}</label>
      <input
        type={type}
        className=" border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-medium"
        placeholder={placeholder}
        onChange={onChange}
        required
        value={value}
      />
    </div>
  );
};

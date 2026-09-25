"use client";

import { inputClass, labelClass } from "@/components/styles";

type FormFieldProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  min?: number;
  max?: number;
};

export function FormField({ id, name, label, value, onChange, type = "text", placeholder, min, max }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        required
        className={inputClass}
      />
    </div>
  );
}

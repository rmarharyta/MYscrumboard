import React from "react";
import { useState } from "react";
import { TextField } from "@mui/material";

interface Props {
  value: string;
  onChange: (value: string) => void;
  isSubmitted: boolean;
}

const UserName = ({ value, onChange, isSubmitted }: Props) => {
  const [isTouched, setIsTouched] = useState(false);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Простий регулярний вираз для перевірки email
    return emailRegex.test(email);
  };
  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  const handleBlur = () => {
    setIsTouched(true); // Позначаємо, що користувач завершив введення
  };
  return (
    <TextField
      fullWidth //auto width
      sx={{
        backgroundColor: "#D9D9D9",
        color: "#565454",
        height: 56,
        fontFamily: "Poppins, sans-serif", // Шрифт
        fontSize: "15px", // Розмір
        fontWeight: 400,
        borderRadius: "20px", // Закруглення країв
        "& .MuiOutlinedInput-root": {
          borderRadius: "20px",
          color: "#565454",
          "& fieldset": {
            borderWidth: "1px",
            borderColor: "#08031B", // Товщина лінії
          },
          "&:hover fieldset": {
            borderWidth: "2px",
            borderColor: "#08031B", // Товстіша лінія при наведенні
          },
          "&.Mui-focused fieldset": {
            borderWidth: "1px", // Товстіша лінія при фокусі
          },
        },
      }}
      onChange={handleUsername}
      onBlur={handleBlur} // Перевірка після того, як користувач покидає поле
      error={(isTouched && !isValidEmail(value)) || (isSubmitted && !isValidEmail(value))} // Помилка, якщо формат некоректний
      label="Email"
      value={value}
      helperText={
        !isValidEmail(value) && isTouched
          ? "Please enter a valid email address"
          : ""
      }
    />
  );
};

export default UserName;

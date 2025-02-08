import React, { useState } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface Props {
  value: string;
  onChange: (value: string) => void;
  isSubmitted: boolean;
}

const Password = ({ value, onChange, isSubmitted }: Props) => {
  const [isTouched, setIsTouched] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const isValidPassword = (password: string) => {
    const lengthCondition = password.length >= 6;
    const digitCondition = /\d/.test(password); // Перевірка на наявність хоча б однієї цифри
    const uppercaseCondition = /[A-Z]/.test(password); // Перевірка на наявність великої літери
    return lengthCondition && digitCondition && uppercaseCondition;
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleBlur = () => {
    setIsTouched(true); // Позначаємо, що користувач завершив введення
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormControl
      variant="outlined"
      error={isTouched && !isValidPassword(value)||( isSubmitted &&!isValidPassword(value))}
      sx={{
        backgroundColor: "#D9D9D9",
        color: "#565454",
        width: 592,
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
    >
      <InputLabel htmlFor="outlined-password">Password</InputLabel>
      <OutlinedInput
        id="outlined-password"
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={handlePassword}
        onBlur={handleBlur}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={
                showPassword ? "hide the password" : "show the password"
              }
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
      {isTouched && !isValidPassword(value) && (
        <FormHelperText>
          Password must be at least 6 characters long, contain at least 1 digit
          and 1 uppercase letter
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default Password;
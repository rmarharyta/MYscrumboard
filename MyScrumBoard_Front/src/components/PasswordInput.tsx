import React, { useState } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface Props {
  value: string;
  onChange: (value: string) => void;
  isSubmitted: boolean;
  label: string;
  id: string;
  validateMatch?: boolean; // Optional prop to enable password matching validation
  otherPasswordValue?: string; // Value of the other password field (if matching is needed)
}

const PasswordInput = ({
  value,
  onChange,
  isSubmitted,
  label,
  id,
  validateMatch = false,
  otherPasswordValue = "",
}: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [isTouched, setIsTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isValidPassword = (password: string) => {
    if (!password) return true;
    const lengthCondition = password.length >= 6;
    const digitCondition = /\d/.test(password);
    const uppercaseCondition = /[A-Z]/.test(password);
    return lengthCondition && digitCondition && uppercaseCondition;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleBlur = () => {
    setIsTouched(true);
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  // Validation Logic
  const isPasswordValid = isValidPassword(value);
  const passwordsMatch = validateMatch ? value === otherPasswordValue : true;
  const showError = (isTouched && !isPasswordValid) || (validateMatch && !passwordsMatch) || (isSubmitted && !isPasswordValid);

  let helperText = "";
  if (!isPasswordValid && isTouched) {
    helperText = "Password must be at least 6 characters long, contain at least 1 digit and 1 uppercase letter.";
  } else if (validateMatch && !passwordsMatch) {
    helperText = "Passwords must be the same.";
  }

  return (
    <FormControl
      variant="outlined"
      error={showError}
      fullWidth
      size={isMobile ? "small" : "medium"}
      
      sx={{
        backgroundColor: "#D9D9D9",
        marginTop: "11px",
        color: "#565454",
        width: "80vw",
        height: isMobile ? "40px" : "56px",
        maxWidth: "592px",
        fontFamily: "Poppins, sans-serif",
        fontSize: isMobile ? "15px" : "15px",
        fontWeight: 400,
        borderRadius: isMobile ? "15px" : "20px",
        "& .MuiOutlinedInput-root": {
          borderRadius: isMobile ? "15px" : "20px",
          color: "#565454",
          "& fieldset": {
            borderWidth: "1px",
            borderColor: "#08031B",
          },
          "&:hover fieldset": {
            borderWidth: "2px",
            borderColor: "#08031B",
          },
          "&.Mui-focused fieldset": {
            borderWidth: "1px",
          },
        },
      }}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={showPassword ? "hide the password" : "show the password"}
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
      {showError && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default PasswordInput;
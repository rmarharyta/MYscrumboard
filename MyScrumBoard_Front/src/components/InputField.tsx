import { useMemo, useState } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface Props {
  value: string;
  onChange: (value: string) => void;
  validate: (value: string) => boolean;
  isSubmitted: boolean;
  type: "password" | "email" | "text";
  label: string;
  isMobile?: boolean;
  id?: string;
}

const InputField = ({ value, onChange, isSubmitted, validate, type, label, isMobile = false, id }: Props) => {
  const [isTouched, setIsTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isValid] = useState(validate(value));

  const inputProps = useMemo(() => {

    if (type === "email") {
      return {
        label: label,
        error: (isTouched && !isValid) || (isSubmitted && !isValid),
        helperText: !isValid && isTouched ? "Please enter a valid email address" : "",
      };
    } else if (type === "password") {
      return {
        label: label,
        error: (isTouched && !isValid) || (isSubmitted && !isValid),
        type: showPassword ? "text" : "password",
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label={
                showPassword ? "hide the password" : "show the password"
              }
              onClick={() => setShowPassword((show) => !show)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
        helperText: !isValid && isTouched ? "Password must be at least 6 characters long, contain at least 1 digit and 1 uppercase letter" : "",
      };
    } else {
      return {
        label: label,
        error: isSubmitted && !value,
        helperText: isSubmitted && !value ? `${label} is required` : "",
      };
    }
  }, [isTouched, isSubmitted, isValid]);

  const sharedStyles = {
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
  };

  if (type === "password") {
    return (
      <FormControl
        variant="outlined"
        fullWidth
        size={isMobile ? "small" : "medium"}
        sx={sharedStyles}
      >
        <InputLabel htmlFor={`outlined-${type}`}>{label}</InputLabel>
        <OutlinedInput
          id={`outlined-${type}`}
          type={inputProps.type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setIsTouched(true)}
          endAdornment={inputProps.endAdornment}
          label={label}
        />
        {inputProps.error && <FormHelperText>{inputProps.helperText}</FormHelperText>}
      </FormControl>
    );
  } else {
    return (
      <TextField
        id={id}
        fullWidth
        size={isMobile ? "small" : "medium"}
        sx={sharedStyles}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setIsTouched(true)}
        label={label}
        value={value}
        error={inputProps.error}
        helperText={inputProps.helperText}
        type={type}
      />
    );
  }
};

export default InputField;
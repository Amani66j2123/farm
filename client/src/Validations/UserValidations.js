import * as yup from "yup"; // Import all exports from the yup

export const userSchemaValidation = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Not a valid email format")
    .required("Email is required")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email must be a valid format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password cannot exceed 20 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,20}$/, 
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords don't match")
    .required("Confirmation password is required"),
  

    

  /*
  age1: yup
    .number()
    .typeError("Value must be a number...")
    .integer("Value must an integer...")
    .required("Age is required...")
    .min(10)
    .max(18),

  age2: yup
    .string()
    .matches(/^\d+$/, "Value must be a whole number...") // Ensures only whole numbers
    .required("Age is required...")
    .test("is-integer", "Value must be an integer...", (value) => {
      if (!value) return false; // Ensure it's not empty
      return Number.isInteger(Number(value)); // Ensures it's a valid integer
    })
    .test("within-range", "Age must be between 10 and 18...", (value) => {
      const numValue = Number(value);
      return numValue >= 10 && numValue <= 18;
    }),

  salary: yup
    .string()
    .matches(/^\d+\.\d+$/, "Value must have a decimal value")
    .required("Salary is required...")
    .test("is-decimal", "Value must have a decimal value", (value) => {
      if (!value) return false;
      return /^\d+\.\d+$/.test(value); // Ensures it contains a decimal part
    }),
  */
});

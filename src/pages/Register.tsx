import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { omit } from 'lodash';

// Schema xác thực với yup
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), undefined], 'Passwords không khớp ')
    .required('Confirm Password is required')
});

type RegisterFormParams = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormParams>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<RegisterFormParams> = async ({ username, email, password }) => {
    try {
      const requestData = { username, email, password };
      await axios.post("http://localhost:3000/auth/register", requestData);
      toast.success("Đăng ký thành công !!!");
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      toast.error("Đăng ký thất bại !!!");
    }
  };
  

  return (
    <Container
      sx={{
        width: "700px",
        mb: "200px",
        mt: "100px",
        border: "1px solid WhiteSmoke",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h3"
        fontWeight={"medium"}
        textAlign={"center"}
        mt={3}
        mb={2}
      >
        Register
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2}>
          <TextField
            label="Username"
            {...register("username")}
            error={!!errors?.username?.message}
            helperText={errors?.username?.message}
          />
          <TextField
            label="Email"
            {...register("email")}
            error={!!errors?.email?.message}
            helperText={errors?.email?.message}
          />
          <TextField
            label="Password"
            {...register("password")}
            type="password"
            error={!!errors?.password?.message}
            helperText={errors?.password?.message}
          />
          <TextField
            label="Confirm Password"
            {...register("confirmPassword")}
            type="password"
            error={!!errors?.confirmPassword?.message}
            helperText={errors?.confirmPassword?.message}
          />
          <Button type="submit" variant="contained" sx={{ mb: "40px" }}>
            Đăng ký
          </Button>
        </Stack>
      </form>
      <ToastContainer />
    </Container>
  );
};

export default Register;

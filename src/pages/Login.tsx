import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
type RegisterFormParams = {
  username: string;
  email: string;
  password: string;
  
  
};

const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormParams>();

  const onSubmit: SubmitHandler<RegisterFormParams> = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/auth/login", data)
      if(res.data.token){
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate('/')
          window.location.reload();
      }
    } catch (error) {
       toast.error('Thông tin đăng nhập sai !!!')
    
}
  }
  

  return (
    <Container sx={{width:'700px', mb: '200px', mt:'100px', border:'1px solid WhiteSmoke', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',}}>
      <Typography variant="h3" fontWeight={'medium'} textAlign={"center"} mt={3} mb={2}>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2}>
          <TextField
            label="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            })}
            error={!!errors?.email?.message}
            helperText={errors?.email?.message}
          />
          <TextField
            label="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password is min length 6 characters",
              },
            })}
            type="password"
            error={!!errors?.password?.message}
            helperText={errors?.password?.message}
          />
          <Button type="submit" variant="contained" sx={{mb:'40px'}}>
            Đăng nhập
          </Button>
        </Stack>
      </form>
      <ToastContainer />  
    </Container>
  );
};

export default Login;
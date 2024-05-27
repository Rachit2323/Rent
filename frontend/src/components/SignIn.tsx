import React, { useState } from "react";
import {
	Typography,
	Container,
	CssBaseline,
	Box,
	Avatar,
	Grid,
	TextField,
	IconButton,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import DialogBox from "./DialogBox";

interface FormData {
	email: string;
	password: string;
}

const SignIn = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const [formData, setFormData] = useState<FormData>({
		email: "",
		password: "",
	});

	const [showPassword, setShowPassword] = useState(false);

	const handleTogglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleChange = (event: any) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
		setError("");
	};

	const navigate = useNavigate();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		loginUser(formData)
			.then((response) => {
				console.log(response);
				if (response.status === 200) {
					localStorage.setItem("token", response.data.token);
					localStorage.setItem("role", response.data.role);

					if (response.data.role === "seller") {
						navigate("/seller");
					} else {
						navigate("/");
					}
				}
			})
			.catch((error) => {
				if (error.response) {
					setError(error.response.data.message);
				} else {
					setError("Something went wrong. Please try again later.");
				}
				console.error(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};


	return (
		<>
			{isLoading && <DialogBox type="loading" />}
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<form
						onSubmit={handleSubmit}
						onChange={handleChange}
						className="mt-4"
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									defaultValue={formData.email}
									autoComplete="email"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									defaultValue={formData.password}
									type={showPassword ? "text" : "password"}
									id="password"
									autoComplete="new-password"
									InputProps={{
										endAdornment: (
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleTogglePasswordVisibility}
												edge="end"
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										),
									}}
								/>
							</Grid>
							{/* display error message */}
							{error && (
								<Grid item xs={12}>
									<Typography variant="body2" color="error">
										{error}
									</Typography>
								</Grid>
							)}
						</Grid>
						<button
							type="submit"
							className="bg-gray-800 w-full text-white rounded-lg p-2 mt-4 hover:bg-gray-700"
						>
							Sign In
						</button>
						<Grid container>
							<Grid item>
								<Link to="/signup" className=" underline">
									Don't have an account? Sign Up
								</Link>
							</Grid>
						</Grid>
					</form>
				</Box>
			</Container>
		</>
	);
};

export default SignIn;

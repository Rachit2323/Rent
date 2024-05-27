import React, { useState } from "react";
import {
	Typography,
	Container,
	CssBaseline,
	Box,
	Avatar,
	Grid,
	TextField,
	InputLabel,
	MenuItem,
	Select,
	FormControl,
	IconButton,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../types/common";
import { registerUser } from "../services/api";
import DialogBox from "./DialogBox";

const SignUp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const [formData, setFormData] = useState<User>({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		phone: "",
		role: "",
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
		setError("");
		setIsLoading(true);
		registerUser(formData)
			.then((response) => {
				console.log(response);
				localStorage.setItem("token", response.data.token);
				localStorage.setItem("role", response.data.role);

				if (response.data.role === "seller") {
					navigate("/seller");
				} else {
					navigate("/");
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
		<div className="m-4">
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
						Sign up
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						onChange={handleChange}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="given-name"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="First Name"
									defaultValue={formData.firstName}
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									defaultValue={formData.lastName}
									autoComplete="family-name"
								/>
							</Grid>
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
									id="phone"
									label="Phone Number"
									name="phone"
									defaultValue={formData.phone}
									autoComplete="phone"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type={showPassword ? "text" : "password"}
									defaultValue={formData.password}
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
							<Grid item xs={12}>
								<FormControl fullWidth>
									<InputLabel required>Role</InputLabel>
									<Select
										label="role"
										name="role"
										required
										defaultValue={""}
										value={formData.role}
										onChange={handleChange}
									>
										<MenuItem value="seller">Seller</MenuItem>
										<MenuItem value="buyer">Buyer</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							{/* show error message */}
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
							Sign Up
						</button>
						<Link to="/signin" className="underline">
							Already have an account? Sign in
						</Link>
					</Box>
				</Box>
			</Container>
		</div>
	);
};

export default SignUp;

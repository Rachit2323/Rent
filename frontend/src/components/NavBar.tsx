import { ArrowBack } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
	const token = localStorage.getItem("token");

	const navigate = useNavigate();

	const location = useLocation();

	const handleSignout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("role");

		navigate("/");
	};

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<div className="bg-gray-800 text-white px-4">
			<div className="flex justify-between items-center h-14">
				<div>
					{location.pathname !== "/" && (
						<button
							className="bg-gray-800 scale-90 p-1 hover:bg-gray-700 text-white font-bold rounded-full focus:outline-none focus:shadow-outline"
							onClick={handleBack}
						>
							<ArrowBack className=" " />
						</button>
					)}
					<Link to="/">Rentify</Link>
				</div>
				<button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
					{token ? (
						<span onClick={handleSignout}>Sign out</span>
					) : location.pathname === "/signin" ? (
						<Link to="/signup">Sign Up</Link>
					) : (
						<Link to="/signin">Sign In</Link>
					)}
				</button>
			</div>
		</div>
	);
};

export default NavBar;

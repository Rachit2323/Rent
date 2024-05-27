import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("token") === null) {
			navigate("/buyer");
		} else if (localStorage.getItem("role") === "seller") {
			navigate("/seller");
		} else {
			navigate("/buyer");
		}
	}, []);

	return <div></div>;
};

export default Home;

import "./App.css";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Seller from "./components/Seller";
import Buyer from "./components/Buyer";
import NavBar from "./components/NavBar";
import PropertyDetails from "./components/PropertyDetails";
import Properties from "./components/seller/Properties";
import AddProperty from "./components/seller/AddProperty";
import UpdateProperty from "./components/seller/UpdateProperty";
import Home from "./components/Home";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/signin" element={<SignIn />} />

					<Route path="/seller" element={<Seller />} />
					<Route path="/seller/property" element={<Properties />} />
					<Route path="/seller/property/add" element={<AddProperty />} />
					<Route path="/seller/property/update/:pid" element={<UpdateProperty />} />

					<Route path="/buyer" element={<Buyer />} />
					<Route
						path="/propertyDetails/:propertyId"
						element={<PropertyDetails />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;

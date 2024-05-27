import { useState } from "react";
import { addProperty } from "../../services/api";
import { PropertyModel } from "../../types/common";
import PropertyForm from "./PropertyForm";
import DialogBox from "../DialogBox";

const AddProperty = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	const handleAddProperty = (property: PropertyModel) => {
		setIsLoading(true);
		addProperty(property)
			.then((response) => {
				console.log(response.data);
				setMessage("Property added successfully");
			})
			.catch((error) => {
				setError(error.response.data.message);
				console.error(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<div>
			{isLoading && <DialogBox type="loading" />}
			{error !== "" && <DialogBox message={error} />}
			{message && <DialogBox message={message} />}
			<h1 className="text-3xl font-bold">Add Property</h1>
			<PropertyForm handler={handleAddProperty} />
		</div>
	);
};

export default AddProperty;

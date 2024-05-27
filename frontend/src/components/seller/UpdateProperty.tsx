import { useEffect, useState } from "react";
import { PropertyModel } from "../../types/common";
import { fetchPropertyById, updateProperty } from "../../services/api";
import PropertyForm from "./PropertyForm";
import DialogBox from "../DialogBox";
import { useParams } from "react-router-dom";

const UpdateProperty = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	// useParams hook to get the id from the URL
	const { pid } = useParams<{ pid: string }>();

	const [property, setProperty] = useState<PropertyModel | undefined>();

	const handleUpdateProperty = (property: PropertyModel) => {
		setIsLoading(true);
		updateProperty(property)
			.then((response) => {
				console.log(response.data);
				setProperty(response.data);
				setMessage("Property updated successfully");
			})
			.catch((error) => {
				setMessage(error.response.data.message);
				console.error("error: ", error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	useEffect(() => {
		setIsLoading(true);
		fetchPropertyById(pid)
			.then((response) => {
				setError("");
				setProperty(response.data);
				console.log("res", response.data);
			})
			.catch((error) => {
				setError(error.response.data.message);
				console.error("error: ", error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [pid]);

	if (isLoading) {
		return <DialogBox type="loading" />;
	}

	if (error !== "") {
		return <DialogBox message={error} goTo="-1" />;
	}

	return (
		<div>
			{/* {isLoading && <DialogBox type="loading" />}
			{error !== "" && <DialogBox message={error} />}*/}
			{message && <DialogBox message={message} />}
			<h1 className="text-3xl font-bold">Update Property</h1>
			<PropertyForm property={property} handler={handleUpdateProperty} />
		</div>
	);
};

export default UpdateProperty;

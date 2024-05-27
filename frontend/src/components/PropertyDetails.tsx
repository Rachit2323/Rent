import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPropertyById } from "../services/api";
import DialogBox from "./DialogBox";

interface RentalPropertyDetailsModel {
	_id: number;
	name: string;
	img: string;
	price: number;
	furnishing: string;
	bathrooms: number;
	bedrooms: number;

	description: string;
	address: string;
	seller: {
		name: string;
		phone: string;
	};
}

const PropertyDetails = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	const [property, setProperty] = useState<
		RentalPropertyDetailsModel | undefined
	>();

	const { propertyId } = useParams();

	useEffect(() => {
		setIsLoading(true);
		fetchPropertyById(propertyId)
			.then((res) => {
				setProperty(res.data);
				console.log(res.data);
			})
			.catch((err) => {
				setError(err.message);
				console.error(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [propertyId]);

	if (isLoading) {
		return <DialogBox type="loading" />;
	}

	if (error) {
		return <DialogBox type="error" message={error} goTo="-1" />;
	}

	return (
		<>
			{property && (
				<div className="m-4">
					<div className="text-3xl font-bold">{property.name}</div>
					<div className="flex flex-col md:flex-row md:gap-8">
						<div className="hover:opacity-75 my-4">
							<img
								src={property.img}
								alt={property.name}
								className="w-full bg-slate-400 md:w-96 h-52 object-cover rounded-lg"
							/>
						</div>

						<div className="mt-4">
							<div className="text-2xl font-bold">Details</div>
							<div>
								<div className="text-xl">
									Price: ₹{property.price.toLocaleString()}
								</div>
								<div>
									<span className="font-semibold">Bedrooms:</span>{" "}
									{property.bedrooms}
								</div>
								<div>
									<span className="font-semibold">Bathrooms:</span>{" "}
									{property.bathrooms}
								</div>
								<div>
									<span className="font-semibold">Address:</span>{" "}
									{property.address}
								</div>
								<div>
									<span className="font-semibold">Furnishing:</span>{" "}
									{property.furnishing}
								</div>
								<div>
									<span className="font-semibold">Description:</span>{" "}
									{property.description}
								</div>
							</div>
							<div className="mt-4">
								<div className="text-2xl font-bold">Owner Details</div>
								<div>
									<div>Name: {property?.seller?.name}</div>
									<div>Phone: {property?.seller?.phone}</div>
								</div>
								<div className="flex gap-2 mt-4">
									<button className="bg-gray-500 hover:bg-gray-600 text-white rounded-lg px-2 py-1 ">
										Contact Owner
									</button>
									<button className="border-2 border-black hover:bg-gray-200 rounded-lg px-2 py-1 ">
										Request Photos
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default PropertyDetails;

import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PropertyModel } from "../../types/common";
import { deleteProperty, fetchMyProperties } from "../../services/api";
import DialogBox from "../DialogBox";
import { Add } from "@mui/icons-material";

type RentalPropertyModelProps = {
	property: PropertyModel;
	deleteProperty: (id: number) => void;
};

const PropertyCard: FC<RentalPropertyModelProps> = ({
	property,
	deleteProperty,
}) => {
	const handleDelete = () => {
		deleteProperty(property._id);
	};

	return (
		<div className="flex flex-col md:flex-row hover:shadow-2xl hover:shadow-slate-600 gap-2 p-2 rounded-md bg-blue-gray-50/50 bg-slate-200 shadow-md">
			<Link
				to={`/propertyDetails/${property._id}`}
				className=" p-4"
			>
				<img
					src={property.img}
					alt={property.name}
					className="w-full md:w-72 h-52 object-cover rounded-lg bg-slate-400 shadow-md shadow-slate-400 "
				/>
			</Link>

			<div className=" flex flex-col w-full gap-2 md:gap-4 ">
				<h2 className="text-xl">{property.name}</h2>
				<div className="flex gap-2">
					{/* delete buuton */}
					<button
						className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
						onClick={handleDelete}
					>
						Delete
					</button>
					{/* Edit button */}
					<Link
						to={`/seller/property/update/${property._id}`}
						state={property}
						className="bg-gray-600 text-white px-2 py-1 rounded-md hover:bg-gray-700"
					>
						Edit
					</Link>
				</div>
				<div className="flex gap-4 ">
					<div className="bg-gray-300 px-2 rounded-md">
						<div className="font-thin text-gray-600">Furnishing</div>
						<div className="text-gray-700 capitalize">
							{property.furnishing}
						</div>
					</div>
					<div className="bg-gray-300 px-2 rounded-md">
						<div className="font-thin text-gray-600">Bedrooms</div>
						<div className="text-gray-700">{property.bedrooms}</div>
					</div>
					<div className="bg-gray-300 px-2 rounded-md">
						<div className="font-thin text-gray-600">Bathrooms</div>
						<div className="text-gray-700">{property.bathrooms}</div>
					</div>
				</div>
				<div className="font-bold text-2xl">
					₹{property.price.toLocaleString()}
				</div>
				<div className="font-light text-gray-600 line-clamp-2">
					{property.description}
				</div>
			</div>
		</div>
	);
};

const Properties = () => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<PropertyModel[]>([]);
	const [message, setMessage] = useState("");

	useEffect(() => {
		setLoading(true);
		fetchMyProperties()
			.then((res) => {
				setData(res.data);
				console.log(res.data);
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	// delete property
	const handlePropertyDeletion = (id: any) => {
		setLoading(true);
		deleteProperty(id)
			.then((res) => {
				console.log(res.data);
				setMessage("Property deleted successfully");
				setData(data.filter((property) => property._id !== id));
			})
			.catch((err) => {
				setMessage(err.response.data.message);
				console.error(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	if (loading) {
		return <DialogBox type="loading" />;
	}

	return (
		<div className="mx-4">
			<div className="text-3xl font-semibold my-4 text-center underline">
				Properties Posted By You
			</div>
			{/*  */}
			{message && <DialogBox message={message} />}
			<Link
				to={`/seller/property/add`}
				className="bg-gray-800 text-white px-3 py-1.5 rounded-md hover:bg-gray-900 flex justify-start gap-2 w-min"
			>
				<Add />
				Property
			</Link>
			<div className="grid gap-2 mt-4">
				{data.map((property) => {
					return (
						<PropertyCard
							key={property._id}
							property={property}
							deleteProperty={handlePropertyDeletion}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Properties;

import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Filters from "./Filters";
import { PropertyModel } from "../types/common";
import { fetchProperties } from "../services/api";

type RentalPropertyModelProps = {
	property: PropertyModel;
};

const PropertyCard: FC<RentalPropertyModelProps> = ({ property }) => {
	return (
		<Link to={`/propertyDetails/${property._id}`}>
			<div className="flex flex-col md:flex-row gap-2 p-1 m-2 bg-blue-gray-50/50 bg-slate-200 shadow-md rounded-md">
				<div className="hover:opacity-75 my-4 mx-1">
					<img
						src={property.img}
						alt={property.name}
						className="w-full bg-slate-400 md:w-72 h-52 object-cover rounded-lg"
					/>
				</div>
				<div className=" flex flex-col gap-4 group-hover:opacity-75">
					<h2>{property.name}</h2>
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
					<p className="font-light text-gray-600 line-clamp-2">
						{property.description}
					</p>
				</div>
			</div>
		</Link>
	);
};

const DisplayProperties = () => {
	const [queryData, setQueryData] = useState<{ [key: string]: string }>({});

	const filterHandler = (params: { [key: string]: string }) => {
		console.log(params);
		setQueryData(params);
	};

	const [properties, setProperties] = useState<PropertyModel[]>([]);

	useEffect(() => {
		fetchProperties(queryData)
			.then((response) => {
				setProperties(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [queryData]);

	return (
		<div className="">
			<Filters filterHandler={filterHandler} />
			{properties && properties.length !== 0 ? (
				<div className="grid gap-2">
					{properties.map((property) => {
						return <PropertyCard key={property._id} property={property} />;
					})}
				</div>
			) : (
				<div className="text-center text-2xl text-gray-500 mt-4">
					No Properties Available
				</div>
			)}
		</div>
	);
};

export default DisplayProperties;

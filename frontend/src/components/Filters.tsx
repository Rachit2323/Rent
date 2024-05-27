import { FC, useEffect, useState } from "react";

interface Filter {
	name: string;
	options: string[];
}

const filterTypes: Filter[] = [
	{
		name: "budget",
		options: ["0-5000", "5000-10000", "10000-15000", "15000-20000", "20000+"],
	},
	{
		name: "bhk",
		options: ["1", "2", "3", "4+"],
	},
	{
		name: "furnishing",
		options: ["Fully Furnished", "Semi Furnished", "Unfurnished"],
	},
	{
		name: "bathrooms",
		options: ["1", "2", "3", "4+"],
	},
];

type FilterProps = {
	filterHandler: (params: { [key: string]: string }) => void;
};

const Filters: FC<FilterProps> = ({ filterHandler }) => {
	const [selectedFilters, setSelectedFilters] = useState<{
		[key: string]: string;
	}>({});

	const handleFilterChange = (filterName: string, option: string) => {
		setSelectedFilters({
			...selectedFilters,
			[filterName]: option,
		});
	};

	const handleReset = () => {
		setSelectedFilters({
			budget: "",
			bhk: "",
			furnishing: "",
			bathrooms: "",
		});
	};

	useEffect(() => {
		filterHandler(selectedFilters);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedFilters]);

	return (
		<div className="z-50 flex gap-2 bg-white p-3 sticky top-0 overflow-x-auto">
			{filterTypes.map((filterType, index) => (
				<div
					key={index}
					className="px-2 py-1 rounded-xl bg-gray-700 hover:bg-gray-600 cursor-pointer  transition-colors"
				>
					<select
						name={filterType.name}
						className="uppercase bg-transparent cursor-pointer"
						value={selectedFilters[filterType.name]}
						onChange={(e) =>
							handleFilterChange(filterType.name, e.target.value)
						}
					>
						<option value="" className="capitalize">
							{filterType.name}
						</option>
						{filterType.options.map((option, index) => (
							<option key={index} value={option}>
								{option}
								{filterType.name === "BHK" ? " BHK" : ""}
								{filterType.name === "Bathrooms" ? " Bathrooms" : ""}
							</option>
						))}
					</select>
				</div>
			))}

			<div>
				<button
					onClick={handleReset}
					className="bg-white px-2 py-1 rounded-xl border-2 border-gray-700 hover:bg-gray-700 hover:text-white transition-colors"
				>
					Reset
				</button>
			</div>
		</div>
	);
};

export default Filters;

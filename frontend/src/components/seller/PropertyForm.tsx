import {
	Grid,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
} from "@mui/material";
import { FC, useState } from "react";
import { PropertyModel } from "../../types/common";

type PropertyModelProps = {
	property?: PropertyModel;
	handler: (property: PropertyModel) => void;
};

const PropertyForm: FC<PropertyModelProps> = ({ property, handler }) => {
	const [propertyData, setPropertyData] = useState<PropertyModel>(
		property || {
			_id: 0,
			name: "",
			img: "",
			price: 0,
			furnishing: "",
			bathrooms: 0,
			bedrooms: 0,
			description: "",
			address: "",
		}
	);

	const handleChange = (event: any) => {
		const { name, value } = event.target;
		setPropertyData({
			...propertyData,
			[name]: value,
		});
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handler(propertyData);
	};

	return (
		<div className="m-4">
			<form onSubmit={handleSubmit} onChange={handleChange} className="mt-4 w-full lg:w-1/2">
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							name="name"
							required
							fullWidth
							id="name"
							label="Property Name"
							defaultValue={propertyData.name}
							autoFocus
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							name="img"
							fullWidth
							id="img"
							label="Image Link"
							defaultValue={propertyData.img}
							autoFocus
						/>
					</Grid>
					<Grid item sm={6}>
						<TextField
							required
							fullWidth
							id="price"
							label="Price"
							name="price"
							type="number"
							defaultValue={propertyData.price}
						/>
					</Grid>

					<Grid item xs={6}>
						<FormControl fullWidth>
							<InputLabel required>Furnishing</InputLabel>
							<Select
								required
								label="Furnishing"
								name="furnishing"
								onChange={handleChange}
								defaultValue={propertyData.furnishing.toLowerCase()}
								value={propertyData.furnishing.toLowerCase()}
							>
								<MenuItem value="fully furnished">Fully Furnished</MenuItem>
								<MenuItem value="unfurnished">Unfurnished</MenuItem>
								<MenuItem value="semi furnished">Semi Furnished</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid item sm={6}>
						<TextField
							required
							fullWidth
							id="bedrooms"
							label="Bedrooms"
							name="bedrooms"
							type="number"
							defaultValue={propertyData.bedrooms}
						/>
					</Grid>
					<Grid item sm={6}>
						<TextField
							required
							fullWidth
							id="bathrooms"
							label="Bathrooms"
							name="bathrooms"
							type="number"
							defaultValue={propertyData.bathrooms}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							multiline
							rows={4}
							id="description"
							label="Description"
							name="description"
							defaultValue={propertyData.description}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							id="address"
							label="Address"
							name="address"
							defaultValue={propertyData.address}
						/>
					</Grid>
				</Grid>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
				>
					{property ? "Update" : "Add Property"}
				</Button>
			</form>
		</div>
	);
};

export default PropertyForm;

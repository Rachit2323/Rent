import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

interface DialogBoxProps {
	message?: string;
	type?: "error" | "success" | "loading";
	goTo?: string;
}

const DialogBox: FC<DialogBoxProps> = ({ message, type, goTo }) => {
	const [visible, setVisible] = useState(true);
	const navigate = useNavigate();

	const handleOk = () => {
		if (goTo) {
			if (goTo === "-1") {
				navigate(-1);
			} else {
				navigate(goTo);
			}
		} else {
			setVisible(false);
		}
	};

	return (
		<>
			{visible && (
				<div>
					<div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
						{type === "loading" ? (
							<div className="h-10 w-10 animate-spin border-4 rounded-full border-t-blue-500"></div>
						) : (
							<div className="bg-white p-4 rounded-lg w-96">
								<div className="flex flex-col justify-between items-center gap-4">
									<p className="text-gray-800 text-xl">{message}</p>
									<button
										onClick={handleOk}
										className="w-full text-gray-800 bg-gray-500 rounded-md"
									>
										OK
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default DialogBox;

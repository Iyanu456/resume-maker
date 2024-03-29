import InputLabel from "../InputLabel";
import { PersonalInfoProps } from "../../types/usertypes";

interface personalProps {
	data: PersonalInfoProps;
	handleChange: (
		userDetails: string,
		index: any,
		field: string,
		event: any
	) => any;
	index: any;
}
export default function PersonalDetailsForm(props: personalProps) {
	return (
		<form onSubmit={(e) => e.preventDefault()}>
			{/* Personal Info Form */}
			<div className="flex flex-col gap-1">
				<InputLabel
					label="Full Name"
					type="text"
					value={props.data.fullname}
					handleChange={(e: any) =>
						props.handleChange(
							"personalInfo",
							props.index,
							"fullname",
							e.target.value
						)
					}
					placeholder="Enter your first and last name"
				/>

				<InputLabel
					label="Job Title"
					type="text"
					value={props.data.jobTitle}
					handleChange={(e) =>
						props.handleChange(
							"personalInfo",
							props.index,
							"jobTitle",
							e.target.value
						)
					}
					placeholder="Enter Job Title"
				/>

				<InputLabel
					label="Email"
					type="text"
					value={props.data.email}
					handleChange={(e) =>
						props.handleChange(
							"personalInfo",
							props.index,
							"email",
							e.target.value
						)
					}
					placeholder="Email"
				/>

				<InputLabel
					label="Website"
					type="text"
					value={props.data.website}
					handleChange={(e) =>
						props.handleChange(
							"personalInfo",
							props.index,
							"website",
							e.target.value
						)
					}
					placeholder="Website"
				/>
				<InputLabel
					label="Phone"
					type="text"
					value={props.data.phone}
					handleChange={(e) =>
						props.handleChange(
							"personalInfo",
							props.index,
							"phone",
							e.target.value
						)
					}
					placeholder="Phone number"
				/>
			</div>
		</form>
	);
}

import InputLabel from "../InputLabel";

interface personalProps {
	data: { fullname: string; jobTitle: string };
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
					
				</div>
		
		</form>
	);
}

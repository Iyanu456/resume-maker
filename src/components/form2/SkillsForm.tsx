import InputLabel from "../InputLabel";

interface skillsProps {
	data: {
		skill: string;
	};
	handleChange: (
		userDetails: string,
		index: any,
		field: string,
		event: any
	) => any;
	index?: any;
}
export default function SkillForm(props: skillsProps) {
	return (
		<form onSubmit={(e) => e.preventDefault()}>
			{/* Personal Info Form */}
			
				<div className="flex flex-col gap-1">
					<InputLabel
						label="Skill"
						type="text"
						value={props.data.skill}
						handleChange={(e) =>
							props.handleChange(
								"skill",
								props.index,
								"skill",
								e.target.value
							)
						}
					/>
				</div>
		
		</form>
	);
}

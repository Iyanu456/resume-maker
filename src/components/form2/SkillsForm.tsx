import { useEffect } from "react";
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
	useEffect(() => {
        const allFieldsEmpty = Object.values(props.data).every(field => field === '');
        if (allFieldsEmpty) {
            props.handleChange('skill', props.index, 'visible', false);
        } else {
            props.handleChange('skill', props.index, 'visible', true);
        }
    }, [props.data]);
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

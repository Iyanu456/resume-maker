import { useEffect, useState } from "react";
import InputLabel from "../InputLabel";
import TextEditor from "../../templates/template_1/TextEditor";

interface skillsProps {
	data: {
		skill: string;
		skillInformation: string;
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
	const [editorValue, setEditorValue] = useState(props.data.skillInformation);
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

					<TextEditor
						label="Information / Sub-skill"
		
						value={editorValue} // Bind the Quill editor value to editorValue state
						editorContainerClassName="mt-2"
						editorClassName="md:max-w-[300px] no-toolbar"
						placeholder="Enter information / sub-skill"
						toolbar={[
							
						  ]}
						onChange={(value) => {
							setEditorValue(value); // Update the editorValue state
							props.handleChange(
								"skill",
								props.index,
								"skillInformation",
								value
							);
						}}
					/>
					
				</div>
		
		</form>
	);
}

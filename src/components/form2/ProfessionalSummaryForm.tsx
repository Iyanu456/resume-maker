import { useEffect, useState } from "react";
import TextEditor from "../../templates/template_1/TextEditor";

interface summaryProps {
	data: {
		summary: string;
        visible: boolean;
	};
	handleChange: (
		userDetails: string,
		index: any,
		field: string,
		event: any
	) => any;
	index?: any;
}


export default function ProfessionalSummaryForm(props: summaryProps) {
	const [editorValue, setEditorValue] = useState(props.data.summary);
	useEffect(() => {
        const allFieldsEmpty = Object.values(props.data).every(field => field === '');
        if (allFieldsEmpty) {
            props.handleChange('professionalSummary', props.index, 'visible', false);
        } else {
            props.handleChange('professionalSummary', props.index, 'visible', true);
        }
    }, [props.data]);
	return (
		<form onSubmit={(e) => e.preventDefault()}>
			{/* Personal Info Form */}
			
				<div className="flex flex-col gap-1">
					

					<TextEditor
						label="Summary"
		
						value={editorValue} // Bind the Quill editor value to editorValue state
						editorContainerClassName="mt-2"
						editorClassName="md:max-w-[300px] "
						placeholder="Enter summary here"
						toolbar={[
                        ["bold", "italic", "underline"],
                        [{ list: "bullet" }],
                        ["link"],
                      ]}
						onChange={(value) => {
							setEditorValue(value); // Update the editorValue state
							props.handleChange(
								"professionalSummary",
								props.index,
								"summary",
								value
							);
						}}
					/>
					
				</div>
		
		</form>
	);
}

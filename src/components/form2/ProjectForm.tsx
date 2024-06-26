import { useEffect, useState } from "react";
import InputLabel from "../InputLabel";
//import { Editor } from 'draft-js';
//import { EditorState, convertToRaw } from "draft-js";
//import draftToHtml from "draftjs-to-html";
//import { EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
//import EditorConvertToHTML from '../../TextEditor';
import TextEditor from "../../templates/template_1/TextEditor";
import LinkButton from "../LinkButton";

interface projectProps {
	data: {
		project: string;
		about: string;
		description: string;
		duration: string;
		link: string;
		visible: boolean;
	};
	handleChange: (
		userDetails: string,
		index: any,
		field: string,
		event?: any
	) => any;
	state: any;
	index: any;
}

export default function ProjectForm(props: projectProps) {
	const [editorValue, setEditorValue] = useState(props.data.description);
	//const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

	/*const onEditorStateChange = (editorState: EditorState) => {
        setEditorState(editorState);
        props.handleChange('project', props.index, 'description', draftToHtml(convertToRaw(editorState.getCurrentContent())));
      }*/

	useEffect(() => {
		const allFieldsEmpty = Object.values(props.data).every(
			(field) => field === ""
		);
		if (allFieldsEmpty) {
			props.handleChange("project", props.index, "visible", false);
		} else {
			props.handleChange("project", props.index, "visible", true);
		}
	}, [props.data]);

	return (
		<form onSubmit={(e) => e.preventDefault()}>
			<div className="flex flex-col gap-2 md:gap-1">
				<div className="grid grid-cols-[88%,10%] gap-1">
					<InputLabel
						type="text"
						value={props.data.project}
						handleChange={(e) =>
							props.handleChange(
								"project",
								props.index,
								"project",
								e.target.value
							)
						}
						label="Project Title"
						placeholder="Enter project title"
					/>
					
						<LinkButton 
						value={props.data.link}
						handleChange={(e) =>
							props.handleChange(
								"project",
								props.index,
								"link",
								e.target.value
							)
						}
						buttonStyle="flex mb-0 mt-auto mx-auto w-[38px] h-[38px]"
						inputStyle="left-[7.5em] right-8 mt-[-0.8em] z-50"
						/>
					
					
				</div>
				<div>
					<InputLabel
						type="text"
						value={props.data.about}
						handleChange={(e) =>
							props.handleChange(
								"project",
								props.index,
								"about",
								e.target.value
							)
						}
						label="Sub title"
						placeholder="Enter sub Title"
					/>
				</div>
				<div>
					<InputLabel
						type="text"
						value={props.data.duration}
						handleChange={(e) =>
							props.handleChange(
								"project",
								props.index,
								"duration",
								e.target.value
							)
						}
						label="Duration"
					/>
				</div>

				<div>
					<TextEditor
						label="Description"
						value={editorValue} // Bind the Quill editor value to editorValue state
						editorContainerClassName="mt-2"
						editorClassName="md:max-w-[300px]"
						placeholder="Enter description here"
						 toolbar={[
    ["bold"],
    [{ list: "bullet" }],
    ["link"],
  ]}
						onChange={(value) => {
							setEditorValue(value); // Update the editorValue state
							props.handleChange(
								"project",
								props.index,
								"description",
								value
							);
						}}
					/>
				</div>
			</div>
		</form>
	);
}

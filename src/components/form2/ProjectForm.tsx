import { useEffect } from "react";
import InputLabel from "../InputLabel";
//import { Editor } from 'draft-js';
//import { EditorState, convertToRaw } from "draft-js";
//import draftToHtml from "draftjs-to-html";
//import { EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
//import EditorConvertToHTML from '../../TextEditor';
import TextArea from "../../templates/template_1/TextArea";

interface projectProps {
	data: {
		project: string;
		about: string;
		description: string;
		duration: string;
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
			<div className="flex flex-col gap-2 md:gap-3">
				<div>
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
					<TextArea
						label="description"
						//value={props.data.description}
						onChange={(e) =>
							props.handleChange(
								"project",
								props.index,
								"description",
								e.target.value
							)
						}
					/>
				</div>
			</div>
		</form>
	);
}

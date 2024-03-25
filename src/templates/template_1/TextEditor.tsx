import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./textarea.css";

interface editorProps {
	label?: string;
	value?: any;
	editorContainerClassName?: string;
	editorClassName?: string;
  placeholder?: string;
	onChange?: (e: any) => void;
}
export default function TextEditor(props: editorProps) {
	const modules = {
		toolbar: [
			["bold", "italic", "underline"],
			[{ list: "bullet" }],
			["link"],
		],
	};

	return (
		<div className={props.editorContainerClassName}>
			<p className="form-label pb-2 text-xs">{props.label}</p>
			<ReactQuill
				theme="snow"
				placeholder={props.placeholder}
				value={props.value} // Bind the Quill editor value to editorValue state
				onChange={props.onChange}
				className={props.editorClassName}
				modules={modules}
			/>
		</div>
	);
}

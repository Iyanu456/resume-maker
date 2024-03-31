import ReactQuill, { Quill } from "react-quill";
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

// Define a custom clipboard module to handle plain text pasting
const PlainTextClipboard = Quill.import("modules/clipboard");

class PlainTextPaster extends PlainTextClipboard {
  onPaste(e: any) {
    // Cancel the default paste behavior
    e.preventDefault();

    // Get plain text from clipboard
    const text = (e.originalEvent || e).clipboardData.getData("text/plain");

    // Insert plain text into the editor
    this.quill.pasteHTML(text);
  }
}

Quill.register("modules/clipboard", PlainTextPaster);

export default function TextEditor(props: editorProps) {
  const modules = {
    toolbar: [["bold", "italic", "underline"], [{ list: "bullet" }], ["link"]],
    clipboard: {
      matchVisual: false, // Disable visual matching for plain text
    },
  };

  return (
    <div className={props.editorContainerClassName}>
      <p className="form-label pb-2 text-xs">{props.label}</p>
      <ReactQuill
        theme="snow"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        className={props.editorClassName}
        modules={modules}
      />
    </div>
  );
}

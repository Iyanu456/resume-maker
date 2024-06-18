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
  toolbar: Array<Array<string | object>>
}

// Define a custom clipboard module to handle plain text pasting
const PlainTextClipboard = Quill.import("modules/clipboard");

class PlainTextPaster extends PlainTextClipboard {
  onPaste(e: any) {
    // Cancel the default paste behavior
    e.preventDefault();

    // Get plain text from clipboard
    const text = (e.originalEvent || e).clipboardData.getData("text/plain");

    // Get current selection
    const selection = this.quill.getSelection();

    // Insert plain text at the current cursor position
    this.quill.insertText(selection.index, text, "user");
    
    // Move the cursor to the end of the inserted text
    this.quill.setSelection(selection.index + text.length);
  }
}

Quill.register("modules/clipboard", PlainTextPaster);

export default function TextEditor(props: editorProps) {
  const modules = {
    toolbar: props.toolbar,
    clipboard: {
      matchVisual: false, // Disable visual matching for plain text
    },
  };

  return (
    <div className={props.editorContainerClassName}>
      <p className="form-label pb-2 text-xs font-bold text-[0.78em]">{props.label}</p>
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

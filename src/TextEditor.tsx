import React, { useState, useEffect } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

const EditorConvertToHTML: React.FC = (props) => {
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const [componentWidth, setComponentWidth] = useState(0);

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    props.handleChange(props.userDetails, props.index, props.field, draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  

  useEffect(() => {
    const calculateWidth = () => {
      const width = window.innerWidth * (834 / 367.46);
      setComponentWidth(width);
    };

    // Call calculateWidth initially
    calculateWidth();

    // Add event listener for window resize
    window.addEventListener('resize', calculateWidth);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', calculateWidth);
    };
  }, []);

  return (
    <div className='max-w-[89vw] md:max-w-[340px] pt-1 flex flex-col gap-1' >
      <p className="form-label text-xs">Description</p>
      <Editor
      placeholder='Enter Description here'
        toolbarClassName={`w-[${componentWidth}px]`}
        editorState={props.editorState}
        wrapperClassName="w-[100%]"
        editorStyle={{maxWidth: `${componentWidth} px`, fontSize: '11pt', fontFamily: 'Inter'}}
        editorClassName="border-[1px] px-2"
        onEditorStateChange={props.onEditorStateChange}
        stripPastedStyles={true}
        //defaultEditorState={props.description}
        toolbar={{
          inline: { options: ['bold'] },
          list: { options:['unordered'] },
          textAlign: { options: [], },
          fontSize: { options: ['11'], className: 'hidden' },
          fontFamily: { options: [], className: 'hidden' },
          link: { inDropdown: true, className: 'hidden' },
          history: { inDropdown: true, className: 'hidden' },
          emoji: { emojis:[], className: 'hidden'},
          image: { className: 'hidden' },
          remove: { className: 'hidden' },
          embedded: { className: 'hidden' },
          colorPicker: { options:[null], className: 'hidden' },
          
          }}
      />
      {/*<textarea
        disabled
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
  />|*/}
    </div>
  );
};

export default EditorConvertToHTML;

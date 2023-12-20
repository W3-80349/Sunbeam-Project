import { InputLabel, TextField } from '@mui/material'
import React, { useState, useRef, useMemo } from 'react';
import "./TextEditor.css"
import JoditEditor from 'jodit-react';

const TextEditor = () => {

  const editor = useRef(null);
	const [content, setContent] = useState('');
  return (
    <div className="texteditor-container">
      <div className="texteditor-wrapper">
        <div className="blogtitle-box">
          <InputLabel style={{fontSize:"25px"}}>Title</InputLabel>
          <TextField
            type='text'
            variant="outlined"
            required
            name='title' 
            className='title-textfield'
            placeholder='What is Your Idea About?'
            autoFocus={true}
          />
          <JoditEditor
			      ref={editor}
			      value={content}
			      onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			      onChange={newContent => {}}
		  />
        </div>
      </div>
    </div>
  )
}

export default TextEditor
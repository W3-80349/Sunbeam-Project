import React from 'react'
import TextEditor from '../components/TextEditor'
import "./CreatePost.css"

const CreatePost = () => {
  return (
    <div className='createpost-container'>
        <div className="createpost-wrapper">
            <TextEditor/>
        </div>
    </div>
  )
}

export default CreatePost
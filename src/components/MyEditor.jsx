import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';

function MyEditor({ initialValue = '', onChange }) {
  const [content, setContent] = useState(initialValue);

  useEffect(() => {
    onChange(content);
  }, [content, onChange]);

  return (
    <Editor
      apiKey=""
      value={content}
      init={{
        height: 300,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | ' +
          'alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist outdent indent | removeformat | help'
      }}
      onEditorChange={(newContent) => setContent(newContent)}
    />
  );
}

export default MyEditor;

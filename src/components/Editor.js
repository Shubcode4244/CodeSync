// import React, { useEffect } from 'react'
// import Codemirror from 'codemirror'
// import 'codemirror/lib/codemirror.css'
// // import 'codemirror/theme/dracula.css'
// // import 'codemirror/mode/javascript/javascript'
// // import 'codemirror/addon/edit/closetag'
// // import 'codemirror/addon/edit/closebrackets'

// // const Editor = () => {
// //   useEffect(()=>{
// //     async function init(){
// //       Codemirror.fromTextArea(document.getElementById('realtimeEditor'),{
// //         mode:{name:'javascript',json:true},
// //         theme:'dracula',
// //         autoCloseTags:true,
// //         autoCloseTags:true,
// //         lineNumbers:true,
// //       })
// //     }
// //     init();
// //   },[])
// //   return <textarea id='realtimeEditor'></textarea>
// // }

// // export default Editor


// import React, { useEffect, useRef } from 'react';
// import { EditorState } from '@codemirror/state';
// import { EditorView, basicSetup } from '@codemirror/view';
// // import { EditorView, basicSetup } from '@codemirror/dist/';
// import { javascript } from '@codemirror/lang-javascript';
// import { oneDark } from '@codemirror/theme-one-dark';

// const Editor = () => {
//   const editorRef = useRef(null);

//   useEffect(() => {
//     if (!editorRef.current) return;

//     const editor = new EditorView({
//       state: EditorState.create({
//         extensions: [
//           basicSetup,
//           javascript(),
//           oneDark,
//           EditorView.lineWrapping,
//         ],
//       }),
//       parent: editorRef.current,
//     });

//     return () => {
//       editor.destroy();
//     };
//   }, []);

//   return <div ref={editorRef} style={{ height: '100vh', border: '1px solid black' }} />;
// };

// export default Editor;


// import React, { useEffect, useRef } from 'react';
// import { EditorState } from '@codemirror/state';
// import { EditorView } from '@codemirror/view';
// import { javascript } from '@codemirror/lang-javascript';
// import { oneDark } from '@codemirror/theme-one-dark';
// import { basicSetup } from '@codemirror/basic-setup';

// const Editor = () => {
//   const editorRef = useRef(null);

//   useEffect(() => {
//     if (!editorRef.current) return;

//     const editor = new EditorView({
//       state: EditorState.create({
//         extensions: [
//           basicSetup,
//           javascript(),
//           oneDark,
//           EditorView.lineWrapping,
//         ],
//       }),
//       parent: editorRef.current,
//     });

//     return () => {
//       editor.destroy();
//     };
//   }, []);

//   return <div ref={editorRef} style={{ height: '100vh', border: '1px solid black' }} />;
// };

// export default Editor;


import React, { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, basicSetup } from '@codemirror/basic-setup';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

const Editor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      new EditorView({
        state: EditorState.create({
          doc: '',
          extensions: [basicSetup, javascript(), oneDark],
        }),
        parent: editorRef.current,
      });
    }
  }, []);

  return <div ref={editorRef}></div>;
};

export default Editor;


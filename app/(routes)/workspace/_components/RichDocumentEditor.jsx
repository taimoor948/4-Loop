import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Delimiter from '@editorjs/delimiter';
import Alert from 'editorjs-alert';
import List from '@editorjs/list';
import NestedList from '@editorjs/nested-list';
import Checklist from '@editorjs/checklist';
import Embed from '@editorjs/embed';
import SimpleImage from 'simple-image-editorjs';
import Table from '@editorjs/table';
import CodeTool from '@editorjs/code';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useUser } from '@clerk/nextjs';
import Paragraph from '@editorjs/paragraph';

function RichDocumentEditor({ params }) {
  const ref = useRef(null);
  const { user } = useUser();
  const [documentOutput, setDocumentOutput] = useState([]);
  let isFetched = false;

  useEffect(() => {
    if (user) {
      InitEditor();
    }
  }, [user]);

  const SaveDocument = () => {
    if (ref.current) {
      console.log('UPDATE');
      ref.current.save().then(async (outputData) => {
        const docRef = doc(db, 'documentOutput', params?.documentid);
        await updateDoc(docRef, {
          output: JSON.stringify(outputData),
          editedBy: user?.primaryEmailAddress?.emailAddress,
        });
      }).catch(error => {
        console.error('Error saving document:', error);
      });
    } else {
      console.error('Editor instance is not initialized.');
    }
  };

  const GetDocumentOutput = () => {
    const unsubscribe = onSnapshot(doc(db, 'documentOutput', params?.documentid), (doc) => {
      if (doc.data()?.editedBy !== user?.primaryEmailAddress?.emailAddress || !isFetched) {
        doc.data().editedBy && ref.current.render(JSON.parse(doc.data()?.output));
      }
      isFetched = true;
    });
  };

  const InitEditor = () => {
    if (!ref.current) {
      ref.current = new EditorJS({
        onChange: (api, event) => {
          SaveDocument();
        },
        onReady: () => {
          GetDocumentOutput();
        },
        holder: 'editorjs',
        tools: {
          header: Header,
          delimiter: Delimiter,
          paragraph: Paragraph,
          alert: {
            class: Alert,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+A',
            config: {
              alertTypes: [
                'primary',
                'secondary',
                'info',
                'success',
                'warning',
                'danger',
                'light',
                'dark',
              ],
              defaultType: 'primary',
              messagePlaceholder: 'Enter something',
            },
          },
          table: Table,
          list: {
            class: List,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+L',
            config: {
              defaultStyle: 'unordered',
            },
          },
          checklist: {
            class: Checklist,
            shortcut: 'CMD+SHIFT+C',
            inlineToolbar: true,
          },
          image: SimpleImage,
          code: {
            class: CodeTool,
            shortcut: 'CMD+SHIFT+P',
          },
        },
      });
    }
  };

  return (
    <div>
      <div id='editorjs' className='w-[70%]'></div>
    </div>
  );
}

export default RichDocumentEditor;

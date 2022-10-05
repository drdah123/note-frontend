import React, { useEffect, useState } from 'react';
import '../App.css';
import Preview from '../components/Preview';
import Alert from '../components/Preview/Alert';
import Massage from '../components/Preview/Massage';
import Note from '../components/Preview/Notes/Note';
import NotesContainer from '../components/Preview/Notes/NoteContainer';
import NoteForm from '../components/Preview/Notes/NoteForm';
import NotesList from '../components/Preview/Notes/NotesList';
import axios from 'axios';
import { FcFullTrash } from 'react-icons/fc';
import { RiEdit2Line } from 'react-icons/ri';
import { GoSignOut } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [choicedNote, setChoicedNote] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [vrify, setVrify] = useState([]);
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem('userInfo')) || []
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.length === 0) return navigate('/login');
    const tryy = async () => {
      // const { data } = await axios.get('https://backend-2dcw.onrender.com/api/notes', {
      //   headers: {
      //     authorization: `Bearer ${userInfo.accessToken}`,
      //   },
      // });
      setNotes(JSON.parse(localStorage.getItem('notes')) || []);
      if (notes.length > 0) {
        console.log(notes);
        console.log(data);
      }
    };
    tryy();
    setUserInfo(JSON.parse(localStorage.getItem('userInfo')) || []);
  }, []);

  useEffect(() => {
    if (validationErrors.length !== 0) {
      setTimeout(() => {
        setValidationErrors([]);
      }, 3000);
    }
  }, [validationErrors]);

  useEffect(() => {
    if (vrify.length !== 0) {
      setTimeout(() => {
        setVrify([]);
      }, 3000);
    }
  }, [vrify]);

  /*const saveToLocalStorage = (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    };*/
  // الخروج من التطبيف
  const signoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  // التحقق من ادخال بيانات في حقلي العنوان و المحتوى
  const validate = () => {
    const validationErrors = [];
    let passed = true;
    if (!title) {
      validationErrors.push('الرجاء كتابة عنوان');
      passed = false;
    }
    if (!content) {
      validationErrors.push('الرجاء كتابة محتوى');
      passed = false;
    }
    setValidationErrors(validationErrors);
    return passed;
  };

  //تغيير عنوان الملاحظة
  const changeTitleHandler = (event) => {
    setTitle(event.target.value);
  };

  // تغيير عنوان محتوى الملاحظة
  const changeContentHandler = (event) => {
    setContent(event.target.value);
  };

  //حفظ الملاحظة
  const saveNoteHandler = async () => {
    if (!validate()) return;

    const note = {
      id: new Date(),
      title: title,
      content: content,
    };

    // const { data } = await axios.post(
    //   'https://backend-2dcw.onrender.com/api/notes',
    //   {
    //     title: note.title,
    //     content: note.content,
    //   },
    //   {
    //     headers: {
    //       authorization: `Bearer ${userInfo.accessToken}`,
    //     },
    //   }
    // );
    setNotes([...notes, note]);
    localStorage.setItem('notes',JSON.stringify(notes))
    console.log(notes)
    setAdding(false);
    setChoicedNote(note.id));
    setTitle('');
    setContent('');
  };

  // التحقق من اكمال التعديل/الاضافة للملاحظ
  const vrifyMassges = () => {
    const vrify = [];
    let go = true;
    if (editing || adding) {
      vrify.push('انت تعمل على ملاحظة');
      go = false;
    }
    setVrify(vrify);
    return go;
  };

  // اختيار ملاحظة
  const choiceNoteHandler = (noteId) => {
    if (!vrifyMassges()) return;
    setChoicedNote(noteId);
    setEditing(false);
    setAdding(false);
  };

  // الانتقال الى وضع تعديل الملاحظة
  const editNoteHandler = () => {
    const note = notes.find((note) => note.id === choicedNote);
    setEditing(true);
    setTitle(note.title);
    setContent(note.content);
  };
  // تعديل ملاحظة
  const updateNoteHandler = async () => {
    if (!validate()) return;
    // const { data } = await axios.put(
    //   `https://backend-2dcw.onrender.com/api/notes/${choicedNote}`,
    //   {
    //     title: title,
    //     content: content,
    //   },
    //   {
    //     headers: {
    //       authorization: `Bearer ${userInfo.accessToken}`,
    //     },
    //   }
    // );
    // const editNote = data.data;
    // console.log('##############');
    // console.log(editNote);
    // console.log('##############');
    // const updatedNotes = [...notes];
    // const noteIndex = notes.findIndex((note) => note.id === choicedNote);
    // updatedNotes[noteIndex] = {
    //   id: choicedNote,
    //   title: title,
    //   content: content,
    // };
    const noteIndex = notes.findIndex((note) => note.id === choicedNote);
    const upadtedNotes = [...notes];
    upadtedNotes[noteIndex] = {
      id: choicedNote,
      title: title,
      content: content,
    };
    setNotes(upadtedNotes);
    localStorage.setItem('notes', JSON.stringify(notes))
    setEditing(false);
    setTitle('');
    setContent('');
  };
  // الانتقال الى واجهة اضافة ملاحظة
  const addNoteHandler = () => {
    setAdding(true);
    setEditing(false);
    setTitle('');
    setContent('');
  };

  // حذف ملاحظة
  const deleteNoteHandler = async () => {
    // const updatedNotes = [...notes];
    // const noteIndex = notes.findIndex((note) => note.id === choicedNote);
    // notes.splice(noteIndex, 1);
    //saveToLocalStorage('notes', notes);
    try {
      // const { data } = await axios.delete(
      //   `https://backend-2dcw.onrender.com/api/notes/${choicedNote}`,
      //   {
      //     headers: {
      //       authorization: `Bearer ${userInfo.accessToken}`,
      //     },
      //   }
      // );
      const Notes = notes.filter((note) => note.id !== choicedNote);
      setNotes(Notes);
      console.log(notes);
      setChoicedNote(null);
    } catch (e) {
      console.log(e);
    }
  };

  const getAddNote = () => {
    return (
      <div>
        <NoteForm
          formTitle="اضافة ملاحظة"
          title={title}
          content={content}
          titleChanged={changeTitleHandler}
          contentChanged={changeContentHandler}
          sumbitText="حفظ"
          sumbitClicked={saveNoteHandler}
        />
      </div>
    );
  };

  const getPreview = () => {
    if (notes.length === 0) {
      return <Massage title="لا يوجد ملاحظات" />;
    }

    if (!choicedNote) {
      return <Massage title="الرجاء اختيار ملاحظة" />;
    }

    const note = notes.find((note) => {
      return note._id === choicedNote;
    });
    let noteDisplay = (
      <div>
        <h2>{note && note.title}</h2>
        <p>{note && note.content}</p>
      </div>
    );

    if (editing) {
      noteDisplay = (
        <NoteForm
          formTitle={`تعديل ملاحظة (${note.title})`}
          title={title}
          content={content}
          titleChanged={changeTitleHandler}
          contentChanged={changeContentHandler}
          sumbitText="تعديل"
          sumbitClicked={updateNoteHandler}
        />
      );
    }

    return (
      <div>
        {!editing && (
          <div className="note-operations">
            {/*<a href="#" onClick={editNoteHandler}>
                <i className="fa fa-pencil-alt" />
          </a>*/}
            <button onClick={deleteNoteHandler}>
              <FcFullTrash className="i" />
            </button>

            <button onClick={editNoteHandler}>
              {' '}
              <RiEdit2Line className="i" />{' '}
            </button>
            {/*<a href="#">
     
          </a>*/}
          </div>
        )}
        {noteDisplay}
      </div>
    );
  };

  return (
    <div className="body">
      <div className="root body">
        <div className="App">
          <NotesContainer>
            <NotesList>
              {notes.map((note) => (
                <Note
                  key={note._id}
                  title={note.title}
                  noteClicked={() => choiceNoteHandler(note._id)}
                  active={choicedNote === note._id}
                />
              ))}
            </NotesList>
            <button className="add-btn" onClick={addNoteHandler}>
              +
            </button>
          </NotesContainer>
          {userInfo !== 0 && (
            <div>
              <button
                className="signout-btn"
                type="button"
                onClick={signoutHandler}
              >
                <GoSignOut className="signout-icon" />
              </button>
            </div>
          )}

          <Preview>{adding ? getAddNote() : getPreview()}</Preview>
          {validationErrors.length !== 0 && (
            <Alert validationMassages={validationErrors} />
          )}
          {vrify.length !== 0 && <Alert validationMassages={vrify} />}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;

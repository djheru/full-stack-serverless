import React, { useEffect, useReducer } from "react";
import { API } from "aws-amplify";
import { List, Input, Button } from "antd";
import { v4 as uuid } from "uuid";
import "antd/dist/antd.css";
import { listNotes as listNotesQuery } from "./graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
  updateNote as updateNoteMutation,
} from "./graphql/mutations";

const CLIENT_ID = uuid();

const styles = {
  container: { padding: 20 },
  input: { marginBottom: 10 },
  item: { textAlign: "left" },
  p: { color: "#1890ff" },
};

const initialState = {
  notes: [],
  loading: true,
  error: false,
  form: { name: "", description: "" },
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_NOTES":
      return { ...state, notes: action.notes, loading: false };
    case "ADD_NOTE":
      return { ...state, notes: [action.note, ...state.notes], loading: false };
    case "RESET_FORM":
      return { ...state, form: initialState.form };
    case "SET_INPUT":
      return { ...state, form: { ...state.form, [action.name]: action.value } };
    case "ERROR":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function fetchNotes() {
    try {
      const notesData = await API.graphql({
        query: listNotesQuery,
      });
      dispatch({ type: "SET_NOTES", notes: notesData.data.listNotes.items });
    } catch (e) {
      console.log(e.message || e.stack);
      dispatch({ type: "ERROR" });
    }
  }

  async function createNote() {
    const { form } = state;
    if (!form.name || !form.description) {
      return alert("Please enter a name and description for the note");
    }
    const input = {
      ...form,
      clientId: CLIENT_ID,
      completed: false,
      id: uuid(),
    };
    dispatch({ type: "ADD_NOTE", note: input });
    dispatch({ type: "RESET_FORM" });
    try {
      const response = await API.graphql({
        query: createNoteMutation,
        variables: { input },
      });
      console.log(response);
      console.log("Successfully created note!");
    } catch (e) {
      console.log(e.message || e.stack || e);
    }
  }

  async function deleteNote({ id }) {
    const notes = state.notes.filter((note) => note.id !== id);
    dispatch({ type: "SET_NOTES", notes });
    try {
      const response = await API.graphql({
        query: deleteNoteMutation,
        variables: { input: { id } },
      });
      console.log(response);
      console.log(`Successfully deleted note ${id}!`);
    } catch (e) {
      console.log(e.message || e.stack);
    }
  }

  async function updateNote(note) {
    const index = state.notes.findIndex((n) => n.id === note.id);
    const notes = [...state.notes];
    const completed = !note.completed;
    notes[index].completed = completed;
    dispatch({ type: "SET_NOTES", notes });
    try {
      const { id } = note;
      const response = await API.graphql({
        query: updateNoteMutation,
        variables: { input: { id, completed } },
      });
      console.log(response);
      console.log(`Successfully updated note ${note.id}!`);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  function onChange(e) {
    dispatch({ type: "SET_INPUT", name: e.target.name, value: e.target.value });
  }

  function renderItem(item) {
    return (
      <List.Item
        actions={[
          <p style={styles.p} onClick={() => deleteNote(item)}>
            Delete
          </p>,
          <p style={styles.p} onClick={() => updateNote(item)}>
            Mark {item.completed ? "Incomplete" : "Complete"}
          </p>,
        ]}
        style={styles.item}
      >
        <List.Item.Meta title={item.name} description={item.description} />
      </List.Item>
    );
  }

  return (
    <div style={styles.container}>
      <Input
        onChange={onChange}
        value={state.form.name}
        placeholder="Note Name"
        name="name"
        style={styles.input}
      />
      <Input
        onChange={onChange}
        value={state.form.description}
        placeholder="Note Description"
        name="description"
        style={styles.input}
      />
      <Button onClick={createNote} type="primary">
        Create Note
      </Button>

      <List
        loading={state.loading}
        dataSource={state.notes}
        renderItem={renderItem}
      />
    </div>
  );
}

export default App;

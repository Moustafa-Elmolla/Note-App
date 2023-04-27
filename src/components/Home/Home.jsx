import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import jwtDecode from "jwt-decode";
import axios from "axios";
import CardDetails from "./../CardDetails/CardDetails";

const Home = () => {
  let userToken = localStorage.getItem("userToken");
  let decoded = jwtDecode(userToken);
  // console.log(decoded);
  const [userData, setUserData] = useState({
    token: userToken,
    userId: decoded._id,
  });
  const [addNote, setAddNote] = useState({
    title: "",
    desc: "",
    citizenID: decoded._id,
    token: userToken,
  });

  const [allNotes, setAllNotes] = useState([]);

  useEffect(() => {
    getAllNotes();
  }, []);

  async function getAllNotes() {
    let { data } = await axios.post(
      `https://sticky-note-fe.vercel.app/getUserNotes`,
      userData
    );
    // console.log(data.Notes);
    setAllNotes(data.Notes);
  }

  function addedNote(e) {
    setAddNote({...addNote, [e.target.name]:e.target.value})
    console.log(addNote);
  }
  
  async function addNoteForm(e) {
    e.preventDefault()
    let {data} = await axios.post(`https://sticky-note-fe.vercel.app/addNote`, addNote)
    console.log(data);
    getAllNotes();
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-end py-3">
        <button
          type="button"
          className="btn bg-white text-dark mb-4"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <i className="fa-solid fa-circle-plus"></i> Add New Note
        </button>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <form id="edit-form" onSubmit={addNoteForm}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input
                  onChange={addedNote}
                  id="title1"
                  placeholder="Type Title"
                  type="text"
                  className="form-control"
                  name="title"
                />
                <textarea
                  onChange={addedNote}
                  id="desc1"
                  className="form-control my-2"
                  placeholder="Type your note"
                  name="desc"
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button data-bs-dismiss="modal" type="submit" className="btn btn-info">
                  Add Note
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="row">
        <CardDetails allNotes={allNotes} getAllNotes={getAllNotes} />
      </div>
    </div>
  );
};

export default Home;

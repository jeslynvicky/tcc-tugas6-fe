import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils';

const NoteList = () => {
  const [notes, setNote] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const response = await axios.get(`${BASE_URL}/notesdata`);
    setNote(response.data);
  }

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/delete-notes/${id}`);
      getNotes();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ backgroundColor: '#fdeff4', minHeight: '100vh', paddingTop: '30px' }}>
      <div className="columns is-centered">
        <div className="column is-half">
          <h1 className="title has-text-centered" style={{ color: '#d63384' }}>
            Daftar Catatan
          </h1>
          <div className="has-text-right mb-3">
            <Link to="/add" className="button" style={{ backgroundColor: '#ff69b4', color: 'white' }}>
              ➕ Buat Catatan Baru
            </Link>
          </div>
          <table className='table is-fullwidth is-striped' style={{ borderRadius: '10px', overflow: 'hidden' }}>
            <thead style={{ backgroundColor: '#f8bbd0', color: 'white' }}>
              <tr>
                <th>No</th>
                <th>Judul</th>
                <th>Isi</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {notes.length === 0 ? (
                <tr>
                  <td colSpan="4" className="has-text-centered">Belum ada catatan 💭</td>
                </tr>
              ) : (
                notes.map((note, index) => (
                  <tr key={note.id}>
                    <td>{index + 1}</td>
                    <td>{note.judul}</td>
                    <td>{note.isi.length > 50 ? note.isi.substring(0, 50) + "..." : note.isi}</td>
                    <td>
                      <div className="buttons are-small">
                        <Link to={`/edit/${note.id}`} className="button is-light" style={{ backgroundColor: '#ffb6c1' }}>
                          ✏️
                        </Link>
                        <button onClick={() => deleteNote(note.id)} className="button is-light" style={{ backgroundColor: '#ffccd5' }}>
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default NoteList;

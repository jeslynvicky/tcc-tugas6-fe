import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../utils';

const EditNote = () => {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const inputWidth = "600px";

  useEffect(() => {
    getNotesById();
  }, []);

  const updateNote = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/edit-notes/${id}`, {
        judul,
        isi
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  const getNotesById = async () => {
    const response = await axios.get(`${BASE_URL}/notes/${id}`);
    setJudul(response.data.judul);
    setIsi(response.data.isi);
  }

  return (
    <div style={{ backgroundColor: '#fdeff4', minHeight: '100vh', paddingTop: '30px' }}>
      <div className='columns is-centered'>
        <div className='column is-half'>
          <h1 className="title has-text-centered" style={{ color: '#d63384' }}>
            ✏️ Edit Catatan
          </h1>
          <form onSubmit={updateNote} className="box" style={{ backgroundColor: '#fff0f5', border: '1px solid #f8bbd0', borderRadius: '10px' }}>
            <div className='field'>
              <label className="label" style={{ color: '#c2185b' }}>Judul</label>
              <div className='control'>
                <input
                  type="text"
                  className='input'
                  style={{ width: inputWidth, borderColor: '#f8bbd0' }}
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  placeholder='Masukkan judul catatan'
                />
              </div>
            </div>
            <div className='field'>
              <label className="label" style={{ color: '#c2185b' }}>Isi</label>
              <div className='control'>
                <textarea
                  className='textarea'
                  style={{ width: inputWidth, borderColor: '#f8bbd0' }}
                  value={isi}
                  onChange={(e) => setIsi(e.target.value)}
                  placeholder='Tulis isi catatanmu di sini...'
                />
              </div>
            </div>
            <div className='field has-text-right mt-4'>
              <button
                type='submit'
                className='button'
                style={{ backgroundColor: '#ff69b4', color: 'white' }}
              >
                💾 Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditNote;

import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils';

const AddNote = () => {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const navigate = useNavigate();
  const inputWidth = "600px";

  const saveNote = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/tambah-notes`, {
        judul,
        isi
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ backgroundColor: '#fdeff4', minHeight: '100vh', paddingTop: '30px' }}>
      <div className='columns is-centered'>
        <div className='column is-half'>
          <h1 className="title has-text-centered" style={{ color: '#d63384' }}>
            📝 Buat Catatan Baru
          </h1>
          <form onSubmit={saveNote} className="box" style={{ backgroundColor: '#fff0f5', border: '1px solid #f8bbd0', borderRadius: '10px' }}>
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
                💾 Simpan Catatan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddNote;

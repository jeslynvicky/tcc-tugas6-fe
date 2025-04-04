import React, {useState} from 'react';
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
        await axios.post(`${BASE_URL}/tambah-notes`,{
            judul,
            isi
        });
        navigate("/");
    } catch (error) {
        console.log(error);
    }
}

    return (
        <div className='columns mt-5 is-centered'>
            <div className='columnis is-half'>
                <h1 className="title has-text-centered has-text-info">
                    Buat Notes
                </h1>
                <form onSubmit={saveNote}>
                    <div className='field'>
                        <label className="label">Judul</label>
                        <div className='control'>
                            <input type="text" className='input' style={{ width: inputWidth }}  value={judul} onChange={(e) => setJudul(e.target.value)} placeholder='judul'/>
                        </div>
                    </div>
                    <div className='field'>
                        <label className="label">Isi</label>
                        <div className='control'>
                            <input type="text" className='input'  style={{ width: inputWidth }}  value={isi} onChange={(e) => setIsi(e.target.value)} placeholder='isi'/>
                        </div>
                    </div>
                    <div className='field'>
                        <button type='submit' className='button is-success'>Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNote

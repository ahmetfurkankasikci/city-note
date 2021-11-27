import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import './Style.css';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function Box() {
  const [iller, setIller] = useState([]);
  const [selectedOption, setSelectedOption] = useState({label:""});
  const [selectedOption2, setSelectedOption2] = useState({label:""});
  const [ilceler, setIlceler] = useState([])


  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedObj, setSelectedObj] = useState(null)
  const notes = JSON.parse(localStorage.getItem("notes"))
  function openModal() {
    
    const obj = notes.find((value) => value.ilce === selectedOption2.label)
    setSelectedObj(obj)


    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.

  }

  function closeModal() {
    setIsOpen(false);
  }


  useEffect(() => {
    axios.get('https://raw.githubusercontent.com/snrylmz/il-ilce-json/master/js/il-ilce.json').then(res => res.data.data)
      .then((myJson) => {
        const data = myJson.map((value, index) => { return { value: index + 1, label: value.il_adi } });

        setIller(data)
      })




  }, [])

  useEffect(() => {
    axios.get('https://raw.githubusercontent.com/snrylmz/il-ilce-json/master/js/il-ilce.json').then(res => res.data.data)
      .then((myJson) => {
        const data = myJson.filter(value => value.il_adi === selectedOption?.label)

        const data2 = data[0]?.ilceler.map((value, index) => { return { value: index + 1, label: value.ilce_adi,nufus:value.nufus } });
        console.log(data2)
        setIlceler(data2)
      })


  }, [selectedOption])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <Select options={iller} onChange={setSelectedOption} className="options" />
      <Select options={ilceler} onChange={setSelectedOption2} className="options" />


      <button onClick={openModal} style={{ marginTop: 10, marginBottom: 20 }} className="btn-secondary">Open Modal</button>

      <table>
        <tr>
          <th>İl</th>
          <th>İlçe</th>
          <th>Kira</th>
          <th>Nüfus</th>
          <th>Rating</th>
        </tr>
        {notes.map((value2) => <tr>
          <td>{value2.il}</td>
          <td>{value2.ilce}</td>
          <td>{value2.kira} ₺</td>
          <td>{value2.nufus}</td>
          <td>{value2.rating}</td>
        </tr>
        )}




      </table>


      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>{selectedOption?.label}-{selectedOption2?.label}</h2>
        <ul>


          <li><span style={{fontWeight:"700"}}>Kira: </span>{selectedObj?.kira}</li>
          <li><span style={{fontWeight:"700"}}>Rating: </span>{selectedObj?.rating}</li>
          <li><span style={{fontWeight:"700"}}>Nüfus: </span>{selectedObj?.nufus}</li>
          <li><span style={{fontWeight:"700"}}>Note: </span>{selectedObj?.note}</li>
        </ul>

        <button onClick={closeModal}>close</button>

      </Modal>

    </div>
  )
}

export default Box;


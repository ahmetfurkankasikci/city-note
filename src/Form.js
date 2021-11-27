import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import './Style.css';
import CurrencyInput from 'react-currency-input-field';



function Form() {
  const [iller, setIller] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const [kira, setKira] = useState(0)
  const [note, setNote] = useState("");
  const [ilceler, setIlceler] = useState([])


  const setStorage = () => {

    const obj = {
      il: selectedOption?.label,
      ilce: selectedOption2?.label,
      rating: selectedOption3?.label,
      nufus: selectedOption2?.nufus,
      kira,
      note,
    };

    let yedek = JSON.parse(localStorage.getItem("notes")) === undefined ? [] : JSON.parse(localStorage.getItem("notes"));

    if (yedek === null) {

      localStorage.setItem("notes", JSON.stringify([obj]))

    } else {

      yedek = yedek.filter((value) => {if(value.ilce === obj.ilce && value.il === obj.il){return false;}return true;})
    
      localStorage.setItem("notes", JSON.stringify([...yedek, obj].sort((a, b) => b.rating - a.rating)))
    }



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

        const data2 = data[0]?.ilceler.map((value, index) => { return { value: index + 1, label: value.ilce_adi, nufus: value.nufus } });

        setIlceler(data2)
      })


  }, [selectedOption])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>


      <span>İl:</span>
      <Select options={iller} onChange={setSelectedOption} className="options" />


      <span>İlçe:</span>
      <Select options={ilceler} onChange={setSelectedOption2} className="options" />



      <span>Rating:</span>
      <Select options={Array.apply(0, Array(10)).map((value, index) => { return { value: index + 1, label: index + 1 } })} onChange={setSelectedOption3} className="options" />



      <span>Not:</span>
      <textarea id="note" className="input" value={note} onChange={(event) => setNote(event.target.value)} />


      <span>Kira:</span>
      <CurrencyInput
        className="input"
        style={{ borderRadius: 5 }}
        id="input-example"
        name="input-name"
        suffix="₺"
        placeholder="Please enter a number"
        defaultValue={0}
        decimalsLimit={2}
        onValueChange={(value, name) => setKira(value)}
      />

      <button href="#" className="btn-primary" onClick={setStorage}>Bilgileri Kaydet</button>



    </div>
  )
}

export default Form;


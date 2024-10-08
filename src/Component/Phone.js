import React, { useState, useEffect } from 'react';
import "./Phone.css";
import Cards from './Cards';
import { useGlobalContext } from '../context/GlobalContext';
import { Link, useNavigate } from 'react-router-dom';

const Phone = () => {
  const navigate = useNavigate();
  const Move = useGlobalContext();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [arr, setArr] = useState([]);

  const handleClick = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    if(input.trim()==""){
      setArr([])
    }else{
      const filteredResults = Move.Basket.filter(item => item.name.toLowerCase().includes(input.toLowerCase()));
      setArr(filteredResults);
      
    }
 
  }, [input, Move.Basket]);

  return (
    <>
      <div className='container__phone'>
        <div className='Top__container__phone'>
          <div className='Phone'>
            <div className='name__icon'>Phone</div>
          </div>
          <div className='icon3'>
            <span className="material-symbols-outlined" onClick={() => navigate("/loginPage")}>add</span>
            <span className="material-symbols-outlined" onClick={handleClick}>search</span>
            <span className="material-symbols-outlined">more_vert</span>
          </div>
        </div>
        <div className='myProfile'>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>My Profile</Link>
        </div>
        <br /><br />
        <div className='returnCards'>
          {Move.Basket.map(item => (
            <Cards key={item.numero} name={item.name[0]} logored={item.name} numero={item.numero} />
          ))}
        </div>
        {isOpen && Move.Basket.length > 0  && (
          <div className='big__search'>
            <input
              type='text'
              placeholder='Search for your Friend'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            {arr.length>0 && 
            
            <div className='search__bitg__search'>
            {arr.map(item => (
              <Cards key={item.numero} name={item.name[0]} logored={item.name} numero={item.numero} />
            ))}
          </div>
          
            }
          </div>
        )}
      </div>
    </>
  );
}

export default Phone;

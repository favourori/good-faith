import React, { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import './UserCard.css'
import Button from '../utilities/Button/Button';
import axios from 'axios'

function UserCard(props) {
    function login(){
        const response = axios.post(
            `https://good-faith.herokuapp.com/api/login`, {
                username: 'justin',
                password: 12345
            }

          )
          .then(res => console.log(res))
          .catch(err => err.message)
        }
    const handleStatus = (e) => {
        login();
        const target = e.target
        setDonated({status: target.checked, message: "Tell us how much?"})
        console.log(target.checked)
    }
    const handleChange=(e)=> {
        setDonated({value: e.target.value});
      }

    function thanksRandomizer() {
        const thanks = ['Thank you so much!🙏', 'Amazing! 🕺🏿', 'That\'s rad! 👍🏿', 'Thank you! ❤️', 'You\'re a lifesaver! 🤗', 'The world is lucky to have you in it! 🏄‍♂️🏄‍♂️']
        const randomthanks = thanks[Math.floor(Math.random() * thanks.length)]
        return randomthanks
        
    }

    
    function postDonation(){
    const response = axios.put(
        `http://127.0.0.1:5000/api/people/${user.id}`,
        { "donationAmount": donated.value },
      )
      .then(res => console.log(res))
      .catch(err => response.error)
    }

      const [donated, setDonated] = useState({
        status: false,
        message: "",
        value:""
      })
    const [state, setState] = useState({ copied: false, message: 'Copy account number' })
    let user = props.user;
    function getAccountErrorEmailHref(user) {
        return ("mailto:thevunderkind@gmail.com?subject=Problem with account on angelsamong.us&body=Hello, I had a problem transferring to " + user.accountNumber + ", " + user.bankName);
    }

    return (
        <div className="userCard">
            <h2>{user.firstName} {user.lastName}</h2>
            <p>{user.location}</p>
            <hr />
            <p><i>"{user.context}"</i></p>
            <details>
                <summary><span style={{ fontSize: '17px' }}>Tap for account info</span></summary>
                <strong>{user.accountNumber}</strong> <br /> {user.bankName}
                <br />
                <div className="interact row align-items-center text-center">
                    <div className="col-m-50 col-100">
                        <CopyToClipboard text={user.accountNumber}
                            // eslint-disable-next-line no-sequences
                            onCopy={() => (setState({ copied: true, message: 'Copied!' }), setTimeout(() => { setState({ message: 'Copy account number' }) }, 500))}
                        >
                            <Button type="primary">{state.message}</Button>
                        </CopyToClipboard>
                    </div>
                    <div className="col-m-50 col-100">
                        <a
                            target="_blank" rel="noopener noreferrer"
                            href={getAccountErrorEmailHref(user)}
                            className="red-text"
                        >
                            Report problem with details
                        </a>
                    </div>
                    <div className="Donated">
                        <label>
                            I donated! 
                            <input type="checkbox" 
                            name="donated" 
                            value={donated.status} 
                            onChange={handleStatus}></input>
                            </label>
                            {donated.status? <p>{thanksRandomizer()}</p>: null}
                            <label>
                                <br />
                            {donated.status? <p>{donated.message}</p>:null}
                            <input 
                            type="text" 
                            value={donated.value} 
                            onChange={handleChange}>
                            </input>
                            <button onClick={postDonation}>Submit</button>
                            </label>
                    </div>
                </div>
            </details>
        </div>
    )
}

export default UserCard
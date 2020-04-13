import React, { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import './UserCard.css'
import Button from '../utilities/Button/Button';
import axios from 'axios'

function UserCard(props) {
    const handleStatus = (e) => {
        const target = e.target
        setChecked({status: target.checked, message: "Tell us how much?"})
        console.log(target.checked)
    }
    function handleChange(e) {
        let input = e.target.value
        if(parseInt(input)){
        let number = parseInt(e.target.value)
        setDonated({value: number});
    }
        else{
            setDonated({placeholder:'sorry, numbers only'})
        }
      }

    function thanksRandomizer() {
        const thanks = ['Thank you!🙏', 'Amazing! 🕺🏿', 'Radical! 👍🏿', 'Nice! ❤️', 'Excellent 🤗', 'Whoop! 🏄‍♂️🏄‍♂️', '👼🏽👼🏽👼🏽👼🏽', 'Omg thank you! 🌻']
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
        message: "",
        value: "",
        placeholder: ""
      })
      const [checked,setChecked] = useState({status:false})
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
                    <br/>
                    <div className="col-m-50 col-100">
                        <a
                            target="_blank" rel="noopener noreferrer"
                            href={getAccountErrorEmailHref(user)}
                            className="red-text"
                        >
                            
                            Report problem with details
                        </a>
                        <br/>
                    </div>
                    <div className="Donated">
                        {checked.status? <p className="random-thanks">{thanksRandomizer()}</p>: null}
                            I donated! 
                            <input type="checkbox" 
                            name="donated" 
                            value={checked.status} 
                            onChange={handleStatus}></input>
                                {/* <br /> */}
                            {checked.status? <p className="Howmuch"><br/>{donated.message}</p>:null}
                            <label>
                            {checked.status?
                            <input 
                            type="text"
                            placeholder="2000"
                            value={donated.value} 
                            onChange={handleChange} 
                            className="Input">
                            </input>:null}
                            {donated.value && donated.value===Number?null:null}
                            </label><br/>
                            {checked.status? <button onClick={postDonation} className="Button">Submit</button>: null}
                    </div>
                </div>
            </details>
        </div>
    )
}

export default UserCard
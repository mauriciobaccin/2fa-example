import { useState } from 'react'

function Login() {
  const [user, setUser] = useState('');
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('123456');
  const [token, setToken] = useState('');

  const [isError, setIsError] = useState(false);

  async function startLogin() {
    setIsError(false);

    const data = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const responseJson = await response.json();

      setUser(JSON.stringify(responseJson.user, null, 4));
      console.log('user: ', responseJson.user)

      if (response.status === 200) {
        setStep(2);
      } else {
        setIsError(true);
      }
    } catch(e) {
      console.error(e);
      setIsError(true);
    }

  }

  async function optContinue() {
    const data = {
      token
    };

    try {
      const response = await fetch('http://localhost:8000/otp/validate', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.status === 200) {
        setStep(3);
      } else {
        setStep(1);
        setIsError(true);
      }
    } catch(e) {
      console.error(e);
      setStep(1);
      setIsError(true);
    }
  }

  return (
    <div className='card'>
      <p>{user}</p>
      {step === 1 && (
        <>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="test@test.com" onChange={e => setEmail(e.target.value)}/>

          <label htmlFor="password">Senha</label>
          <input id="password" type="password" placeholder="123456" onChange={e=> setPassword(e.target.value)}/>

          <button onClick={startLogin}>LOGIN</button>
        </>
      )}

      {step === 2 && (
        <>
          <label htmlFor="otp">Autenticador</label>
          <input type="phone" id='otp' onChange={e => setToken(e.target.value)}/>

          <button onClick={optContinue}>Continue</button>
        </>
      )}

      {step === 3 && (
        <>  
          <h1> Sucesso !!</h1>

          <button onClick={() => setStep(1)}>Reset</button>
        </>
      )}

      {isError && (
        <h1 className='error'>Algo deu errado!</h1>
      )}
    </div>
  )
}

export default Login

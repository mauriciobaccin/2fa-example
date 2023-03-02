import { useEffect, useState } from 'react';
import { generateToken } from 'node-2fa';

const DEFAULT_TIME = 30;

function TwoFA() {
  const [secret, setSecret] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [token, setToken] = useState('');
  const [count, setCount] = useState(0);

  function copy() {
    navigator.clipboard.writeText(token);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [])

  useEffect(() => {  
    if (count < 0 && isConfigured) {
      const newToken = generateToken(secret);
      setToken(newToken.token);
      setCount(DEFAULT_TIME);
    }
  }, [count, isConfigured, secret])

  return (
    <div className='card'>
      <p>Vamos simular que você leu o QRCODE com a camera. Um Qr code é composto de um objeto JSON com atributos. Nesse caso vamos usar o "secret" gerado pela lib node-2fa</p>

      {!isConfigured && (
        <>
          <label htmlFor="config">Secret</label>
          <input type="text" onChange={e => setSecret(e.target.value)}/>
          <button onClick={() => setIsConfigured(true)}>Set</button>
        </>
      )}

      {isConfigured && (
        <>
          <label htmlFor="opt-code">Código</label>
          <div className='copy'>
            <input readOnly value={token} />
            <button className='copy' onClick={copy}>Copy</button>
          </div>
          <p className='reset-timer'>Reseta em: {count}</p>
        </>
      )}
    </div>
  )
}

export default TwoFA

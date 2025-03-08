import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  //useref
  const passwordRef = useRef(null)

  const  passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_+"

    for(let i = 0; i < length; i++){
      pass += str.charAt(Math.floor(Math.random() * str.length))
    }
    
    setPassword(pass)

  },[length, numAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
   
  },[password])

  useEffect(() => {
    passwordGenerator()
  },[length, numAllowed, charAllowed, passwordGenerator])


  return (
    <>
  <div className="w-full max-w-md mx-auto shadow-xl rounded-lg px-6 py-6 my-10 text-orange-400 bg-gray-900">
    <h1 className="text-white text-center text-2xl font-bold my-4">
      Password Generator
    </h1>
    
    <div className="flex shadow-md rounded-lg overflow-hidden mb-4 border border-gray-600 bg-gray-800">
      <input
        type="text"
        value={password}
        className="outline-none w-full py-3 px-4 bg-gray-700 text-white placeholder-gray-400 text-lg font-semibold rounded-l-lg"
        placeholder="Generated Password"
        readOnly
        ref = {passwordRef}
      />
      <button
      onClick={copyPasswordToClipboard}
        className="outline-none bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white px-5 py-2 text-lg font-semibold rounded-r-lg transition-all duration-200"
      >
        Copy
      </button>
    </div>

    <div className='flex flex-col text-sm gap-y-4'>
      <div className='flex items-center gap-x-2'>
        <input 
          type="range" 
          min={6}
          max={100}
          value={length}
          className='cursor-pointer w-72 accent-orange-400'
          onChange={(e) => setLength(e.target.value)}
        />
        <label className="text-white font-medium">Length: {length}</label>
      </div>

      <div className='flex items-center gap-x-2'>
        <input 
          type="checkbox" 
          defaultChecked={numAllowed}
          id='numberInput'
          onChange = {() => {
            setNumAllowed((prev) => !prev);
          }}
          className='w-4 h-4 accent-orange-400'
        />
        <label className="text-white font-medium">Include Numbers</label>
      </div>

      <div className='flex items-center gap-x-2'>
        <input 
          type="checkbox" 
          fefaultChecked={charAllowed}
          id='characterInput'
          onChange={() => {
            setCharAllowed((prev) => !prev);
          }}
          className='w-4 h-4 accent-orange-400'
        />
        <label className="text-white font-medium">Include Special Characters</label>
      </div>
    </div>
  </div>
</>


  )
}

export default App

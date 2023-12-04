import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // useRef Hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*()";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  const copyToClipBoard = useCallback(() => {
    // Use passwordRef.current instead of password
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(passwordRef.current.value);
  }, []);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  return (
    <>
      {isLightboxOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"
          onClick={() => setIsLightboxOpen(false)}
        ></div>
      )}
      <div
        className={`w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 text-center relative ${
          isLightboxOpen ? "z-10" : ""
        }`}
      >
        <h2>Password Generator</h2>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            className="outline-none py-2 px-4 bg-gray-200 text-orange-500 rounded-l-lg"
            style={{ width: "200px", borderRadius: "20px" }}
            type="text"
            value={password}
            ref={passwordRef} // Use ref here
            placeholder="Generated Password"
            readOnly
          />
          <button
            className="outline-none bg-blue-700 text-orange-500 px-4 py-2 rounded-r-lg"
            onClick={copyToClipBoard}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              className="cursor-pointer text-orange-500"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <span className="text-orange-500">Length: {length}</span>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label className="text-orange-500">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={characterAllowed}
              onChange={() => setCharacterAllowed((prev) => !prev)}
            />
            <label className="text-orange-500">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

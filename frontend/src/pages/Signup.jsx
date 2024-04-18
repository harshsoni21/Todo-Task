import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState("");

  const [error, setError] = useState("");

  const { dispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://mern-appl-wyiu.onrender.com/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password, userName })
    });

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
      setError(json.error);
    }

    if (response.ok) {
      console.log(json);
      dispatch({ type: "LOGIN", payload: json });

      localStorage.setItem("user", JSON.stringify(json));
    }
  }

  return (

    <>
      <div style={{ width: '100%', height: "100px", display: 'flex', justifyContent: "space-between", alignItems: "center", backgroundColor: '#595959' }}>
        <p style={{ fontFamily: 'cursive', fontSize: 'large' }}>Welcome </p>
        <div style={{ width: '100%', height: "100px", display: 'flex', justifyContent: "right", alignItems: "center" }}> <Link to="/Login" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '0.5rem', borderRadius: '10px', backgroundColor: 'red', color: 'white', cursor: 'pointer' }}>Login</button>
        </Link></div>
      </div>
      <form className="signup" onSubmit={handleSubmit}>

        <h3 style={{ fontFamily: 'cursive' }}>Sign Up</h3>

        <div>
          <label style={{ fontFamily: 'cursive' }}>Email address</label>

          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            style={{ fontFamily: 'cursive' }}
          />
        </div>

        <div>
          <label style={{ fontFamily: 'cursive' }}>Username</label>

          <input
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            style={{ fontFamily: 'cursive' }}
          />
        </div>

        <div>
          <label style={{ fontFamily: 'cursive' }}>Password</label>

          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            style={{ fontFamily: 'cursive' }}
          />
        </div>

        <button style={{ fontFamily: 'cursive' }}>Sign up</button>
        {error && <div>{error}</div>}
      </form>
    </>
  )
}

export default Signup
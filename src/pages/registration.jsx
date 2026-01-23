import { useState } from "react";

function Registration({onRegisterSuccessful}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage("All fields are required");
      return;
    }
    //Storing data locally here
    const userData = {
      name,
      email,
      password,
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    //for now just showing success
    setMessage("✅ Registration Successful");

    //clear form
    setName("");
    setEmail("");
    setPassword("");

  setTimeout(() => {
    onRegisterSuccessful();
  }, 2000);
};


  return (
    <div style={{ maxWidth: 300, margin: "auto", padding: 20 }}>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
       <br />
        <button type="submit">Register</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Registration;
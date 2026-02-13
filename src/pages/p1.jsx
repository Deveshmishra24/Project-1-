import { useState } from "react";

function Registration({ onRegisterSuccesful }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");   // fixed casing
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!name || !email || !password || !phone || !age || !gender || !address) {
      setMessage("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,     // fixed field name
          age,
          gender,
          address,
        }),
      });

      const data = await res.json();

      // ❌ previously reversed logic — now correct
      if (!res.ok) {
        setMessage(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      // success
      setMessage("Registration Successful!");

      // clear form
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setAge("");
      setGender("");
      setAddress("");
      setLoading(false);

      // safe call (won’t crash if prop missing)
      setTimeout(() => {
        onRegisterSuccesful?.();
      }, 2000);

    } catch (err) {
      console.error(err);
      setMessage("Server error");
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "300px", margin: "50px auto" }}>
      <h2>Register</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Registration;

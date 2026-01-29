function dashboard({onLogout}) {
    return (
        <div style={{ padding: "20px" }}>
            {/*<button onClick={() => onNavigate("landing")} style={{ marginBottom: "20px", padding: "10px 20px", fontSize: "16px" }}>← Back to Home</button>*/}
            <h1>Dashboard page</h1>
            <p>You are logged in.</p>

            <button onClick={onLogout} style={{margin:"20px",}}>Logout</button>
        </div>
    );
}

export default dashboard;
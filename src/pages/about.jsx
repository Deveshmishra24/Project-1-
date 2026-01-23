function about({onNavigate}) {
    return (
        <div style={{ padding: "20px" }}>
            <button onClick={() => onNavigate("landing")} style={{ marginBottom: "20px", padding: "10px 20px", fontSize: "16px" }}>← Back to Home</button>
            <h1>About page</h1>
        </div>
    );
}

export default about;
export default function Footer ({ controleForm }) {
    return (
<footer style={{
    display: "flex",
    gap: "2rem",
    backgroundColor: "#000",
    justifyContent: "center",
    color: "grey",
    position: "fixed",
    bottom: 0,
    width: "100%"
}}>
    {controleForm.length > 0 && <div>Quantidade de registros: <p style={{color: "white", display: "inline"}}>{controleForm.length}</p></div>}
    <div>Username:</div>
</footer>
)
}
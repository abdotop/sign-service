function App() {
  const [alertMessage, setAlertMessage] = React.useState("");
  return (
    <>
      <CryptoSign setAlertMessage={setAlertMessage} />
      <CustomAlert message={alertMessage} onClose={() => setAlertMessage("")} />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

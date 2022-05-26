function Deposit(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const [isLoggedIn, setIsLoggedIn]   = React.useState(false);
  const ctx= React.useContext(UserContext);
  
  return (
    <>
      <NavBar/>
    
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus}/> :
        <DepositMsg setShow={setShow} setStatus={setStatus}/>}
    />
    </>
  )
}

function DepositMsg(props){
  const [isLoggedIn, setIsLoggedIn]   = React.useState(false);
  const ctx= React.useContext(UserContext);
  
  return (<>
    <h5 className="message">Your deposit transaction was successful</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
          props.setShow(true);
          props.setStatus('');
      }}>
        Deposit again
    </button>
  </>);
} 

function DepositForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [isLoggedIn, setIsLoggedIn]   = React.useState(false);
  const ctx= React.useContext(UserContext);
  
  function handle(){
    fetch(`/account/update/${ctx.email}/${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            //props.setStatus(JSON.stringify(data.value));
            props.setShow(false);
            ctx.isLoggedIn=true;
        } catch(err) {
            props.setStatus('Deposit failed')
            console.log('err:', text);
        }
    });
  }

  return(<>
  
    
    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Deposit</button>

  </>);
}
function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const ctx= React.useContext(UserContext);
  return (
    <>
      <NavBar/>
    
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={
        show ? ( 
        <WithdrawForm setShow={setShow} setStatus={setStatus}/> 
        ):(
        <WithdrawMsg setShow={setShow} setStatus={setStatus}/>
        )
        }
    />
    </>
  )
}

function WithdrawMsg(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');
  const ctx= React.useContext(UserContext);
  return(<>
    <h5 className="message">Your withdrawal Transaction was successful</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
        
      }}>
        Withdraw again
    </button>
  </>);
}

function WithdrawForm(props) {
  const [email, setEmail] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const ctx= React.useContext(UserContext);
  function handle() {
    fetch(`/account/update/${ctx.email}/-${amount}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          //props.setStatus(data.value.balance);
          props.setShow(false);
         // console.log("JSON:", data);
         ctx.balance=data.value.balance;
         console.log('data.value.balance',data.value.balance)
        } catch (err) {
          props.setStatus("Deposit failed");
          console.log("err:", text);
        }
      });
  }


  return(<>

    
    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

  </>);
}

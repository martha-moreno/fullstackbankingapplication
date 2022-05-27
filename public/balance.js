function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState(''); 
  const ctx= React.useContext(UserContext);
  
  return (
    <> 
    <NavBar/>
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={
        show ? (
          <BalanceForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <BalanceMsg setShow={setShow} setStatus={setStatus} status={status} />
        )
      }
    />
    </>
  )

}

function BalanceMsg(props){
  const ctx= React.useContext(UserContext);
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState(''); 
  return(<>
    
    <h5 className="message">Your current balance is: ${ctx.balance}</h5>
    {/*<button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Check balance again
    </button>*/
    //console.log('balance',ctx.balance)
    }
  </>);
}

function BalanceForm(props) {
  const [email, setEmail] = React.useState("");
  const [balance, setBalance] = React.useState("");
  const ctx= React.useContext(UserContext);
  
  function handle() {
    fetch(`/account/findOne/${ctx.email}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          //props.setStatus(text);
          props.setShow(false);
          //setBalance(user.balance);
          ctx.balance=data.value.balance;
        } catch (err) {
          //props.setStatus(text);
          console.log("err:", text);
        }
      });
  }
  return (<>

    
    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Check Balance
    </button>

  </>);
}
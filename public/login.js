function Login(props){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState(null);
  
  
  return (
    <>
      <NavBar/>
    
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus} /> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
    </>
  ) 
}

function LoginMsg(props){
  
  const ctx= React.useContext(UserContext);
  
  return(<>
    <h5>WELCOME </h5>
    <h6>You are now logged in!</h6>
    {console.log('ctx.isLoggedIn from longin loginmsg', ctx.isLoggedIn)}
    {/*alert("You are now logged in")*/}

    {window.location.href = "#/"}
    
    
    {/*<button type="submit" 
      className="btn btn-light" 
      onClick={() => window.location.href = "#/"}>
        Go to HomePage
    </button>*/}
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  //const [show, setShow]         = React.useState(true);
 // const [status, setStatus]     = React.useState(null);
  const ctx= React.useContext(UserContext);
  function handle(){
    fetch(`/account/login/${email}/${password}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus('');
            props.setShow(false);
            //props.setIsLoggedIn(true);
            console.log('JSON:', data);
            ctx.isLoggedIn=true;
            ctx.name=data.name;
            ctx.email=data.email;
            ctx.password = data.password;
            ctx.balance=data.balance;
            
        } catch(err) {
            props.setStatus(text)
            console.log('err:', text);
        }
      } 
    );
  }


  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
   
  </>);
}
function CreateAccount(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [isLoggedIn, setIsLoggedIn]   = React.useState(false);
  const ctx= React.useContext(UserContext);
  console.log('isLoggedIn in createaccount-start', isLoggedIn)
  console.log('ctx.isloggedIn in createaccount-start', ctx.isLoggedIn)
  return (
    <>
    <NavBar/>
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? 
        <CreateForm setShow={setShow} setIsLoggedIn={setIsLoggedIn}/> : 
        <CreateMsg setShow={setShow}/>}
    />
    </>
  )
}

function CreateMsg(props){

  return(<>
    <h5>Your account was successfully created</h5>
    {alert("Your account was successfully created.<br>You are now logged in!")}
    {window.location.href = "#/"}
  </>);
}

function CreateForm(props){
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  //const [isloggedIn, setIsLoggedIn]   = React.useState(false);
  //const [show, setShow]         = React.useState(true);
  //const [status, setStatus]     = React.useState(null);
  const ctx= React.useContext(UserContext);
  

  function handle(){
    console.log(name,email,password);
    const url = `/account/create/${name}/${email}/${password}`;
    (async () => {
        var res  = await fetch(url);
        var data = await res.json();    
        console.log(data);   
        props.setShow(false);
    props.setIsLoggedIn(true);
    ctx.isLoggedIn=true;
            ctx.name=data.name;
            ctx.email=data.email;
            ctx.password = data.password;
            ctx.balance=data.balance;     
    })();
    
    console.log('you are logged in from create account setIsLoggedIn', isLoggedIn);
    console.log('ctx.isLoggedIn in create account', ctx.isLoggedIn);
  }    
  
  return (<>

    Name<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter name" 
      value={name} 
      onChange={e => setName(e.currentTarget.value)} /><br/>

    Email address<br/>
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

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Create Account</button>

  </>);
}
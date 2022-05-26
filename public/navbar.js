
function NavBar(){
  
  const ctx= React.useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn]   = React.useState(null);
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState(null);
  
  
  console.log(ctx);
  
  console.log('ctx.name',ctx.name);

  console.log('isloggedIn useState from navbar',isLoggedIn);
  console.log('isLoggedIn at navbar',isLoggedIn);
  const user = ctx.name;
  //console.log('ctx.users[0].name',ctx.users[0].name);
  //console.log('ctx.users[0].isLoggedIn', ctx.users[0].isLoggedIn);
  console.log('user from navbar',user);
  function logout() {
    ctx.name = '';
    ctx.email = '';
    ctx.password = '';
    ctx.balance = 0;
    ctx.isLoggedIn = false;
   console.log('ctx in logout',ctx);
   setIsLoggedIn(false);
    
    {alert("You are logged out")}
  }
  

  return(
    
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <a className="navbar-brand" href="#">BadBank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        
       
        {!ctx.isLoggedIn ? ( 
        
          <> 
         
         <li className="nav-item">
            <a className="nav-link" href="#/CreateAccount/">Create Account</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/login/">Login</a>
          </li>
          </>
          ):( 
           <> 
               
          <li className="nav-item">
            <a className="nav-link" href="#/deposit/">Deposit</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/withdraw/">Withdraw</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/balance/">Balance</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/alldata/">AllData</a>
          </li> 

          
          
           
            <li className="nav-item">
            
           <span className="navbar-text">Welcome<strong>{ctx.name}</strong></span>
          </li> 
          
          <button className="btn btn-outline-light logout" onClick={logout}>
              Log Out
            </button>
            </>
           
            ) }
          
        </ul>
        
        
      </div>
    </nav>

  
  
  );
}


function Home(){
  
  const [isLoggedIn, setIsLoggedIn]= React.useState(false);
  const ctx= React.useContext(UserContext);
  console.log('ctx.isLoggedIn from home', ctx.isLoggedIn);
  return (
    <> 
     
   <NavBar />
    
    <Card
      txtcolor="black"
      header="BadBank Landing Module"
      title="Welcome to the bank"
      text="You can move around using the navigation bar."
      body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
    />
    </>
  );  
}

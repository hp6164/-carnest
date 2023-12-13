export default function LaunchPage({setcreateaccountprocess, setloginprocess} ) {

  const handlecreateaccountprocess = async (event) => {
    event.preventDefault();
    setcreateaccountprocess(true);
    console.log("Create Account Button Pressed");
  };
  const handleloginprocess = async (event) => {
    event.preventDefault();
    setloginprocess(true);
    console.log("Login Button Pressed");
  };

    return (
      <>
      <div className = "bg-slate-900 min-h-screen">
        <div className="grid place-items-center bg-slate-900 px-100 py-10 sm:py-10 lg:px-8 lg:py-10">
          <div className="text-center">
          <img src="http://127.0.0.1:5000/uploads/carnest.png" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">Welcome to CarNest</h1>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handlecreateaccountprocess}
              >
                Create Account 
              </a>
              <a
                href="#"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleloginprocess}
              >
                Login
              </a>
            </div>
          </div>
        </div>
        </div>
      </>
    )
  }
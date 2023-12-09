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
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Welcome to CarNest</h1>
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
        </main>
      </>
    )
  }
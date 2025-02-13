import Yesno from "./assets/components/Yesno";

function App() {
  return (
    <div className='bg-amber-100 font-pixel text-4xl h-screen flex flex-col items-center justify-center relative'>
      {/* Main Text */}
      <div className='text-center pb-4'>
        Will yuo be the ts to my pmo?
      </div>

      {/* Yes/No Buttons */}
      <Yesno />
    


    </div>
  );
}

export default App;
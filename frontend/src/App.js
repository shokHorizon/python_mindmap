import { useState } from 'react';
import MainMenu from './components/MainMenu';
import MapMenu from './components/MapMenu';

function App() {
  const switchToMap = (id, name) =>{
    setApp({currentApp: <MapMenu canvasId={id} canvasName={name} switchToMain={switchToMain} />})
  }

  const switchToMain = () =>{
    setApp({currentApp: <MainMenu switchToMap={switchToMap} />})
  }

  const [app, setApp] = useState({
    currentApp: <MainMenu switchToMap={switchToMap} />
  })

  return (
    <div className="App">
      <header className='flex flex-row justify-center'>
        <h1 className=''>MindMap</h1>
      </header>
      {app.currentApp}
    </div>
  );
}

export default App;

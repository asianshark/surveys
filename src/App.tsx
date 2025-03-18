
import TextEditor from './pages/TextEditor';
import Tabs from './components/Tabs';
import { useState } from 'react';
import Icon from './components/Icon';
import {
  Route,
  Routes
} from "react-router-dom";
import Home from './pages/Home';
import Users from './pages/Users';

function App() {

  const [isOpenTab, setIsOpenTab] = useState(false)
  const closeOpenTab = () => {
    setIsOpenTab(!isOpenTab)
  }
  return (

    <div className='flex h-full'>
      <div className={'w-50 ' + (!isOpenTab && "hidden")}>
        <Tabs closeOpenTab={closeOpenTab} />
      </div>
      <div className='grow px-4'>
        <div className='h-12 flex items-center'>
          <button onClick={closeOpenTab}>
            <Icon icon={isOpenTab ? 'arrow-right-start-on-rectangle' : "arrow-right-end-on-rectangle"}></Icon>
          </button>
        </div>
        <Routes>
          <Route path="/surveys" element={<TextEditor />}/>
          <Route path="/something" element={<Users />}/>
          <Route path="/" element={<Home />}/>
        </Routes>

      </div>
    </div>

  )
}

export default App

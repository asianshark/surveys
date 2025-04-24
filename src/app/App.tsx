
import TextEditor from '../pages/textEditor/TextEditor';
import Tabs from '../widgets/tabs/Tabs';
import { useState } from 'react';
import {
  Route,
  Routes
} from "react-router-dom";
import Home from '../pages/home/Home';
import { I18nextProvider } from "react-i18next";
import i18next from "../i18n/i18n";
import TabBar from '../widgets/tabs/TabBar';
import Survey from '../pages/surveys/Survey';
import CreateSurveyMain from '../pages/surveys/CreateSurveyMain';
import SurveyTestPass from '../pages/pass-surveys/SurveyTestPass';
import SurveyResultsMain from '../pages/my-surveys/SurveyResultsMain';
import SurveysPassMain from '../pages/pass-surveys/SurveysPassMain';
import UserSurveyResult from '../pages/my-surveys/UserSurveyResult';

function App() {
  const [isOpenTab, setIsOpenTab] = useState(false)
  const closeOpenTab = () => {
    setIsOpenTab(!isOpenTab)
  }
  return (
    <I18nextProvider i18n={i18next}>

      <div className='flex h-full'>
        <div className={'' + (!isOpenTab && "hidden")}
          style={{
            boxShadow: isOpenTab ? '1px 0 5px rgba(0, 0, 0, 0.05)' : 'none',
            zIndex: 10,
            width:'208px',
            minWidth: '208px'
          }}>
          <Tabs closeOpenTab={closeOpenTab} />
        </div>
        <div className='grow flex flex-col w-full h-full'>
          <div>
            <TabBar closeOpenTab={closeOpenTab} isOpenTab={isOpenTab}></TabBar>
          </div>
          <div className='bg-[#F9F9FA] flex flex-col min-w-0 w-full min-h-0 h-full'>
            <Routes>
              <Route path="/data2" element={<TextEditor />} />
              <Route path='/surveys-tests/:id' element={<SurveyResultsMain />} >
                <Route path='result' element={<UserSurveyResult />} />
              </Route>
              <Route path='/surveys-tests' element={<Survey />} />
              <Route path='/create/:type' element={<CreateSurveyMain />} />
              <Route path="/" element={<Home />} />
              <Route path='/surveys/:id' element={<SurveyTestPass />} />
              <Route path='/surveys' element={<SurveysPassMain />} />
            </Routes>
          </div>
        </div>
      </div>
    </I18nextProvider>
  )
}

export default App

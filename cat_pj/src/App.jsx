import { Provider } from "react-redux"
import { 
  Routes,
  Route,
  BrowserRouter as Router,
} from "react-router-dom"

import Home from "./pages/adminpage/homepage/Home"
import Create from "./pages/adminpage/createpage/Create"
import News from "./pages/adminpage/newspage/News"
import Register from "./pages/adminpage/registerpage/Register"
import Reset from "./pages/adminpage/resetpage/Reset"
import store from "./redux/store.js"
import Login from "./pages/adminpage/loginpage/Login"
import PrivateRoute from "./PrivateRoute"
import Edit from "./pages/adminpage/editpage/Edit"


import FHomepage from "./pages/frontendpage/FHomepage"

import FDetailpage from "./pages/frontendpage/FDetailpage"
import FSTORY from "./pages/frontendpage/FSTORY"
import FNEWS from "./pages/frontendpage/FNEWS"
import FCUTE from "./pages/frontendpage/FCUTE"
import FRESCUE from "./pages/frontendpage/FRESCUE"

function App() {

  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<FHomepage />} />
            <Route path="/story" element={<FSTORY />} />
            <Route path="/news" element={<FNEWS />} />
            <Route path="/cute" element={<FCUTE />} />
            <Route path="/rescue" element={<FRESCUE />} />
            <Route path="/blog" element={<FDetailpage />} />
            <Route path="meowadmin/login" element={<Login />} />
            <Route element={<PrivateRoute />} >
              <Route path="meowadmin/home" element={<Home />} />
              <Route path="meowadmin/create_news" element={<Create />} />
              <Route path="meowadmin/edit_news" element={<Edit />} />
              <Route path="meowadmin/list_news" element={<News />} />
              <Route path="meowadmin/register" element={<Register />} />
              <Route path="meowadmin/reset" element={<Reset />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </>
  )
  
}

export default App

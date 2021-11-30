import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from './components/views/Home';
import Auth from './components/views/Auth';
import AuthContextProvider from './components/contexts/AuthContext';
import PostContextProvider from './components/contexts/PostContext';
import DashBoard from './components/views/DashBoard';
import NotFound from './components/views/NotFound';
import ProtedRoute from './components/Routing/ProtedRoute';
import AdminProtedRoute from './components/Routing/AdminProtedRoute';
import Infomation from './components/views/Infomation';
import Post from './components/views/Post';
import Trash from './components/views/Trash';
function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Auth authRoute='login'/>}/>
            <Route path="/register" element={<Auth authRoute='register'/>}/>
            <Route path="/dashboard" element={
                    <ProtedRoute>
                      <DashBoard/>
                    </ProtedRoute>
            }/>
             <Route path="/infomation" element={
                    <ProtedRoute>
                      <Infomation/>
                    </ProtedRoute>
            }/>
            <Route path="/posts/:_id" element={<Post/>}/>
            <Route path="/posts/trash" element={
              <AdminProtedRoute>
                <Trash/>
              </AdminProtedRoute>
            }/>
            <Route path="/error" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;

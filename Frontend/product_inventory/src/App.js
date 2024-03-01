
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import SignIn from './components/signInPage/signIn';
import SignUp from './components/signUpPage/signup';
import ForgotPassword from './components/forgotPassword/forgot';
import Homepage from './components/HomePage/Homepage';
import ResetPassword from './components/ResetPassword/reset';
import ProductForm from './components/registerProduct/newProduct';

function App() {
  return (
     <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<SignIn/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/forgot-password' element={<ForgotPassword/>}/>
            <Route path='/home' element={<Homepage/>}/>
            <Route path="/reset-password/:token" element={<ResetPassword/>}/>
            <Route path='/products' element={<ProductForm/>}/>
          </Routes>
        </BrowserRouter>
     </>
  );
}

export default App;

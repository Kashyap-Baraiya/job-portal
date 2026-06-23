import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage.jsx";
import RegisterPage from "./pages/registerPage/registerPage.jsx";
import HomePage from "./pages/homePage/HomePage.jsx";
import { Toaster } from "react-hot-toast"
import PageNotFound from "./components/shared/PageNotFound.jsx";
import JobPage from "./pages/JobPage/JobPage.jsx";
import ProfilePage from "./pages/profilePage/ProfilePage.jsx";
import JobDiscription from "./pages/jobDescriptionPage/JobDiscription.jsx";
import Companies from "./companyPage/Companies.jsx";
import NewCompany from "./companyPage/NewCompany.jsx";
import AdminJob from "./companyPage/AdminJob.jsx";
import UpdateCompany from "./companyPage/UpdateCompany.jsx";
import AdminJobDescription from "./companyPage/AdminJobDescription.jsx";

function App() {
  return (
    <>
    <Toaster/>
    <Routes>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<RegisterPage/>}/>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/description/:id" element={<JobDiscription/>}/>
      <Route path="/jobs" element={<JobPage/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>
      <Route path="/admin/dashboard" element={<Companies/>}/>
      <Route path="/admin/dashboard/new" element={<NewCompany/>}/>
      <Route path="/admin/job" element={<AdminJob/>}/>
      <Route path="/company/:id" element={<UpdateCompany/>}/>
      <Route path="/admin/job/description/:id" element={<AdminJobDescription/>}/>
      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
    </>
  );
  
}

export default App;

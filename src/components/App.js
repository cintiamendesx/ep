import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "../pages/Home";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import ProtectedRoute from "../pages/auth/ProtectedRoute";
import Navbar from "./Navbar";
import CreateNewBook from "../pages/CreateBook";
import BookDetails from "../pages/BookDetails";
import BookDelete from "../pages/BookDelete";
import EditBook from "../pages/BookEdit";


import { AuthContextComponent } from "../contexts/authContext";

function App() {
  return (
    <AuthContextComponent>
    <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute component={Home} />} />
        <Route path="/book/create" element={<ProtectedRoute component={CreateNewBook} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book/:id" element={<ProtectedRoute component={BookDetails} />} />
        <Route path="/bookdelete/:id" element={<ProtectedRoute component={BookDelete} />} />
        <Route path="/bookedit/:id" element={<ProtectedRoute component={EditBook} />} />

      </Routes>
    </AuthContextComponent>
  );
}

export default App;

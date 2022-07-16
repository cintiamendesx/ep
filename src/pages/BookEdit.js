import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import api from "../apis/api";


import FormControl from "../components/FormControl";

function EditBook(props) {
  const [userData, setUserData] = useState({
    title: "",
    author: "",
    synopsis: "",
    releaseYear: 0,
    genre: "",
    picture: new File([], ""),
    coverImage: "",
  });

  // Loading
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(props);

  useEffect(() => {
    async function user() {
        
      try {
        const response = await api.get(`/book/${id}`);
                  const pictures = await handleFileUpload(userData.picture);
        
        setUserData({ ...userData,
            pictures,
           ...response.data });
      
      } catch (e) {
        console.log(e);
      }
    }
    user();
  }, [ id ]);

  function handleChange(e) {
    if (e.target.files) {
      return setUserData({
        ...userData,
        [e.target.name]: e.target.files[0],
      });
    }
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

async function handleFileUpload(file) {
  try {
    const uploadData = new FormData();

    uploadData.append("picture", file);

    const response = await api.post("/upload", uploadData);

    console.log(response);

    return response.data.url;
  } catch (err) {
    console.error(err);
  }
}


  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
            const pictures = await handleFileUpload(userData.picture);

      const response = await api.patch(`/book/${id}`,
       userData,
       pictures
       );

      console.log(response);

      setLoading(false);

      navigate("/");
    } catch (err) {
      setLoading(false);
      console.error(err);
      if (err.response) {
        console.error(err.response);
      }
    }
  }


  return (
    <div>
      <h1 className="text-center mt-5 mb-4">Editar Livro</h1>

      <form onSubmit={handleSubmit}>
        <div className="container cadastro">
          <FormControl
            label="Titulo"
            id="title"
            required
            name="title"
            onChange={handleChange}
            value={userData.title}
            readOnly={loading}
          />

          <FormControl
            label="Autor"
            id="author"
            required
            name="author"
            onChange={handleChange}
            value={userData.author}
            readOnly={loading}
          />

          <FormControl
            type="text"
            label="Synopsis"
            id="synopsis"
            required
            name="synopsis"
            onChange={handleChange}
            value={userData.synopsis}
            readOnly={loading}
          />
          <FormControl
            type="number"
            label="Ano"
            id="releaseYear"
            required
            name="releaseYear"
            onChange={handleChange}
            value={userData.releaseYear}
            readOnly={loading}
          />
          <FormControl
            type="text"
            label="Gênero"
            id="genre"
            required
            name="genre"
            onChange={handleChange}
            value={userData.genre}
            readOnly={loading}
          />

        <div>
        <label htmlFor="pictures">Capa</label>
            <input
                className="form-control"
                label="Imagem"
                type="file"
                id="bookFormPicture" 
                name='picture' 
                onChange={handleChange} 
                readOnly={loading}
            />

        </div>

          <div className="container"></div>
          <div>
            <button disabled={loading} type="submit" className="btn btn-primary">
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : null}
              Atualizar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditBook;
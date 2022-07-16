import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../apis/api";
import FormControl from "../components/FormControl";

function CreateBook() {
  const [livro, setLivro] = useState({
    title: "",
    author: "",
    synopsis: "",
    releaseYear: "",
    genre: "",
    picture: new File([], ""),
    coverImage: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  function handleChange(e) {
    if (e.target.files) {
      return setLivro({ ...livro, [e.target.name]: e.target.files[0] });
    }

    setLivro({ ...livro, [e.target.name]: e.target.value });
  }

  //para upload de arquivo
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

      const coverImage = await handleFileUpload(livro.picture);

      const response = await api.post("/book", {
        ...livro,
        coverImage,
      });
      navigate("/");

      console.log(response);

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <div>
      <div>
        <div className="container cadastro">
          <form onSubmit={handleSubmit}>
            <h1 className="titulos">Novo Livro</h1>

            <div className=" mb-3 ">
              <FormControl
                label="Título"
                type="text"
                id="title"
                name="title"
                onChange={handleChange}
                value={livro.title}
                required
                readOnly={loading}
              />
            </div>

            <div className=" mb-3">
              <FormControl
                label="Author"
                type="text"
                id="author"
                name="author"
                onChange={handleChange}
                value={livro.author}
                required
                readOnly={loading}
              />
            </div>

            <div className=" mb-3">
              <FormControl
                label="Sinopse"
                type="text"
                id="synopsis"
                name="synopsis"
                onChange={handleChange}
                value={livro.synopsis}
                required
                readOnly={loading}
              />
            </div>

            <div className="mb-3">
              <FormControl
                label="Ano"
                id="releaseYear"
                name="releaseYear"
                onChange={handleChange}
                value={livro.releaseYear}
                required
                readOnly={loading}
              />
            </div>

            <div className=" mb-3">
              <FormControl
                label="Gênero"
                id="genre"
                name="genre"
                onChange={handleChange}
                value={livro.genre}
                required
                readOnly={loading}
              />
            </div>
            <div className="mb-3">
              <FormControl
                type="file"
                label="Imagem"
                id="productFormPicture"
                name="picture"
                onChange={handleChange}
                readOnly={loading}
              />
            </div>

            <div>
              <button
                disabled={loading}
                type="submit"
                className=" btn btn-primary mb-3"
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>{" "}
                    <span>Carregando...</span>{" "}
                  </>
                ) : (
                  "Cadastrar "
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default CreateBook;
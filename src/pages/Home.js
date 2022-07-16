import React, { useState , useEffect } from 'react'
import api from "../apis/api";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";
import ConfirmationModal from '../components/ConfirmationModal';
import { useNavigate } from "react-router-dom";



function Home () {
  
  const navigate = useNavigate();
  const [visibleBooks, setVisibleBooks ] = useState ([]);
  const [showModal, setShowModal] = useState(false);


useEffect(() => {
  async function fetchBooks() {
    try {
      const response = await api.get("/book");

      setVisibleBooks([...response.data]);
    } catch (err) {
      console.error(err);
    }
  }
  fetchBooks();
}, []);



  return (

    <div >
      <Row xs={1} md={4} className="g-4" >

    {visibleBooks.map((book) => {
      const { author, coverImage, title, synopsis, releaseYear, _id } = book;

      return (
        <Col>

<Card style={{ width: '14rem', marginTop: 20, marginLeft: 20,
    alignItems: 'center' }}>
<Card.Img src={coverImage} alt={author} variant="top"/>
<Card.Body>
  <Card.Title>{title}</Card.Title>
  <p>{releaseYear}</p>
  <Card.Text>
    {synopsis}
  </Card.Text>
  <Button variant="btn btn-outline-primary btn-sm"> <Link to={`/book/${_id}`}>
              Detalhe
              </Link>
            </Button>

            <Button variant="btn btn-outline-warning btn-sm"> <Link to={`/bookedit/${_id}`}>
              Editar
              </Link>
            </Button>

            <button className="btn btn-outline-danger btn-sm" onClick={() => setShowModal(true)}>
            Deletar
          </button>

            <ConfirmationModal
            title="Tem certeza que quer deletar?"
            variant="danger"
            confirmationText="Deletar"
            show={showModal}
            handleClose={() => setShowModal(false)}
            handleConfirmation={() => {
              navigate(`/bookdelete/${_id}`);
              setShowModal(false);
            }}
          >
            Esta ação é irreversível!
          </ConfirmationModal>

</Card.Body>
</Card>
</Col>
      );   
    })}
    </Row>
  </div>

);
}


export default Home;

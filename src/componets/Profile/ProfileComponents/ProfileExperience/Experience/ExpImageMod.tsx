import React, { useState, FormEvent, ChangeEvent } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdVisibility } from "react-icons/md";
import { useAppSelector } from "../../../../../app/hooks";

interface ExperienceImageProp {
  show: boolean;
  handleShow: () => void;
}

export const ExpImageMod = (props: ExperienceImageProp) => {
  const myProfile = useAppSelector((state) => state.profile.myProfile);
  const thisExperience = useAppSelector((state) => state.experiencePutModale.currentExperience);
  const [image, setImage] = useState(new FormData());

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${myProfile._id}/experiences/${thisExperience._id}/picture`,
        {
          method: "POST",
          body: image,
          headers: {
            Authorization: process.env.REACT_APP_BEARER || "nonandra",
          },
        }
      );
      if (response.ok) {
        console.log("experience image uploaded");
      } else {
        console.log("experience image upload failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadFile = (e: ChangeEvent<HTMLInputElement>) => {
    setImage((ex) => {
      ex.delete("experience");
      ex.append("experience", e.target.files![0]);
      return ex;
    });
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleShow} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Carica una foto della tua esperienza</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Modal.Body className="d-flex flex-column align-items-center justify-content-center">
            <h5>L'immagine attuale è:</h5>
            <img src={""} alt="experience img" />
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="file" placeholder="Enter email" onChange={handleLoadFile} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <Button variant="outline-secondary" type="button" className="d-flex align-items-center">
              <MdVisibility className="me-1" />
              <p>tutti gli utenti di LinkedIn</p>
            </Button>
            <Button variant="primary" className="rounded-pill" type="submit">
              Imposta immagine
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

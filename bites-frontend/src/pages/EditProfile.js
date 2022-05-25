import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useFormik } from "formik";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { getStorage, getStream, ref, uploadBytes } from "firebase/storage";
import { getFirestore, updateDoc } from "firebase/firestore";

import {
  getUsers,
  editBio,
  editUserImage,
  editFavDining,
} from "../components/firebaseConfig/utils.js";
import { app, auth } from "../components/firebaseConfig/firebase";
import Dropdown from "../components/Dropdown";

const options = [
  { value: "deNeve", label: "De Neve" },
  { value: "epi", label: "Epicuria" },
  { value: "bplate", label: "Bruin Plate" },
  { value: "feast", label: "Feast at Rieber" },
  { value: "rende", label: "Rendevous" },
  { value: "study", label: "The Study at Hedrick" },
  { value: "bcafe", label: "Bruin Cafe" },
  { value: "drey", label: "The Drey" },
];

export default function EditProfile() {
  /* get the user */
  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    if (!auth.currentUser) {
      return;
    }
    console.log("getting userdata");
    getUsers(auth.currentUser.uid).then((userDetails) => {
      setUserDetails(userDetails);
    });
  }, []);

  const [image, setImage] = useState();

  const editImage = () => {
    if (!image) {
      return;
    }
    console.log(image.name);

    const storage = getStorage();
    const imageRef = ref(storage, uid + "/" + image.name);
    uploadBytes(imageRef, image).then(() => {
      editUserImage(uid, image.name);
    });
  };

  const uid = userDetails.uid;
  const currBio = userDetails.bio ? userDetails.bio : "";
  const currImg = userDetails.img ? userDetails.img : "";
  const currFavDin1 = userDetails.favDining1 ? userDetails.favDining1 : "";
  const currFavDin2 = userDetails.favDining2 ? userDetails.favDining2 : "";

  const navigate = useNavigate();

  /* setup the form handling */
  const formik = useFormik({
    initialValues: {
      bio: currBio,
      img: currImg,
      dining1: currFavDin1,
      dining2: currFavDin2,
    },
    onSubmit: (values) => {
      editBio(uid, values.bio);
      editImage();
      editFavDining(uid, values.dining1, 1);
      editFavDining(uid, values.dining2, 2);
      navigate("/profile");
    },
  });

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <h1 className="fs-1">Edit your Bio!</h1>
        </Col>
      </Row>
      <Row className="bg-light">
        <Col className="col-12 p-5 fs-4">
          <Form onSubmit={formik.handleSubmit} className="">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="bio">Tell Us About Yourself!</Form.Label>
              <Form.Control
                name="bio"
                id="bio"
                type="text"
                onChange={formik.handleChange}
                className="input"
                value={formik.values.bio}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="img">Upload </Form.Label>
              <Form.Control
                name="img"
                id="img"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="input"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="favDining1">
                Favorite Dining Hall 1
              </Form.Label>
              <Dropdown
                options={options}
                value={formik.values.dining1}
                onChange={(value) =>
                  formik.setFieldValue("dining1", value.label)
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="favDining2">
                Favorite Dining Hall 2
              </Form.Label>
              <Dropdown
                options={options}
                value={formik.values.dining2}
                onChange={(value) =>
                  formik.setFieldValue("dining2", value.label)
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

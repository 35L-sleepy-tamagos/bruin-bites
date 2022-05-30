import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { getStorage, ref, uploadBytes } from "firebase/storage";

import { useFormik } from "formik";

import { auth } from "../components/firebaseConfig/firebase";
import { getUsers, editBio, editUserImage, editFavDining } from "../components/firebaseConfig/utils.js";

import Dropdown from "../components/Dropdown";

/* options for the dropdown */
const options = [
  { value: "deNeve", label: "De Neve" },
  { value: "epi", label: "Epicuria" },
  { value: "bplate", label: "Bruin Plate" },
  { value: "feast", label: "Feast at Rieber" },
  { value: "rende", label: "Rendezvous" },
  { value: "study", label: "The Study at Hedrick" },
  { value: "bcafe", label: "Bruin Cafe" },
  { value: "drey", label: "The Drey" },
];

function EditProfile() {

  const navigate = useNavigate();
  
  const [userDetails, setUserDetails] = useState([]);
  const [image, setImage] = useState();

  /* get the user */
  useEffect(() => {
    if (!auth.currentUser) {
      return;
    }
    console.log("getting userdata");
    getUsers(auth.currentUser.uid).then((userDetails) => {
      setUserDetails(userDetails);
    });
  }, []);

  /* allow the user to change their pfp */
  const editImage = async (image) => {
    if (!image) {
      return false;
    }

    const storage = getStorage();
    const imageRef = ref(storage, uid + "/" + image.name);
    await uploadBytes(imageRef, image);
    await editUserImage(uid, image.name);
    return true;
  };

  /* default values in the form */
  const uid = userDetails.uid;
  const currBio = userDetails.bio ? userDetails.bio : "";
  const currImg = userDetails.img ? userDetails.img : "";
  const currFavDin1 = userDetails.favDining1 ? userDetails.favDining1 : "";
  const currFavDin2 = userDetails.favDining2 ? userDetails.favDining2 : "";

  /* setup the form handling */
  const formik = useFormik({
    initialValues: {
      bio: currBio,
      img: currImg,
      dining1: currFavDin1,
      dining2: currFavDin2,
    },
    onSubmit: async (values) => {
      editBio(uid, values.bio);
      editFavDining(uid, values.dining1, 1);
      editFavDining(uid, values.dining2, 2);
      /* ensure the image has gone through first */
      const done = await editImage(image);
      if (done) {
        navigate("/profile");
      }
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
                Favorite Dining Hall 
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
                2nd Most Favorite Dining Hall 
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

export default EditProfile;

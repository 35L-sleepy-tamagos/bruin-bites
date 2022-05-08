import React from "react";
import StartFirebase from "../firebaseConfig/index.js";
import { ref, set, get, update, remove, child } from "firebase/database";

class Crud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      db: "",
      username: "",
      fullname: "",
      reviews: [],
    };
  }
}

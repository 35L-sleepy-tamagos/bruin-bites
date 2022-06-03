import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { createDining } from "./firebaseConfig/utils.js";

function VenueCard(props) {

  /* functions to navigate the difference pages */
  /* used as onClick events */
  const navigate = useNavigate();

  function handleClick(path) {
    navigate(path);
  }

  /* similar to handleClick, but for URLs */
  const openUrl = (url) => {
    const win = window.open(url, "_blank");
    if (win != null) {
      win.focus();
    }
  };

  /* utility */
  const recordDining = () => {
    if (!props.user) {
      alert("You must be logged in to use this feature!")
      return;
    }
    createDining(props.name, props.user)
    alert(`${props.name} added to your Dining History!`)
  }

  const path = (hall) => {
    let noSpaces = hall.split(" ").join("").toLowerCase();
    return "/" + noSpaces;
  }

  return (
    <Card style={{ height: "30rem" }}>
      <Card.Img
        style={{ height: "40%", width: "auto" }}
        variant="top"
        src={props.image}
      />
      <Card.Header className="fs-2 border-0" style={{ color: "black" }}>
        {props.name}
      </Card.Header>
      <Card.Body>
        <div className="d-grid gap-2">
          <Button size="lg" onClick={() => handleClick(path(props.name))}>
            Details
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => openUrl(props.link)}
          >
            External Menu
          </Button>
          <Button
            onClick={() => recordDining()}
            variant="secondary"
            size="lg"
          >
            I ate here!
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default VenueCard;
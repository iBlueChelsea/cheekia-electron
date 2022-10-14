import React from "react";
import { Badge, ListGroupItem } from "react-bootstrap";

const CardListItem = (props) => {
  return props.data ? (
    <ListGroupItem action variant="primary" id={props.id} onClick={props.click}>
      <Badge pill bg="primary">
        {props.data.faeria}
      </Badge>{" "}
      {props.data.name} <Badge bg="secondary">x{props.count}</Badge>
    </ListGroupItem>
  ) : (
    <ListGroupItem />
  );
};

export default CardListItem;

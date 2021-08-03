import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Col,
} from "reactstrap";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

//   import { getInventoryById } from "../../modules/inventoryManager";
// import { getCurrentUser } from "../../modules/userManager";
import { addInventory } from "../../modules/inventoryManager";

const InventoryForm = () => {
  const newInventory = {
    issue: "",
    isResolved: false,
  };
  const [inventory, setInventory] = useState(newInventory);

  const history = useHistory();
  const { invId } = useParams();

  const handleChange = (e) => {
    const inventoryCopy = { ...inventory };
    inventoryCopy[e.target.id] = e.target.value;
    setInventory(inventoryCopy);
  };

  const handleChecked = (e) => {
    console.log(`CheckToggled ${e.target.checked}`);
    // document.querySelector("#inCommission").checked = !inventory.inCommisiion;
    const inventoryCopy = { ...inventory };
    inventoryCopy.inCommission = e.target.checked;
    setInventory(inventoryCopy);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (
      inventory.manufacturer === "" ||
      inventory.model === "" ||
      inventory.serialNumber === ""
    ) {
      window.alert("Missing Required Information");
    } else {
      addInventory(inventory).then((res) => {
        history.push(`/inventory/${res}`); //would like to push to Id
      });
    }
  };

  return (
    <div className="container">
      <Card>
        <CardBody>
          <Form>
            <h5>New Inventory Item</h5>
            <FormGroup row>
              <Label for="manufacturer" sm={2}>
                Manufacturer:
              </Label>
              <Col sm={8}>
                <Input
                  id="manufacturer"
                  type="text"
                  value={inventory.manufacturer}
                  onChange={handleChange}
                  autoFocus
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="model" sm={2}>
                Model:
              </Label>
              <Col sm={8}>
                <Input
                  id="model"
                  type="text"
                  value={inventory.model}
                  onChange={handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="serialNumber" sm={2}>
                Serial Number:
              </Label>
              <Col sm={8}>
                <Input
                  id="serialNumber"
                  type="text"
                  value={inventory.serialNumber}
                  onChange={handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="firmWare" sm={2}>
                FirmWare
              </Label>
              <Col sm={8}>
                <Input
                  id="firmWare"
                  type="text"
                  value={inventory.firmWare}
                  onChange={handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="imageLoc" sm={2}>
                Image Location URL
              </Label>
              <Col sm={8}>
                <Input
                  id="imageLoc"
                  type="text"
                  value={inventory.imageLoc}
                  onChange={handleChange}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="inCommission" sm={2}>
                Issue Resolved
              </Label>
              <Col sm={8}>
                <Input
                  className="inCommission"
                  id="inCommission"
                  type="checkbox"
                  checked={inventory.inCommission}
                  //   value={!inventory.inCommission}
                  onChange={handleChecked}
                ></Input>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label sm={2}></Label>
              <Col sm={8}>
                <Button
                  className=""
                  color="success"
                  type="submit"
                  onClick={handleClick}
                >
                  Save Inventory
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default InventoryForm;

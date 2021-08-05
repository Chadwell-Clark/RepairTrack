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
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { addInventory } from "../../modules/inventoryManager";

const InventoryForm = () => {
  const newInventory = {
    issue: "",
    isResolved: false,
  };
  const [inventory, setInventory] = useState(newInventory);

  const history = useHistory();

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
            <FormGroup row>
              <Label sm={2}></Label>
              <Col sm={8} className="my-3">
                <h3>New Inventory Item</h3>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="manufacturer" sm={2}></Label>
              <Col sm={8} className="my-3">
                <Input
                  id="manufacturer"
                  type="text"
                  placeholder="Manufacturer"
                  value={inventory.manufacturer}
                  onChange={handleChange}
                  autoFocus
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="model" sm={2}></Label>
              <Col sm={8} className="my-3">
                <Input
                  id="model"
                  type="text"
                  placeholder="Model"
                  value={inventory.model}
                  onChange={handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="serialNumber" sm={2}></Label>
              <Col sm={8} className="my-3">
                <Input
                  id="serialNumber"
                  type="text"
                  placeholder="Serial Number"
                  value={inventory.serialNumber}
                  onChange={handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="firmWare" sm={2}></Label>
              <Col sm={8} className="my-3">
                <Input
                  id="firmWare"
                  type="text"
                  placeholder="Firmware"
                  value={inventory.firmWare}
                  onChange={handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="imageLoc" sm={2}></Label>
              <Col sm={8} className="my-3">
                <Input
                  id="imageLoc"
                  type="text"
                  placeholder="Image Location URL"
                  value={inventory.imageLoc}
                  onChange={handleChange}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="inCommission" sm={2}></Label>

              <Col sm={2} className="my-3">
                Inventory in Commission
                <Input
                  className="inCommission "
                  id="inCommission"
                  type="checkbox"
                  placeholder="Issue Resolved"
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

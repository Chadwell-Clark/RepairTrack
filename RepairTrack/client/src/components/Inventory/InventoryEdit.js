import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { getInventoryById } from "../../modules/inventoryManager";
import { editInventory } from "../../modules/inventoryManager";
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

const InventoryEdit = () => {
  const [inventory, setInventory] = useState({});
  const { invId } = useParams();
  const history = useHistory();

  const handleChange = (e) => {
    const inventoryCopy = { ...inventory };
    inventoryCopy[e.target.id] = e.target.value;
    setInventory(inventoryCopy);
  };

  const handleChecked = (e) => {
    console.log(`CheckToggled ${e.target.checked}`);
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
      window.alert("Missing RequiredEditation");
    } else {
      editInventory(inventory).then(() => {
        history.push(`/inventory/${invId}`); //would like to push to Id
      });
    }
  };

  useEffect(() => {
    if (invId !== 0) {
      getInventoryById(invId).then(setInventory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!inventory) {
    return null;
  }

  return (
    <div className="container">
      <Card className="my-4 p-3 border-0 shadow-sm">
        <div className="row align-items-start">
          <h3 className="col">
            Manufacturer: <strong>{inventory.manufacturer}</strong>
          </h3>{" "}
          <h3 className="col">
            Model: <strong>{inventory.model}</strong>
          </h3>
          <div className="col">
            <img
              className="img-fluid"
              src={
                  // eslint-disable-next-line no-native-reassign
                (require = `
              /images/${inventory.imageLoc}
                 `)
              }
              alt="Not Available"
            />
          </div>
          <div className="row">
            <h3 className="col">
              Serial Number: <strong>{inventory.serialNumber}</strong>
            </h3>
            {inventory?.firmWare ? (
              <h3 className="col">
                Firmware: <strong>{inventory.firmWare}</strong>
              </h3>
            ) : (
              ""
            )}
          </div>
        </div>
      </Card>
      <Card>
        <CardBody>
          <Form>
            <FormGroup row>
              <Label sm={2}></Label>
              <Col sm={8} className="my-3">
                <h5>{`Edit Inventory Item # ${invId} ${inventory.manufacturer} ${inventory.model} ${inventory.serialNumber}`}</h5>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="manufacturer" sm={2}></Label>
              <Col sm={8} className="my-3">
                <Input
                  id="manufacturer"
                  type="text"
                  placeholder="Manufacturer Required"
                  value={inventory.manufacturer}
                  onChange={handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="model" sm={2}></Label>
              <Col sm={8} className="my-3">
                <Input
                  id="model"
                  type="text"
                  placeholder="Model Required"
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
                  placeholder="Serial Number Required"
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
                  placeholder="Firmware not Required"
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
                  placeholder="Image Url not Required"
                  value={inventory.imageLoc}
                  onChange={handleChange}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="inCommission" sm={2}></Label>
              <Col sm={8} className="my-3">
                Inventory In Commission
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
              <Col sm={8} className="my-3">
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

export default InventoryEdit;

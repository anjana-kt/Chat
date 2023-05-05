import { useState } from "react";
import React from "react";
import { Form, Card } from "react-bootstrap";

function CompanyDetails() {
  
    const [formData, setFormData] = useState({
      companyName: "",
      companyEmail: "",
      companyContactNumber: "",
      companyWebsite: "",
      depositValue: 0,
    });
    const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div className="p-5 bmint">
      <div className="page container">
        {" "}
        <div>
          <Card.Header>
            <h5> Company details</h5>
          </Card.Header>
          <br />
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Full Name"
            name="companyName"
            value={companyName}
            onChange={handleChange}
          />
          <br />

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Company email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="companyEmail"
              value={companyEmail}
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              (We'll never share the email with anyone else)
            </Form.Text>
          </Form.Group>
          <Form.Label>Company contact number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Phone n.o"
            name="companyContactNumber"
            value={companyContactNumber}
            onChange={handleChange}
          />

          <br />
          <Form.Label>Company website</Form.Label>
          <Form.Control
            type="text"
            placeholder="Website"
            name="companyWebsite"
            value={companyWebsite}
            onChange={handleChange}
          />
          <br />

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Deposit value</Form.Label>
            <Form.Control
              as="number"
              name="depositValue"
              value={depositValue}
              onChange={handleChange}
            />
          </Form.Group>
          <br />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "centre" }}>
        <button className="btn mt-3" onClick={handleSubmit}>
          Submit
        </button>
       
      </div>
    </div>
  );
}

export default CompanyDetails;

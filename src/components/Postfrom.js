import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  styled,
} from "@mui/material";

export const Postfrom = () => {
  const [name, setName] = useState("");
  const [address, setaddress] = useState("");
  const [phone_no, setPhone_no] = useState("");
  const [photo, setPhoto] = useState("");

  console.log({ name, address, phone_no, photo });

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    const base64result = base64.split(",")[1];
    setPhoto(base64result);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleAddress = (e) => {
    setaddress(e.target.value);
  };

  const handlePhone_no = (e) => {
    setPhone_no(e.target.value);
  };

  const handleApi = () => {
    console.log({ name, address, phone_no, photo });
    axios
      .post("http://localhost:8080/api/v1/employees", {
        name: name,
        address: address,
        phone_no: phone_no,
        photo: photo,
      })
      .then((result) => {
        console.log(result.data);
        alert("success");
      })
      .catch((error) => {
        alert("service error");
        console.log(error);
      });
  };

  const MyButton = styled(Button)({
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  });

  return (
    <Grid>
      <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
        <CardContent>
          <Typography gutterBottom variant="h5">
            Contact Us
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            gutterBottom
          >
            Fill up the form and our team will get back to you within 24 hours.
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                required
                id="outlined-required"
                label="Name"
                placeholder="Name"
                value={name}
                onChange={handleName}
                type="text"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                id="outlined-required"
                label="Address"
                placeholder="Address"
                value={address}
                onChange={handleAddress}
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="outlined-required"
                label="Mobile No"
                placeholder="Mobile No"
                value={phone_no}
                onChange={handlePhone_no}
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                defaultValue={photo}
                onChange={(e) => {
                  uploadImage(e);
                }}
                name="upload-photo"
                id="upload-photo"
                type="file"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <MyButton onClick={handleApi} fullWidth>
                Submit
              </MyButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

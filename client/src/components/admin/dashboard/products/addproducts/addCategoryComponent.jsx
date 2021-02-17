import React, { useState, useEffect} from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

function AddCategoryComponentModal(props) {
  const { onClose, categories, setValue, valueProp ,creatCategoriesString, setValueProp,  open, ...other } = props;

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    setValue(creatCategoriesString(valueProp));
    onClose();
  };

  const handleClick = (event, cat) => {
    var bandera = true;
    valueProp.forEach((item) => {
      if (item.id === cat.id) {
        setValueProp(valueProp.filter((item) => item.id !== cat.id));
        bandera = false;
      }
    });
    if (bandera) {
      setValueProp(valueProp.concat(cat));
    }
  };
  
  const checkCheckedCat = (cat) => {
    for(let key of valueProp){
      if(key.id === cat.id){
        return true;
      }
    }
    return false
  }

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">
        Select Categories
      </DialogTitle>
      <DialogContent dividers>
        <Table>
          <TableBody>
            {categories.map((cat) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={cat.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="secondary"
                    onClick={(event) => handleClick(event, cat)}
                    inputProps={{ 'aria-labelledby': cat.id }}
                    checked={checkCheckedCat(cat)}
                  />
                </TableCell>
                <TableCell
                  component="th"
                  id={cat.id}
                  scope="row"
                  padding="none"
                >
                  {cat.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="secondary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddCategoryComponentModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    width: "80%",
    maxHeight: 435,
  },
}));

export default function AddCategoryComponent(props) {
  const {setValueProp, valueProp, value, setValue} = props
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/categories").then((res) => {
      setCategories(res.data);
    })
    /* axios.get(`/dashboard/categories/${productId}`).then(res => setValue(creatCategoriesString(res.data[0].categories))) */
    // eslint-disable-next-line
  }, []);

  const handleClickListItem = () => {
    setOpen(true);
  };
  
  const creatCategoriesString = (array) => {
    var texto = "";
    // eslint-disable-next-line
    array.map((elemento, i) => {
      i === 0
        ? (texto = texto + elemento.name)
        : (texto = texto + ", " + elemento.name);
    });
    return texto;
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <List component="div" role="list">
        <ListItem
          button
          divider
          aria-haspopup="true"
          aria-controls="ringtone-menu"
          aria-label="phone ringtone"
          onClick={handleClickListItem}
          role="listitem"
        >
          <ListItemText primary="Add Categories" secondary={value} />
        </ListItem>
        <AddCategoryComponentModal
          classes={{
            paper: classes.paper,
          }}
          id="ringtone-menu"
          keepMounted
          setValueProp={setValueProp}
          valueProp={valueProp}
          open={open}
          onClose={handleClose}
          setValue={setValue}
           creatCategoriesString={creatCategoriesString}
          categories={categories}
        />
      </List>
    </div>
  );
}

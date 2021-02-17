import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AddCategoryForm from './AddCategoryForm';
import EditCategoryForm from './EditCategoryForm';
import axios from 'axios';
import ConfirmationModal from './ConfirmationModal'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '70%',
        backgroundColor: theme.palette.background.paper,
        display: 'inline-block'
    },
    buttonAlign: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    container: {
        width: '85%',
        display: 'inline-block',
        marginTop: '2%'
    }
}));


export default function CheckboxList() {
  const classes = useStyles();
  const [openClose, setOpenClose] = useState(false)
  const [categories, setCategories] = useState([]);
  const [editItem, setEditItem] = useState({})


  const listCategories = () => {
    axios.get('/categories').then(res => setCategories(res.data))
  }

  

useEffect(listCategories, [])

  const deleteCategory = (id) => {
    axios.delete(`/dashboard/category/${id}`).then(() => listCategories())
  }

  const setEdit = (item) => {
    setEditItem(item);
    setOpenClose(true);
  }


  return (
    <div className={classes.container}>

    <div className={classes.buttonAlign}>
        <AddCategoryForm listCategories={listCategories} />   
    </div>


    {openClose && <EditCategoryForm listCategories={listCategories} openClose={openClose} setOpenClose={setOpenClose} item={editItem} /> }

    <List className={classes.root}>
      {categories && categories.map((item, index) => (      
        <div key={item.id}>

            <ListItem key={item.id} role={undefined} dense button >
                <ListItemIcon>
                    <IconButton edge="end" aria-label="comments" onClick={() => setEdit(item)}>
                        <EditIcon />
                    </IconButton>
                </ListItemIcon>
            <ListItemText id={item.id} primary={item.name} secondary={item.description} />
                <ListItemSecondaryAction>
                    <ConfirmationModal deleteCategory={deleteCategory} itemId={item.id} />
                </ListItemSecondaryAction>
            </ListItem>
        </div>
        )
      )}
    </List>
    </div>
  );
}
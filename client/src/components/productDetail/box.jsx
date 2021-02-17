const [modalStyle] = React.useState(getModalStyle);
const [open, setOpen] = React.useState(false);

const handleOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

const body = (
  <div style={modalStyle} className={classes.paper}>
    <h2 id="simple-modal-title">Give us your feedback</h2>
    <p id="simple-modal-description">Please write a comment</p>
    <UserReview />
    <Button onClick={handleClose} type="button" color="secondary">
      Cancel
    </Button>
  </div>
);

{/* Componente Reviews del Producto */}
      <Grid item xs={12}>
        <Review id={id} />
      </Grid>
      <Box className={classes.root}>
        <Button
          startIcon={<RateReviewIcon />}
          type="button"
          color="secondary"
          onClick={handleOpen}
        >
          Write a review
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </Box>
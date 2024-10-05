import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import WFTBGImg from './wft_text_bg.png';

const WaterFootprintResultDialog = ({ open, handleClose, footprint, handleShare, handleReset }) => {
  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{
      sx: {
        backgroundColor: '#00072D',
      }
    }}>
      <DialogTitle sx={{ textAlign: 'center' }} style={{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#EEF9BF'
      }}>
        Your diet water footprint is
      </DialogTitle>
      <DialogContent>
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <img
            src={WFTBGImg}
            alt="Water Footprint"
            style={{ display: 'block', margin: '0 auto', width: '50%' }}
          />
          <Typography
            variant="h5"
            align="center"
            color="primary"
            style={{
              fontWeight: 'bold',
              color: 'white',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {parseInt(footprint, 10)} litres
          </Typography>
        </div>
        <Typography variant="body1" align="center" style={{
          marginTop: 10,
          color: 'white'
        }}>
          which is the same as {Math.round(footprint / 150)} bathtubs filled to the brim.
        </Typography>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'flex-end' }}>
        <Button onClick={() => { handleReset(); handleClose(); }} color="primary">Calculate Again</Button>
        <Button onClick={handleShare} color="primary" startIcon={<ShareIcon />}>Share</Button>
      </DialogActions>
    </Dialog>
  );
};

export default WaterFootprintResultDialog;


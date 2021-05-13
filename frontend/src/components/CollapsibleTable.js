import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});


function Row(props) {
  const { reagent } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{reagent.name}</TableCell>
        <TableCell align="right">{reagent.concentration ? `${reagent.concentration.amount} ${reagent.concentration.unit}`: 'N/A'}</TableCell>
        <TableCell align="right">{reagent.type}</TableCell>
        <TableCell align="right">{reagent.expiration}</TableCell>
        <TableCell align="right">{reagent.labId}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Standards
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Concentration</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Weight</TableCell>
                    <TableCell align="right">Final Weight</TableCell>
                    <TableCell align="right">Prepared Date</TableCell>
                    <TableCell align="right">Expiration Date</TableCell>
                    <TableCell align='right'>Lab ID</TableCell>
                    <TableCell align="right">Balance</TableCell>
                    <TableCell align="right">Prepared By</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reagent.children.map((childRow) => (
                    <TableRow key={childRow.id}>
                      <TableCell component="th" scope="row">{childRow.name}</TableCell>
                      <TableCell>{childRow.concentration}</TableCell>
                      <TableCell align="right">{childRow.type}</TableCell>
                      <TableCell align="right">{childRow.weight}</TableCell>
                      <TableCell align="right">{childRow.finalWeight}</TableCell>
                      <TableCell align="right">{childRow.date}</TableCell>
                      <TableCell align="right">{childRow.expiration}</TableCell>
                      <TableCell align='right'>{childRow.labId}</TableCell>
                      <TableCell align="right">{childRow.balance}</TableCell>
                      <TableCell align="right">{childRow.preparer.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};




export default function CollapsibleTable({reagents}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Concentration</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Expiration</TableCell>
            <TableCell align="right">Lab ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reagents.map((reagent) => (
            <Row key={reagent.id} reagent={reagent} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
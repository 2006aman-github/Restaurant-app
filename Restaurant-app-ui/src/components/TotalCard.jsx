import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useStateValue } from "../StateProvider";

function TotalCard() {
  let extra_charge = 30;
  const [{ cart, total }, dispatch] = useStateValue();
  return (
    <div>
      <Card variant="outlined" className="total__card">
        <CardContent>
          <Typography variant="h5" component="h2">
            Total Amount
          </Typography>
          <hr />
          <br />
          <br />
          <Typography color="textSecondary">
            Initial Amount: Rs.{total}
          </Typography>
          <br />
          <br />
          <Typography color="textSecondary">
            Taxes & Charges: Rs.{cart.length > 0 ? extra_charge : 0}
          </Typography>
          <br />
          <br />
          <hr />
          <Typography variant="h5" component="h2">
            Grand Total: {total + extra_charge}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            disabled={cart.length > 0 ? false : true}
            size="small"
            variant="contained"
            color="primary"
          >
            PROCEED TO CHECKOUT
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default TotalCard;

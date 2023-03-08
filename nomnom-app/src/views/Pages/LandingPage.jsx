import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import RegisterPageStyle from "assets/jss/material-dashboard-react/views/registerPageStyle.jsx";

const { REACT_APP_AWS_COGNITO_URL } = process.env;

console.log(`${REACT_APP_AWS_COGNITO_URL}`);

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <form onSubmit={this.register}>
              <Card className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="primary"
                >
                  <h4 className={classes.cardTitle}>Nom Nom</h4>
                </CardHeader>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button href={REACT_APP_AWS_COGNITO_URL} type="submit" color="primary" simple size="lg" block>
                    Let's Go
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object
};

export default withStyles(RegisterPageStyle)(LandingPage);

import React from 'react';
import styled from 'styled-components';
import OverrideCreditOrgGrid from './components/OverrideCreditOrgGrid/index';
import {
  color,
  pxToRem
} from 'styles';
import GlobalStyles from 'globalStyles';
import * as locale from 'locale';

const Container = styled.div.attrs({ className: 'overridecreditorggrid__container' })`
`;
class OverrideCreditOrg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gridData: {
        id: "",
        name: "",
        selectedType: "",
        errorMessage: {},
        isLoading: false
      }
    }
  }
  render() {
    return (
      <Container id="override-creditorg-grid">
        <GlobalStyles>
          <OverrideCreditOrgGrid
            gridData={this.state.gridData}
            onChange={(seletedType) => {
              this.setState({
                gridData: seletedType
              });
            }}
          />
        </GlobalStyles>
      </Container>
    );
  }
}

export default OverrideCreditOrg;
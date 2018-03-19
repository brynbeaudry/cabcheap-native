import React from 'react';
import { Container, Header, Title, Button, Left, Right, Body, Icon } from 'native-base';
import PropTypes from 'prop-types'

const CCHeader = ({error, fetching = false, isLoggedIn = false}) => (
    <Header>
        <Left>
        <Button
            transparent
            onPress={() => this.props.navigation.navigate("DrawerOpen")}
        >
            <Icon name="menu" />
        </Button>
        </Left>
        <Body>
        <Title>HomeScreen</Title>
        </Body>
        <Right />
    </Header>
);

CCHeader.propTypes = {
    error : PropTypes.object,
    fetching : PropTypes.bool.isRequired,
    isLoggedIn : PropTypes.bool.isRequired
}

export default CCHeader
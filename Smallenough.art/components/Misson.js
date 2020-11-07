import React, { Component } from 'react';
import {Text, } from 'react-native'
import { Card} from 'react-native-elements'

class Misson extends Component() {
    constructor(props) {
        super(props);
    }
    render() {
        
        return (
                <Card  title="Misson" wrapperStyle={{margin: 20}}>
                   
                    
                        <Text></Text>
                        <Text> 
                        My aim is to share art with the world as a medium for dealing with trauma.
                        </Text>
                        

</Card>

        )
    };
}

export default Misson
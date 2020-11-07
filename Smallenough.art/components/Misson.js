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
                   
                    
                        <Text>My Mission</Text>
                        <Text> 
                       I wish to share my work with the world, To encouredge others in there artistic pursuits, and teach others how to use art in its various forms to deal with trauma.
                       </Text>
                        

</Card>

        )
    };
}

export default Misson
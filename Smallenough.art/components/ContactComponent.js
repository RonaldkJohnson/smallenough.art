import React, { Component } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Button, Icon } from 'react-native-elements';
import {Text, } from 'react-native'
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';




class Contact extends Component {

    static navigationOptions = {
        title: 'Contact Us'
    }

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['ron@smallenough.art'],
            subject: 'Inquiry',
            body: 'To whom it may concern:'
        })
    }

    render() {
        
            return (
                <ScrollView>
                    <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                        <Card  title="Contact" wrapperStyle={{margin: 20}} Divider>
                        
                            
                                <Text></Text>
                                <Text> 
                                    1 Testing address thingy
                                </Text>
                                <Text> 
                                    Minneapolis MN 55401
                                </Text>
                                <Text style={{ marginBottom: 10}}> 
                                    U.S.A. 
                                </Text>
                                <Text></Text>
                                <Text>   
                                    Phone: 1-206-555-1234
                                    Email: ron@smallenough.art
                                </Text>
                                <Button
                            title="Send Email"
                            buttonStyle={{backgroundColor: '#000000', margin: 40}}
                            icon={<Icon
                                name='envelope-o'
                                type='font-awesome'
                                color='#fff'
                                iconStyle={{marginRight: 10}}
                            />}
                            onPress={() => this.sendMail()}
                        />
    
                        </Card>
                    </Animatable.View>

                </ScrollView>
            )
        };
    }

        


export default Contact;

import React, { Component } from 'react';
import { ScrollView, Text, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
        partners: state.partners
    };
};

function Misson() {
    return (
        <Card title="My Misson">
        <Text style={{margin: 10}}>
       Hello, My name is Ron Johnson, I am the artist behind Smallenough.art! My mission is to share my artwork with the world, and to teach others to utilize art as they seek to overcome the trauma in there lives. I am a retired Marine, during my time of service and throughout my life I have encountered and had to deal with various traumas. For me painting has become an integeral part in coping with my PTSD and healing in general. My hope is that I can encouredge others to engage in various art mediums so they to can experence the thearpy that Art can bring to and through and despite there traumatic experiences.
        </Text>
        </Card>

    );

}


class About extends Component {

    static navigationOptions = {
        title: 'About Us'
    }

    render() {
        const renderPartner = ({item}) => {
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{source: {uri: baseUrl + item.image}}}
                    />

            );
         
        };

        if (this.props.partners.isLoading){
            return(
                <ScrollView>
                <Misson />
                <Card
                    title= "Community Partners">
                        <Loading />
                    </Card>
            </ScrollView>

            );
        }
        if (this.props.partners.errMess){
            return (
                    <ScrollView>
                        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <Misson />
                    <Card
                        title= "Community Partners">
                            <Text>{this.props.partners.errMess}</Text>
                        </Card>
                        </Animatable.View>
                </ScrollView>

            );
        }
        return (
            <ScrollView>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Misson />
                <Card
                    title= "Community Partners">
                        <FlatList 
                        data={this.props.partners.partners}
                        renderItem={renderPartner}
                        keyExtractor={item => item.id.toString()}
                    />
                    </Card>
                </Animatable.View>
            </ScrollView>
        );

    }
   
}
        


export default connect(mapStateToProps)(About);
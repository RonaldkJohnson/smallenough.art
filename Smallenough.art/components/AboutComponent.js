
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
         I am a local abstract Artist. Art has become a means of healing for me. I am a vetran of our United States Marine Corp. For me my art has been a venue to engage with some of the more complex feelings and emotions and experience from my time in service. With my PTSD where I once dreamed in violence I now dream in color.
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
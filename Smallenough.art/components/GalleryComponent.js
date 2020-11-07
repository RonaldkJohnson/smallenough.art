import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
        photos: state.photos
    };
};

class Gallery extends Component {

    static navigationOptions = {
        title: 'Gallery'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderGalleryItem = ({item}) => {
            return (
               
                <Animatable.View animation='fadeInRightBig' duration={2000}>
                    <Tile
                    title={item.name}
                    caption={item.description}
                    featured
                    onPress={() => navigate('PhotoInfo', { photoId: item.id })}
                    imageSrc={{uri: baseUrl + item.image}}
                    />
                </Animatable.View>
            );
        };

        if (this.props.photos.isLoading) {
            return <Loading />;
        }
        if (this.props.photos.errMess) {
            return (
                <View>
                    <Text>{this.props.photos.errMess}</Text>
                </View>
            );
        }
        return (
            <FlatList
                data={this.props.photos.photos}
                renderItem={renderGalleryItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps)(Gallery);
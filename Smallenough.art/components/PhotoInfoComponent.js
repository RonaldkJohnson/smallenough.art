import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList,
    Modal, Button, StyleSheet,
    Alert, PanResponder, Share } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';
import { postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        photos: state.photos,
        comments: state.comments,
        favorites: state.favorites
    };
};

const mapDispatchToProps = {
    postFavorite: photoId => (postFavorite(photoId)),
    postComment: (photoId, rating, author, text) => postComment(photoId, rating, author, text)
};

function RenderPhoto(props) {

    const { photo } = props;

    const view = React.createRef();

    const recognizeDrag = ({ dx }) => (dx < -200) ? true : false;
    const recogniseComment = ({ dx }) => (dx > 200) ? true : false;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            view.current.rubberBand(1000)
                .then(endState => console.log(endState.finished ? 'finished' : 'canceled'));
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log('pan responder end', gestureState);
            if (recognizeDrag(gestureState)) {
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + photo.name + ' to favorites?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => console.log('Cancel Pressed')
                        },
                        {
                            text: 'OK',
                            onPress: () => props.favorite ?
                                console.log('Already set as a favorite') : props.markFavorite()
                        }
                    ],
                    { cancelable: false }
                );
            }
            else if (recogniseComment(gestureState)){
                props.onShowModal();
            }
            return true;
        }
    });

    const sharePhoto = (title, message, url) => {
        Share.share({
            title: title,
            message: `${title}: ${message} ${url}`,
            url: url
        },{
            dialogTitle: 'Share ' + title
        });
    };

    if (photo) {
        return (
            <Animatable.View
                animation='fadeInDown'
                duration={2000}
                delay={1000}
                ref={view}
                {...panResponder.panHandlers}>
                <Card
                    featuredTitle={photo.name}
                    image={{ uri: baseUrl + photo.image }}
                >
                    <Text style={{ margin: 10 }}>
                        {photo.description}
                    </Text>
                    <View style={styles.cardRow}>
                        <Icon
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            raised
                            reverse
                            onPress={() => props.favorite ?
                                console.log('Already set as a favorite') : props.markFavorite()}
                        />
                        <Icon
                            name='pencil'
                            type='font-awesome'
                            color='#000000'
                            raised
                            reverse
                            onPress={() => props.onShowModal()}
                        />
                         <Icon
                            name={'share'}
                            type='font-awesome'
                            color='#000000'
                            raised
                            reverse
                            onPress={() => sharePhoto(photo.name, photo.description, baseUrl + photo.image)} 
                        />
                    </View>
                </Card>
            </Animatable.View>
        );
    }
    return <View />;
}

function RenderComments({ comments }) {

    const renderCommentItem = ({ item }) => {
        return (
            <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.text}</Text>
                <Rating
                    startingValue={item.rating}
                    imageSize={10}
                    readonly
                    style={{ alignItems: 'flex-start', paddingVertical: '5%' }}
                />
                <Text style={{ fontSize: 12 }}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    };

    return (
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
            <Card title='Comments'>

                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

class PhotoInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            rating: 5,
            author: '',
            text: ''
        }

    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    handleComment(photoId) {
        this.props.postComment(photoId, this.state.rating, this.state.author, this.state.text);
        this.toggleModal();
        console.log(this.state.text);
    }

    resetForm() {
        this.setState({
            showModal: false,
            rating: 5,
            author: '',
            text: ''
        });
    }

    markFavorite(photoId) {
        this.props.postFavorite(photoId);
    }

    static navigationOptions = {
        title: 'Photo Information'
    }

    render() {
        const photoId = this.props.navigation.getParam('photoId');
        const photo = this.props.photos.photos.filter(photo => photo.id === photoId)[0];
        const comments = this.props.comments.comments.filter(comment => comment.photoId === photoId);
        return (
            <ScrollView>
                <RenderPhoto photo={photo}
                    favorite={this.props.favorites.includes(photoId)}
                    markFavorite={() => this.markFavorite(photoId)}
                    onShowModal={() => this.toggleModal()}
                />
                <RenderComments comments={comments} />
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}
                >
                    <View style={styles.modal}>
                        <Rating
                            showRating
                            startingValue={this.state.rating}
                            imageSize={40}
                            onFinishRating={rating => this.setState({ rating: rating })}
                            style={{ paddingVertical: 10 }}
                        />
                        <Input
                            placeholder='author'
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            leftIconContainerStyle={{ paddingRight: 10 }}
                            onChangeText={(author) => this.setState({ author: author })}
                            value={this.state.author}
                        />
                        <Input
                            placeholder='Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                            leftIconContainerStyle={{ paddingRight: 10 }}
                            onChangeText={(text) => this.setState({ text: text })}
                            value={this.state.text}
                        />
                        <View style={{ margin: 10 }}>
                            <Button
                                onPress={() => {
                                    this.handleComment(photoId)

                                    this.resetForm()
                                }}
                                color='#000000'
                                title='Submit'
                            />
                        </View>
                        <View style={{ margin: 10 }}>

                            <Button
                                onPress={() => {
                                    this.resetForm();
                                }}
                                color='#000000'
                                title='Cancel'
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    cardItem: {
        flex: 1,
        margin: 10
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoInfo);
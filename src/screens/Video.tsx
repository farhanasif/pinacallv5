import React, { Component } from 'react';
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';

import requestCameraAndAudioPermission from '../components/Permission';
import styles from '../components/Style';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {}

interface State {
  appId: string;
  token: string;
  channelName: string;
  joinSucceed: boolean;
  peerIds: number[];
}

export default class Video extends Component<Props, State> {
  _engine?: RtcEngine;

  constructor(props) {
    super(props);
    this.state = {
      appId: 'b8a04a724a984c3ba4a59d8487ffa26b',
      token: '006b8a04a724a984c3ba4a59d8487ffa26bIAB9pdMz0z67bjpJADDPozvoXuDxTQZIH8dDakiGHuP9Q9y+qvMAAAAAEAC0V+LrIH0KYAEAAQAgfQpg',
      channelName: 'sample-call',
      joinSucceed: false,
      peerIds: [],
      timervalue: 0,
      billingamount: 10,
      mobile: '',
      message: 'You are starting a pinacall request...',
      btnvalue: 'Start Call',
      callstatus: false,
      seconds: 0

    };
    if (Platform.OS === 'android') {
      // Request required permissions from Android
      requestCameraAndAudioPermission().then(() => {
        console.log('requested!');
      });
    }

    this.tick = this.tick.bind(this);
  }

  tick() {
    // start timer after button is clicked
    this.interval = setInterval(() => {
      this.setState(prevState => ({
        seconds: prevState.seconds + 1
      }));
    }, 1000);
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /**
   * @name init
   * @description Function to initialize the Rtc Engine, attach event listeners and actions
   */
  init = async () => {
    const { appId } = this.state;
    this._engine = await RtcEngine.create(appId);
    await this._engine.enableVideo();

    this._engine.addListener('Warning', (warn) => {
      console.log('Warning', warn);
    });

    this._engine.addListener('Error', (err) => {
      console.log('Error', err);
    });

    //we need to initiate a timer here
    this._engine.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed);
      // Get current peer IDs
      const { peerIds } = this.state;
      // If new user
      if (peerIds.indexOf(uid) === -1) {
        this.setState({
          // Add peer ID to state array
          peerIds: [...peerIds, uid],
        });
      }

      this.tick();
    });

    this._engine.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      const { peerIds } = this.state;
      this.setState({
        // Remove peer ID from state array
        peerIds: peerIds.filter((id) => id !== uid),
      });
    });

    // If Local user joins RTC channel
    this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.log('JoinChannelSuccess', channel, uid, elapsed);
      // Set state variable to true
      this.setState({
        joinSucceed: true,
      });
      console.log(this.state.peerIds)
    });

    const value = await AsyncStorage.getItem('@mobile')
    this.setState({mobile : value})
    console.log('sender_mobile',value);
  };

  /**
   * @name startCall
   * @description Function to start the call
   */
  startCall = async () => {
    // Join Channel using null token and channel name
    //need to share data...
    let response = await fetch(
        'http://103.108.144.246/pinacallapi/process.php',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mobile: this.state.mobile,
                action: 'sendUserRequest'
            }),
        }
    );

    //let responseJson = await response.json();

    await this._engine?.joinChannel(
      this.state.token,
      this.state.channelName,
      null,
      0
    );

    this.setState({callstatus: true})
  };

  /**
   * @name endCall
   * @description Function to end the call
   */
  endCall = async () => {
    await this._engine?.leaveChannel();
    this.setState({ peerIds: [], joinSucceed: false });

    let response = await fetch(
        'http://103.108.144.246/pinacallapi/process.php',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mobile: this.state.mobile,
                seconds: this.state.seconds,
                action: 'closeUserRequest'
            }),
        }
    );

    this.setState({callstatus: false})
    const { navigation } = this.props;
    navigation.navigate('Home')
  };

  render() {
    return (
      <View style={styles.max}>
        <View style={styles.max}>
            <View style={styles.msgHolder}>
                <Text>{this.state.message}</Text>
            </View>
            <View style={styles.buttonHolder}>
                {this.state.callstatus == false ? <TouchableOpacity onPress={this.startCall} style={styles.button}>
                    <Text style={styles.buttonText}> Start Call </Text>
                </TouchableOpacity> : <Text></Text>}
                {this.state.peerIds.length > 0 ? <Text>{this.state.seconds}</Text>:<Text></Text>}
                <TouchableOpacity onPress={this.endCall} style={styles.button}>
                <Text style={styles.buttonText}> End Call </Text>
                </TouchableOpacity>
            </View>
            {this._renderVideos()}
        </View>
      </View>
    );
  }

  _renderVideos = () => {
    const { joinSucceed } = this.state;
    return joinSucceed ? (
      <View style={styles.fullView}>
        <RtcLocalView.SurfaceView
          style={styles.max}
          channelId={this.state.channelName}
          renderMode={VideoRenderMode.Hidden}
        />
        {this._renderRemoteVideos()}
      </View>
    ) : null;
  };

  _renderRemoteVideos = () => {
    const { peerIds } = this.state;
    return (
      <ScrollView
        style={styles.remoteContainer}
        contentContainerStyle={{ paddingHorizontal: 2.5 }}
        horizontal={true}
      >
        {peerIds.map((value) => {
          return (
            <RtcRemoteView.SurfaceView
              style={styles.remote}
              uid={value}
              channelId={this.state.channelName}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          );
        })}
      </ScrollView>
    );
  };
}
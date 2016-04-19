import React, {
    StyleSheet,
    View,
    Text,
    ToolbarAndroid
} from 'react-native';

export class Page extends React.Component {
  render() {
      return (
          <View style={styles.container}>
            <ToolbarAndroid
              style={styles.toolbar}
              logo={require('./dumbbell-icon.png')}
              actions={[{title: 'Home'}]} />
            <View style={styles.topbar}>
              <Text style={styles.topbarTitle}>
                {this.props.title}
              </Text>
            </View>
            {this.props.children}
          </View>
      );        
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    calendarWeek: {
        flex: 1,
        flexDirection: 'row'
    },

    topbar: {
        height: 80,
        justifyContent: 'flex-end',
        backgroundColor: '#44aaee',
    },

    toolbar: {
        height: 50,
        backgroundColor: '#44aaee',        
    },

    topbarTitle: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
        color: 'white'
    }
});

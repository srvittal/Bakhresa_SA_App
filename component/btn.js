import * as React from 'react';
import { Button } from 'react-native-elements';

class Btn extends React.Component {
    render() {
        return (
            <Button
            title={this.props.title}
            buttonStyle={{
                backgroundColor: this.props.color == "grey" ? '#B9B9B9' : this.props.color == "red" ? '#f70d1a' : this.props.color,              
            }}
            containerStyle={{
                width: this.props.width == "" ? 100 : this.props.width,
                alignSelf: 'center',
                borderRadius: 18,
                borderColor: 'transparent',
                marginHorizontal: 50,
                marginVertical: 10,
            }}
            titleStyle={{ fontWeight: 'bold', color: 'black' }}
            onPress={this.props.onPress}
        />
        )
    }
}

export default Btn;
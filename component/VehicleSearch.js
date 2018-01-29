import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View, TouchableHighlight} from 'react-native';
import Search from 'react-native-search-box';
class VehicleSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Tìm kiếm'
        };
        this.props.searchListener.searchComponent = this;
    }

    onSearch = (searchValue) => {
        return new Promise((resolve, reject) => {
            this.props.searchListener.onSearch(searchValue);
        });
    };
    onCancel = () => {
        return new Promise((resolve, reject) => {
            this.props.searchListener.onCancelSearch();
        });
    };
    onDelete = () => {
        this.props.searchListener.onDeleteSearch()
    };
    onFocus = (text) => {
        return new Promise((resolve, reject) => {
            this.props.searchListener.onFocusSearch();
        });
    };

    onChangeText = (text) => {
        return new Promise((resolve, reject) => {
            this.props.searchListener.onChangeText(text);
        });
    }

    setValue(value) {
        this.searchComponent.onChangeText(value);
    }

    focusComponent() {
        this.searchComponent.expandAnimation();
    }

    cancelSearch() {
        this.searchComponent.onCancel();
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <Search
                    ref={ref => {
                        this.searchComponent = ref;
                    }}
                    style={styles.textInput}
                    placeholder='Tìm kiếm'
                    cancelTitle='Huỷ'
                    backgroundColor="#ffffff"
                    cancelButtonTextStyle={{
                        fontWeight: 'bold',
                        justifyContent: 'center'
                    }}
                    cancelButtonStyle={{
                        marginLeft: 5
                    }}
                    titleCancelColor="#c20b3b"
                    placeholderTextColor="#808080"
                    tintColorSearch="#808080"
                    shadowVisible={true}
                    onSearch={this.onSearch}
                    onDelete={this.onDelete}
                    onCancel={this.onCancel}
                    onFocus={this.onFocus}
                    onChangeText={this.onChangeText}
                >{this.state.value}</Search>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        flex: 1,
    },
    textInput: {
        flex: 1,
    },
});
module.exports = VehicleSearch;
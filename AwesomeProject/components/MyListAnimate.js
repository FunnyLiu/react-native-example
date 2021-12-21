/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {Text, FlatList, TouchableOpacity, View, Button} from 'react-native';
const DATA = [
  {
    title: 'Second Item',
    type: 'b',
  },
];
const Item = ({item, onPress}) => {
  const {type} = item;

  if (type === 'a') {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={{height: 300, width: 300, marginBottom: 100}}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  }
  if (type === 'b') {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text
          style={{
            height: 100,
            width: 300,
            marginBottom: 100,
            backgroundColor: 'red',
          }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  }
  if (type === 'c') {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text
          style={{
            height: 300,
            width: 300,
            marginBottom: 100,
            backgroundColor: 'yellow',
          }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  }
};
const renderItem = ({item}) => {
  return <Item item={item} onPress={() => {}} />;
};

const MyListAnimate = () => {
  const [data, setData] = useState(DATA);
  const flatlistRef = useRef();

  const scrollToIndex = index => {
    console.log('scroll to index called !');
    flatlistRef.current.scrollToIndex({animated: true, index: index});
  };
  return (
    <View>
      <Text>mylist animate</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        ListHeaderComponent={() => {
          return <Text>header component</Text>;
        }}
        ListFooterComponent={() => {
          return <Text>footer component</Text>;
        }}
        style={{height: 300}}
        ref={flatlistRef}
      />
      <View>
        <Item
          item={{
            title: 'last component',
            type: 'c',
          }}
          onPress={() => {}}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          setData([
            ...data,
            {
              title: 'Thirddd Item',
              type: 'c',
            },
          ]);
        }}
        style={{
          marginBottom: 300,
          position: 'absolute',
          top: 100,
          right: 10,
          backgroundColor: 'green',
          zIndex: 99,
        }}>
        <Text> 增加一个</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          scrollToIndex(data.length - 1);
        }}
        style={{
          marginBottom: 300,
          position: 'absolute',
          top: 130,
          right: 10,
          backgroundColor: 'green',
          zIndex: 99,
        }}>
        <Text>滑到最后一个</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setData([
            ...data.slice(0, -1),
            {
              title: 'four Item',
              type: 'b',
            },
          ]);
        }}
        style={{
          marginBottom: 300,
          position: 'absolute',
          top: 160,
          right: 10,
          backgroundColor: 'green',
          zIndex: 99,
        }}>
        <Text>切换最后一个</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyListAnimate;

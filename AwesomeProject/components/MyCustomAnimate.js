/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Button,
  Animated,
  ScrollView,
} from 'react-native';
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
            marginBottom: 50,
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
            height: 200,
            width: 300,
            marginBottom: 50,
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

const MyList = () => {
  const bottomAnimate = useRef(new Animated.Value(100)).current;
  const bottomAnimate2 = useRef(new Animated.Value(-200)).current;
  const opacityAnimate = useRef(new Animated.Value(1)).current;
  const bottomAnimate3 = useRef(new Animated.Value(-200)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(bottomAnimate, {
        toValue: 300,
        duration: 1000,
      }),
      Animated.sequence([
        Animated.timing(bottomAnimate2, {
          toValue: 80,
          duration: 1500,
        }),
        Animated.timing(opacityAnimate, {
          toValue: 0,
          duration: 1000,
        }),
        Animated.timing(bottomAnimate3, {
          toValue: 150,
          duration: 1500,
        }),
      ]).start(() => {
        console.log('串行动画完成');
      }),
    ]).start(() => {
      console.log('平行动画完成');
    });
  }, []);
  return (
    // <ScrollView>
    <View style={{position: 'absolute', bottom: 0}}>
      <Animated.View style={{position: 'absolute', bottom: bottomAnimate}}>
        <Item
          item={{
            title: 'Second Item',
            type: 'b',
          }}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          bottom: bottomAnimate2,
          opacity: opacityAnimate,
        }}>
        <Item
          item={{
            title: 'third Item',
            type: 'c',
          }}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          bottom: bottomAnimate3,
        }}>
        <Item
          item={{
            title: '后面一个对话',
            type: 'b',
          }}
        />
      </Animated.View>
    </View>
    // </ScrollView>
  );
};

const MyList2 = ({list = [], translateY = 0}) => {
  const listTransformAnimate = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef();
  const [myTrans, setMyTrans] = useState(0);
  useEffect(() => {
    if (!translateY) return;
    // setTimeout(() => {
    scrollViewRef.current.scrollToEnd({animated: true, duration: 5000});
    // scrollViewRef.current.scrollTo({y: 200,duration: 8000});
    // }, 200);
    // Animated.timing(listTransformAnimate, {
    //   toValue: translateY,
    //   duration: 1000,
    //   useNativeDriver: true,
    // }).start();

    // Animated.sequence([
    //   Animated.timing(listTransformAnimate, {
    //     toValue: translateY,
    //     duration: 1000,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(listTransformAnimate, {
    //     toValue: 0,
    //     duration: 1000,
    //     useNativeDriver: true,
    //   }),
    // ]).start();
  }, [translateY, listTransformAnimate]);
  console.log(list);
  return (
    <View style={{width: '100%'}}>
      <Animated.ScrollView
        ref={scrollViewRef}
        style={{
          // position: 'absolute',
          // position: 'relative',
          // top: 500,
          // bottom: listBottomAnimate,
          backgroundColor: 'green',
          // transform: [{translateY: listTransformAnimate}],
        }}>
        <View
          style={{
            // height: 700,
            height: '100%',
            // position: 'absolute',
            // top: 0,
            // bottom: 0,
            // left:0,
            // right:0,
            backgroundColor: 'yellow',
            // position:'absolute',
          }}>
          <Text>container</Text>
          <Animated.View
            style={{
              paddingTop: 700,
              backgroundColor: 'blue',
              //   position: 'relative',
              // top:-300,
              transform: [{translateY: listTransformAnimate}],
            }}>
            <View
              style={
                {
                  // position:'absolute',
                  // height:' 100%',
                  // bottom: 0,
                  // backgroundColor:'red',
                }
              }>
              {list.map((item, index) => (
                <Item key={index} item={item} />
              ))}
            </View>
          </Animated.View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const MyList3 = ({list = [], height = 0}) => {
  const heightAnimate = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef();
  console.log(height);
  useEffect(() => {
    if (!height) return;
    // setTimeout(() => {
    // scrollViewRef.current.scrollToEnd({animated: true, duration: 5000});
    // scrollViewRef.current.scrollTo({y: 200,duration: 8000});
    // }, 200);
    Animated.timing(heightAnimate, {
      toValue: height,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    // Animated.sequence([
    //   Animated.timing(listTransformAnimate, {
    //     toValue: translateY,
    //     duration: 1000,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(listTransformAnimate, {
    //     toValue: 0,
    //     duration: 1000,
    //     useNativeDriver: true,
    //   }),
    // ]).start();
  }, [height, heightAnimate]);
  console.log(list);
  return (
    <View style={{width: '100%'}}>
      <Animated.ScrollView
        ref={scrollViewRef}
        style={{
          // position: 'absolute',
          // position: 'relative',
          // top: 500,
          // bottom: listBottomAnimate,
          backgroundColor: 'green',
          // transform: [{translateY: listTransformAnimate}],
        }}>
        <View
          style={{
            // height: 700,
            height: '100%',
            // position: 'absolute',
            // top: 0,
            // bottom: 0,
            // left:0,
            // right:0,
            backgroundColor: 'yellow',
            // position:'absolute',
          }}>
          <Text>container</Text>
          <Animated.View
            style={{
              paddingTop: 700,
              backgroundColor: 'blue',
              position: 'relative',
              top: -800,
              height: heightAnimate,
            }}>
            <View
              style={
                {
                  // position:'absolute',
                  // height:' 100%',
                  // bottom: 0,
                  // backgroundColor:'red',
                }
              }>
              {list.map((item, index) => (
                <Item key={index} item={item} />
              ))}
            </View>
          </Animated.View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};
const MyCustomAnimate = () => {
  const [data, setData] = useState(DATA);
  const [translateY, setTranslateY] = useState(0);
  const [height, setHeight] = useState(300);
  const flatlistRef = useRef();
  const scorllListRef = useRef();

  const scrollToIndex = index => {
    console.log('scroll to index called !');
    // flatlistRef.current.scrollToIndex({animated: true, index: index});
  };
  const appendToList2 = () => {
    setTranslateY(translateY - 250);
    // setHeight(height + 250);
    // scorllListRef.current.scrollToEnd({animated: true});

    setData([
      ...data,
      {
        title: 'Thirddd Item',
        type: 'c',
      },
    ]);
  };

  return (
    <View style={{height: '100%'}}>
      <Text>mylist animate</Text>
      {/* <MyList /> */}
      <MyList2 list={data} translateY={translateY} />
      {/* <MyList3 list={data} height={height} /> */}
      <TouchableOpacity
        onPress={() => {
          appendToList2();
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
          // scorllListRef.current.scrollToEnd({duration: 1500});
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

export default MyCustomAnimate;

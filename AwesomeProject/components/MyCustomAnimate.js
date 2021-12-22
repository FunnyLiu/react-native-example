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
const Item = ({
  item,
  onPress,
  onRemoveLastOne = () => {},
  onLastOneUp = () => {},
  onLayout = () => {},
  preNode,
  nextNode,
  curNode,
}) => {
  const {type} = item;
  const preHeight = (preNode || {}).height || 0;
  const curHeight = (curNode || {}).height || 0;
  const opacityAnimate = useRef(new Animated.Value(1)).current;
  const translateAnimate = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    // a类型的组件，就是后续新增上来需要动画过渡的组件
    if (item.type === 'a') {
      Animated.timing(translateAnimate, {
        toValue: -1 * preHeight,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        onLastOneUp();
      });
    }
  }, [item]);
  // a类型的组件通过动画上移，然后变为b类型组件
  if (type === 'a') {
    return (
      <Animated.View
        // 上升的情况不要触发layout
        // onLayout={onLayout}
        style={{transform: [{translateY: translateAnimate}]}}>
        <TouchableOpacity onPress={onPress}>
          <Text
            style={{
              height: 100,
              width: 300,
              marginBottom: 50,
              backgroundColor: 'green',
            }}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
  if (type === 'b') {
    return (
      <TouchableOpacity onLayout={onLayout} onPress={onPress}>
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
  // c类型组件，点击后会出现透明关闭
  if (type === 'c') {
    return (
      <Animated.View onLayout={onLayout} style={{opacity: opacityAnimate}}>
        <TouchableOpacity
          onPress={() => {
            Animated.timing(opacityAnimate, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }).start(() => {
              onRemoveLastOne();
            });
          }}>
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
      </Animated.View>
    );
  }
};
const renderItem = ({item}) => {
  return <Item item={item} onPress={() => {}} />;
};

// 利用scrollView的api定位到底部动画
const MyList2 = ({list = [], translateY = 0, onRemoveLastOne, onLastOneUp}) => {
  const listTransformAnimate = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef();
  const [myTrans, setMyTrans] = useState(0);
  useEffect(() => {
    if (!translateY) {
      return;
    }
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
  const [nodeInfo, setNodeInfo] = useState([]);
  const onLayout = (event, item) => {
    console.log(item, 'layout');
    // b 的情况下，需要将 nodeinfo 中前面占位的c去掉。
    if (item.type === 'b') {
      setNodeInfo([
        ...nodeInfo.slice(0, -1),
        {...item, ...event.nativeEvent.layout},
      ]);
    } else {
      setNodeInfo([...nodeInfo, {...item, ...event.nativeEvent.layout}]);
    }
  };
  console.log(nodeInfo);
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
                <Item
                  key={index}
                  item={item}
                  preNode={index > 0 ? nodeInfo[index - 1] : undefined}
                  nextNode={
                    index < nodeInfo.length - 1
                      ? nodeInfo[nodeInfo.length - 1]
                      : undefined
                  }
                  curNode={nodeInfo[index]}
                  onRemoveLastOne={onRemoveLastOne}
                  onLastOneUp={onLastOneUp}
                  onLayout={event => onLayout(event, item)}
                />
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
    // flatlistRef.current.scrollToIndex({animated: true, index: index});
  };
  const appendToList2 = () => {
    // 主要改一点，也可以说明在动，就会自动聚焦到底部了。
    setTranslateY(translateY - 1);
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
  // 最后一个移除完毕后
  // 最后一个的高度拿到了
  const onRemoveLastOne = () => {
    // 删除前，先将另一个补位上去
    setData([
      ...data,
      {
        type: 'a',
        title: '对话后一个的前身',
      },
    ]);
    // 删除最后一个
    // setData([
    //   ...data.slice(0, -1),
    // {
    //   title: 'four Item',
    //   type: 'b',
    // },
    // ]);
  };
  // 最后一个组件上来之后
  const onLastOneUp = () => {
    // let newArr = [...data];
    // newArr.splice(-2, 1);
    // setData(newArr);
    // setData([
    //   ...data.slice(0, -2),
    //   {
    //     title: '对话后一个的后身',
    //     type: 'b',
    //   },
    // ]);

    setData([...data.slice(0, -2), {...data[data.length - 1], type: 'b'}]);
  };

  return (
    <View style={{height: '100%'}}>
      <Text>mylist animate</Text>
      {/* <MyList /> */}
      <MyList2
        list={data}
        translateY={translateY}
        onRemoveLastOne={onRemoveLastOne}
        onLastOneUp={onLastOneUp}
      />
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
          width: 200,
          height: 100,
          backgroundColor: 'green',
          zIndex: 99,
        }}>
        <Text> 增加一个</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyCustomAnimate;

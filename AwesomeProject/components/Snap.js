import React from 'react';
import {View, Text} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const MySnap = () => {
  const _renderItem = ({item, index}) => {
    return (
      <View
        style={{
          width: 300,
          alignItems: 'center',
          height: 300,
          backgroundColor: 'red',
        }}>
        <Text>{item.title}</Text>
      </View>
    );
  };

  const onLayout = event => {
    console.log(event);
  };

  return (
    <View style={{backgroundColor: 'yellow', alignItems: 'center'}}>
      <Carousel
        ref={c => {
          this._carousel = c;
        }}
        data={[
          {
            title: 'Item 1',
            text: 'Text 1',
          },
          {
            title: 'Item 2',
            text: 'Text 2',
          },
          {
            title: 'Item 3',
            text: 'Text 3',
          },
          {
            title: 'Item 4',
            text: 'Text 4',
          },
          {
            title: 'Item 5',
            text: 'Text 5',
          },
        ]}
        renderItem={_renderItem}
        // sliderWidth={375}
        // itemWidth={300}
        sliderHeight={700}
        itemHeight={400}
        //   enableSnap={false}
        //   scrollEnabled={false}
        // useScrollView={true}
        vertical={true}
        onSnapToItem={onLayout}
        activeSlideOffset={2}
        enableMomentum={true}
        decelerationRate={0.9}
        removeClippedSubviews={false}
      />
    </View>
  );
};

export default MySnap;

 // import the one and only thing provided
import React, { Component, useState } from 'react';
import { Button, TextInput, View,StyleSheet,TouchableOpacity,Animated } from 'react-native';
import { ReactNativeSVGContext, NotoFontPack } from 'standalone-vexflow-context';
import { Accidental } from 'vexflow/src/accidental';
import axios from 'axios';
import { Stave } from 'vexflow/src/stave';
import { StaveNote } from 'vexflow/src/stavenote';
import { Voice } from 'vexflow/src/voice';
import { Formatter } from 'vexflow/src/formatter';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const styles = StyleSheet.create({
    input: {
      margin: 15,
      marginBottom: 30,
      padding:30,
      borderColor: 'black',
      borderWidth: 1
    },
    img: {
      alignSelf: "center"
    },
    vie:{
      flexDirection: "row",
      alignItems: "stretch"
    },
    align: {
      textAlign: "right",
      marginLeft: 330
    },
    trans:{
      borderLeftWidth: 5,
      borderLeftColor: "red",
      height:100,
      width:100,
      position: "absolute",
      left:47,
      bottom:320
     }
  });

const getData = () => {
    axios
      .post('http://10.0.2.2:8079/work', { 
        "list": [
        {
            "type":"line",
    "direction":"horizontal",
    "startCoordinate": { "x": 5, "y":10 },
    "endCoordinate": { "x": 50, "y":10 }
    },
    {
    "type":"line",
    "direction":"horizontal",
    "startCoordinate": { "x": 5, "y":12.5 },
    "endCoordinate": { "x": 50, "y":12.5 }
    },
    {
    "type":"line",
    "direction":"horizontal",
    "startCoordinate": { "x": 5, "y":15 },
    "endCoordinate": { "x": 50, "y":15 }
    },
    {
    "type":"line",
    "direction":"horizontal",
    "startCoordinate": { "x": 5, "y":17.5 },
    "endCoordinate": { "x": 50, "y":17.5 }
    },
    {
    "type":"line",
    "direction":"horizontal",
    "startCoordinate": { "x": 5, "y":20 },
    "endCoordinate": { "x": 50, "y":20 }
    },
    {
    "type":"line",
    "direction":"vertical",
    "startCoordinate": { "x": 40, "y":10 },
    "endCoordinate": { "x": 40, "y":20 }
    },
    {
    "type":"beat",
    "Coordinate": { "x":15, "y":15 },
    "topNumber": 4 ,
    "bottomNumber": 4
    },
    {
    "type":"sharp",
    "Coordinate": { "x":12, "y":10 }
    },
    {
    "type" : "clef",
    "clefType" : "treble",
    "Coordinate" : { "x" : 7, "y" : 15 }
    },
    {
    "type" : "note",
    "Coordinate" : { "x": 20 , "y":24 },
    "duration": "quarter"
    },
    {
    "type" : "note",
    "Coordinate" : { "x": 24 , "y":20 },
    "duration": "quarter"
    },
    {
    "type" : "note",
    "Coordinate" : { "x": 29 , "y":17 },
    "duration": "eighth"
    },
    {
    "type" : "note",
    "Coordinate" : { "x": 32 , "y":17 },
    "duration": "eighth"
    },
    {
    "type" : "note",
    "Coordinate" : { "x": 38 , "y":14 },
    "duration": "quarter"
    },
    {
    "type" : "note",
    "Coordinate" : { "x": 43 , "y":16 },
    "duration": "half"
    },
    {
    "type" : "note",
    "Coordinate" : { "x": 48 , "y":18.5 },
    "duration": "half"
    },
    {
    "type" : "flat",
    "Coordinate" : { "x":23 , "y": 20 }
    },
    {
    "type":"line",
    "direction":"vertical",
    "startCoordinate": { "x": 50, "y":10 },
    "endCoordinate": { "x": 50, "y":20 }
    },
    {
    "type":"line",
    "direction":"vertical",
    "startCoordinate": { "x": 50, "y":10 },
    "endCoordinate": { "x": 50, "y":20 }
        }
    ]})
      .then(function (response) {
        // handle success
        console.log(JSON.stringify(response.data));
        //console.log(res);
      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      });
  };
const SPRING_CONFIG = {tension: 2}; //Soft spring

export default class ABCComponent extends Component{

    constructor(props) {
        super(props);
        this.state = {
          abc: '',
          pan: new Animated.ValueXY()
        };
      }

      componentDidMount() {
        Animated.sequence([
          
        Animated.timing(this.state.pan, {
          duration: 4000,
          toValue: {x: 280, y: 0},
          useNativeDriver: true                        // return to start
    }),Animated.timing(this.state.pan, {
      duration: 10,
      toValue: {x: 0, y: 110},
      useNativeDriver: true                        // return to start
}),Animated.timing(this.state.pan, {
  duration: 4000,
  toValue: {x: 280, y: 110},
  useNativeDriver: true                        // return to start
}),Animated.timing(this.state.pan, {
duration: 10,
toValue: {x: 0, y: 0},
useNativeDriver: true                        // return to start
})
        ]).start();
        
      }

      startAndRepeat() {
        //this.componentDidMount(this.startAndRepeat);
      }
      
      getStyle() {
        return [
          styles.trans,
          {
            transform: this.state.pan.getTranslateTransform(),
          },
        ];
      }

	render() {
        

        const context = new ReactNativeSVGContext(NotoFontPack, { width: 400, height: 400 });
        const stave = new Stave(10, 50, 380);
        stave.setContext(context);
        stave.setClef('treble');
        stave.setTimeSignature('4/4');
    
        const stave2 = new Stave(10, 150, 380);
        stave2.setContext(context);
        stave2.setClef('treble');
        stave2.setTimeSignature('4/4');

        var notes = [
            // A quarter-note C.
            new StaveNote({clef: "treble", keys: ["c/4"], duration: "q" }),
          
            // A quarter-note D.
            new StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }),
          
            // A quarter-note rest. Note that the key (b/4) specifies the vertical
            // position of the rest.
            new StaveNote({clef: "treble", keys: ["e/4"], duration: "q" }),
            
            new StaveNote({clef: "treble", keys: ["f/4"], duration: "q" })
          ];

          var notes2 = [
            // A quarter-note C.
            new StaveNote({clef: "treble", keys: ["g/4"], duration: "q" }),
          
            // A quarter-note D.
            new StaveNote({clef: "treble", keys: ["a/4"], duration: "q" }),
          
            // A quarter-note rest. Note that the key (b/4) specifies the vertical
            // position of the rest.
            new StaveNote({clef: "treble", keys: ["b/4"], duration: "q" }),
            
            new StaveNote({clef: "treble", keys: ["c/5"], duration: "8" })
            ,
            
            new StaveNote({clef: "treble", keys: ["d/5"], duration: "8" })
          ]; 
          
          // Create a voice in 4/4 and add the notes from above
          const voice = new Voice({num_beats: 4,  beat_value: 4});
          voice.addTickables(notes);
          
          const voice2 = new Voice({num_beats: 4,  beat_value: 4});
          voice2.addTickables(notes2);

          // Format and justify the notes to 400 pixels.
          const formatter = new Formatter().joinVoices([voice]).format([voice], 300);
          const formatter2 = new Formatter().joinVoices([voice2]).format([voice2], 300);
          
          // Render voice
          voice.draw(context, stave);
          voice2.draw(context, stave2);
        
        
        stave.draw();
        stave2.draw();


    
    
    
        return (
            <View>
            <TextInput value="M: 4/4 L: 1/4 K: C D E F G A B c/ d/"
              //onChangeText={newValu =>this.setState({ abc: newValu  })} 
              style={styles.input}
              numberOfLines={5}
            ></TextInput>
            <Button onPress={()=> /*getData()*/ alert("Successfully Converted") } title="Convert"></Button>

            { context.render() }
            
            <Animated.View style={this.getStyle()}></Animated.View>

            <TouchableOpacity
              onPress={()=> this.componentDidMount()}
            >

              <FontAwesome5 name="play" size={40} color="black" style={styles.img}/>
            </TouchableOpacity>
            <View style={styles.vie}>
              <MaterialCommunityIcons name="music-note-bluetooth-off" size={30} color="black" />
              <MaterialCommunityIcons name="metronome" size={30} color="black" style={styles.align} />

            </View>
            </View>
            
        );
    }
    
};
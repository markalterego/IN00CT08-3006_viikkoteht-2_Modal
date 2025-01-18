import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, Modal, BackHandler } from 'react-native';

export default function App() {
    const [initialScreen, setInitialScreen] = useState(true); // defines whether to show the starting screen
    const [secondScreen, setSecondScreen] = useState(false); // defines whether to show the secondary screen

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (secondScreen) {
                setSecondScreen(false);
                setInitialScreen(true);
                return true;
            }
            return false;
        });
        
        return () => backHandler.remove(); // remove unnecessary event listers
    }, [secondScreen]);

    return (
        <View style={styles.container}>
            <Modal visible={initialScreen} transparent>
                <View style={styles.screen}>
                    <Pressable onPress={() => {setSecondScreen(true); setInitialScreen(false)}}>
                        <Text>Show modal message</Text>
                    </Pressable>
                </View>
            </Modal>
            
            <Modal visible={secondScreen} transparent>
                <View style={styles.screen}>
                    <Text>This is modal...</Text>
                    <Pressable onPress={() => {setSecondScreen(false); setInitialScreen(true)}} style={styles.secondScreenButton}>
                        <Text>Close</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // probably takes up the whole screen don't remember really though
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  secondScreenButton: {
    marginTop: 20,
    borderWidth: 1,
    height: 25,
    width: 75,
    borderStyle: 'solid',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

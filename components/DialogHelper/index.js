import * as React from "react";
import { View } from "react-native";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";

export default class DialogHelper {
  static showDialog(params) {
    return (
      <Provider>
        <View>
          <Portal>
            <Dialog visible={visibleDialog} onDismiss={hideDialog}>
              <Dialog.Title>Alert</Dialog.Title>
              <Dialog.Content>
                <Paragraph>This is simple dialog</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Done</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </Provider>
    );
  }
}

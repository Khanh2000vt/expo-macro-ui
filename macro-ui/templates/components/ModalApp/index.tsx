import { Ionicons } from "@expo/vector-icons";
import {
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useState,
} from "react";
import Modal from "react-native-modal";
import { useUnistyles } from "react-native-unistyles";
import { Box, Row, Show } from "../../layout";
import { scaler } from "../../themes";
import { ForwardRefComponent, ModalAppRef } from "../../types";
import { TextTickerApp } from "../../typography";
import { PressableApp } from "../PressableApp";
import { Separator } from "../Separator";

type ModalAppProps = PropsWithChildren<{
  required?: boolean;
  title?: string;
  LeftHeader?: React.ReactNode;
}>;

export const ModalApp: ForwardRefComponent<ModalAppRef, ModalAppProps> =
  forwardRef(({ children, required, title, LeftHeader }, ref) => {
    const {
      theme: { colors },
    } = useUnistyles();
    const [visible, setVisible] = useState(false);

    useImperativeHandle(
      ref,
      () => ({
        open,
        close,
      }),
      []
    );

    const open = () => {
      setVisible(true);
    };
    const close = () => {
      setVisible(false);
    };

    const handleBackdropPress = () => {
      if (required) {
        return;
      }
      close();
    };

    return (
      <Modal
        animationIn="zoomIn"
        animationOut="zoomOut"
        backdropOpacity={0.3}
        isVisible={visible}
        onBackdropPress={handleBackdropPress}
      >
        <Box
          borderRadius={scaler(16)}
          bgColor={colors.white}
          p={required ? scaler(16) : 0}
          pb={scaler(16)}
          pl={scaler(16)}
        >
          <Row columnGap={scaler(8)}>
            {LeftHeader}
            <Box flex={1}>
              <TextTickerApp
                type="heading"
                color={colors.primary}
                textAlign="center"
              >
                {title}
              </TextTickerApp>
            </Box>
            <Show when={!required}>
              <PressableApp p={scaler(16)} onPress={close}>
                <Ionicons name="close" size={24} color={colors.primary} />
              </PressableApp>
            </Show>
          </Row>
          <Separator />
          {children}
        </Box>
      </Modal>
    );
  });

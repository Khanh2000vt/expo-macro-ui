import { Ionicons } from "@expo/vector-icons";
import React, { forwardRef } from "react";
import { useUnistyles } from "react-native-unistyles";
import { ModalApp } from "../ModalApp";
import { Box, Row, Show } from "../../layout";
import { scaler } from "../../themes";
import { ForwardRefComponent, ModalAppRef } from "../../types";
import { TextApp } from "../../typography";
import { ButtonApp } from "../ButtonApp";

export type ModalConfirmProps = {
  header?: string;
  onConfirm?: () => Promise<void>;
  onCancel?: () => void;
  title?: string;
  description?: string;
};

export const ModalConfirm: ForwardRefComponent<ModalAppRef, ModalConfirmProps> =
  forwardRef(
    (
      { header = "Cảnh báo !", title, description, onConfirm, onCancel },
      ref
    ) => {
      const {
        theme: { colors },
      } = useUnistyles();
      return (
        <ModalApp
          ref={ref}
          required
          title={header}
          LeftHeader={
            <Ionicons name="alert-circle" size={24} color={colors.primary} />
          }
        >
          <Box rowGap={scaler(10)}>
            <Show when={!!title}>
              <TextApp type="label">{title}</TextApp>
            </Show>
            <Show when={!!description}>
              <TextApp fontStyle="italic">{description}</TextApp>
            </Show>

            <Row columnGap={scaler(8)} mt={scaler(10)}>
              <ButtonApp
                flex={1}
                title="Huỷ"
                type="outline"
                onPress={onCancel}
              />
              <ButtonApp flex={1} title="Xác nhận" onPress={onConfirm} />
            </Row>
          </Box>
        </ModalApp>
      );
    }
  );

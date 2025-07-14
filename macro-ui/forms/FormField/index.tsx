import React from "react";
import { useUnistyles } from "react-native-unistyles";
import { Box, BoxProps, Show } from "../../layout";
import { scaler } from "../../themes";
import { TextApp } from "../../typography";

type FormFieldProps = {
  title?: string;
  require?: boolean;
  error?: string;
} & BoxProps;

export const FormField: React.FC<FormFieldProps> = ({
  title,
  require,
  children,
  error,
  ...props
}) => {
  const {
    theme: { colors },
  } = useUnistyles();
  return (
    <Box gap={title ? scaler(1) : 0} justify="space-between" {...props}>
      <Show when={!!title}>
        <TextApp weight={600} type="titleForm" mb={scaler(2)}>
          {title}
          <Show when={require}>
            <TextApp color={colors.textError}> *</TextApp>
          </Show>
        </TextApp>
      </Show>
      {children}
      <Show when={!!error} fallback={<Box height={scaler(4)} />}>
        <TextApp type="error">{error}</TextApp>
      </Show>
    </Box>
  );
};

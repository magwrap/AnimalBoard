import { toggleDownloadSnackBar, useAppDispatch } from "@/hooks/reduxHooks";
import { downloadPhoto } from "@/hooks/useMediaLibary";
import { MyColors } from "@/styles/ColorPallete";
import { IconSizes } from "@/styles/Fonts";
import React from "react";
import { IconButton, useTheme } from "react-native-paper";

interface DownloadButtonProps {
  uri: string | null;
  setDownloading: React.Dispatch<React.SetStateAction<boolean>>;
  background?: boolean;
  color?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  uri,
  setDownloading,
  background = false,
  color = "",
}) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const backgroundColor = {
    backgroundColor: background ? MyColors.TRANSPARENT_BLACK : "transparent",
  };
  const margin = { margin: 0 };
  const iconColor = color ? color : colors.accent;
  const _download = async () => {
    await downloadPhoto(uri, setDownloading);
    dispatch(toggleDownloadSnackBar());
  };
  return (
    <IconButton
      icon="download"
      size={IconSizes.NORMAL}
      color={iconColor}
      onPress={_download}
      style={[backgroundColor, margin]}
    />
  );
};

export default DownloadButton;

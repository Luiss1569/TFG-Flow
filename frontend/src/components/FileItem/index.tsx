import { Text, Icon, Flex } from "@chakra-ui/react";
import { IconType } from "react-icons";
import {
  FaFileImage,
  FaFileAudio,
  FaFileVideo,
  FaFilePdf,
  FaFile,
} from "react-icons/fa";

interface FileProps {
  name: string;
  mimeType: string;
  url: string;
  label?: string;
}

const FileItem: React.FC<FileProps> = ({ name, mimeType = "", url, label }) => {
  let IconComponent: IconType;

  if (mimeType.startsWith("image")) {
    IconComponent = FaFileImage;
  } else if (mimeType.startsWith("audio")) {
    IconComponent = FaFileAudio;
  } else if (mimeType.startsWith("video")) {
    IconComponent = FaFileVideo;
  } else if (mimeType === "application/pdf") {
    IconComponent = FaFilePdf;
  } else {
    IconComponent = FaFile;
  }

  if (!name) return null;

  return (
    <Flex direction={"column"}>
      {!!label && (
        <Text fontSize="sm" mr={2}>
          {label}:
        </Text>
      )}
      <a href={url} target="_blank">
        <Flex direction="row" gap={1} alignItems="center">
          <Icon as={IconComponent} />
          <Text fontSize="sm" fontWeight={"bold"}>
            {name.split("@").pop()}
          </Text>
        </Flex>
      </a>
    </Flex>
  );
};

export default FileItem;

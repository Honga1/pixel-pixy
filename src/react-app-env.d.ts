/// <reference types="react-scripts" />
declare module "grommet-icons/StyledIcon";

interface ShareData {
  files?: readonly File[];
  image?: string;
}

interface Navigator {
  canShare?({ files }: { files: readonly File[] }): boolean;
}

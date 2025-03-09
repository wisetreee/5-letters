interface EmojiIconProps {
  src?: string;
  width?: number;
  height?: number;
}

const EmojiIcon: React.FC<EmojiIconProps> = ({ src, width, height }) => {
  return (
    <img
      src={src}
      width={width ? width : 48}
      height={height ? height : 48}
      alt=""
    />
  );
};

export default EmojiIcon;

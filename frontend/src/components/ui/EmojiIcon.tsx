interface EmojiIconProps {
  src?: string;
  width?: number;
  height?: number;
  alt?: string;
}

const EmojiIcon: React.FC<EmojiIconProps> = ({ src, width, height, alt }) => {
  return (
    <img
      src={src}
      width={width ? width : 48}
      height={height ? height : 48}
      alt={alt}
    />
  );
};

export default EmojiIcon;

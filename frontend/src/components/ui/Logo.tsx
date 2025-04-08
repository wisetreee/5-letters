import EmojiIcon from "./EmojiIcon";

const Logo = () => {
  return (
    <div>
      <div className="md:hidden">
        <EmojiIcon src="/mobile-logo.svg" />
      </div>
      <div className="hidden md:flex md:gap-1 md:items-center">
        <EmojiIcon width={72} height={72} src="/mobile-logo.svg" />
        <h1 className="font-medium">ордлик</h1>
      </div>
    </div>
  );
};

export default Logo;

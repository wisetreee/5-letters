import EmojiIcon from "./EmojiIcon"

const Logo = () => {
  return (
    <div>
      <div className="sm:hidden">
        <EmojiIcon src="/mobile-logo.svg" />
      </div>
      <div className="hidden sm:flex sm:gap-1 sm:items-center">
        <EmojiIcon src="/mobile-logo.svg" />
        <h2 className="font-medium">ордлик</h2>
      </div>

    </div>
  )
}

export default Logo
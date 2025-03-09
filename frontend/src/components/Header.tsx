import { Button } from "@/components/ui/button"
import { AlignJustify, CircleHelp, Settings, Undo2, UserRound} from "lucide-react"
import Logo from "@/components/ui/Logo"

const Header = () => {
  return (
    <header className="container flex my-4">
        <div className="flex flex-1/3 justify-start">
        {window.location.pathname !=="/" &&
         <Button size="icon">
            <Undo2/>
        </Button>  
        }    
        </div>
        <div className="flex flex-1/3 justify-center">
        <Logo/>

        </div>
        <div className="flex flex-1/3 justify-end">
        <div className="hidden sm:flex sm:gap-2">
        <Button size="icon" variant="ghost">
            <CircleHelp/>
        </Button>
        <Button size="icon" variant="ghost">
            <Settings/>
        </Button>
        <Button size="icon" variant="ghost">
            <UserRound/>
        </Button>
        </div>
        <Button className="sm:hidden" size="icon" variant="ghost">
            <AlignJustify/>
        </Button>
        </div>
    </header>
  )
}

export default Header
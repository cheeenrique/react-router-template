import * as React from "react"
import { cva, type VariantProps } from "../../utils/cva"
import { X } from "lucide-react"
import { cn } from "../../utils/cn"

const drawerVariants = cva(
  "fixed z-50 gap-4 bg-white p-6 shadow-lg transition-all duration-300 ease-in-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b transform translate-y-0",
        bottom: "inset-x-0 bottom-0 border-t transform translate-y-0",
        left: "inset-y-0 left-0 h-full w-3/4 border-r transform translate-x-0 sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l transform translate-x-0 sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface DrawerProps {
  children: React.ReactNode
}

interface DrawerTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

interface DrawerContentProps extends VariantProps<typeof drawerVariants> {
  children: React.ReactNode
  className?: string
  side?: "top" | "bottom" | "left" | "right"
}

const DrawerContext = React.createContext<{
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}>({
  isOpen: false,
  setIsOpen: () => {},
})

const Drawer: React.FC<DrawerProps> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  
  return (
    <DrawerContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DrawerContext.Provider>
  )
}

const DrawerTrigger = React.forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  ({ children, onClick, ...props }, ref) => {
    const { setIsOpen } = React.useContext(DrawerContext)
    
    return (
      <button
        ref={ref}
        onClick={(e) => {
          setIsOpen(true)
          onClick?.(e)
        }}
        {...props}
      >
        {children}
      </button>
    )
  }
)
DrawerTrigger.displayName = "DrawerTrigger"

const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ side = "right", className, children, ...props }, ref) => {
    const { isOpen, setIsOpen } = React.useContext(DrawerContext)
    
    if (!isOpen) return null
    
    return (
      <>
        {/* Overlay */}
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
        
        {/* Content */}
        <div
          ref={ref}
          className={cn(drawerVariants({ side }), className)}
          {...props}
        >
          {children}
          <button
            className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>
      </>
    )
  }
)
DrawerContent.displayName = "DrawerContent"

const DrawerClose = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, onClick, ...props }, ref) => {
    const { setIsOpen } = React.useContext(DrawerContext)
    
    return (
      <button
        ref={ref}
        onClick={(e) => {
          setIsOpen(false)
          onClick?.(e)
        }}
        {...props}
      >
        {children}
      </button>
    )
  }
)
DrawerClose.displayName = "DrawerClose"

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = "DrawerTitle"

const DrawerDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-600", className)}
    {...props}
  />
))
DrawerDescription.displayName = "DrawerDescription"

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} 
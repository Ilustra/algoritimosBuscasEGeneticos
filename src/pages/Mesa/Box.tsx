const Box = ({ children, className }) => (
    <div className={`  h-[580px] w-[580px] ${className}`}>
      {children}
    </div>
  )

export default Box
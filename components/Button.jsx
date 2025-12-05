const Button = ({ text, onClick, className }) => {
  return (
    <div>
        <button onClick={onClick} className={className}>{text}</button>
    </div>
  )
}

export default Button
const Button = ({ id, text, onClick, className }) => {
  return (
    <div>
        <button id={id} onClick={onClick} className={className}>{text}</button>
    </div>
  )
}

export default Button
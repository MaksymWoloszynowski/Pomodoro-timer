import "@/styles/button.css"

const Button = ({ text, onClick }) => {
  return (
    <div>
        <button onClick={onClick}>{text}</button>
    </div>
  )
}

export default Button